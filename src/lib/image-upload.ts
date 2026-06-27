"use client";

import imageCompression, { type Options } from "browser-image-compression";

export type ImageCompressionPreset = "avatar" | "gallery" | "tourCover";

export type CompressedImage = {
  file: File;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savedPercent: number;
};

export type ImageKitUploadResult = {
  url: string;
  fileId?: string;
  compression: CompressedImage;
};

const PRESETS: Record<ImageCompressionPreset, Options> = {
  avatar: {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    initialQuality: 0.72,
  },
  gallery: {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    initialQuality: 0.74,
  },
  tourCover: {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    initialQuality: 0.76,
  },
};

function renameForOutput(file: File, type: string) {
  const ext = type === "image/webp" ? "webp" : type === "image/png" ? "png" : "jpg";
  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  return `${base}.${ext}`;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export async function compressImageForUpload(
  file: File,
  preset: ImageCompressionPreset
): Promise<CompressedImage> {
  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const compressed = await imageCompression(file, {
    ...PRESETS[preset],
    useWebWorker: true,
    preserveExif: false,
    exifOrientation: 1,
    fileType: outputType,
  });

  const compressedFile = new File([compressed], renameForOutput(file, compressed.type), {
    type: compressed.type,
    lastModified: Date.now(),
  });
  const savedBytes = Math.max(0, file.size - compressedFile.size);

  return {
    file: compressedFile,
    originalSize: file.size,
    compressedSize: compressedFile.size,
    savedBytes,
    savedPercent: file.size ? Math.round((savedBytes / file.size) * 100) : 0,
  };
}

export async function uploadCompressedImageToImageKit(
  file: File,
  preset: ImageCompressionPreset
): Promise<ImageKitUploadResult> {
  const compression = await compressImageForUpload(file, preset);

  const authRes = await fetch("/api/imagekit/auth");
  if (!authRes.ok) throw new Error("Image upload auth failed");
  const auth = await authRes.json();

  const formData = new FormData();
  formData.append("file", compression.file);
  formData.append("fileName", compression.file.name);
  formData.append("publicKey", auth.publicKey);
  formData.append("signature", auth.signature);
  formData.append("expire", auth.expire.toString());
  formData.append("token", auth.token);

  const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  });

  if (!uploadRes.ok) throw new Error("Image upload failed");
  const data = await uploadRes.json();

  return {
    url: data.url,
    fileId: data.fileId,
    compression,
  };
}
