"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Map, Calendar, Search, MapPin, Loader2, Plus, Terminal, Activity, X, Info, ImageIcon, CheckCircle2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import { Panel, Crosshairs } from "./shared";

type Tour = {
  _id: string;
  name: string;
  place: string;
  date: string;
  description: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  coverImage?: string;
  coordinates?: string;
  distance?: string;
  elevation?: string;
  time?: string;
  partySize?: number;
};

export function ToursView() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    place: "",
    date: "",
    description: "",
    status: "UPCOMING",
    coverImage: "",
    coordinates: "",
    distance: "",
    elevation: "",
    time: "",
    partySize: ""
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetch("/api/admin/tours")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTours(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        const newTour = await res.json();
        setTours([newTour, ...tours]);
        setShowForm(false);
        setFormState({ name: "", place: "", date: "", description: "", status: "UPCOMING", coverImage: "", coordinates: "", distance: "", elevation: "", time: "", partySize: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedBlob = await imageCompression(file, options);
      const compressedFile = new File([compressedBlob], file.name, { type: compressedBlob.type });

      const authRes = await fetch("/api/imagekit/auth");
      if (!authRes.ok) throw new Error("Failed to get auth");
      const auth = await authRes.json();

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

      if (!uploadRes.ok) throw new Error("Upload failed");
      const uploadData = await uploadRes.json();
      
      setFormState((prev) => ({ ...prev, coverImage: uploadData.url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm termination of this tour itinerary?")) return;
    try {
      await fetch(`/api/admin/tours?id=${id}`, { method: "DELETE" });
      setTours((l) => l.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/tours", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setTours((l) => l.map((t) => t._id === id ? { ...t, status: newStatus as any } : t));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <Panel
        code="TRS-01"
        title="DISPATCH CONSOLE"
        right={<Map className="h-4 w-4 opacity-50" />}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-sm opacity-70">
            &gt; {tours.length} ITINERARIES IN REGISTRY
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="hairline border-ink bg-ink text-bone px-3 py-1.5 mono-label flex items-center gap-2 hover:bg-transparent hover:text-ink transition-colors"
          >
            {showForm ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {showForm ? "ABORT DRAFT" : "DRAFT NEW"}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-8 p-4 hairline border-ink bg-ink/5 space-y-4 overflow-hidden crosshair"
            >
              <Crosshairs />
              <div className="mono-label text-signal mb-2 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" /> COMPILE NEW ITINERARY
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="mono-label opacity-70">OPERATION NAME</label>
                  <input
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    placeholder="e.g. Gurez Valley Run"
                  />
                </div>
                <div className="space-y-1">
                  <label className="mono-label opacity-70">GENERAL AREA (PLACE)</label>
                  <input
                    required
                    value={formState.place}
                    onChange={(e) => setFormState({ ...formState, place: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    placeholder="e.g. Sonamarg, Ganderbal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="mono-label opacity-70">EXACT COORDINATES</label>
                  <input
                    value={formState.coordinates}
                    onChange={(e) => setFormState({ ...formState, coordinates: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                    placeholder="e.g. 34.6378° N, 74.8378° E"
                  />
                </div>
                <div className="space-y-1 flex gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">DISTANCE</label>
                    <input
                      value={formState.distance}
                      onChange={(e) => setFormState({ ...formState, distance: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                      placeholder="286 KM"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">ELEVATION</label>
                    <input
                      value={formState.elevation}
                      onChange={(e) => setFormState({ ...formState, elevation: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                      placeholder="3713 M"
                    />
                  </div>
                </div>
                <div className="space-y-1 flex gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">START TIME</label>
                    <input
                      value={formState.time}
                      onChange={(e) => setFormState({ ...formState, time: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                      placeholder="0530 IST"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="mono-label opacity-70">PARTY SIZE</label>
                    <input
                      type="number"
                      value={formState.partySize}
                      onChange={(e) => setFormState({ ...formState, partySize: e.target.value })}
                      className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                      placeholder="6"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="mono-label opacity-70">EXECUTION DATE</label>
                  <input
                    required
                    type="date"
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="mono-label opacity-70">INITIAL STATUS</label>
                  <select
                    value={formState.status}
                    onChange={(e) => setFormState({ ...formState, status: e.target.value as any })}
                    className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal appearance-none rounded-none"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="mono-label opacity-70">MISSION BRIEFING (DESCRIPTION)</label>
                <textarea
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full bg-bone hairline border-ink px-3 py-2 font-mono text-sm focus:outline-none focus:border-signal min-h-[80px]"
                  placeholder="Optional details..."
                />
              </div>

              <div className="space-y-1">
                <label className="mono-label opacity-70">COVER IMAGE (OPTIONAL)</label>
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 hairline border-ink/50 bg-ink/5 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {formState.coverImage ? (
                      <img src={formState.coverImage} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="h-5 w-5 opacity-40" />
                    )}
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-bone/80 flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin text-signal" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="block w-full text-sm font-mono file:mr-4 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-ink file:text-bone hover:file:bg-signal transition-colors file:cursor-pointer disabled:opacity-50"
                    />
                    {formState.coverImage && (
                      <div className="mono-label text-[9px] text-signal mt-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> UPLOADED TO CLOUD</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full hairline border-ink bg-signal text-bone py-2 mono-label flex items-center justify-center gap-2 hover:bg-ink transition-colors"
                >
                  <Activity className="h-3 w-3" /> LAUNCH ITINERARY
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-signal animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {tours.map((tour) => (
              <div key={tour._id} className="hairline border-ink p-3 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:bg-ink/5 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-12 w-12 shrink-0 hairline border-ink/40 bg-ink/10 overflow-hidden flex items-center justify-center">
                    {tour.coverImage ? (
                      <img src={tour.coverImage} className="h-full w-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                    ) : (
                      <ImageIcon className="h-4 w-4 opacity-30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${tour.status === 'UPCOMING' ? 'bg-signal animate-blink' : tour.status === 'COMPLETED' ? 'bg-ink opacity-40' : 'bg-red-500'}`} />
                      <span className="font-display text-xl truncate">{tour.name}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] opacity-70 mt-2">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {tour.place} {tour.coordinates ? `(${tour.coordinates})` : ''}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(tour.date).toLocaleDateString()} {tour.time}</span>
                    </div>
                    {(tour.distance || tour.elevation || tour.partySize) && (
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] opacity-50 mt-1">
                        {tour.distance && <span>DIST: {tour.distance}</span>}
                        {tour.elevation && <span>ELEV: {tour.elevation}</span>}
                        {tour.partySize && <span>PARTY: {tour.partySize}</span>}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
                  <select
                    value={tour.status}
                    onChange={(e) => updateStatus(tour._id, e.target.value)}
                    className="bg-transparent hairline border-ink px-2 py-1 font-mono text-[10px] uppercase appearance-none"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                  <button
                    onClick={() => handleDelete(tour._id)}
                    className="hairline border-ink px-2 py-1 mono-label hover:bg-red-500 hover:text-white transition-colors"
                  >
                    PURGE
                  </button>
                </div>
              </div>
            ))}
            
            {tours.length === 0 && (
              <div className="py-10 text-center mono-label opacity-50 flex flex-col items-center gap-2">
                <Info className="h-5 w-5" />
                NO ITINERARIES IN DATABASE
              </div>
            )}
          </div>
        )}
      </Panel>
    </div>
  );
}
