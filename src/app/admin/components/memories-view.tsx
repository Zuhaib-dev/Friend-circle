"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Plus, Terminal, Activity, X, Info, Trash2, Edit2, UploadCloud, Save, Image as ImageIcon } from "lucide-react";
import { Panel, Crosshairs, fmtAgo } from "./shared";
import { uploadCompressedImageToImageKit } from "@/lib/image-upload";
import { ITripMemory } from "@/models/TripMemory";

export function MemoriesView() {
  const [memories, setMemories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Builder state
  const [form, setForm] = useState<Partial<ITripMemory>>({
    title: "", code: "", date: "", distance: "", weather: "", status: "SECURE",
    coordinates: "", elevation: "", bannerImage: "", description: "", story: "", bestMoment: "",
    crew: [], quotes: [], media: [], logistics: [], waypoints: []
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetch("/api/admin/memories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMemories(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PATCH" : "POST";
      const payload = editingId ? { id: editingId, ...form } : form;
      
      const res = await fetch("/api/admin/memories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        const saved = await res.json();
        if (editingId) {
          setMemories(memories.map(m => m._id === editingId ? saved : m));
        } else {
          setMemories([saved, ...memories]);
        }
        setShowForm(false);
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (mem: any) => {
    setForm({ ...mem });
    setEditingId(mem._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm deletion of this memory archive?")) return;
    try {
      await fetch(`/api/admin/memories?id=${id}`, { method: "DELETE" });
      setMemories((l) => l.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const upload = await uploadCompressedImageToImageKit(file, "gallery");
      if (field === "bannerImage") {
        setForm(prev => ({ ...prev, bannerImage: upload.url }));
      } else if (field === "media" && typeof index === "number") {
        const newMedia = [...(form.media || [])];
        newMedia[index].url = upload.url;
        setForm(prev => ({ ...prev, media: newMedia }));
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6">
      <Panel code="AAR-00" title="TRIP MEMORY ARCHIVES" right={<Activity className="h-4 w-4 opacity-50" />}>
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-sm opacity-70">
            &gt; {memories.length} RECORDS IN DATABASE
          </div>
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingId(null);
              } else {
                setForm({
                  title: "", code: "AAR-", date: "", distance: "", weather: "", status: "SECURE",
                  coordinates: "", elevation: "", bannerImage: "", description: "", story: "", bestMoment: "",
                  crew: [], quotes: [], media: [], logistics: [], waypoints: []
                });
                setShowForm(true);
              }
            }}
            className="hairline border-ink bg-ink text-bone px-3 py-1.5 mono-label flex items-center gap-2 hover:bg-transparent hover:text-ink transition-colors"
          >
            {showForm ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {showForm ? "ABORT" : "DRAFT NEW"}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSave}
              className="mb-8 p-4 hairline border-ink bg-ink/5 space-y-6 overflow-hidden crosshair"
            >
              <Crosshairs />
              <div className="mono-label text-signal flex items-center gap-2 border-b border-ink/20 pb-2">
                <Terminal className="h-3.5 w-3.5" /> {editingId ? "MODIFY RECORD" : "INITIALIZE RECORD"}
              </div>

              {/* CORE INFO */}
              <div className="space-y-4">
                <h3 className="mono-label opacity-70 bg-ink/10 px-2 py-1">CORE INTEL</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="TITLE (e.g. PAHALGAM RALLY)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" required />
                  <input placeholder="CODE (e.g. AAR-014)" value={form.code} onChange={e => setForm({...form, code: e.target.value})} className="input-field" required />
                  <input placeholder="DATE (e.g. 14 JUN 2026)" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input-field" required />
                  <input placeholder="DISTANCE (e.g. 412 KM)" value={form.distance} onChange={e => setForm({...form, distance: e.target.value})} className="input-field" required />
                  <input placeholder="WEATHER (e.g. 8°C · DRIZZLE)" value={form.weather} onChange={e => setForm({...form, weather: e.target.value})} className="input-field" required />
                  <input placeholder="COORDINATES" value={form.coordinates} onChange={e => setForm({...form, coordinates: e.target.value})} className="input-field" required />
                  <input placeholder="ELEVATION (e.g. 2,740M)" value={form.elevation} onChange={e => setForm({...form, elevation: e.target.value})} className="input-field" required />
                  
                  <div className="space-y-1">
                    <label className="mono-label opacity-70 text-[10px]">BANNER IMAGE</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="URL" value={form.bannerImage} onChange={e => setForm({...form, bannerImage: e.target.value})} className="input-field flex-1" />
                      <label className="cursor-pointer brick px-3 py-1 flex items-center justify-center bg-signal text-bone hover:bg-ink">
                        {uploadingImage ? <Loader2 className="animate-spin h-4 w-4" /> : <UploadCloud className="h-4 w-4" />}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "bannerImage")} disabled={uploadingImage} />
                      </label>
                    </div>
                  </div>
                </div>

                <textarea placeholder="DESCRIPTION SUMMARY" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field min-h-[60px]" required />
                <textarea placeholder="STORY OF THE DAY (Full text)" value={form.story} onChange={e => setForm({...form, story: e.target.value})} className="input-field min-h-[120px]" required />
                <textarea placeholder="BEST MOMENT" value={form.bestMoment} onChange={e => setForm({...form, bestMoment: e.target.value})} className="input-field min-h-[60px]" required />
              </div>

              {/* CREW */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-ink/10 px-2 py-1">
                  <h3 className="mono-label opacity-70">CREW MANIFEST</h3>
                  <button type="button" onClick={() => setForm({...form, crew: [...(form.crew || []), { callsign: "", name: "", rig: "" }]})} className="text-signal hover:underline text-xs">+ ADD</button>
                </div>
                {form.crew?.map((c, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input placeholder="CALLSIGN" value={c.callsign} onChange={e => { const nc = [...(form.crew||[])]; nc[i].callsign = e.target.value; setForm({...form, crew: nc}) }} className="input-field w-1/3" />
                    <input placeholder="NAME" value={c.name} onChange={e => { const nc = [...(form.crew||[])]; nc[i].name = e.target.value; setForm({...form, crew: nc}) }} className="input-field w-1/3" />
                    <input placeholder="RIG" value={c.rig} onChange={e => { const nc = [...(form.crew||[])]; nc[i].rig = e.target.value; setForm({...form, crew: nc}) }} className="input-field w-1/3" />
                    <button type="button" onClick={() => setForm({...form, crew: form.crew?.filter((_, idx) => idx !== i)})} className="p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>

              {/* QUOTES */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-ink/10 px-2 py-1">
                  <h3 className="mono-label opacity-70">INTERCEPTED COMMS</h3>
                  <button type="button" onClick={() => setForm({...form, quotes: [...(form.quotes || []), { time: "", callsign: "", message: "" }]})} className="text-signal hover:underline text-xs">+ ADD</button>
                </div>
                {form.quotes?.map((q, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input placeholder="TIME (UTC)" value={q.time} onChange={e => { const nq = [...(form.quotes||[])]; nq[i].time = e.target.value; setForm({...form, quotes: nq}) }} className="input-field w-1/4" />
                    <input placeholder="CALLSIGN" value={q.callsign} onChange={e => { const nq = [...(form.quotes||[])]; nq[i].callsign = e.target.value; setForm({...form, quotes: nq}) }} className="input-field w-1/4" />
                    <input placeholder="MESSAGE" value={q.message} onChange={e => { const nq = [...(form.quotes||[])]; nq[i].message = e.target.value; setForm({...form, quotes: nq}) }} className="input-field flex-1" />
                    <button type="button" onClick={() => setForm({...form, quotes: form.quotes?.filter((_, idx) => idx !== i)})} className="p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>

              {/* WAYPOINTS */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-ink/10 px-2 py-1">
                  <h3 className="mono-label opacity-70">ROUTE WAYPOINTS</h3>
                  <button type="button" onClick={() => setForm({...form, waypoints: [...(form.waypoints || []), { id: `WP-${String((form.waypoints?.length||0)+1).padStart(2,'0')}`, name: "", time: "", km: 0, elev: 0 }]})} className="text-signal hover:underline text-xs">+ ADD</button>
                </div>
                {form.waypoints?.map((w, i) => (
                  <div key={i} className="flex gap-2 items-center flex-wrap">
                    <input placeholder="ID" value={w.id} onChange={e => { const nw = [...(form.waypoints||[])]; nw[i].id = e.target.value; setForm({...form, waypoints: nw}) }} className="input-field w-20" />
                    <input placeholder="NAME" value={w.name} onChange={e => { const nw = [...(form.waypoints||[])]; nw[i].name = e.target.value; setForm({...form, waypoints: nw}) }} className="input-field w-40" />
                    <input placeholder="TIME" value={w.time} onChange={e => { const nw = [...(form.waypoints||[])]; nw[i].time = e.target.value; setForm({...form, waypoints: nw}) }} className="input-field w-24" />
                    <input type="number" placeholder="KM" value={w.km} onChange={e => { const nw = [...(form.waypoints||[])]; nw[i].km = Number(e.target.value); setForm({...form, waypoints: nw}) }} className="input-field w-20" />
                    <input type="number" placeholder="ELEV" value={w.elev} onChange={e => { const nw = [...(form.waypoints||[])]; nw[i].elev = Number(e.target.value); setForm({...form, waypoints: nw}) }} className="input-field w-24" />
                    <button type="button" onClick={() => setForm({...form, waypoints: form.waypoints?.filter((_, idx) => idx !== i)})} className="p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>

              {/* MEDIA */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-ink/10 px-2 py-1">
                  <h3 className="mono-label opacity-70">MEDIA EVIDENCE</h3>
                  <button type="button" onClick={() => setForm({...form, media: [...(form.media || []), { url: "", featured: false }]})} className="text-signal hover:underline text-xs">+ ADD</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {form.media?.map((m, i) => (
                    <div key={i} className="hairline border-ink p-2 relative group flex flex-col gap-2">
                      <div className="aspect-square bg-ink/10 relative overflow-hidden">
                        {m.url ? <img src={m.url} className="object-cover w-full h-full" /> : <div className="absolute inset-0 flex items-center justify-center opacity-30"><ImageIcon className="h-6 w-6"/></div>}
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer text-white">
                          <UploadCloud className="h-6 w-6" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "media", i)} />
                        </label>
                      </div>
                      <input placeholder="URL" value={m.url} onChange={e => { const nm = [...(form.media||[])]; nm[i].url = e.target.value; setForm({...form, media: nm}) }} className="input-field text-xs p-1" />
                      <label className="flex items-center gap-2 text-xs mono-label">
                        <input type="checkbox" checked={m.featured} onChange={e => { const nm = [...(form.media||[])]; nm[i].featured = e.target.checked; setForm({...form, media: nm}) }} /> FEATURED
                      </label>
                      <button type="button" onClick={() => setForm({...form, media: form.media?.filter((_, idx) => idx !== i)})} className="absolute top-1 right-1 bg-red-500 text-white p-1"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOGISTICS */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-ink/10 px-2 py-1">
                  <h3 className="mono-label opacity-70">LOGISTICS (8 Max recommended)</h3>
                  <button type="button" onClick={() => setForm({...form, logistics: [...(form.logistics || []), { label: "", value: "", code: "" }]})} className="text-signal hover:underline text-xs">+ ADD</button>
                </div>
                {form.logistics?.map((l, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input placeholder="LABEL (e.g. TOTAL EXPENSE)" value={l.label} onChange={e => { const nl = [...(form.logistics||[])]; nl[i].label = e.target.value; setForm({...form, logistics: nl}) }} className="input-field w-1/3" />
                    <input placeholder="VALUE" value={l.value} onChange={e => { const nl = [...(form.logistics||[])]; nl[i].value = e.target.value; setForm({...form, logistics: nl}) }} className="input-field w-1/3" />
                    <input placeholder="CODE" value={l.code} onChange={e => { const nl = [...(form.logistics||[])]; nl[i].code = e.target.value; setForm({...form, logistics: nl}) }} className="input-field w-1/4" />
                    <button type="button" onClick={() => setForm({...form, logistics: form.logistics?.filter((_, idx) => idx !== i)})} className="p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="w-full hairline border-ink bg-signal text-bone py-3 mono-label flex items-center justify-center gap-2 hover:bg-ink transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" /> {editingId ? "COMMIT CHANGES" : "PUBLISH MEMORY"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memories.map((mem) => (
              <div key={mem._id} className="hairline border-ink bg-bone p-3 flex flex-col gap-3 group">
                <div className="aspect-3/1 bg-ink/10 relative overflow-hidden hairline border-ink/30">
                  {mem.bannerImage && <img src={mem.bannerImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />}
                  <div className="absolute top-2 left-2 brick px-1.5 py-0.5 text-bone mono-label text-[10px]">{mem.code}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg leading-tight">{mem.title}</div>
                  <div className="mono-label opacity-50">{new Date(mem.date).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(mem)} className="flex-1 hairline border-ink py-1 text-xs mono-label hover:bg-ink hover:text-bone text-center">EDIT</button>
                  <button onClick={() => handleDelete(mem._id)} className="flex-1 hairline border-ink py-1 text-xs mono-label text-red-500 hover:bg-red-500 hover:text-white text-center">DELETE</button>
                </div>
              </div>
            ))}
            {memories.length === 0 && (
              <div className="col-span-2 py-10 text-center mono-label opacity-50">NO MEMORIES ARCHIVED</div>
            )}
          </div>
        )}
      </Panel>
      <style dangerouslySetInnerHTML={{__html: `
        .input-field {
          background-color: transparent;
          border: 1px solid rgba(0,0,0,0.2);
          padding: 8px 12px;
          font-family: var(--font-mono);
          font-size: 12px;
          outline: none;
        }
        .input-field:focus {
          border-color: var(--signal);
        }
      `}} />
    </div>
  );
}
