"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { TopNav } from "@/components/top-nav";
import { BottomNav } from "@/components/bottom-nav";
import { Crosshairs } from "@/components/crosshairs";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Camera, Heart, MessageCircle, MoreHorizontal, FileUp, X, Check, Loader2, Trash2, ExternalLink } from "lucide-react";
import { uploadCompressedImageToImageKit } from "@/lib/image-upload";
import { initialsOf } from "@/lib/utils";

export function PublicProfileClient({ 
  id, 
  initialProfile, 
  initialStats, 
  initialPosts, 
  initialIsFollowing, 
  user 
}: { 
  id: string, 
  initialProfile: any, 
  initialStats: any, 
  initialPosts: any[], 
  initialIsFollowing: boolean, 
  user: any 
}) {

  const router = useRouter();

  const [profile, setProfile] = useState<any>(initialProfile);
  const [stats, setStats] = useState(initialStats);
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  // Modals
  const [activePost, setActivePost] = useState<any>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState<"followers" | "following" | null>(null);

  const isMe = user && (user as any).id === id;



  const handleFollowToggle = async () => {
    if (!user) {
      router.push(`/login?callbackUrl=/crew/${id}`);
      return;
    }
    const method = isFollowing ? "DELETE" : "POST";
    const res = await fetch(`/api/crew/${id}/follow`, { method });
    if (res.ok) {
      setIsFollowing(!isFollowing);
      setStats((s: any) => ({ ...s, followers: s.followers + (isFollowing ? -1 : 1) }));
    }
  };



  if (!profile) {
    return (
      <main className="min-h-screen bg-bone text-ink flex flex-col">
        <TopNav />
        <div className="flex-1 flex items-center justify-center p-6 text-red-500 font-display text-2xl">
          OPERATOR NOT FOUND OR ACCESS DENIED
        </div>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bone text-ink relative pb-20 md:pb-0">
      <TopNav />

      {/* Header Profile Section */}
      <section className="px-4 md:px-8 py-8 md:py-12 hairline-b border-ink max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 hairline border-ink bg-ink">
            {profile.image ? (
              <Image src={profile.image} alt={profile.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-4xl brick text-bone">
                {initialsOf(profile.name)}
              </div>
            )}
            <Crosshairs />
          </div>

          <div className="flex-1 text-center md:text-left flex flex-col gap-3 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tight">{profile.name}</h1>
                <div className="mono-label text-[10px] opacity-60">ID / {profile._id.slice(-6).toUpperCase()} · CLASS / {profile.role}</div>
              </div>

              <div className="flex items-center justify-center md:justify-end gap-2">
                {isMe ? (
                  <>
                    <button onClick={() => setUploadOpen(true)} className="px-4 py-1.5 mono-label bg-ink text-bone hover:bg-signal transition-colors flex items-center gap-2">
                      <Camera className="h-4 w-4" /> UPLOAD
                    </button>
                    <button onClick={() => router.push('/profile')} className="px-4 py-1.5 mono-label hairline border-ink hover:bg-ink hover:text-bone transition-colors">
                      EDIT
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleFollowToggle}
                    className={`px-6 py-1.5 mono-label border transition-colors ${
                      isFollowing 
                        ? 'border-ink text-ink bg-transparent hover:bg-ink hover:text-bone' 
                        : 'border-signal bg-signal text-bone hover:bg-signal/90'
                    }`}
                  >
                    {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-6 mono-label hairline-y border-ink/20 py-2">
              <div className="flex flex-col items-center md:items-start"><span className="text-xl font-display">{stats.posts}</span><span className="opacity-60 text-[10px]">FRAMES</span></div>
              <button type="button" className="flex flex-col items-center md:items-start cursor-pointer hover:text-signal transition-colors text-left bg-transparent border-none p-0" onClick={() => setShowFollowersModal("followers")}><span className="text-xl font-display">{stats.followers}</span><span className="opacity-60 text-[10px]">FOLLOWERS</span></button>
              <button type="button" className="flex flex-col items-center md:items-start cursor-pointer hover:text-signal transition-colors text-left bg-transparent border-none p-0" onClick={() => setShowFollowersModal("following")}><span className="text-xl font-display">{stats.following}</span><span className="opacity-60 text-[10px]">FOLLOWING</span></button>
            </div>

            <div className="text-sm font-mono opacity-80 max-w-xl mx-auto md:mx-0">
              {profile.bio || <span className="italic opacity-50">No dossier summary available.</span>}
              {profile.socialHandle && (
                <div className="mt-4 pt-4 hairline-t border-ink/20">
                  <a
                    href={profile.socialHandle.startsWith('http') ? profile.socialHandle : `https://instagram.com/${profile.socialHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mono-label text-signal hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> {profile.socialHandle}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {posts.map(post => (
            <button type="button" key={post._id} className="aspect-square relative cursor-pointer group bg-ink/5 block w-full p-0 border-0 text-left" onClick={() => setActivePost(post)} aria-label={`View frame: ${post.caption || 'Photo'}`}>
              <Image src={post.imageUrl} alt={post.caption || 'Image'} fill className="object-cover transition-opacity group-hover:opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-ink/30 text-bone mono-label">
                <span className="flex items-center gap-1.5 drop-shadow"><Heart className="h-4 w-4 fill-current" /> {post.likes?.length || 0}</span>
                <span className="flex items-center gap-1.5 drop-shadow"><MessageCircle className="h-4 w-4 fill-current" /></span>
              </div>
            </button>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="text-center py-20 mono-label opacity-40">
            NO FRAMES FOUND IN DOSSIER
          </div>
        )}
      </section>

      <BottomNav onAddClick={() => isMe && setUploadOpen(true)} />

      <AnimatePresence>
        {activePost && (
          <PostModal post={activePost} user={user} isOwner={isMe} onClose={() => setActivePost(null)} onUpdate={(p: any) => setPosts(posts.map(x => x._id === p._id ? p : x))} />
        )}
        {uploadOpen && (
          <UploadModal onClose={() => setUploadOpen(false)} onUploaded={(p: any) => { setPosts([p, ...posts]); setStats((s: any) => ({...s, posts: s.posts + 1})); }} />
        )}
        {showFollowersModal && (
          <FollowersModal id={id} type={showFollowersModal} onClose={() => setShowFollowersModal(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function PostModal({ post, user, isOwner, onClose, onUpdate }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(user && post.likes?.some((l: any) => (l._id || l) === user.id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  useEffect(() => {
    fetch(`/api/posts/${post._id}/comment`).then(r => r.json()).then(setComments).catch(console.error);
  }, [post._id]);

  const handleLike = async () => {
    if (!user) return; // Prompt login ideally
    const method = isLiked ? "DELETE" : "POST";
    setIsLiked(!isLiked);
    setLikesCount((c: number) => c + (isLiked ? -1 : 1));
    await fetch(`/api/posts/${post._id}/like`, { method });
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    const res = await fetch(`/api/posts/${post._id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });
    if (res.ok) {
      const data = await res.json();
      setComments([...comments, data]);
      setNewComment("");
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm("Delete this comment?")) return;
    const res = await fetch(`/api/posts/${post._id}/comment?commentId=${commentId}`, { method: "DELETE" });
    if (res.ok) setComments(comments.filter(c => c._id !== commentId));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 bg-ink/90 flex items-center justify-center p-2 md:p-8" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-bone hairline border-ink max-w-4xl w-full h-[80vh] md:h-150 flex flex-col md:flex-row relative">
        <button onClick={onClose} aria-label="Close post modal" className="absolute right-2 top-2 z-10 p-2 bg-bone/80 hover:bg-signal text-ink hover:text-bone transition-colors md:hidden"><X className="h-5 w-5" /></button>
        <div className="w-full md:w-3/5 bg-ink h-1/2 md:h-full relative flex items-center justify-center">
          <Image src={post.imageUrl} alt="Post" fill className="object-contain" />
        </div>
        <div className="w-full md:w-2/5 flex flex-col h-1/2 md:h-full">
          <div className="p-3 md:p-4 hairline-b border-ink/20 flex items-center gap-3">
             <div className="font-display font-bold">{post.author?.name || 'OPERATOR'}</div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 md:p-4 font-mono text-xs space-y-4">
            {post.caption && (
              <div className="flex gap-2">
                <span className="font-bold shrink-0">{post.author?.name || 'OPERATOR'}</span>
                <span>{post.caption}</span>
              </div>
            )}
            {comments.map(c => (
              <div key={c._id} className="flex gap-2 group">
                <span className="font-bold shrink-0">{c.author.name}</span>
                <span className="flex-1">{c.content}</span>
                {(isOwner || (user && user.id === c.author._id)) && (
                  <button onClick={() => deleteComment(c._id)} aria-label="Delete comment" className="opacity-0 group-hover:opacity-100 text-red-500 shrink-0"><X className="h-3 w-3" /></button>
                )}
              </div>
            ))}
          </div>
          <div className="hairline-t border-ink/20 p-3">
            <div className="flex items-center gap-4 mb-2">
              <button onClick={handleLike} aria-label={isLiked ? "Unlike post" : "Like post"} className={`${isLiked ? 'text-red-500' : 'text-ink'}`}><Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} /></button>
            </div>
            <div className="font-display font-bold text-sm mb-2">{likesCount} LIKES</div>
            {user ? (
              <form onSubmit={submitComment} className="flex items-center gap-2">
                <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add a comment..." aria-label="Add a comment" className="flex-1 bg-transparent text-sm focus:outline-none" />
                <button type="submit" className="mono-label text-signal disabled:opacity-50" disabled={!newComment.trim()}>POST</button>
              </form>
            ) : (
              <div className="mono-label text-[10px] opacity-60">LOGIN REQUIRED TO ENGAGE</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UploadModal({ onClose, onUploaded }: { onClose: () => void, onUploaded: (post: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const upload = await uploadCompressedImageToImageKit(file, "gallery");
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: upload.url, caption, imageKitFileId: upload.fileId }),
      });
      if (res.ok) {
        onUploaded(await res.json());
        onClose();
      } else alert("Upload failed");
    } catch (e) {
      console.error(e);
      alert("Error uploading");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 bg-ink/90 flex items-center justify-center p-4">
      <div className="bg-bone hairline border-ink max-w-lg w-full p-6">
        <h2 className="font-display text-2xl uppercase mb-4">Upload New Intel</h2>
        {!preview ? (
          <label className="border-2 border-dashed border-ink/40 h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-ink/5 hover:border-signal transition-colors mb-4">
             <FileUp className="h-8 w-8 text-signal mb-2" />
             <span className="mono-label">SELECT IMAGE</span>
             <input type="file" accept="image/*" aria-label="Upload post image file" className="hidden" onChange={handleFile} />
          </label>
        ) : (
          <div className="mb-4 relative h-64 bg-ink flex items-center justify-center">
            <Image src={preview} alt="Preview" fill className="object-contain" />
            <button onClick={() => setPreview("")} aria-label="Clear image preview" className="absolute top-2 right-2 p-1.5 bg-bone/80 hover:bg-red-500 hover:text-white"><X className="h-4 w-4" /></button>
          </div>
        )}
        <textarea 
          placeholder="Caption (Optional)..." 
          aria-label="Post caption"
          value={caption} onChange={e => setCaption(e.target.value)} 
          className="w-full hairline border-ink/30 bg-transparent p-3 font-mono text-sm resize-none h-20 mb-4 focus:outline-none focus:border-signal"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={uploading} className="mono-label px-4 py-2 hover:bg-ink hover:text-bone">CANCEL</button>
          <button onClick={handleUpload} disabled={uploading || !file} className="mono-label px-4 py-2 brick text-bone flex items-center gap-2 hover:bg-signal">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} {uploading ? 'UPLOADING...' : 'PUBLISH'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FollowersModal({ id, type, onClose }: { id: string, type: "followers" | "following", onClose: () => void }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/crew/${id}/followers`)
      .then(r => r.json())
      .then(data => {
        setUsers(data[type] || []);
      })
      .finally(() => setLoading(false));
  }, [id, type]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 bg-ink/90 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-bone hairline border-ink max-w-md w-full h-[60vh] flex flex-col">
        <div className="hairline-b border-ink/40 p-4 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-widest">{type}</h2>
          <button onClick={onClose} aria-label="Close followers modal" className="p-1 hover:bg-ink hover:text-bone transition-colors"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center h-full mono-label text-signal animate-pulse">FETCHING...</div>
          ) : users.length === 0 ? (
            <div className="flex items-center justify-center h-full mono-label opacity-40">NO DATA FOUND</div>
          ) : (
            users.map(u => (
              <button type="button" key={u._id} onClick={() => { onClose(); router.push(`/crew/${u._id}`); }} className="w-full text-left flex items-center gap-3 p-2 hairline border-transparent hover:border-ink/20 hover:bg-ink/5 cursor-pointer transition-colors group bg-transparent">
                <div className="w-10 h-10 shrink-0 rounded-none bg-ink/10 relative overflow-hidden flex items-center justify-center text-sm font-display brick text-bone">
                  {u.image ? <Image src={u.image} alt={u.name} fill className="object-cover" /> : initialsOf(u.name)}
                </div>
                <div>
                  <div className="font-mono text-sm leading-tight group-hover:text-signal transition-colors">{u.name}</div>
                  <div className="mono-label text-[10px] opacity-60">{u.role === 'ADMIN' ? 'CMD' : 'OP'}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
