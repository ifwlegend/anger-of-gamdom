import {
  AMMO_COST,
  GUN_MAP,
  LEVELS,
  MELEE,
  ROBOT_COST,
  SQUAD_COST,
  WARD_COST,
  MED_FILL_COST,
  armorCost,
  bootCost,
  coreCost,
  crossCost,
  gunUpgradeCost,
  hpCost,
  medCost,
  stealCost,
  type MeleeId,
} from "./content";
import { heroKit, heroOf, type HeroId } from "./heroes";

const KEY = "crownbreak-save-v1";

export type Save = {
  version: 1;
  coins: number;
  gems: number;
  hpLevel: number;
  crossLevel: number;
  boots: number;
  armor: number;
  coreLevel: number;
  squad: number;
  medLevel: number;
  medicine: number;
  lifesteal: number;
  resist: number;
  melee: MeleeId;
  ownedMelee: MeleeId[];
  ownedGuns: string[];
  gunLevels: Record<string, number>;
  ammo: Record<string, number>;
  gunId: string | null;
  robot: boolean;
  robotOn: boolean;
  unlocked: number[];
  stars: Record<number, number>;
  selected: number;
  hero: HeroId;
  sfx: boolean;
  music: boolean;
};

export function defaultSave(): Save {
  return {
    version: 1,
    coins: 1800,
    gems: 18,
    hpLevel: 1,
    crossLevel: 1,
    boots: 1,
    armor: 1,
    coreLevel: 1,
    squad: 2,
    medLevel: 1,
    medicine: 5,
    lifesteal: 0,
    resist: 0,
    melee: "fists",
    ownedMelee: ["fists"],
    ownedGuns: [],
    gunLevels: {},
    ammo: {},
    gunId: null,
    robot: false,
    robotOn: false,
    unlocked: [1],
    stars: {},
    selected: 1,
    hero: "gambino",
    sfx: true,
    music: true,
  };
}

export function loadSave(): Save {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw) as Partial<Save>;
    if (parsed.version !== 1) return defaultSave();
    return { ...defaultSave(), ...parsed, version: 1, hero: heroOf(parsed.hero) };
  } catch {
    return defaultSave();
  }
}

export function writeSave(save: Save) {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* private mode */
  }
}

export type Stats = {
  maxHp: number;
  speed: number;
  armor: number;
  charges: number;
  crossDmg: number;
  medCap: number;
  healPct: number;
  meleeMul: number;
  knock: number;
  lives: number;
  steal: number;
  resist: boolean;
};

export function derived(save: Save): Stats {
  const melee = MELEE[save.melee] ?? MELEE.fists;
  const hero = heroKit(save.hero);
  return {
    maxHp: Math.round((380 + (save.hpLevel - 1) * 80) * hero.hp),
    speed: (1 + (save.boots - 1) * 0.07) * hero.speed,
    armor: Math.min(0.35, (save.armor - 1) * 0.07),
    charges: Math.min(6, 2 + save.crossLevel),
    crossDmg: 70 + (save.crossLevel - 1) * 22,
    medCap: 3 + save.medLevel * 2,
    healPct: 0.28 + (save.coreLevel - 1) * 0.06,
    meleeMul: melee.mul * hero.melee,
    knock: (save.melee === "bat" || save.melee === "axe" ? 1.3 : 1) * hero.knock,
    lives: save.squad,
    steal: save.lifesteal * 6,
    resist: save.resist === 1,
  };
}

export function gunDamage(id: string, level: number): number {
  const g = GUN_MAP[id];
  if (!g) return 0;
  return Math.round(g.damage * (1 + 0.12 * (level - 1)));
}

function clone(save: Save): Save {
  return {
    ...save,
    ownedMelee: [...save.ownedMelee],
    ownedGuns: [...save.ownedGuns],
    gunLevels: { ...save.gunLevels },
    ammo: { ...save.ammo },
    unlocked: [...save.unlocked],
    stars: { ...save.stars },
  };
}

export type BuyResult = { ok: boolean; reason: string; save: Save };

export function purchase(prev: Save, id: string): BuyResult {
  const save = clone(prev);
  const need = (currency: "coins" | "gems", cost: number) => {
    if (currency === "coins" && save.coins < cost) return "Not enough coins";
    if (currency === "gems" && save.gems < cost) return "Not enough gems";
    return "";
  };
  const pay = (currency: "coins" | "gems", cost: number) => {
    if (currency === "coins") save.coins -= cost;
    else save.gems -= cost;
  };

  if (id === "hp") {
    if (save.hpLevel >= 7) return { ok: false, reason: "LIFE is maxed", save: prev };
    const cost = hpCost(save.hpLevel);
    const err = need("gems", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("gems", cost);
    save.hpLevel += 1;
    return { ok: true, reason: "LIFE upgraded", save };
  }
  if (id === "cross") {
    if (save.crossLevel >= 6) return { ok: false, reason: "CROSS is maxed", save: prev };
    const cost = crossCost(save.crossLevel);
    const err = need("gems", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("gems", cost);
    save.crossLevel += 1;
    return { ok: true, reason: "Holy Cross upgraded", save };
  }
  if (id === "boots") {
    if (save.boots >= 5) return { ok: false, reason: "BOOTS are maxed", save: prev };
    const cost = bootCost(save.boots);
    const err = need("coins", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", cost);
    save.boots += 1;
    return { ok: true, reason: "Boots upgraded", save };
  }
  if (id === "armor") {
    if (save.armor >= 5) return { ok: false, reason: "PLATE is maxed", save: prev };
    const cost = armorCost(save.armor);
    const err = need("coins", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", cost);
    save.armor += 1;
    return { ok: true, reason: "Plate upgraded", save };
  }
  if (id === "core") {
    if (save.coreLevel >= 4) return { ok: false, reason: "CORE is maxed", save: prev };
    const cost = coreCost(save.coreLevel);
    const err = need("gems", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("gems", cost);
    save.coreLevel += 1;
    return { ok: true, reason: "Heal core upgraded", save };
  }
  if (id === "squad") {
    if (save.squad >= 3) return { ok: false, reason: "Squad is maxed", save: prev };
    const err = need("gems", SQUAD_COST);
    if (err) return { ok: false, reason: err, save: prev };
    pay("gems", SQUAD_COST);
    save.squad += 1;
    return { ok: true, reason: "Extra life unlocked", save };
  }
  if (id === "meds") {
    if (save.medLevel >= 6) return { ok: false, reason: "Medicine is maxed", save: prev };
    const cost = medCost(save.medLevel);
    const err = need("gems", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("gems", cost);
    save.medLevel += 1;
    save.medicine = Math.min(3 + save.medLevel * 2, save.medicine + 2);
    return { ok: true, reason: "Medicine stock grew", save };
  }
  if (id === "steal") {
    if (save.lifesteal >= 3) return { ok: false, reason: "Siphon is maxed", save: prev };
    const cost = stealCost(save.lifesteal);
    const err = need("coins", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", cost);
    save.lifesteal += 1;
    return { ok: true, reason: "Melee siphon upgraded", save };
  }
  if (id === "resist") {
    if (save.resist >= 1) return { ok: false, reason: "Already owned", save: prev };
    const err = need("coins", WARD_COST);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", WARD_COST);
    save.resist = 1;
    return { ok: true, reason: "Ward owned. Infection fades faster.", save };
  }
  if (id === "fillmeds") {
    const cap = derived(save).medCap;
    if (save.medicine >= cap) return { ok: false, reason: "Medicine is full", save: prev };
    const err = need("coins", MED_FILL_COST);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", MED_FILL_COST);
    save.medicine = cap;
    return { ok: true, reason: "Medicine restocked", save };
  }
  if (id === "knife" || id === "bat" || id === "axe") {
    const m = MELEE[id];
    if (save.ownedMelee.includes(id)) {
      save.melee = id;
      return { ok: true, reason: `${m.name} equipped`, save };
    }
    const err = need("coins", m.cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", m.cost);
    save.ownedMelee.push(id);
    save.melee = id;
    return { ok: true, reason: `${m.name} bought`, save };
  }
  if (id === "fists") {
    save.melee = "fists";
    return { ok: true, reason: "Fists equipped", save };
  }
  if (id.startsWith("gun:")) {
    const gid = id.slice(4);
    const g = GUN_MAP[gid];
    if (!g) return { ok: false, reason: "Unknown weapon", save: prev };
    if (save.ownedGuns.includes(gid)) {
      save.gunId = gid;
      return { ok: true, reason: `${g.name} equipped`, save };
    }
    const err = need("coins", g.cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", g.cost);
    save.ownedGuns.push(gid);
    save.gunLevels[gid] = 1;
    save.ammo[gid] = g.mag * 6;
    save.gunId = gid;
    return { ok: true, reason: `${g.name} bought`, save };
  }
  if (id.startsWith("up:")) {
    const gid = id.slice(3);
    const g = GUN_MAP[gid];
    if (!g || !save.ownedGuns.includes(gid)) return { ok: false, reason: "Buy it first", save: prev };
    const lvl = save.gunLevels[gid] ?? 1;
    if (lvl >= 5) return { ok: false, reason: "Weapon is maxed", save: prev };
    const cost = gunUpgradeCost(g, lvl);
    const err = need("coins", cost);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", cost);
    save.gunLevels[gid] = lvl + 1;
    return { ok: true, reason: `${g.name} upgraded`, save };
  }
  if (id === "ammo") {
    if (save.ownedGuns.length === 0) return { ok: false, reason: "Buy a gun first", save: prev };
    const err = need("coins", AMMO_COST);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", AMMO_COST);
    for (const gid of save.ownedGuns) {
      const g = GUN_MAP[gid];
      if (!g) continue;
      save.ammo[gid] = Math.max(save.ammo[gid] ?? 0, g.mag * 6);
    }
    return { ok: true, reason: "Magazines refilled", save };
  }
  if (id === "robot") {
    if (save.robot) {
      save.robotOn = !save.robotOn;
      return { ok: true, reason: save.robotOn ? "Robot deployed" : "Robot standing by", save };
    }
    const err = need("coins", ROBOT_COST);
    if (err) return { ok: false, reason: err, save: prev };
    pay("coins", ROBOT_COST);
    save.robot = true;
    save.robotOn = true;
    return { ok: true, reason: "Combat robot online", save };
  }
  return { ok: false, reason: "Nothing to buy", save: prev };
}

export type RunResult = {
  levelId: number;
  outcome: "win" | "lose" | "quit";
  coins: number;
  hp: number;
  maxHp: number;
  timeLeft: number;
  timeMax: number;
  elapsed: number;
  medicine: number;
  ammo: Record<string, number>;
  survival: boolean;
};

export type RunSummary = {
  save: Save;
  stars: number;
  coinsGained: number;
  gemsGained: number;
  best: boolean;
};

export function finishRun(prev: Save, run: RunResult): RunSummary {
  const save = clone(prev);
  save.medicine = Math.max(0, Math.min(derived(save).medCap, run.medicine));
  save.ammo = { ...save.ammo, ...run.ammo };
  let stars = 0;
  if (run.survival) {
    if (run.elapsed >= 30) stars += 1;
    if (run.elapsed >= 60) stars += 1;
    if (run.elapsed >= 90) stars += 1;
  } else if (run.outcome === "win") {
    stars = 1;
    if (run.maxHp > 0 && run.hp / run.maxHp >= 0.5) stars += 1;
    if (run.timeMax > 0 && run.timeLeft / run.timeMax >= 0.35) stars += 1;
  }
  const prevStars = save.stars[run.levelId] ?? 0;
  if (stars > prevStars) save.stars[run.levelId] = stars;
  let coinsGained = 0;
  let gemsGained = 0;
  if (run.outcome === "lose") coinsGained = Math.floor(run.coins * 0.5);
  else coinsGained = Math.floor(run.coins);
  if (run.outcome === "win" && !run.survival) {
    coinsGained += 160 + stars * 80;
    if (prevStars === 0) gemsGained += 2;
    if (stars === 3 && prevStars < 3) gemsGained += 2;
    const next = run.levelId + 1;
    if (next <= 9 && !save.unlocked.includes(next)) save.unlocked.push(next);
    if (run.levelId >= 3 && !save.unlocked.includes(10)) save.unlocked.push(10);
  }
  if (run.survival && stars > prevStars && prevStars === 0 && stars > 0) gemsGained += 2;
  save.coins += coinsGained;
  save.gems += gemsGained;
  if (!LEVELS.some((l) => l.id === save.selected)) save.selected = 1;
  return { save, stars, coinsGained, gemsGained, best: stars > prevStars };
}
