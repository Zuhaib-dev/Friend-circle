"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogIn, LogOut, User as UserIcon, Settings, ChevronDown, CircleDot, Menu, X, ShieldCheck, Image as ImageIcon, Radar, Terminal, Video as VideoIcon, Compass, Crosshair } from "lucide-react";
import { useSession, signOut as doSignOut } from "next-auth/react";
import { initialsOf } from "../lib/utils";

function Avatar({ name, src, size = 28 }: { name: string; src?: string; size?: number }) {
  const [err, setErr] = useState(false);
  if (src && !err) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        onError={() => setErr(true)}
        className="object-cover hairline border-ink"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="brick text-bone flex items-center justify-center mono-label hairline border-ink"
      style={{ width: size, height: size, fontSize: Math.max(9, size * 0.36) }}
    >
      {initialsOf(name)}
    </span>
  );
}

function TacticalStrip() {
  const [time, setTime] = useState("");
  const [wx, setWx] = useState<{ temp: number, wind: number, location: string } | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }) + ' UTC');
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }) + ' UTC');
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch('/api/weather').then(r=>r.json()).then(d => { if (!d.error) setWx(d) }).catch(console.error);
  }, []);

  return (
    <div className="bg-ink text-bone hairline-b border-bone/20 px-4 py-1 flex items-center justify-between mono-label text-[9px] overflow-hidden whitespace-nowrap">
       <div className="flex items-center gap-4 shrink-0">
          <span className="text-signal">FC/2026</span>
          <span className="hidden sm:inline">FIELD MANUAL — REV 02.6</span>
          <span>{time}</span>
       </div>
       <div className="flex items-center gap-4 shrink-0 opacity-80 overflow-x-auto no-scrollbar mask-edges">
          <span>34.0837°N · 74.7973°E — {wx?.location || "SRINAGAR / KMR"}</span>
          <span>{wx ? `${wx.wind}KM/H · ${wx.temp}°C` : "--KM/H · --°C"} · QIBLA 282°</span>
          <span className="text-signal flex items-center gap-1.5"><span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink"></span>CHANNEL 7 OPEN</span>
       </div>
    </div>
  )
}

export function TopNav() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const hydrated = status !== "loading";
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const handleLogout = () => {
    doSignOut();
    setOpen(false);
    setMobileOpen(false);
  };

  const navLinks = [
    { href: "/crew", label: "CREW" },
    { href: "/tours", label: "ROUTES" },
    { href: "/gallery", label: "FRAMES" },
    { href: "/surveillance", label: "FEEDS" },
    { href: "/live-ops", label: "LIVE-OPS" },
    { href: "#tazkiyah", label: "TAZKIYAH" },
  ];

  return (
    <div className="hairline-b border-ink bg-bone sticky top-0 z-50">
      <TacticalStrip />
      <div className="flex items-center justify-between px-4 py-2 gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 mono-label text-ink hover:text-signal transition-colors">
          <CircleDot className="h-3.5 w-3.5 text-signal animate-blink" />
          <span className="hidden sm:inline">FRIEND CIRCLE / KMR</span>
          <span className="sm:hidden">FC / KMR</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-label px-3 py-1.5 hover:bg-ink hover:text-bone transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {/* Auth */}
          {!hydrated ? (
            <span className="h-7 w-20 hairline border-ink/30 animate-pulse hidden sm:block" />
          ) : user ? (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 hairline border-ink px-1.5 py-1 hover:bg-ink hover:text-bone transition-colors group"
                aria-haspopup="menu"
                aria-expanded={open}
              >
                <Avatar name={user.name || "Operator"} src={user.image || undefined} size={24} />
                <span className="mono-label hidden sm:inline max-w-[120px] truncate">{user.name?.split(" ")[0] || "Operator"}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-1 w-64 hairline border-ink bg-bone shadow-[4px_4px_0_0_oklch(0.13_0.01_60)] z-50"
                    role="menu"
                  >
                    {/* user card */}
                    <div className="hairline-b border-ink/40 p-3 flex items-center gap-3">
                      <Avatar name={user.name || "Operator"} src={user.image || undefined} size={40} />
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-base text-ink leading-tight truncate">{user.name}</div>
                        <div className="mono-label opacity-60 truncate">{user.email}</div>
                        <div className="mt-1.5"><span className="mono-label text-signal text-[10px] tracking-wider border border-signal/40 px-1.5 py-[2px]">{user.role || 'USER'}</span></div>
                      </div>
                    </div>
                    <div className="px-3 py-2 hairline-b border-ink/30 flex items-center justify-between mono-label">
                      <span className="opacity-60">SESSION</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
                        <span className="text-signal">ACTIVE · SESSION</span>
                      </span>
                    </div>
                    <MenuItem icon={UserIcon} label="PROFILE" code="01" onClick={() => { setOpen(false); navigate.push('/profile'); }} />
                    <MenuItem icon={Compass} label="ROUTES" code="02" onClick={() => { setOpen(false); navigate.push('/tours'); }} />
                    <MenuItem icon={ImageIcon} label="GALLERY" code="03" onClick={() => { setOpen(false); navigate.push('/gallery'); }} />
                    <MenuItem icon={VideoIcon} label="FEEDS" code="04" onClick={() => { setOpen(false); navigate.push('/surveillance'); }} />
                    <MenuItem icon={Crosshair} label="LIVE-OPS" code="05" onClick={() => { setOpen(false); navigate.push('/live-ops'); }} />
                    
                    {(!user.role || user.role === "USER") && (
                      <MenuItem icon={ShieldCheck} label="BECOME TEAM MEMBER" code="05" onClick={() => { setOpen(false); navigate.push('/apply-team'); }} />
                    )}

                    {(user.role === "TEAM_MEMBER" || user.role === "ADMIN") && (
                      <MenuItem icon={Radar} label="DOSSIER" code="06" onClick={() => { setOpen(false); navigate.push('/team'); }} />
                    )}

                    {user.role === "ADMIN" && (
                      <MenuItem icon={Terminal} label="ADMIN COMMAND" code="07" onClick={() => { setOpen(false); navigate.push('/admin'); }} />
                    )}
                    
                    <MenuItem icon={Settings} label="SETTINGS" code="08" onClick={() => { setOpen(false); }} />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 hairline-t border-ink/40 mono-label text-signal hover:bg-signal hover:text-bone transition-colors group"
                      role="menuitem"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="h-3.5 w-3.5" />
                        SIGN OUT
                      </span>
                      <span className="opacity-60 group-hover:opacity-100">EXIT</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 hairline border-ink px-3 py-1.5 mono-label hover:bg-ink hover:text-bone transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                LOGIN
              </Link>
              <Link
                href="/register"
                className="hidden sm:flex items-center gap-1.5 brick px-3 py-1.5 mono-label text-bone hover:bg-signal hover:border-signal transition-colors"
              >
                ENLIST
              </Link>
            </>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden hairline border-ink p-1.5 hover:bg-ink hover:text-bone transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden hairline-t border-ink overflow-hidden bg-bone"
          >
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="hairline-b border-ink/20 px-4 py-3 mono-label hover:bg-ink hover:text-bone transition-colors flex items-center justify-between"
                >
                  <span>{l.label}</span>
                  <span className="opacity-40">→</span>
                </a>
              ))}
              {!user && hydrated && (
                <div className="p-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="hairline border-ink px-3 py-2.5 mono-label text-center hover:bg-ink hover:text-bone transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="h-3.5 w-3.5" /> LOGIN
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="brick px-3 py-2.5 mono-label text-bone text-center hover:bg-signal hover:border-signal transition-colors"
                  >
                    ENLIST
                  </Link>
                </div>
              )}
              <div className="p-4 hairline-t border-ink/20 mono-label text-[9px] opacity-60 space-y-1 bg-ink text-bone">
                <div className="text-signal">34.0837°N · 74.7973°E — SRINAGAR / KMR</div>
                <div>14KT NW · 4°C · QIBLA 282°</div>
                <div className="flex items-center gap-1.5 mt-2 pt-2 hairline-t border-bone/20">
                  <span className="h-1.5 w-1.5 bg-signal rounded-full animate-blink"></span>CHANNEL 7 OPEN
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  code,
  onClick,
}: {
  icon: typeof UserIcon;
  label: string;
  code: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 hairline-b border-ink/20 mono-label hover:bg-ink hover:text-bone transition-colors group"
      role="menuitem"
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-signal group-hover:text-bone" />
        {label}
      </span>
      <span className="opacity-40 group-hover:opacity-100">{code}</span>
    </button>
  );
}
