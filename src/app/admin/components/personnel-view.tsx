"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, ShieldCheck, Users, Search, Ban } from "lucide-react";
import { Panel, EmptyState } from "./shared";

type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  teamMemberStatus: string;
  isSuspended: boolean;
};

export function PersonnelView() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/users?view=all")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggleSuspend = async (user: UserData) => {
    const action = user.isSuspended ? "UNSUSPEND" : "SUSPEND";
    if (!confirm(`Are you sure you want to ${action.toLowerCase()} ${user.name}?`)) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, action }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, isSuspended: !u.isSuspended } : u))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Panel
      code="CMD / 06"
      title="PERSONNEL ROSTER"
      right={<span className="mono-label text-signal">{users.length} TOTAL ON GRID</span>}
    >
      <div className="px-4 py-3 hairline-b border-ink/40 flex items-center gap-3">
        <Search className="h-4 w-4 opacity-50" />
        <input 
          type="text"
          placeholder="SEARCH BY NAME OR EMAIL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none font-mono text-sm w-full placeholder:opacity-50"
        />
      </div>

      {loading ? (
        <div className="py-12 flex items-center justify-center mono-label text-signal animate-pulse">
          FETCHING ROSTER...
        </div>
      ) : filteredUsers.length === 0 ? (
        <EmptyState icon={Users} label="NO USERS FOUND" hint="Query returned zero results." />
      ) : (
        <div className="space-y-2">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-[1fr_1fr_120px_100px_140px] gap-3 px-3 py-2 hairline-b border-ink/40 mono-label opacity-60 text-xs">
            <span>NAME / ID</span>
            <span>EMAIL</span>
            <span>ROLE</span>
            <span>STATUS</span>
            <span className="text-right">ACTION</span>
          </div>

          <AnimatePresence initial={false}>
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`hairline border-ink/40 group relative overflow-hidden ${user.isSuspended ? 'bg-ink/5' : ''}`}
              >
                <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_120px_100px_140px] gap-3 items-center px-3 py-3">
                  <div className="min-w-0">
                    <div className="font-display text-lg leading-tight truncate">
                      {user.name}
                    </div>
                    <div className="mono-label text-[10px] opacity-50 truncate">ID: {user._id}</div>
                  </div>
                  
                  <span className="mono-label opacity-80 truncate">{user.email}</span>
                  
                  <span className="mono-label text-xs">
                    {user.role === 'ADMIN' ? (
                      <span className="text-signal">ADMIN</span>
                    ) : user.role === 'TEAM_MEMBER' ? (
                      <span className="text-acid">TEAM_MEMBER</span>
                    ) : (
                      <span className="opacity-70">USER</span>
                    )}
                  </span>

                  <span className="mono-label text-[10px]">
                    {user.isSuspended ? (
                      <span className="inline-flex items-center gap-1 text-red-500 bg-red-500/10 px-1.5 py-0.5 border border-red-500/30">
                        <Ban className="h-3 w-3" /> SUSPENDED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-signal">
                        <ShieldCheck className="h-3 w-3" /> ACTIVE
                      </span>
                    )}
                  </span>

                  <div className="col-span-2 md:col-span-1 flex gap-2 justify-end mt-2 md:mt-0">
                    <button
                      onClick={() => handleToggleSuspend(user)}
                      disabled={user.role === 'ADMIN'}
                      className={`hairline border-ink px-2.5 py-1.5 mono-label transition-colors flex items-center gap-1.5 ${
                        user.role === 'ADMIN' 
                          ? 'opacity-30 cursor-not-allowed' 
                          : user.isSuspended 
                            ? 'bg-signal text-bone hover:bg-ink' 
                            : 'hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      {user.isSuspended ? (
                        <>
                          <ShieldCheck className="h-3 w-3" />
                          REINSTATE
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-3 w-3" />
                          SUSPEND
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Panel>
  );
}
