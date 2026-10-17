export type FactionId =
  | "roobet"
  | "stake"
  | "bcgame"
  | "rollbit"
  | "shuffle"
  | "duelbits"
  | "rainbet";

export type Rank = "pawn" | "elite" | "boss";
export type Theme = "street" | "gnc" | "interior" | "foundry" | "roof" | "vault";

export type Faction = {
  id: FactionId;
  name: string;
  pawn: string;
  elite: string;
  boss: string;
  color: string;
  ranged: boolean;
  eliteRanged: boolean;
  infect: boolean;
  speed: number;
};

export const FACTIONS: Record<FactionId, Faction> = {
  roobet: {
    id: "roobet",
    name: "Roobet",
    pawn: "Roo Punk",
    elite: "Roo Enforcer",
    boss: "King Roo",
    color: "#c084fc",
    ranged: false,
    eliteRanged: false,
    infect: false,
    speed: 86,
  },
  stake: {
    id: "stake",
    name: "Stake",
    pawn: "Hound",
    elite: "Pit Boss",
    boss: "Don Hound",
    color: "#60a5fa",
    ranged: false,
    eliteRanged: false,
    infect: false,
    speed: 92,
  },
  bcgame: {
    id: "bcgame",
    name: "BC.GAME",
    pawn: "Croc",
    elite: "Gold Croc",
    boss: "Crown Croc",
    color: "#4ade80",
    ranged: false,
    eliteRanged: false,
    infect: false,
    speed: 108,
  },
  rollbit: {
    id: "rollbit",
    name: "Rollbit",
    pawn: "Die",
    elite: "Loaded Die",
    boss: "Roll Titan",
    color: "#fbbf24",
    ranged: true,
    eliteRanged: true,
    infect: false,
    speed: 64,
  },
  shuffle: {
    id: "shuffle",
    name: "Shuffle",
    pawn: "Jester",
    elite: "Dealer",
    boss: "Grand Jester",
    color: "#c084fc",
    ranged: true,
    eliteRanged: true,
    infect: false,
    speed: 88,
  },
  duelbits: {
    id: "duelbits",
    name: "Duelbits",
    pawn: "Squire",
    elite: "Knight",
    boss: "Duel Warden",
    color: "#34d399",
    ranged: false,
    eliteRanged: true,
    infect: false,
    speed: 74,
  },
  rainbet: {
    id: "rainbet",
    name: "Rainbet",
    pawn: "Acolyte",
    elite: "Storm Mage",
    boss: "Rain Archmage",
    color: "#7dd3fc",
    ranged: true,
    eliteRanged: true,
    infect: true,
    speed: 70,
  },
};

export type GunDef = {
  id: string;
  name: string;
  page: 3 | 4;
  cost: number;
  damage: number;
  mag: number;
  reload: number;
  delay: number;
  speed: number;
  pellets: number;
  spread: number;
  auto: boolean;
  explosive: boolean;
  pierce: number;
  color: string;
  blurb: string;
};

export const GUNS: GunDef[] = [
  {
    id: "agr170",
    name: "AGR-170",
    page: 3,
    cost: 750,
    damage: 26,
    mag: 12,
    reload: 1.15,
    delay: 0.28,
    speed: 820,
    pellets: 1,
    spread: 0.02,
    auto: false,
    explosive: false,
    pierce: 0,
    color: "#5eead4",
    blurb: "Reliable sidearm. Steady damage, short reload.",
  },
  {
    id: "viper",
    name: "VIPER",
    page: 3,
    cost: 1400,
    damage: 14,
    mag: 30,
    reload: 1.35,
    delay: 0.08,
    speed: 860,
    pellets: 1,
    spread: 0.05,
    auto: true,
    explosive: false,
    pierce: 0,
    color: "#c084fc",
    blurb: "Spray SMG. Hold fire and walk them down.",
  },
  {
    id: "ranger",
    name: "RANGER",
    page: 3,
    cost: 2200,
    damage: 46,
    mag: 8,
    reload: 1.45,
    delay: 0.46,
    speed: 1100,
    pellets: 1,
    spread: 0,
    auto: false,
    explosive: false,
    pierce: 1,
    color: "#f87171",
    blurb: "Marksman rifle. Punches through a second target.",
  },
  {
    id: "boom",
    name: "BOOM-6",
    page: 3,
    cost: 3000,
    damage: 16,
    mag: 5,
    reload: 1.55,
    delay: 0.62,
    speed: 700,
    pellets: 5,
    spread: 0.2,
    auto: false,
    explosive: false,
    pierce: 0,
    color: "#fb923c",
    blurb: "Shotgun spread. Brutal up close.",
  },
  {
    id: "pulse",
    name: "PULSE",
    page: 3,
    cost: 4200,
    damage: 22,
    mag: 20,
    reload: 1.4,
    delay: 0.11,
    speed: 940,
    pellets: 1,
    spread: 0.03,
    auto: true,
    explosive: false,
    pierce: 0,
    color: "#67e8f9",
    blurb: "Energy carbine. Fast bolts, clean recoil.",
  },
  {
    id: "rail",
    name: "RAIL",
    page: 4,
    cost: 7000,
    damage: 110,
    mag: 4,
    reload: 1.85,
    delay: 0.78,
    speed: 1500,
    pellets: 1,
    spread: 0,
    auto: false,
    explosive: false,
    pierce: 3,
    color: "#fde68a",
    blurb: "Heavy rail. Deletes a line of bodies.",
  },
  {
    id: "minigun",
    name: "MINIGUN",
    page: 4,
    cost: 9000,
    damage: 11,
    mag: 80,
    reload: 2.2,
    delay: 0.05,
    speed: 900,
    pellets: 1,
    spread: 0.07,
    auto: true,
    explosive: false,
    pierce: 0,
    color: "#facc15",
    blurb: "Spin-up wall of lead. Hungry for ammo.",
  },
  {
    id: "launcher",
    name: "THUMPER",
    page: 4,
    cost: 11000,
    damage: 86,
    mag: 3,
    reload: 2.05,
    delay: 0.72,
    speed: 460,
    pellets: 1,
    spread: 0,
    auto: false,
    explosive: true,
    pierce: 0,
    color: "#fb7185",
    blurb: "Grenade launcher. Splash hurts crowds.",
  },
];

export const GUN_MAP = Object.fromEntries(GUNS.map((g) => [g.id, g])) as Record<string, GunDef>;

export type MeleeId = "fists" | "knife" | "bat" | "axe";

export const MELEE: Record<MeleeId, { name: string; cost: number; mul: number; blurb: string }> = {
  fists: { name: "FISTS", cost: 0, mul: 1, blurb: "Always with you. Punch and kick." },
  knife: { name: "KNIFE", cost: 450, mul: 1.3, blurb: "Quick blade. Melee hits harder." },
  bat: { name: "BAT", cost: 800, mul: 1.55, blurb: "Wide swings. Extra knockback." },
  axe: { name: "AXE", cost: 1400, mul: 1.9, blurb: "Heavy chop. Bosses feel it." },
};

export type Platform = { x: number; y: number; w: number; h: number };
export type Spawn = { x: number; rank: Rank; faction?: FactionId };
export type Encounter = { walk: number; foes: Spawn[] };

export type LevelDef = {
  id: number;
  name: string;
  theme: Theme;
  faction: FactionId;
  width: number;
  time: number;
  sky: [string, string];
  brief: string;
  survival?: boolean;
  spawns: Spawn[];
  encounters: Encounter[];
  platforms: Platform[];
};

const streetPlat = (xs: number[]): Platform[] =>
  xs.map((x, i) => ({ x, y: i % 2 === 0 ? 348 : 332, w: 150, h: 70 }));

const foe = (rank: Rank, faction?: FactionId): Spawn => ({ x: 0, rank, faction });

export const LEVELS: LevelDef[] = [
  {
    id: 1,
    name: "Sunset Mile",
    theme: "street",
    faction: "roobet",
    width: 4800,
    time: 220,
    sky: ["#f6b07a", "#f08a4b"],
    brief: "Empty road first. Small packs, then King Roo at the gate.",
    spawns: [],
    encounters: [
      { walk: 720, foes: [foe("pawn"), foe("pawn")] },
      { walk: 560, foes: [foe("pawn"), foe("pawn"), foe("pawn")] },
      { walk: 620, foes: [foe("pawn"), foe("elite")] },
      { walk: 700, foes: [foe("pawn"), foe("boss")] },
    ],
    platforms: streetPlat([1100, 2000, 2900, 3800]),
  },
  {
    id: 2,
    name: "Hound Block",
    theme: "street",
    faction: "stake",
    width: 5600,
    time: 250,
    sky: ["#f0a06a", "#d86a4a"],
    brief: "Harder packs. Hounds mix with shooters. Don Hound closes the block.",
    spawns: [],
    encounters: [
      { walk: 700, foes: [foe("pawn"), foe("pawn"), foe("pawn")] },
      { walk: 480, foes: [foe("pawn"), foe("pawn", "rollbit"), foe("elite")] },
      { walk: 520, foes: [foe("elite"), foe("pawn", "rollbit"), foe("pawn")] },
      { walk: 500, foes: [foe("elite"), foe("elite"), foe("pawn", "shuffle")] },
      { walk: 640, foes: [foe("pawn"), foe("elite"), foe("boss")] },
    ],
    platforms: streetPlat([1000, 1900, 2800, 3700, 4600]),
  },
  {
    id: 3,
    name: "Croc Yard",
    theme: "gnc",
    faction: "bcgame",
    width: 6800,
    time: 280,
    sky: ["#f3c27a", "#e07a3a"],
    brief: "Three bosses, spaced out. Clear one fight before the next starts.",
    spawns: [],
    encounters: [
      { walk: 680, foes: [foe("pawn"), foe("pawn"), foe("elite")] },
      { walk: 520, foes: [foe("elite"), foe("pawn"), foe("boss")] },
      { walk: 640, foes: [foe("pawn", "rollbit"), foe("elite", "rollbit"), foe("elite")] },
      { walk: 600, foes: [foe("elite", "shuffle"), foe("pawn", "shuffle"), foe("boss", "rollbit")] },
      { walk: 680, foes: [foe("elite"), foe("elite", "duelbits"), foe("pawn"), foe("boss")] },
    ],
    platforms: streetPlat([1200, 2200, 3400, 4600, 5600]),
  },
  {
    id: 4,
    name: "BLUE GNC",
    theme: "interior",
    faction: "rollbit",
    width: 5600,
    time: 260,
    sky: ["#d5dde6", "#b7c3d1"],
    brief: "Dice crews shoot from the hall. The titan waits at the end.",
    spawns: [],
    encounters: [
      { walk: 640, foes: [foe("pawn"), foe("pawn"), foe("pawn")] },
      { walk: 480, foes: [foe("pawn"), foe("elite"), foe("pawn")] },
      { walk: 500, foes: [foe("elite"), foe("elite"), foe("pawn")] },
      { walk: 520, foes: [foe("pawn"), foe("elite"), foe("elite")] },
      { walk: 640, foes: [foe("elite"), foe("boss")] },
    ],
    platforms: [
      { x: 900, y: 340, w: 180, h: 78 },
      { x: 1800, y: 318, w: 200, h: 100 },
      { x: 2800, y: 340, w: 160, h: 78 },
      { x: 4000, y: 322, w: 180, h: 96 },
    ],
  },
  {
    id: 5,
    name: "Jester Hall",
    theme: "interior",
    faction: "shuffle",
    width: 6000,
    time: 270,
    sky: ["#c9d4ea", "#a9b6d4"],
    brief: "Dealers throw cards. Two elite rooms, then the Grand Jester.",
    spawns: [],
    encounters: [
      { walk: 620, foes: [foe("pawn"), foe("pawn"), foe("elite")] },
      { walk: 480, foes: [foe("pawn"), foe("elite"), foe("pawn")] },
      { walk: 500, foes: [foe("elite"), foe("elite"), foe("pawn")] },
      { walk: 520, foes: [foe("elite"), foe("pawn"), foe("elite")] },
      { walk: 660, foes: [foe("elite"), foe("elite"), foe("boss")] },
    ],
    platforms: [
      { x: 1000, y: 336, w: 160, h: 82 },
      { x: 2100, y: 322, w: 210, h: 96 },
      { x: 3400, y: 340, w: 150, h: 78 },
      { x: 4600, y: 326, w: 180, h: 92 },
    ],
  },
  {
    id: 6,
    name: "Foundry Gate",
    theme: "foundry",
    faction: "duelbits",
    width: 6400,
    time: 280,
    sky: ["#f0b07a", "#c45a32"],
    brief: "Knights close in. The warden has a real fight, not just more health.",
    spawns: [],
    encounters: [
      { walk: 640, foes: [foe("pawn"), foe("pawn"), foe("pawn")] },
      { walk: 480, foes: [foe("elite"), foe("pawn"), foe("pawn")] },
      { walk: 500, foes: [foe("elite"), foe("elite"), foe("pawn")] },
      { walk: 520, foes: [foe("pawn", "rainbet"), foe("elite"), foe("elite")] },
      { walk: 680, foes: [foe("elite"), foe("elite"), foe("boss")] },
    ],
    platforms: streetPlat([1100, 2200, 3400, 4600, 5400]),
  },
  {
    id: 7,
    name: "Rain Spire",
    theme: "roof",
    faction: "rainbet",
    width: 6400,
    time: 280,
    sky: ["#7eb0e8", "#f2a36b"],
    brief: "Mages infect on hit. Clear the roof before the archmage.",
    spawns: [],
    encounters: [
      { walk: 620, foes: [foe("pawn"), foe("pawn"), foe("elite")] },
      { walk: 480, foes: [foe("elite"), foe("pawn"), foe("pawn")] },
      { walk: 500, foes: [foe("elite"), foe("elite"), foe("pawn")] },
      { walk: 540, foes: [foe("elite"), foe("pawn"), foe("elite")] },
      { walk: 680, foes: [foe("elite"), foe("boss")] },
    ],
    platforms: [
      { x: 900, y: 330, w: 180, h: 88 },
      { x: 1900, y: 300, w: 200, h: 118 },
      { x: 3100, y: 334, w: 170, h: 84 },
      { x: 4300, y: 310, w: 160, h: 108 },
      { x: 5200, y: 328, w: 170, h: 90 },
    ],
  },
  {
    id: 8,
    name: "Vault Floor",
    theme: "vault",
    faction: "roobet",
    width: 7200,
    time: 320,
    sky: ["#241433", "#3a2158"],
    brief: "Every house shows up. Two bosses, with a fight between them.",
    spawns: [],
    encounters: [
      { walk: 640, foes: [foe("pawn", "roobet"), foe("pawn", "stake"), foe("elite", "bcgame")] },
      { walk: 500, foes: [foe("elite", "rollbit"), foe("pawn", "shuffle"), foe("elite", "duelbits")] },
      { walk: 560, foes: [foe("elite", "stake"), foe("pawn", "roobet"), foe("boss", "stake")] },
      { walk: 600, foes: [foe("elite", "rainbet"), foe("elite", "shuffle"), foe("pawn", "bcgame")] },
      { walk: 680, foes: [foe("elite", "duelbits"), foe("elite", "rainbet"), foe("boss", "duelbits")] },
    ],
    platforms: [
      { x: 1000, y: 340, w: 160, h: 78 },
      { x: 2200, y: 318, w: 190, h: 100 },
      { x: 3600, y: 336, w: 170, h: 82 },
      { x: 5000, y: 310, w: 180, h: 108 },
      { x: 6100, y: 332, w: 160, h: 86 },
    ],
  },
  {
    id: 9,
    name: "House Edge",
    theme: "vault",
    faction: "shuffle",
    width: 8200,
    time: 360,
    sky: ["#1a1028", "#4a1d4a"],
    brief: "Boss rush, one at a time. The last warden is the door.",
    spawns: [],
    encounters: [
      { walk: 600, foes: [foe("elite", "roobet"), foe("pawn", "bcgame"), foe("elite", "stake")] },
      { walk: 520, foes: [foe("elite", "rollbit"), foe("pawn", "shuffle"), foe("boss", "rollbit")] },
      { walk: 600, foes: [foe("elite", "rainbet"), foe("elite", "duelbits"), foe("pawn", "roobet")] },
      { walk: 560, foes: [foe("elite", "shuffle"), foe("elite", "stake"), foe("boss", "rainbet")] },
      { walk: 620, foes: [foe("elite", "bcgame"), foe("elite", "duelbits"), foe("pawn", "rollbit")] },
      { walk: 700, foes: [foe("elite", "duelbits"), foe("elite", "rainbet"), foe("boss", "bcgame")] },
    ],
    platforms: [
      { x: 1100, y: 328, w: 180, h: 90 },
      { x: 2400, y: 340, w: 150, h: 78 },
      { x: 3800, y: 316, w: 200, h: 102 },
      { x: 5200, y: 334, w: 170, h: 84 },
      { x: 6600, y: 320, w: 180, h: 98 },
    ],
  },
  {
    id: 10,
    name: "Survival",
    theme: "street",
    faction: "roobet",
    width: 4000,
    time: 9999,
    sky: ["#f6b07a", "#e36a3a"],
    brief: "Endless street. Cash out from the pause menu. Stars at 30s, 60s, 90s.",
    survival: true,
    spawns: [],
    encounters: [],
    platforms: [],
  },
];

export const LEVEL_MAP = Object.fromEntries(LEVELS.map((l) => [l.id, l])) as Record<number, LevelDef>;

export function hpCost(nextLevel: number): number {
  return [0, 8, 12, 18, 26, 36, 50, 70][nextLevel] ?? 99;
}
export function crossCost(nextLevel: number): number {
  return [0, 10, 14, 20, 28, 40, 56][nextLevel] ?? 99;
}
export function bootCost(nextLevel: number): number {
  return [0, 350, 700, 1200, 1800][nextLevel] ?? 9999;
}
export function armorCost(nextLevel: number): number {
  return [0, 400, 900, 1500, 2300][nextLevel] ?? 9999;
}
export function coreCost(nextLevel: number): number {
  return [0, 8, 14, 22][nextLevel] ?? 99;
}
export function medCost(nextLevel: number): number {
  return [0, 8, 12, 16, 22, 30][nextLevel] ?? 99;
}
export function stealCost(nextLevel: number): number {
  return [500, 900, 1400][nextLevel] ?? 9999;
}

export const ROBOT_COST = 8000;
export const ROBOT_WAS = 13400;
export const AMMO_COST = 280;
export const SQUAD_COST = 24;
export const MED_FILL_COST = 120;
export const WARD_COST = 600;

export function gunUpgradeCost(gun: GunDef, nextLevel: number): number {
  const mul = gun.page === 4 ? 2 : 1;
  return Math.round(160 * nextLevel * mul);
}

export function comma(n: number): string {
  return Math.floor(n).toLocaleString("en-US");
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `00:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
