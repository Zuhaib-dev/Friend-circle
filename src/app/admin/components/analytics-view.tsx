"use client";
import { Panel } from "./shared";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

// Mock Data
const FINANCIAL_DATA = [
  { month: "JAN", inflow: 45000, outflow: 32000 },
  { month: "FEB", inflow: 52000, outflow: 38000 },
  { month: "MAR", inflow: 48000, outflow: 41000 },
  { month: "APR", inflow: 61000, outflow: 45000 },
  { month: "MAY", inflow: 59000, outflow: 52000 },
  { month: "JUN", inflow: 75000, outflow: 48000 },
];

const ENGAGEMENT_DATA = [
  { tour: "T1", label: "LIDDER", attendance: 85, capacity: 100 },
  { tour: "T2", label: "GULMARG", attendance: 92, capacity: 100 },
  { tour: "T3", label: "PAHALGAM", attendance: 100, capacity: 100 },
  { tour: "T4", label: "SONAMARG", attendance: 78, capacity: 100 },
];

const HEALTH_CHECKS = [
  { id: "OP-7714", callsign: "GHOST", issue: "MISSING DUES - INR 5000", critical: true },
  { id: "OP-7716", callsign: "ECHO-9", issue: "MEDICAL KIT UNVERIFIED", critical: false },
  { id: "OP-7718", callsign: "NOMAD", issue: "NO EMERGENCY CONTACT", critical: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bone hairline border-ink p-3 mono-label shadow-lg">
        <div className="opacity-70 mb-2 pb-1 hairline-b border-ink/20">{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex justify-between gap-6 py-0.5">
            <span style={{ color: p.color }}>{p.name.toUpperCase()}</span>
            <span className="tabular-nums">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsView() {
  const signalColor = "oklch(0.62 0.24 28)";
  const inkColor = "oklch(0.2 0.02 250)";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel code="TLM / 01" title="FINANCIAL HEALTH" right={<span className="mono-label text-signal">LIVE</span>}>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCIAL_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={signalColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={signalColor} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={inkColor} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={inkColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={inkColor} strokeOpacity={0.15} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: inkColor, fontSize: 10, fontFamily: "monospace", opacity: 0.6 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: inkColor, fontSize: 10, fontFamily: "monospace", opacity: 0.6 }}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: inkColor, strokeOpacity: 0.2, strokeWidth: 1 }} />
                <Area 
                  type="monotone" 
                  dataKey="inflow" 
                  name="Inflow"
                  stroke={signalColor} 
                  fillOpacity={1} 
                  fill="url(#colorInflow)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="outflow" 
                  name="Outflow"
                  stroke={inkColor} 
                  fillOpacity={1} 
                  fill="url(#colorOutflow)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel code="TLM / 02" title="TOUR ATTENDANCE" right={<span className="mono-label opacity-50">YTD</span>}>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENGAGEMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke={inkColor} strokeOpacity={0.15} vertical={false} />
                <XAxis 
                  dataKey="tour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: inkColor, fontSize: 10, fontFamily: "monospace", opacity: 0.6 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: inkColor, fontSize: 10, fontFamily: "monospace", opacity: 0.6 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: inkColor, opacity: 0.05 }} />
                <Bar dataKey="capacity" name="Capacity" fill={inkColor} fillOpacity={0.2} radius={[2, 2, 0, 0]} barSize={24} />
                <Bar dataKey="attendance" name="Attendance" fill={signalColor} radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel code="TLM / 03" title="LIVE-OPS HEALTH CHECKS" right={<span className="mono-label text-signal">ACTION REQUIRED</span>}>
        <div className="divide-y divide-ink/10">
          {HEALTH_CHECKS.map((check) => (
            <div key={check.id} className="py-3 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                {check.critical ? (
                  <AlertCircle className="h-4 w-4 text-signal shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                )}
                <div>
                  <div className="mono-label flex items-center gap-2">
                    <span className="opacity-50">{check.id}</span>
                    <span>{check.callsign}</span>
                  </div>
                  <div className={`text-[11px] font-mono mt-0.5 ${check.critical ? "text-signal" : "opacity-70"}`}>
                    {check.issue}
                  </div>
                </div>
              </div>
              <button className="mono-label text-[10px] px-2 py-1 hairline border-ink/30 hover:bg-ink hover:text-bone transition-colors hidden md:block opacity-0 group-hover:opacity-100">
                RESOLVE
              </button>
            </div>
          ))}
          
          <div className="py-3 flex items-center gap-3 opacity-50">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <div className="mono-label">ALL OTHER OPERATORS NOMINAL</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
