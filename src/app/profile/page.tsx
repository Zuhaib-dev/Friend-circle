"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TopNav } from "@/components/top-nav";
import { motion, AnimatePresence } from "motion/react";
import { User as UserIcon, Terminal, CheckCircle2, Loader2, Image as ImageIcon, Phone, AtSign, ShieldAlert, FileUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { initialsOf } from "@/lib/utils";
import imageCompression from "browser-image-compression";

type ProfileData = {
  name: string;
  email: string;
  image?: string;
  role: string;
  phone?: string;
  socialHandle?: string;
  bio?: string;
  teamMemberStatus?: string;
};

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  // Editable state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    socialHandle: "",
    bio: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else if (session === null) {
      router.push("/login");
    }
  }, [user, session, router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          socialHandle: data.socialHandle || "",
          bio: data.bio || "",
        });
      } else {
        throw new Error("Failed to load profile");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    setNewImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImageToImageKit = async (file: File): Promise<string> => {
    // Compress
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      exifOrientation: 1
    };
    const compressedBlob = await imageCompression(file, options);
    const compressedFile = new File([compressedBlob], file.name, { type: compressedBlob.type });

    // Auth
    const authRes = await fetch("/api/imagekit/auth");
    if (!authRes.ok) throw new Error("Image upload auth failed");
    const auth = await authRes.json();

    // Upload
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("fileName", file.name);
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
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMsg("");

    try {
      let finalImageUrl = profile?.image;

      if (newImageFile) {
        finalImageUrl = await uploadImageToImageKit(newImageFile);
      }

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          image: finalImageUrl,
          phone: form.phone,
          socialHandle: form.socialHandle,
          bio: form.bio,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save profile");
      }

      setProfile(data.user);
      setImagePreview(null);
      setNewImageFile(null);
      setSuccessMsg("PROFILE DATA SYNCHRONIZED");

      // Update session to reflect new name/image globally
      await update({
        name: data.user.name,
        image: data.user.image,
      });

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user || loading) {
    return (
      <main className="min-h-screen bg-bone text-ink flex flex-col">
        <TopNav />
        <div className="flex-1 flex items-center justify-center p-6">
          <ActivityLoader />
        </div>
      </main>
    );
  }

  const isAdvanced = profile?.role === "TEAM_MEMBER" || profile?.role === "ADMIN";
  const displayImage = imagePreview || profile?.image;
  const displayName = form.name || profile?.name || "OPERATOR";
  const displayRole = profile?.role || "USER";

  return (
    <main className="min-h-screen bg-bone text-ink relative overflow-hidden flex flex-col">
      <TopNav />

      {/* Command strip */}
      <div className="hairline-b border-ink bg-bone">
        <div className="flex items-center px-4 py-1.5 mono-label gap-3">
          <span className="brick px-2 py-px text-bone">ID / MANAGE</span>
          <span className="opacity-70 truncate">OPERATOR PROFILE CONFIGURATION</span>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 flex items-start justify-center">
        {/* Background tactical grids */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 tick-v opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 tick opacity-30" />

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 lg:gap-10 z-10 relative">
          
          {/* Left Col: Live Preview Badge */}
          <div className="flex flex-col gap-4">
            <div className="mono-label opacity-50 flex items-center gap-1.5">
              <UserIcon className="h-3 w-3 text-signal" /> DOSSIER PREVIEW
            </div>
            
            <div className="hairline border-ink bg-bone relative group overflow-hidden flex flex-col">
              <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_40px_rgba(28,28,26,0.1)]" />
              
              {/* Avatar section */}
              <div 
                className="aspect-square relative overflow-hidden bg-ink/5 cursor-pointer group/avatar"
                onClick={() => fileInputRef.current?.click()}
              >
                {displayImage ? (
                  <Image src={displayImage} alt="Avatar" fill className="object-cover grayscale group-hover/avatar:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-7xl brick text-bone">
                    {initialsOf(displayName)}
                  </div>
                )}
                
                {/* Upload overlay */}
                <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-bone gap-2 z-20">
                  <FileUp className="h-6 w-6" />
                  <span className="mono-label text-xs">UPDATE IMAGE</span>
                </div>
              </div>

              {/* Data section */}
              <div className="p-4 flex flex-col gap-3 relative z-20 bg-bone">
                <div>
                  <div className="mono-label text-[10px] opacity-60">OPERATOR DESIGNATION</div>
                  <div className="font-display text-2xl truncate uppercase">{displayName}</div>
                </div>
                
                <div className="hairline-t border-ink/20 pt-3 flex flex-col gap-2">
                  <BadgeRow icon={AtSign} val={profile?.email || ""} />
                  {isAdvanced && (
                    <>
                      <BadgeRow icon={Phone} val={form.phone || profile?.phone || "NO COMM LINK"} />
                      <BadgeRow 
                        icon={Terminal} 
                        val={form.socialHandle || profile?.socialHandle || "NO ALIAS"} 
                        href={
                          (form.socialHandle || profile?.socialHandle) 
                            ? (form.socialHandle || profile?.socialHandle || "").startsWith("http") 
                              ? (form.socialHandle || profile?.socialHandle) 
                              : `https://instagram.com/${(form.socialHandle || profile?.socialHandle)?.replace("@", "")}`
                            : undefined
                        }
                      />
                    </>
                  )}
                </div>

                <div className="mt-2 inline-flex items-center self-start px-2 py-1 hairline border-signal bg-signal/10 text-signal mono-label text-[10px]">
                  CLASS · {displayRole}
                </div>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          {/* Right Col: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <header className="mb-2">
              <h1 className="font-display text-4xl uppercase tracking-tight">Profile Config</h1>
              <p className="mono-label opacity-60 mt-1">Modify your identity parameters. Changes sync globally across the network.</p>
            </header>

            <div className="space-y-4 max-w-xl">
              <div className="space-y-1">
                <label className="mono-label text-[11px] opacity-70">DESIGNATION (NAME)</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full hairline border-ink bg-transparent px-3 py-2.5 font-mono text-sm placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-signal focus:border-signal transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[11px] opacity-70">NETWORK IDENTITY (EMAIL)</label>
                <input
                  type="email"
                  disabled
                  value={profile?.email || ""}
                  className="w-full hairline border-ink/30 bg-ink/5 px-3 py-2.5 font-mono text-sm opacity-60 cursor-not-allowed"
                />
              </div>

              {isAdvanced && (
                <>
                  <div className="space-y-1">
                    <label className="mono-label text-[11px] opacity-70">COMM LINK (PHONE)</label>
                    <input
                      type="tel"
                      disabled={!!profile?.phone}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9+\s-]/g, '') })}
                      placeholder="+91 9876543210"
                      className="w-full hairline border-ink bg-transparent px-3 py-2.5 font-mono text-sm placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-signal focus:border-signal transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-ink/5"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="mono-label text-[11px] opacity-70">EXTERNAL ALIAS (SOCIAL HANDLE)</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 mono-label text-ink/40">@</span>
                      <input
                        type="text"
                        value={form.socialHandle}
                        onChange={(e) => setForm({ ...form, socialHandle: e.target.value })}
                        placeholder="instagram_handle"
                        className="w-full hairline border-ink bg-transparent pl-8 pr-3 py-2.5 font-mono text-sm placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-signal focus:border-signal transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="mono-label text-[11px] opacity-70">OPERATOR BIO (SUMMARY)</label>
                    <textarea
                      rows={4}
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      placeholder="Brief dossier summary..."
                      className="w-full hairline border-ink bg-transparent px-3 py-2.5 font-mono text-sm placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-signal focus:border-signal transition-all resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Status messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mono-label text-[10px] text-acid bg-acid/10 px-3 py-2 hairline border-acid/30 flex items-center gap-1.5 max-w-xl"
                >
                  <ShieldAlert className="h-3 w-3" /> {error}
                </motion.div>
              )}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mono-label text-[10px] text-signal bg-signal/10 px-3 py-2 hairline border-signal/30 flex items-center gap-1.5 max-w-xl"
                >
                  <CheckCircle2 className="h-3 w-3" /> {successMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 max-w-xl">
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={saving}
                type="submit"
                className="w-full brick py-3 flex items-center justify-center gap-2 text-bone mono-label hover:bg-signal transition-colors disabled:opacity-50 disabled:hover:bg-ink cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-signal" />
                    SYNCHRONIZING...
                  </>
                ) : (
                  <>
                    <Terminal className="h-4 w-4 text-signal" />
                    COMMIT CHANGES
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function BadgeRow({ icon: Icon, val, href }: { icon: any, val: string, href?: string }) {
  return (
    <div className="flex items-center gap-2 mono-label text-xs">
      <Icon className="h-3 w-3 opacity-40 shrink-0" />
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="truncate opacity-80 hover:text-signal hover:underline">
          {val}
        </a>
      ) : (
        <span className="truncate opacity-80">{val}</span>
      )}
    </div>
  );
}

function ActivityLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-signal opacity-60">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="mono-label tracking-widest">CONNECTING TO SECURE DB...</span>
    </div>
  );
}
