"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  Loader2,
  Sparkles,
  Radio,
  Volume2,
  Tag,
  Star,
  ExternalLink
} from "lucide-react";
import { uploadCompressedImageToImageKit } from "@/lib/image-upload";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type DispatchItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  audioMemoUrl?: string;
  tags: string[];
  category: "EXPEDITION" | "FIELD_NOTES" | "TECH" | "REFLECTIONS" | "GUIDES";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string;
  readTimeMinutes: number;
  telemetry: {
    location?: string;
    coordinates?: string;
    weather?: string;
    elevation?: string;
  };
  viewsCount: number;
  likesCount: number;
  reactions?: {
    roger: number;
    acknowledged: number;
    copied: number;
  };
  featured: boolean;
  createdAt: string;
};

export function DispatchesView() {
  const [dispatches, setDispatches] = useState<DispatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED">("ALL");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"WRITE" | "PREVIEW">("WRITE");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    coverImage: "",
    audioMemoUrl: "",
    tags: "kashmir, expedition",
    category: "FIELD_NOTES" as DispatchItem["category"],
    status: "DRAFT" as DispatchItem["status"],
    featured: false,
    telemetry: {
      location: "SRINAGAR / KMR",
      coordinates: "34.0837°N · 74.7973°E",
      weather: "4°C · NW 14KT",
      elevation: "1580 M",
    },
  });

  const fetchDispatches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dispatches?admin=true");
      const data = await res.json();
      if (Array.isArray(data)) {
        setDispatches(data);
      }
    } catch (err) {
      console.error("Failed to fetch dispatches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispatches();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      summary: "",
      content: "",
      coverImage: "",
      audioMemoUrl: "",
      tags: "kashmir, expedition",
      category: "FIELD_NOTES",
      status: "DRAFT",
      featured: false,
      telemetry: {
        location: "SRINAGAR / KMR",
        coordinates: "34.0837°N · 74.7973°E",
        weather: "4°C · NW 14KT",
        elevation: "1580 M",
      },
    });
    setIsEditing(true);
    setActiveTab("WRITE");
  };

  const handleOpenEdit = (d: DispatchItem) => {
    setEditingId(d._id);
    setForm({
      title: d.title,
      slug: d.slug,
      summary: d.summary,
      content: d.content,
      coverImage: d.coverImage || "",
      audioMemoUrl: d.audioMemoUrl || "",
      tags: d.tags.join(", "),
      category: d.category,
      status: d.status,
      featured: d.featured,
      telemetry: {
        location: d.telemetry?.location || "SRINAGAR / KMR",
        coordinates: d.telemetry?.coordinates || "34.0837°N · 74.7973°E",
        weather: d.telemetry?.weather || "4°C · NW 14KT",
        elevation: d.telemetry?.elevation || "1580 M",
      },
    });
    setIsEditing(true);
    setActiveTab("WRITE");
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await uploadCompressedImageToImageKit(file, "tourCover");
      setForm((prev) => ({ ...prev, coverImage: result.url }));
    } catch (err: any) {
      alert("Image upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      alert("Please fill in Title, Summary, and Article Content.");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingId ? `/api/dispatches/${editingId}` : "/api/dispatches";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save dispatch");
      }

      await fetchDispatches();
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete dispatch "${title}"?`)) return;

    try {
      const res = await fetch(`/api/dispatches/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDispatches((prev) => prev.filter((d) => d._id !== id));
      } else {
        alert("Failed to delete dispatch");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (d: DispatchItem) => {
    const nextStatus = d.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/dispatches/${d._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setDispatches((prev) => prev.map((item) => (item._id === d._id ? updated : item)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchive = async (d: DispatchItem) => {
    const nextStatus = d.status === "ARCHIVED" ? "DRAFT" : "ARCHIVED";
    try {
      const res = await fetch(`/api/dispatches/${d._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setDispatches((prev) => prev.map((item) => (item._id === d._id ? updated : item)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = dispatches.filter((d) => {
    if (filter !== "ALL" && d.status !== filter) return false;
    if (search) {
      const query = search.toLowerCase();
      return (
        d.title.toLowerCase().includes(query) ||
        d.summary.toLowerCase().includes(query) ||
        d.tags.some((t) => t.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Strip */}
      <div className="hairline border-ink bg-bone p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mono-label flex items-center gap-2 text-signal">
            <Radio className="h-3.5 w-3.5 animate-blink" /> EDITORIAL CMS // DISPATCH ENGINE
          </div>
          <h2 className="display-num text-3xl font-black mt-1">FIELD DISPATCHES</h2>
        </div>
        <button
          onClick={handleOpenCreate}
          className="brick px-4 py-2.5 mono-label text-bone hover:bg-signal transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> WRITE NEW DISPATCH
        </button>
      </div>

      {/* Editor Modal / Workspace */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="hairline border-ink bg-paper p-5 md:p-7 space-y-6 shadow-[6px_6px_0_0_oklch(0.13_0.01_60)] relative"
          >
            <div className="flex items-center justify-between hairline-b border-ink/40 pb-4">
              <div className="mono-label flex items-center gap-2">
                <FileText className="h-4 w-4 text-signal" />
                <span>{editingId ? "EDITING DISPATCH" : "NEW FIELD DISPATCH"}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("WRITE")}
                  className={`mono-label px-3 py-1.5 hairline border-ink transition-colors ${
                    activeTab === "WRITE" ? "brick text-bone" : "bg-bone hover:bg-ink/10"
                  }`}
                >
                  WRITE / EDIT
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("PREVIEW")}
                  className={`mono-label px-3 py-1.5 hairline border-ink transition-colors ${
                    activeTab === "PREVIEW" ? "brick text-bone" : "bg-bone hover:bg-ink/10"
                  }`}
                >
                  LIVE PREVIEW
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="mono-label px-3 py-1.5 text-signal hover:underline ml-2"
                >
                  CANCEL
                </button>
              </div>
            </div>

            {activeTab === "WRITE" ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Title */}
                  <div className="md:col-span-8">
                    <label className="mono-label block text-xs mb-1">ARTICLE TITLE *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Ridge Log: Dawn Over Sonamarg Pass"
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-display text-xl font-bold focus:outline-none focus:border-signal"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="md:col-span-4">
                    <label className="mono-label block text-xs mb-1">CATEGORY</label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value as DispatchItem["category"] })
                      }
                      className="w-full bg-bone hairline border-ink px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-signal"
                    >
                      <option value="FIELD_NOTES">FIELD NOTES</option>
                      <option value="EXPEDITION">EXPEDITION</option>
                      <option value="TECH">TECH & GEAR</option>
                      <option value="REFLECTIONS">REFLECTIONS</option>
                      <option value="GUIDES">GUIDES & PROTOCOLS</option>
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="mono-label block text-xs mb-1">EXCERPT / SUMMARY *</label>
                  <textarea
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    placeholder="Short 1-2 sentence lead overview for article cards..."
                    className="w-full bg-bone hairline border-ink p-3 font-serif text-base h-20 focus:outline-none focus:border-signal resize-none"
                    required
                  />
                </div>

                {/* Cover Image Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 hairline border-ink/40 p-4 bg-bone">
                  <div>
                    <label className="mono-label block text-xs mb-1 flex items-center gap-1.5">
                      <LinkIcon className="h-3.5 w-3.5 text-signal" /> COVER IMAGE URL
                    </label>
                    <input
                      type="text"
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-paper hairline border-ink px-3 py-2 font-mono text-xs focus:outline-none focus:border-signal"
                    />
                  </div>

                  <div>
                    <label className="mono-label block text-xs mb-1 flex items-center gap-1.5">
                      <Upload className="h-3.5 w-3.5 text-signal" /> OR UPLOAD FILE TO IMAGEKIT
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      disabled={uploadingImage}
                      className="w-full bg-paper hairline border-ink px-3 py-1.5 font-mono text-xs cursor-pointer file:mr-3 file:py-1 file:px-2 file:brick file:text-bone file:mono-label file:border-0"
                    />
                    {uploadingImage && (
                      <span className="mono-label text-xs text-signal flex items-center gap-1 mt-1">
                        <Loader2 className="h-3 w-3 animate-spin" /> UPLOADING IMAGE...
                      </span>
                    )}
                  </div>
                </div>

                {/* Optional Voice Memo URL & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mono-label block text-xs mb-1 flex items-center gap-1.5">
                      <Volume2 className="h-3.5 w-3.5 text-signal" /> AUDIO MEMO URL (OPTIONAL MP3)
                    </label>
                    <input
                      type="text"
                      value={form.audioMemoUrl}
                      onChange={(e) => setForm({ ...form, audioMemoUrl: e.target.value })}
                      placeholder="https://.../field-recording.mp3"
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-xs focus:outline-none focus:border-signal"
                    />
                  </div>

                  <div>
                    <label className="mono-label block text-xs mb-1 flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-signal" /> TAGS (COMMA SEPARATED)
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      placeholder="kashmir, trekking, equipment"
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-xs focus:outline-none focus:border-signal"
                    />
                  </div>
                </div>

                {/* Telemetry metadata */}
                <div className="hairline border-ink/40 p-4 bg-bone grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="mono-label block text-[10px] opacity-60 mb-1">LOCATION</label>
                    <input
                      type="text"
                      value={form.telemetry.location}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          telemetry: { ...form.telemetry, location: e.target.value },
                        })
                      }
                      className="w-full bg-paper hairline border-ink px-2 py-1 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="mono-label block text-[10px] opacity-60 mb-1">COORDINATES</label>
                    <input
                      type="text"
                      value={form.telemetry.coordinates}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          telemetry: { ...form.telemetry, coordinates: e.target.value },
                        })
                      }
                      className="w-full bg-paper hairline border-ink px-2 py-1 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="mono-label block text-[10px] opacity-60 mb-1">WEATHER</label>
                    <input
                      type="text"
                      value={form.telemetry.weather}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          telemetry: { ...form.telemetry, weather: e.target.value },
                        })
                      }
                      className="w-full bg-paper hairline border-ink px-2 py-1 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="mono-label block text-[10px] opacity-60 mb-1">ELEVATION</label>
                    <input
                      type="text"
                      value={form.telemetry.elevation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          telemetry: { ...form.telemetry, elevation: e.target.value },
                        })
                      }
                      className="w-full bg-paper hairline border-ink px-2 py-1 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Main Content Markdown Textarea */}
                <div>
                  <label className="mono-label block text-xs mb-1">
                    ARTICLE BODY (MARKDOWN SUPPORTED) *
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Write your article using Markdown (## Headings, **bold**, > quotes, - lists)..."
                    className="w-full bg-bone hairline border-ink p-4 font-mono text-sm h-80 focus:outline-none focus:border-signal custom-scroll"
                    required
                  />
                </div>

                {/* Publication Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 hairline-t border-ink/40 pt-4">
                  <div className="flex items-center gap-4">
                    <label className="mono-label text-xs flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.status === "PUBLISHED"}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.checked ? "PUBLISHED" : "DRAFT" })
                        }
                        className="accent-signal"
                      />
                      PUBLISH IMMEDIATELY
                    </label>

                    <label className="mono-label text-xs flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="accent-signal"
                      />
                      FEATURED DISPATCH
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="brick px-6 py-3 mono-label text-bone hover:bg-signal transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    {editingId ? "SAVE CHANGES" : "CREATE DISPATCH"}
                  </button>
                </div>
              </form>
            ) : (
              /* Preview Mode */
              <div className="space-y-6 bg-bone hairline border-ink p-6 md:p-10">
                <div className="mono-label text-signal flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> RENDERED PREVIEW
                </div>
                <h1 className="font-display font-black text-4xl md:text-5xl uppercase leading-tight">
                  {form.title || "Untitled Dispatch"}
                </h1>
                <p className="font-display italic text-xl text-ink/70">{form.summary}</p>
                {form.coverImage && (
                  <div className="aspect-16/9 relative overflow-hidden hairline border-ink">
                    <img
                      src={form.coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="border-t border-ink/20 pt-6">
                  <MarkdownRenderer content={form.content} />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dispatches List Filters & Search */}
      <div className="hairline border-ink bg-bone p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {(["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`mono-label px-3 py-1.5 text-xs hairline border-ink transition-colors cursor-pointer ${
                filter === st ? "brick text-bone" : "bg-bone hover:bg-ink/10"
              }`}
            >
              {st} ({dispatches.filter((d) => (st === "ALL" ? true : d.status === st)).length})
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="SEARCH DISPATCHES..."
          className="bg-paper hairline border-ink px-3 py-1.5 mono-label text-xs outline-none w-full md:w-64 focus:border-signal"
        />
      </div>

      {/* Dispatches Grid/List */}
      {loading ? (
        <div className="p-12 text-center mono-label text-signal flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" /> LOADING FIELD DISPATCHES...
        </div>
      ) : filtered.length === 0 ? (
        <div className="hairline border-ink p-12 text-center bg-bone mono-label opacity-60">
          NO DISPATCHES FOUND. CLICK &quot;WRITE NEW DISPATCH&quot; TO CREATE ONE.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <div
              key={d._id}
              className="hairline border-ink bg-bone p-5 flex flex-col justify-between relative group hover:bg-paper transition-colors"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mono-label text-[10px] mb-3">
                  <span
                    className={`px-2 py-0.5 border hairline ${
                      d.status === "PUBLISHED" ? "brick text-bone" : "bg-paper text-ink"
                    }`}
                  >
                    {d.status}
                  </span>
                  {d.featured && (
                    <span className="mono-label text-signal flex items-center gap-1">
                      <Star className="h-3 w-3 fill-signal" /> FEATURED
                    </span>
                  )}
                  <span className="opacity-60">{d.category}</span>
                </div>

                {/* Title & Summary */}
                <h3 className="font-display font-bold text-xl leading-tight line-clamp-2">
                  {d.title}
                </h3>
                <p className="text-xs text-ink/70 font-sans mt-2 line-clamp-3 leading-snug">
                  {d.summary}
                </p>

                {/* Telemetry info */}
                <div className="mt-4 pt-3 hairline-t border-ink/20 mono-label text-[9px] opacity-60 flex justify-between">
                  <span>{d.telemetry?.coordinates || "34.0837°N"}</span>
                  <span>{d.readTimeMinutes} MIN READ</span>
                  <span>{d.viewsCount} VIEWS</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 hairline-t border-ink/40 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleToggleStatus(d)}
                  className="mono-label text-[10px] hover:text-signal transition-colors cursor-pointer"
                >
                  {d.status === "PUBLISHED" ? "UNPUBLISH" : "PUBLISH"}
                </button>

                <button
                  onClick={() => handleArchive(d)}
                  className="mono-label text-[10px] hover:text-signal transition-colors cursor-pointer"
                >
                  {d.status === "ARCHIVED" ? "RESTORE" : "ARCHIVE"}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`/dispatches/${d.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 hairline border-ink hover:bg-ink hover:text-bone transition-colors"
                    title="View Article"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => handleOpenEdit(d)}
                    className="p-1.5 hairline border-ink hover:bg-ink hover:text-bone transition-colors cursor-pointer"
                    title="Edit Dispatch"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(d._id, d.title)}
                    className="p-1.5 hairline border-ink text-signal hover:bg-signal hover:text-bone transition-colors cursor-pointer"
                    title="Delete Dispatch"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
