export const CREW = [
  { code: "01", name: "Aqib", role: "The Motorhead", tag: "RECON / LEAD", bio: "Bike grease for blood. Picks the line nobody else sees.", coord: "34.0837°N", color: "signal" },
  { code: "02", name: "Sahil", role: "The Chef", tag: "WAZWAN / SUPPLY", bio: "Builds fires with intent. Cooks like a Mughal court is watching.", coord: "33.9716°N" },
  { code: "03", name: "Furqan", role: "The Comedian", tag: "MORALE / OPS", bio: "Roast engine. Will derail any silence within 4 seconds.", coord: "34.1700°N" },
  { code: "04", name: "Sameem", role: "The Archivist", tag: "OPTICS / DOC", bio: "Camera locked to face. Every memory exists because of him.", coord: "33.8716°N" },
  { code: "05", name: "Naveed", role: "The Navigator", tag: "ROUTE / MAP", bio: "Reads weather, river, road. Knows shortcuts that aren't on Google.", coord: "34.0151°N" },
  { code: "06", name: "Farhan", role: "The Angler", tag: "RIVERCRAFT", bio: "Patient like a stone. Catches trout where others catch a cold.", coord: "33.7212°N" },
];

export const TOURS = [
  { code: "T-01", name: "Haijen Ridge", region: "Budgam", km: 47, hours: 9, diff: "HARD", img: "/adv-offroad.jpg", note: "Featured. Offroad spine of the season." },
  { code: "T-02", name: "Diskhal Meadows", region: "Pir Panjal", km: 28, hours: 6, diff: "MED", img: "/adv-forest.jpg", note: "Pine corridor → alpine bowl." },
  { code: "T-03", name: "Tatakoti Base", region: "Tangmarg", km: 62, hours: 14, diff: "HARD", img: "/adv-camp.jpg", note: "Camp under the granite tooth." },
  { code: "T-04", name: "Doodhpathri Loop", region: "Budgam", km: 19, hours: 4, diff: "EASY", img: "/adv-budgam.jpg", note: "Meadow run, golden hour locked." },
  { code: "T-05", name: "Lidder Trout", region: "Pahalgam", km: 12, hours: 5, diff: "EASY", img: "/adv-fishing.jpg", note: "River day. Fly rods only." },
  { code: "T-06", name: "Dal Perimeter", region: "Srinagar", km: 14, hours: 3, diff: "EASY", img: "/adv-srinagar.jpg", note: "Civilization run. Kahwa stops mandatory." },
];

export const STATS = [
  { label: "YEARS IN FIELD", value: "08", sub: "2018 → 2026" },
  { label: "ACTIVE UNITS", value: "19", sub: "CORE / 06" },
  { label: "TOURS LOGGED", value: "142", sub: "ROUTES / 37" },
  { label: "WAZWAN NIGHTS", value: "63", sub: "FIRES / LIT" },
];

export const TICKER = [
  "OFFROAD", "FISHING", "WAZWAN", "PIR PANJAL", "FAJR @ 4:38", "TROUT RUN",
  "CHADOORA RECON", "QIBLA 282°", "TASBIH x33", "BUDGAM LOOP", "ROAST PROTOCOL",
];

export const TIMELINE = [
  { y: "2018", t: "ZERO HOUR", d: "Six kids, one cricket bat, one bike. The bench in Chadoora becomes HQ." },
  { y: "2020", t: "QUARANTINE LEDGER", d: "Group chat goes feral. Memes archived. Plans drawn on notebook margins." },
  { y: "2021", t: "FIRST OFFROAD", d: "Haijen recon. Two punctures, zero regrets." },
  { y: "2022", t: "WAZWAN DOCTRINE", d: "Sahil cooks for 14. Becomes law: no trip without rista." },
  { y: "2024", t: "OPTICS UNIT", d: "Sameem buys the camera. Every memory becomes a frame." },
  { y: "2026", t: "v2.0 LAUNCH", d: "This manual. The digital campfire goes online." },
];

export const FAQ = [
  { q: "Is this a tour company?", a: "No. It's a friend circle that documents itself. We don't sell trips — we publish field notes." },
  { q: "How do I join the crew?", a: "You don't apply. You show up. Bring chai, don't complain about the cold, survive one Wazwan night." },
  { q: "Why the terminal look?", a: "Because brochure websites lie. Field manuals don't." },
  { q: "What does Tazkiyah mean?", a: "Inner cleansing. The corner that reminds us no ridge is bigger than the next prayer." },
];

export const VOICES = [
  { who: "FURQAN", q: "We don't have a Wi-Fi password. If you're here, you're already in." },
  { who: "SAMEEM", q: "Every photo I took, somebody was laughing. That's the whole archive." },
  { who: "AQIB", q: "The bike is just an excuse. The real route is the people." },
];

export const TRANSMISSIONS = [
  { t: "04:12", from: "AQIB", msg: "Ridge clear. Fuel at 3/4. Sending Sahil ahead." },
  { t: "04:38", from: "SAHIL", msg: "Wazwan packed. Rogan josh holding temperature." },
  { t: "05:01", from: "FURQAN", msg: "Cracked a joke. Naveed laughed. Historic." },
  { t: "05:44", from: "SAMEEM", msg: "Light is unreal. Shooting 4K, 120fps." },
  { t: "06:10", from: "NAVEED", msg: "Shortcut found. Saves 18 min. Trust me." },
  { t: "06:33", from: "FARHAN", msg: "Three trout. River is generous today." },
];

export const LOADOUT = [
  { code: "GR-01", name: "JERRY CAN", spec: "20L · DIESEL", weight: 18.4, status: "PACKED", owner: "AQIB" },
  { code: "GR-02", name: "STORM LANTERN", spec: "KEROSENE · 14h", weight: 1.2, status: "PACKED", owner: "FURQAN" },
  { code: "GR-03", name: "SAMOVAR", spec: "COPPER · 2.5L", weight: 2.8, status: "PACKED", owner: "SAHIL" },
  { code: "GR-04", name: "BOWIE KNIFE", spec: "CARBON · 9in", weight: 0.4, status: "PACKED", owner: "NAVEED" },
  { code: "GR-05", name: "BRASS COMPASS", spec: "LIQUID · ±2°", weight: 0.2, status: "PACKED", owner: "SAMEEM" },
  { code: "GR-06", name: "FIELD CASSETTE", spec: "C90 · QAWWALI", weight: 0.1, status: "PLAYING", owner: "FARHAN" },
] as const;

export const FRAMES: {
  src: string;
  cap: string;
  code: string;
  meta: string;
  size: "hero" | "wide" | "tall" | "std";
}[] = [
  { src: "/adv-offroad.jpg", cap: "HAIJEN RECON — SECOND PUNCTURE", code: "FR-0412", meta: "47 KM · F/5.6 · 1/800 · ISO 400", size: "hero" },
  { src: "/adv-ridge.jpg", cap: "PIR PANJAL RIDGE — FIRST LIGHT", code: "FR-0501", meta: "ELEV 2,840 M · F/8 · 1/125 · ISO 100", size: "wide" },
  { src: "/adv-camp.jpg", cap: "WAZWAN NIGHT — TATAKOTI BASE", code: "FR-1101", meta: "TEMP -2°C · F/2.8 · 1/60 · ISO 3200", size: "tall" },
  { src: "/adv-budgam.jpg", cap: "DOODHPATHRI MEADOW — GOLDEN HOUR", code: "FR-0987", meta: "F/4 · 1/500 · ISO 200", size: "std" },
  { src: "/adv-fishing.jpg", cap: "LIDDER TROUT — 18 INCHES", code: "FR-0633", meta: "F/2.8 · 1/1000 · ISO 800", size: "std" },
  { src: "/adv-bike.jpg", cap: "ENFIELD — MUD LINE, CHADOORA", code: "FR-0815", meta: "F/5.6 · 1/250 · ISO 400", size: "wide" },
  { src: "/adv-kahwa.jpg", cap: "KAHWA POUR — 02:14 HRS", code: "FR-1207", meta: "F/1.8 · 1/125 · ISO 1600", size: "tall" },
  { src: "/adv-forest.jpg", cap: "PINE CORRIDOR — DISKHAL", code: "FR-0729", meta: "F/4 · 1/320 · ISO 200", size: "std" },
  { src: "/adv-srinagar.jpg", cap: "DAL PERIMETER — KAHWA BREAK", code: "FR-0220", meta: "F/8 · 1/500 · ISO 100", size: "std" },
  { src: "/adv-hut.jpg", cap: "SHEPHERD HUT — MIST ROLLING IN", code: "FR-0344", meta: "F/5.6 · 1/60 · ISO 800", size: "std" },
];
