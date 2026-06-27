import { Activity, Compass, Flame, Moon, Sunrise } from "lucide-react";

export type Role = "LEAD" | "TAIL" | "MEDIC" | "NAV" | "SIGNALS" | "MECH" | "MEDIA";
export type Rig = "BIKE" | "CAR" | "TRUCK";

export type Operator = {
  id: string;
  name: string;
  callsign: string;
  role: Role;
  rig: Rig;
  vehicle: string;
  plate: string;
  ice: { name: string; phone: string };
  pickup: string;
  img?: string;
};

export const ROSTER: Operator[] = [
  {
    id: "OP-001",
    name: "Aqib Wani",
    callsign: "ALPHA",
    role: "LEAD",
    rig: "CAR",
    vehicle: "Mahindra Thar",
    plate: "JK01 · 4421",
    ice: { name: "S. Wani", phone: "+91 99XX 11" },
    pickup: "Lal Chowk",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    id: "OP-002",
    name: "Sahil Ahmad",
    callsign: "BRAVO",
    role: "NAV",
    rig: "CAR",
    vehicle: "Maruti Gypsy",
    plate: "JK01 · 7782",
    ice: { name: "F. Ahmad", phone: "+91 99XX 22" },
    pickup: "Hyderpora",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    id: "OP-003",
    name: "Farqan Bhat",
    callsign: "CHARLIE",
    role: "TAIL",
    rig: "BIKE",
    vehicle: "RE Himalayan",
    plate: "JK02 · 0091",
    ice: { name: "R. Bhat", phone: "+91 99XX 33" },
    pickup: "Pampore",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
  {
    id: "OP-004",
    name: "Smeer Lone",
    callsign: "DELTA",
    role: "MEDIA",
    rig: "BIKE",
    vehicle: "KTM 390 ADV",
    plate: "JK01 · 5520",
    ice: { name: "I. Lone", phone: "+91 99XX 44" },
    pickup: "Hyderpora",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
  },
  {
    id: "OP-005",
    name: "Hanan Mir",
    callsign: "ECHO",
    role: "SIGNALS",
    rig: "CAR",
    vehicle: "Suzuki Jimny",
    plate: "JK01 · 3310",
    ice: { name: "A. Mir", phone: "+91 99XX 55" },
    pickup: "Lal Chowk",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: "OP-006",
    name: "Zain Qadri",
    callsign: "FOXTROT",
    role: "MEDIC",
    rig: "TRUCK",
    vehicle: "Tata Xenon",
    plate: "JK03 · 9001",
    ice: { name: "Dr. Qadri", phone: "+91 99XX 66" },
    pickup: "Awantipora",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  },
];

export const WAYPOINTS = [
  { code: "WP-00", name: "Lal Chowk", time: "04:30", km: 0, kind: "RALLY" },
  { code: "WP-01", name: "Hyderpora Crossing", time: "04:55", km: 8, kind: "PICKUP" },
  { code: "WP-02", name: "Pampore Saffron Fields", time: "05:20", km: 18, kind: "PICKUP" },
  { code: "WP-03", name: "Awantipora", time: "05:55", km: 32, kind: "PICKUP" },
  { code: "WP-04", name: "Anantnag · Fuel Stop", time: "06:40", km: 55, kind: "FUEL" },
  { code: "WP-05", name: "Pahalgam · Chai", time: "07:50", km: 95, kind: "BREAK" },
  { code: "WP-06", name: "Chandanwari Trailhead", time: "09:15", km: 112, kind: "OBJ" },
];

export const FOOD_DUTIES = [
  { item: "Water · 24L", who: "BRAVO", crit: true },
  { item: "Kahwa thermos ×3", who: "ECHO", crit: false },
  { item: "Wazwan packs", who: "FOXTROT", crit: true },
  { item: "Trail snacks", who: "DELTA", crit: false },
  { item: "Roti + Achaar", who: "ALPHA", crit: false },
  { item: "Fruit + Glucose", who: "CHARLIE", crit: true },
];

export const GEAR_PERSONAL = [
  "Helmet + Gloves",
  "Layered jacket",
  "Boots + dry socks",
  "Headlamp",
  "Hydration 2L",
  "ID + Cash",
];

export const GEAR_CONVOY = [
  "First Aid Kit ×2",
  "Tow strap 4T",
  "Jumper cables",
  "Tire repair kit",
  "Satellite beacon",
  "Tarp + Paracord",
];

export const PRAYERS = [
  { code: "FAJR", time: "04:38", icon: Sunrise, wp: "WP-00", status: "PRE-DEP" },
  { code: "ZUHR", time: "12:34", icon: Activity, wp: "WP-06", status: "AT OBJ" },
  { code: "ASR", time: "15:48", icon: Compass, wp: "WP-06", status: "AT OBJ" },
  { code: "MAGHRIB", time: "18:42", icon: Flame, wp: "WP-05", status: "RETURN" },
  { code: "ISHA", time: "20:05", icon: Moon, wp: "WP-00", status: "POST-OP" },
];

export const ROLE_RANK: Record<Role, number> = {
  LEAD: 0,
  NAV: 1,
  TAIL: 2,
  MEDIC: 3,
  SIGNALS: 4,
  MECH: 5,
  MEDIA: 6,
};
