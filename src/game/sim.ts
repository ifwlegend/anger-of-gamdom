import {
  FACTIONS,
  GUN_MAP,
  LEVEL_MAP,
  type FactionId,
  type LevelDef,
  type Rank,
} from "./content";
import type { Input } from "./input";
import { sfx } from "./audio";
import { derived, gunDamage, type Save } from "./save";
import { heroKit, heroOf, type HeroId } from "./heroes";

export const VW = 960;
export const VH = 540;
export const GROUND = 418;
/** Vertical world span drawn into the battle canvas. Tighter than VH so the street, not empty sky, fills the fight. */
export const FRAME_H = 420;

export type Bullet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dmg: number;
  r: number;
  life: number;
  friendly: boolean;
  color: string;
  explosive: boolean;
  pierce: number;
  hit: number[];
};

export type Floater = { x: number; y: number; text: string; life: number; color: string };
export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  s: number;
  kind: "bit" | "drop" | "spark" | "pool";
  g: number;
};
export type Ring = { x: number; y: number; r: number; life: number; max: number; color: string };

export type Enemy = {
  id: number;
  faction: FactionId;
  rank: Rank;
  name: string;
  tag: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  hp: number;
  maxHp: number;
  facing: number;
  hurt: number;
  cd: number;
  shootCd: number;
  slam: number;
  dead: number;
  walk: number;
  ranged: boolean;
  infect: boolean;
  h: number;
  w: number;
  speed: number;
  touch: number;
  touchCd: number;
  attackT: number;
  removed: boolean;
  stun: number;
  guard: number;
  lift: number;
  liftV: number;
  intro: number;
  phased: boolean;
  enc: number;
  charge: number;
  pattern: number;
};

export type Player = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 1 | -1;
  onGround: boolean;
  crouch: boolean;
  hp: number;
  maxHp: number;
  invuln: number;
  coyote: number;
  jumpBuf: number;
  animT: number;
  runDist: number;
  gait: number;
  holdT: number;
  holdDir: -1 | 0 | 1;
  meleeT: number;
  meleeKind: "punch" | "kick";
  shootT: number;
  hurtT: number;
  deadT: number;
  dead: boolean;
  reloadT: number;
  reloadTake: number;
  mag: number;
  fireCd: number;
  hitThisSwing: boolean;
  infect: number;
  crossCd: number;
  charges: number;
  meds: number;
  lives: number;
  checkpoint: number;
  combo: number;
  comboT: number;
  chain: number;
  moveName: string;
  moveDur: number;
  bufLight: number;
  bufHeavy: number;
  dodgeT: number;
  blocking: boolean;
  perfect: number;
  specialCd: number;
  specialIx: number;
  meter: number;
  rageT: number;
  slamPending: boolean;
  heavySwing: boolean;
  launchHit: boolean;
  aoeHit: boolean;
  finisher: boolean;
  swingDmg: number;
  swingKb: number;
  swingStun: number;
  hero: HeroId;
};

export type Robot = { x: number; y: number; facing: number; cd: number; walk: number };

export type Sim = {
  level: LevelDef;
  phase: "play" | "win" | "lose";
  elapsed: number;
  timeLeft: number;
  camX: number;
  viewW: number;
  player: Player;
  enemies: Enemy[];
  bullets: Bullet[];
  particles: Particle[];
  floats: Floater[];
  rings: Ring[];
  shake: number;
  hitstop: number;
  coins: number;
  kills: number;
  banner: string;
  bannerT: number;
  exitHold: number;
  wave: number;
  waveT: number;
  ammo: Record<string, number>;
  gunId: string | null;
  robot: Robot | null;
  stats: ReturnType<typeof derived>;
  nextId: number;
  resolved: boolean;
  muzzle: number;
  encCursor: number;
  liveEnc: number;
  gateX: number;
  nextAt: number;
};

const BOSS_TAG: Record<FactionId, string> = {
  roobet: "ROOBET",
  stake: "STAKE",
  bcgame: "BC.GAME",
  rollbit: "ROLLBIT",
  shuffle: "SHUFFLE",
  duelbits: "DUELBITS",
  rainbet: "RAINBET",
};

function rankSize(rank: Rank) {
  if (rank === "boss") return { h: 228, w: 92, hp: 980, touch: 34, speedMul: 0.78 };
  if (rank === "elite") return { h: 198, w: 70, hp: 240, touch: 26, speedMul: 1.05 };
  return { h: 176, w: 58, hp: 112, touch: 20, speedMul: 1.12 };
}

export function makeEnemy(sim: Sim, x: number, rank: Rank, faction: FactionId, hpMul = 1): Enemy {
  const f = FACTIONS[faction];
  const sz = rankSize(rank);
  const name = rank === "boss" ? f.boss : rank === "elite" ? f.elite : f.pawn;
  const ranged = rank === "boss" ? true : rank === "elite" ? f.eliteRanged || f.ranged : f.ranged;
  return stampEnemy({
    id: sim.nextId++,
    faction,
    rank,
    name,
    tag: rank === "boss" ? BOSS_TAG[faction] : "PAWN",
    color: f.color,
    x,
    y: GROUND,
    vx: 0,
    hp: Math.round(sz.hp * hpMul),
    maxHp: Math.round(sz.hp * hpMul),
    facing: -1,
    hurt: 0,
    cd: 0.4 + Math.random() * 0.4,
    shootCd: 0.8,
    slam: 0,
    dead: 0,
    walk: Math.random() * 10,
    ranged,
    infect: f.infect && (rank !== "pawn" || Math.random() < 0.35),
    h: sz.h,
    w: sz.w,
    speed: f.speed * sz.speedMul,
    touch: sz.touch,
    touchCd: 0.35,
    attackT: 0,
    removed: false,
    stun: 0,
    guard: 0,
    lift: 0,
    liftV: 0,
    intro: 0,
    phased: false,
    enc: -1,
    charge: 0,
    pattern: 0,
  });
}

function stampEnemy(enemy: Enemy) {
  if (enemy.faction === "stake" && enemy.rank === "boss") {
    enemy.hp = Math.round(enemy.hp * 1.65);
    enemy.maxHp = enemy.hp;
    enemy.touch = Math.round(enemy.touch * 1.45);
    enemy.speed *= 1.08;
    enemy.h = Math.round(enemy.h * 1.18);
    enemy.w = Math.round(enemy.w * 1.12);
    enemy.intro = 1;
  }
  return enemy;
}

export function createSim(level: LevelDef, save: Save, heroId?: string): Sim {
  const hero = heroOf(heroId ?? save.hero);
  const stats = derived({ ...save, hero });
  const ammo: Record<string, number> = {};
  for (const id of save.ownedGuns) ammo[id] = save.ammo[id] ?? 0;
  const gun = save.gunId && save.ownedGuns.includes(save.gunId) ? GUN_MAP[save.gunId] : null;
  let mag = 0;
  if (gun) {
    const have = ammo[gun.id] ?? 0;
    mag = Math.min(gun.mag, have);
    ammo[gun.id] = have - mag;
  }
  const sim: Sim = {
    level,
    phase: "play",
    elapsed: 0,
    timeLeft: level.time,
    camX: 0,
    viewW: VW,
    player: {
      x: 160,
      y: GROUND,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: true,
      crouch: false,
      hp: stats.maxHp,
      maxHp: stats.maxHp,
      invuln: 0,
      coyote: 0,
      jumpBuf: 0,
      animT: 0,
      runDist: 0,
      gait: 0,
      holdT: 0,
      holdDir: 0,
      meleeT: 0,
      meleeKind: "punch",
      shootT: 0,
      hurtT: 0,
      deadT: 0,
      dead: false,
      reloadT: 0,
      reloadTake: 0,
      mag,
      fireCd: 0,
      hitThisSwing: false,
      infect: 0,
      crossCd: 0,
      charges: stats.charges,
      meds: Math.min(save.medicine, stats.medCap),
      lives: stats.lives,
      checkpoint: 160,
      combo: 0,
      comboT: 0,
      chain: 0,
      moveName: "",
      moveDur: 0.32,
      bufLight: 0,
      bufHeavy: 0,
      dodgeT: 0,
      blocking: false,
      perfect: 0,
      specialCd: 0,
      specialIx: 0,
      meter: 0,
      rageT: 0,
      slamPending: false,
      heavySwing: false,
      launchHit: false,
      aoeHit: false,
      finisher: false,
      swingDmg: 22,
      swingKb: 140,
      swingStun: 0.08,
      hero,
    },
    enemies: [],
    bullets: [],
    particles: [],
    floats: [],
    rings: [],
    shake: 0,
    hitstop: 0,
    coins: 0,
    kills: 0,
    banner: level.survival
      ? "Survive. Pause to cash out. Stars at 30 / 60 / 90s."
      : "The street is empty. Move up.",
    bannerT: 7,
    exitHold: 0,
    wave: 0,
    waveT: 1.2,
    ammo,
    gunId: gun ? gun.id : null,
    robot: save.robot && save.robotOn ? { x: 80, y: GROUND, facing: 1, cd: 0.4, walk: 0 } : null,
    stats,
    nextId: 1,
    resolved: false,
    muzzle: 0,
    encCursor: 0,
    liveEnc: -1,
    gateX: 1e9,
    nextAt: level.encounters[0]?.walk ?? 1e9,
  };
  return sim;
}

function overlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function trimParts(sim: Sim) {
  const cap = 220;
  if (sim.particles.length > cap) sim.particles.splice(0, sim.particles.length - cap);
}

function burst(sim: Sim, x: number, y: number, color: string, n: number, speed = 140) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.4 + Math.random());
    sim.particles.push({
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - 40,
      life: 0.35 + Math.random() * 0.3,
      max: 0.55,
      color,
      s: 2 + Math.random() * 3,
      kind: "bit",
      g: 520,
    });
  }
  trimParts(sim);
}

function spray(
  sim: Sim,
  x: number,
  y: number,
  dir: number,
  color: string,
  n: number,
  power: number,
  kind: Particle["kind"],
) {
  for (let i = 0; i < n; i++) {
    const side = dir * (0.25 + Math.random() * 1.15);
    const up = -0.95 + Math.random() * 0.85;
    const v = power * (0.4 + Math.random() * 0.85);
    sim.particles.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 12,
      vx: side * v,
      vy: up * v,
      life: 0.42 + Math.random() * 0.45,
      max: 0.9,
      color,
      s: kind === "spark" ? 1.6 + Math.random() * 2 : 2.4 + Math.random() * 3.6,
      kind,
      g: kind === "spark" ? 220 : 1100,
    });
  }
  trimParts(sim);
}

function fluidOf(id: FactionId) {
  if (id === "stake" || id === "rainbet") return "#38bdf8";
  if (id === "bcgame") return "#4ade80";
  if (id === "rollbit") return "#fbbf24";
  if (id === "duelbits") return "#2dd4bf";
  return "#e879f9";
}

function hitFx(sim: Sim, e: Enemy, fromX: number, big: boolean) {
  const dir = e.x >= fromX ? 1 : -1;
  const y = e.y - e.h * 0.55;
  const wet = e.faction === "stake" || e.faction === "rainbet";
  spray(sim, e.x, y, dir, wet ? "#7dd3fc" : "#e11d48", big ? 16 : 8, big ? 240 : 170, "drop");
  spray(sim, e.x, y, dir, fluidOf(e.faction), big ? 12 : 6, big ? 210 : 150, "drop");
  spray(sim, e.x, y, dir, "#fff6c8", big ? 7 : 3, 260, "spark");
  if (big) {
    sim.particles.push({
      x: e.x + dir * 8,
      y: GROUND - 2,
      vx: 0,
      vy: 0,
      life: 2.4,
      max: 2.4,
      color: wet ? "#38bdf8" : "#dc2626",
      s: e.rank === "boss" ? 46 : e.rank === "elite" ? 32 : 22,
      kind: "pool",
      g: 0,
    });
    trimParts(sim);
  }
}

function floatText(sim: Sim, x: number, y: number, text: string, color: string) {
  sim.floats.push({ x, y, text, life: 0.8, color });
  if (sim.floats.length > 24) sim.floats.shift();
}

function killEnemy(sim: Sim, e: Enemy) {
  if (e.dead > 0) return;
  e.dead = 0.01;
  e.hp = 0;
  e.vx = 0;
  const bag = e.rank === "boss" ? 260 : e.rank === "elite" ? 72 : 32;
  const bonus = (e.id * 17) % (e.rank === "pawn" ? 14 : 24);
  const gain = bag + bonus;
  sim.coins += gain;
  sim.kills += 1;
  floatText(sim, e.x, e.y - e.h, `+${gain}`, "#ffe27a");
  hitFx(sim, e, e.x - e.facing * 40, true);
  sfx("coin");
  if (sim.gunId && Math.random() < 0.45) {
    const add = e.rank === "boss" ? 18 : e.rank === "elite" ? 8 : 4;
    sim.ammo[sim.gunId] = (sim.ammo[sim.gunId] ?? 0) + add;
    floatText(sim, e.x, e.y - e.h - 16, `+${add} ammo`, "#b6fff2");
  }
}

type HitOpts = { launch?: boolean; stun?: number; heavy?: boolean; finisher?: boolean; gun?: boolean };

function comboRank(n: number) {
  if (n >= 16) return "LEGENDARY";
  if (n >= 10) return "BRUTAL";
  if (n >= 6) return "GREAT";
  if (n >= 3) return "GOOD";
  return "";
}

function noteCombo(sim: Sim, heavy: boolean) {
  const p = sim.player;
  const boosted = p.perfect > 0;
  if (boosted) {
    p.perfect = 0;
    floatText(sim, p.x, p.y - 170, "COUNTER", "#fff4a8");
  }
  p.combo += 1;
  p.comboT = 1.15;
  p.meter = Math.min(100, p.meter + (heavy ? 9 : 5) + (boosted ? 8 : 0));
  if (p.combo === 8 && p.rageT <= 0) {
    p.rageT = 5;
    sim.banner = "RAGE";
    sim.bannerT = 1.3;
    sfx("cross");
  }
  const rank = comboRank(p.combo);
  if (rank && (p.combo === 3 || p.combo === 6 || p.combo === 10 || p.combo === 16)) {
    floatText(sim, p.x, p.y - 188, rank, "#ffe27a");
  }
}

function breakCombo(sim: Sim) {
  const p = sim.player;
  if (p.combo >= 3) {
    const bonus = p.combo * 3;
    sim.coins += bonus;
    const rank = comboRank(p.combo);
    floatText(sim, p.x, p.y - 160, `${rank} +${bonus}`, "#ffe27a");
  }
  p.combo = 0;
  p.chain = 0;
}

function hurtEnemy(sim: Sim, e: Enemy, dmg: number, kb: number, fromX: number, opts: HitOpts = {}) {
  if (e.dead > 0) return;
  const p = sim.player;
  const rage = p.rageT > 0 ? 1.4 : 1;
  let dealt = dmg * rage * (p.perfect > 0 && !opts.gun ? 1.8 : 1);
  let knock = kb * (p.rageT > 0 ? 1.35 : 1);
  if (!opts.gun && !opts.heavy && !opts.finisher && e.guard > 0) {
    dealt *= 0.35;
    knock *= 0.25;
    floatText(sim, e.x, e.y - e.h - 18, "GUARD", "#c9d4e0");
  } else if (
    !opts.gun &&
    !opts.heavy &&
    !opts.finisher &&
    !opts.launch &&
    e.stun <= 0 &&
    e.lift <= 0 &&
    e.rank !== "pawn" &&
    p.chain <= 1 &&
    Math.random() < (e.rank === "boss" ? 0.14 : 0.08)
  ) {
    const away = e.x >= fromX ? 1 : -1;
    e.vx = away * 280;
    e.guard = 0;
    floatText(sim, e.x, e.y - e.h - 8, "DODGE", "#d7ecff");
    return;
  }
  e.hp -= dealt;
  e.hurt = 0.14;
  const dir = e.x >= fromX ? 1 : -1;
  e.vx = dir * knock;
  e.x += dir * 4;
  if (opts.heavy || opts.finisher) {
    e.attackT = 0;
    e.guard = 0;
    e.stun = Math.max(e.stun, opts.stun ?? 0.28);
  } else if (opts.stun) e.stun = Math.max(e.stun, opts.stun);
  if (opts.launch) {
    e.liftV = -360;
    e.stun = Math.max(e.stun, 0.12);
  }
  floatText(sim, e.x, e.y - e.h - e.lift - 8, String(Math.round(dealt)), dealt >= 50 ? "#ffe27a" : "#fff");
  sim.shake = Math.min(10, sim.shake + (opts.finisher ? 6 : e.rank === "boss" ? 3 : 1.6));
  if (opts.finisher) sim.hitstop = Math.max(sim.hitstop, 0.09);
  if (!opts.gun) noteCombo(sim, !!opts.heavy || !!opts.finisher);
  if (sim.stats.steal > 0 && dealt > 0) {
    p.hp = Math.min(p.maxHp, p.hp + sim.stats.steal * 0.15);
  }
  if (e.hp <= 0) killEnemy(sim, e);
  else {
    hitFx(sim, e, fromX, false);
    sfx("hit");
  }
}

function hurtPlayer(sim: Sim, dmg: number, fromX: number, infect = false) {
  const p = sim.player;
  if (p.dead || sim.phase !== "play") return;
  if (p.dodgeT > 0 || (p.invuln > 0 && p.dodgeT <= 0 && !p.blocking)) {
    if (p.dodgeT > 0) {
      p.perfect = 0.7;
      floatText(sim, p.x, p.y - 160, "PERFECT", "#fff4a8");
      sim.rings.push({ x: p.x, y: p.y - 80, r: 18, life: 0.22, max: 0.22, color: "#fff4a8" });
    }
    return;
  }
  if (p.invuln > 0) return;
  let dealt = Math.max(1, Math.round(dmg * (1 - sim.stats.armor)));
  if (p.blocking) {
    dealt = Math.max(1, Math.round(dealt * 0.22));
    p.vx = (p.x >= fromX ? 1 : -1) * 70;
    floatText(sim, p.x, p.y - 150, "BLOCK", "#d7ecff");
    for (const e of sim.enemies) {
      if (e.dead > 0) continue;
      if (Math.abs(e.x - fromX) < 30) e.stun = Math.max(e.stun, 0.16);
    }
    sfx("hit");
    p.hp -= dealt;
  } else {
    p.hp -= dealt;
    p.invuln = 0.55;
    p.hurtT = 0.16;
    const dir = p.x >= fromX ? 1 : -1;
    p.vx = dir * 220;
    p.vy = Math.min(p.vy, -160);
    sim.shake = 7;
    sim.hitstop = 0.045;
    floatText(sim, p.x, p.y - 150, `-${dealt}`, "#ff8d8d");
    spray(sim, p.x, p.y - 90, dir, "#ef4444", 8, 160, "drop");
    sfx("hurt");
    p.comboT = 0;
  }
  if (infect && !p.blocking) p.infect = Math.max(p.infect, sim.stats.resist ? 3.5 : 7);
  if (p.hp <= 0) {
    p.hp = 0;
    p.dead = true;
    p.deadT = 0;
    p.vx = 0;
  }
}

function body(p: Player) {
  const kit = heroKit(p.hero);
  const h = p.crouch ? kit.bodyH * 0.62 : kit.bodyH;
  const w = p.crouch ? kit.bodyW * 0.9 : kit.bodyW;
  return { x: p.x - w / 2, y: p.y - h, w, h };
}

function fireGun(sim: Sim) {
  const p = sim.player;
  const gun = sim.gunId ? GUN_MAP[sim.gunId] : null;
  if (!gun || p.dead) {
    if (!gun && p.shootT <= 0) {
      sim.banner = "No firearm. Punch, or buy one in the armory.";
      sim.bannerT = 1.6;
    }
    return;
  }
  if (p.reloadT > 0 || p.fireCd > 0) return;
  if (p.mag <= 0) {
    startReload(sim);
    return;
  }
  p.mag -= 1;
  p.fireCd = gun.delay;
  p.shootT = Math.max(p.shootT, 0.18);
  sim.muzzle = 0.06;
  const lvl = 1;
  void lvl;
  const dmg = gunDamage(gun.id, /* filled below */ 1);
  // damage uses save level stored on sim via a field we'll set — see note in step by reading gunDamage from closure. We'll stash level on sim later.
  spawnShot(sim, gun, dmgFromSim(sim));
  sfx(gun.explosive ? "boom" : "shot");
  if (p.mag <= 0) startReload(sim);
}

function dmgFromSim(sim: Sim): number {
  if (!sim.gunId) return 0;
  const level = (sim as Sim & { gunLevel?: number }).gunLevel ?? 1;
  return gunDamage(sim.gunId, level);
}

function spawnShot(sim: Sim, gun: (typeof GUN_MAP)[string], dmg: number) {
  const p = sim.player;
  const y = p.y - (p.crouch ? 70 : 112);
  const origin = p.x + p.facing * 48;
  for (let i = 0; i < gun.pellets; i++) {
    const spread = (Math.random() - 0.5) * gun.spread * 2;
    const ang = spread;
    const vx = Math.cos(ang) * gun.speed * p.facing;
    const vy = Math.sin(ang) * gun.speed;
    sim.bullets.push({
      x: origin,
      y,
      vx,
      vy,
      dmg,
      r: gun.explosive ? 7 : 4,
      life: gun.explosive ? 1.3 : 0.85,
      friendly: true,
      color: gun.color,
      explosive: gun.explosive,
      pierce: gun.pierce,
      hit: [],
    });
  }
}

function startReload(sim: Sim) {
  const p = sim.player;
  const gun = sim.gunId ? GUN_MAP[sim.gunId] : null;
  if (!gun || p.reloadT > 0 || p.dead) return false;
  const need = gun.mag - p.mag;
  const have = sim.ammo[gun.id] ?? 0;
  if (need <= 0 || have <= 0) {
    if (need > 0 && have <= 0) {
      sim.banner = "Out of ammo. Buy a refill in the armory.";
      sim.bannerT = 1.4;
      return true;
    }
    return false;
  }
  p.reloadTake = Math.min(need, have);
  p.reloadT = gun.reload;
  sfx("reload");
  return true;
}

function explode(sim: Sim, x: number, y: number, dmg: number) {
  burst(sim, x, y, "#ffb020", 16, 220);
  sim.rings.push({ x, y, r: 20, life: 0.25, max: 0.25, color: "#ffd27a" });
  sim.shake = Math.min(10, sim.shake + 4);
  for (const e of sim.enemies) {
    if (e.dead > 0) continue;
    const dx = e.x - x;
    const dy = e.y - e.h * 0.5 - y;
    if (dx * dx + dy * dy < 86 * 86) hurtEnemy(sim, e, dmg, 260, x, { gun: true, heavy: true });
  }
}

function bossesAlive(sim: Sim) {
  return sim.enemies.some((e) => e.rank === "boss" && e.dead <= 0);
}

function respawn(sim: Sim) {
  const p = sim.player;
  p.lives -= 1;
  p.dead = false;
  p.deadT = 0;
  p.hp = Math.round(p.maxHp * 0.55);
  p.x = p.checkpoint;
  p.y = GROUND;
  p.vx = 0;
  p.vy = 0;
  p.invuln = 1.3;
  p.infect = 0;
  sim.banner = "Back in. Watch the crowd.";
  sim.bannerT = 1.6;
}

type Swing = {
  name: string;
  kind: "punch" | "kick";
  dur: number;
  dmg: number;
  kb: number;
  heavy?: boolean;
  launch?: boolean;
  aoe?: boolean;
  finisher?: boolean;
  stun?: number;
  dash?: number;
};

const LIGHTS: Swing[] = [
  { name: "Jab", kind: "punch", dur: 0.2, dmg: 16, kb: 90, stun: 0.06 },
  { name: "Cross", kind: "punch", dur: 0.24, dmg: 24, kb: 140, stun: 0.08 },
  { name: "Hook", kind: "punch", dur: 0.28, dmg: 32, kb: 210, stun: 0.14 },
  { name: "Uppercut", kind: "kick", dur: 0.32, dmg: 40, kb: 80, launch: true, stun: 0.16 },
];

const SPECIALS: Swing[] = [
  { name: "Power Punch", kind: "punch", dur: 0.34, dmg: 56, kb: 480, heavy: true, stun: 0.32 },
  { name: "Uppercut", kind: "kick", dur: 0.3, dmg: 48, kb: 90, launch: true, heavy: true, stun: 0.18 },
  { name: "Spin Attack", kind: "kick", dur: 0.4, dmg: 36, kb: 250, aoe: true, heavy: true, stun: 0.12 },
  { name: "Ground Slam", kind: "kick", dur: 0.34, dmg: 46, kb: 320, aoe: true, heavy: true, stun: 0.2 },
  { name: "Dash Strike", kind: "punch", dur: 0.26, dmg: 42, kb: 280, heavy: true, dash: 740, stun: 0.16 },
];

function beginSwing(sim: Sim, swing: Swing) {
  const p = sim.player;
  const haste = (p.rageT > 0 ? 0.8 : 1) * heroKit(p.hero).swing;
  p.meleeT = swing.dur * haste;
  p.moveDur = Math.max(0.05, p.meleeT);
  p.meleeKind = swing.kind;
  p.moveName = swing.name;
  p.hitThisSwing = false;
  p.heavySwing = !!swing.heavy;
  p.launchHit = !!swing.launch;
  p.aoeHit = !!swing.aoe;
  p.finisher = !!swing.finisher;
  p.swingDmg = swing.dmg * (p.perfect > 0 ? 1.15 : 1);
  p.swingKb = swing.kb;
  p.swingStun = swing.stun ?? 0.08;
  p.blocking = false;
  p.bufLight = 0;
  p.bufHeavy = 0;
  if (swing.dash) p.vx = p.facing * swing.dash;
  else if (p.onGround) p.vx *= 0.4;
  sfx(swing.heavy || swing.kind === "kick" ? "kick" : "punch");
}

function connectSwing(sim: Sim) {
  const p = sim.player;
  if (p.hitThisSwing) return;
  p.hitThisSwing = true;
  const dmg = p.swingDmg * sim.stats.meleeMul;
  const kb = p.swingKb * sim.stats.knock;
  const opts: HitOpts = {
    heavy: p.heavySwing,
    launch: p.launchHit,
    finisher: p.finisher,
    stun: p.swingStun,
  };
  let landed = false;
  for (const e of sim.enemies) {
    if (e.dead > 0) continue;
    const dx = e.x - p.x;
    const inFront = p.aoeHit || dx * p.facing > -16;
    const reach = p.aoeHit ? 126 : p.heavySwing ? 132 : 108;
    if (!inFront || Math.abs(dx) > reach || Math.abs(e.y - p.y) > 170) continue;
    hurtEnemy(sim, e, dmg, kb, p.x, opts);
    landed = true;
  }
  if (p.aoeHit) {
    sim.rings.push({ x: p.x, y: p.y - 20, r: 26, life: 0.22, max: 0.22, color: "#ffe1a8" });
    sim.shake = Math.min(10, sim.shake + 3);
  }
  if (p.finisher && landed) {
    sim.banner = "FINISHER";
    sim.bannerT = 0.8;
    sim.hitstop = Math.max(sim.hitstop, 0.1);
  }
  if (!landed && !p.aoeHit) p.comboT = Math.min(p.comboT, 0.35);
}

function weakenedInFront(sim: Sim) {
  const p = sim.player;
  for (const e of sim.enemies) {
    if (e.dead > 0 || e.hp > e.maxHp * 0.28) continue;
    const dx = e.x - p.x;
    if (dx * p.facing < -12) continue;
    if (Math.abs(dx) < 124 && e.lift <= 0) return true;
  }
  return false;
}

export function step(sim: Sim, input: Input, dt: number, gunLevel: number) {
  if (sim.phase !== "play") return;
  (sim as Sim & { gunLevel?: number }).gunLevel = gunLevel;
  const real = dt;
  if (sim.hitstop > 0) {
    sim.hitstop -= real;
    dt *= 0.25;
  }
  dt = Math.min(dt, 0.05);
  sim.elapsed += real;
  if (!sim.level.survival) sim.timeLeft = Math.max(0, sim.level.time - sim.elapsed);
  sim.shake = Math.max(0, sim.shake - real * 10);
  sim.bannerT = Math.max(0, sim.bannerT - real);
  sim.muzzle = Math.max(0, sim.muzzle - real);

  const p = sim.player;
  p.animT += real;
  p.invuln = Math.max(0, p.invuln - real);
  p.hurtT = Math.max(0, p.hurtT - real);
  p.shootT = Math.max(0, p.shootT - real);
  p.meleeT = Math.max(0, p.meleeT - real);
  p.fireCd = Math.max(0, p.fireCd - real);
  p.crossCd = Math.max(0, p.crossCd - real);
  p.bufLight = Math.max(0, p.bufLight - real);
  p.bufHeavy = Math.max(0, p.bufHeavy - real);
  p.dodgeT = Math.max(0, p.dodgeT - real);
  p.specialCd = Math.max(0, p.specialCd - real);
  p.rageT = Math.max(0, p.rageT - real);
  p.perfect = Math.max(0, p.perfect - real);
  if (p.comboT > 0) {
    p.comboT -= real;
    if (p.comboT <= 0) breakCombo(sim);
  }
  p.coyote = p.onGround ? 0.12 : Math.max(0, p.coyote - real);

  if (p.infect > 0 && !p.dead) {
    p.infect -= real;
    p.hp -= real * (sim.stats.resist ? 6 : 12);
    if (p.hp <= 0) {
      p.hp = 0;
      p.dead = true;
      p.deadT = 0;
    }
  }

  if (p.dead) {
    p.deadT += real;
    p.vx *= 0.9;
    if (p.deadT > 0.85) {
      if (p.lives > 1) respawn(sim);
      else {
        sim.phase = "lose";
        sfx("lose");
      }
    }
    integratePlayer(sim, dt, true);
    stepWorld(sim, real);
    return;
  }

  if (!sim.level.survival && sim.timeLeft <= 0) {
    sim.phase = "lose";
    sim.banner = "Time's up.";
    sfx("lose");
    return;
  }

  const stat = sim.stats.speed;
  const walkSpeed = 148 * stat;
  const runSpeed = 292 * stat;
  const crouch = input.crouch && p.onGround && p.meleeT <= 0 && p.dodgeT <= 0;
  p.crouch = crouch;
  let dir: -1 | 0 | 1 = 0;
  if (input.left && !input.right) dir = -1;
  else if (input.right && !input.left) dir = 1;
  if (dir !== 0) {
    if (p.holdDir !== dir) {
      p.holdDir = dir;
      p.holdT = 0;
    }
    p.holdT += real;
    p.facing = dir;
  } else {
    p.holdDir = 0;
    p.holdT = 0;
  }
  const running = dir !== 0 && p.holdT > 0.26 && !crouch;
  const cap = crouch ? walkSpeed * 0.46 : running ? runSpeed : walkSpeed;
  const swinging = p.meleeT > 0.1;
  if (p.dodgeT > 0) {
    p.vx *= Math.max(0, 1 - dt * 1.4);
  } else if (dir !== 0 && !p.blocking) {
    const accel = (running ? 1700 : 1120) * (p.onGround ? 1 : 0.72) * (swinging ? 0.45 : 1);
    const target = dir * (swinging ? cap * 0.4 : cap);
    if (p.vx < target) p.vx = Math.min(target, p.vx + accel * dt);
    else p.vx = Math.max(target, p.vx - accel * dt);
  } else if (p.onGround) {
    const fric = (p.blocking ? 2200 : 1280) * dt;
    if (Math.abs(p.vx) <= fric) p.vx = 0;
    else p.vx -= Math.sign(p.vx) * fric;
  }
  if (p.dodgeT <= 0) p.vx = Math.max(-runSpeed, Math.min(runSpeed, p.vx));
  if (p.onGround && Math.abs(p.vx) > 18 && p.meleeT <= 0 && !p.dead && !p.blocking && p.dodgeT <= 0) {
    const stride = running ? 74 : 46;
    p.gait += (Math.abs(p.vx) * real) / stride * Math.PI * 2;
  }

  if (input.jump) p.jumpBuf = 0.14;
  p.jumpBuf = Math.max(0, p.jumpBuf - real);
  if (p.jumpBuf > 0 && (p.onGround || p.coyote > 0) && !p.dead) {
    p.vy = -655;
    p.onGround = false;
    p.coyote = 0;
    p.jumpBuf = 0;
    p.crouch = false;
    sfx("jump");
    burst(sim, p.x, p.y, "#d7c3a2", 5, 70);
  }

  if (input.punch) p.bufLight = 0.18;
  if (input.kick) p.bufHeavy = 0.18;
  p.blocking = input.guard && p.onGround && p.dodgeT <= 0 && p.meleeT <= 0.02 && !p.slamPending;
  if (p.blocking) {
    p.vx *= 0.45;
    p.bufLight = 0;
    p.bufHeavy = 0;
  }

  const canAct = !p.blocking && p.dodgeT <= 0 && p.meleeT <= 0.08;
  if (canAct && p.bufHeavy > 0) {
    if (!p.onGround) {
      beginSwing(sim, { name: "Air Kick", kind: "kick", dur: 0.28, dmg: 34, kb: 180, heavy: true, stun: 0.1 });
      p.vy = Math.max(p.vy, 240);
      p.slamPending = true;
    } else if (weakenedInFront(sim)) {
      beginSwing(sim, { name: "Finisher", kind: "kick", dur: 0.42, dmg: 86, kb: 360, heavy: true, finisher: true, stun: 0.35 });
    } else {
      beginSwing(sim, { name: "Heavy Kick", kind: "kick", dur: 0.36, dmg: 48, kb: 340, heavy: true, stun: 0.26 });
    }
  } else if (canAct && p.bufLight > 0) {
    if (!p.onGround) {
      beginSwing(sim, { name: "Air Jab", kind: "punch", dur: 0.24, dmg: 26, kb: 120, stun: 0.08 });
    } else {
      const spec = LIGHTS[p.chain % LIGHTS.length]!;
      beginSwing(sim, spec);
      p.chain = (p.chain + 1) % LIGHTS.length;
      if (p.chain === 0) p.comboT = Math.max(p.comboT, 0.45);
    }
  }

  if (input.shoot) {
    if (sim.gunId) fireGun(sim);
    else if (canAct) beginSwing(sim, SPECIALS[4]!);
  }
  if (input.reload) {
    const reloaded = startReload(sim);
    if (!reloaded && p.dodgeT <= 0 && p.meleeT <= 0.02) {
      const dir: 1 | -1 = input.left ? -1 : input.right ? 1 : p.facing;
      p.facing = dir;
      p.dodgeT = 0.24;
      p.vx = dir * 560;
      p.meleeT = 0;
      p.blocking = false;
      p.bufLight = 0;
      p.bufHeavy = 0;
      burst(sim, p.x, p.y - 20, "#d7ecff", 6, 90);
      sfx("jump");
    }
  }
  if (p.reloadT > 0) {
    p.reloadT -= real;
    if (p.reloadT <= 0 && sim.gunId) {
      const take = p.reloadTake;
      sim.ammo[sim.gunId] = Math.max(0, (sim.ammo[sim.gunId] ?? 0) - take);
      p.mag += take;
      p.reloadTake = 0;
    }
  }

  if (input.cross && p.specialCd <= 0 && p.dodgeT <= 0 && p.meleeT <= 0.08) {
    if (p.meter >= 100) {
      p.meter = 0;
      beginSwing(sim, { name: "Ultimate", kind: "kick", dur: 0.48, dmg: 96, kb: 400, aoe: true, heavy: true, finisher: true, stun: 0.4 });
      sim.banner = "ULTIMATE";
      sim.bannerT = 1.1;
      sim.hitstop = 0.12;
      p.specialCd = 1.3;
    } else {
      const spec = { ...SPECIALS[p.specialIx % SPECIALS.length]! };
      p.specialIx = (p.specialIx + 1) % SPECIALS.length;
      if (p.charges > 0) {
        p.charges -= 1;
        p.infect = 0;
        spec.dmg *= 1.2;
        sim.rings.push({ x: p.x, y: p.y - 40, r: 24, life: 0.28, max: 0.28, color: "#d8fff4" });
      }
      beginSwing(sim, spec);
      if (spec.name === "Ground Slam" && !p.onGround) p.slamPending = true;
      p.specialCd = p.rageT > 0 ? 0.7 : 1.05;
      sim.banner = spec.name;
      sim.bannerT = 0.7;
    }
  }

  if (input.meds) {
    if (p.meds <= 0) {
      sim.banner = "No medicine left.";
      sim.bannerT = 1.2;
    } else if (p.hp >= p.maxHp - 1 && p.infect <= 0) {
      sim.banner = "Already healthy.";
      sim.bannerT = 1;
    } else {
      p.meds -= 1;
      p.hp = Math.min(p.maxHp, p.hp + p.maxHp * sim.stats.healPct);
      p.infect = 0;
      sfx("heal");
      burst(sim, p.x, p.y - 50, "#8dffb0", 8, 80);
    }
  }

  if (p.meleeT > 0 && !p.hitThisSwing && p.moveDur > 0) {
    const along = 1 - p.meleeT / p.moveDur;
    if (along >= 0.36 && along <= 0.7) connectSwing(sim);
  }

  integratePlayer(sim, dt, false);
  if (p.slamPending && p.onGround) {
    p.slamPending = false;
    beginSwing(sim, { name: "Ground Slam", kind: "kick", dur: 0.22, dmg: 50, kb: 330, aoe: true, heavy: true, stun: 0.22 });
    sim.shake = 7;
  }
  stepRoute(sim);
  stepEnemies(sim, dt);
  stepBullets(sim, dt);
  stepRobot(sim, dt);
  stepWorld(sim, real);
  checkExit(sim, input, real);

  if (sim.level.survival) stepWaves(sim, real);
}

function stepRoute(sim: Sim) {
  if (sim.level.survival) return;
  const list = sim.level.encounters;
  if (sim.liveEnc >= 0) {
    const alive = sim.enemies.some((e) => e.enc === sim.liveEnc && e.dead <= 0);
    if (alive) {
      if (sim.player.x > sim.gateX) {
        sim.player.x = sim.gateX;
        if (sim.player.vx > 0) sim.player.vx = 0;
      }
      return;
    }
    sim.liveEnc = -1;
    sim.gateX = 1e9;
    sim.encCursor += 1;
    const next = list[sim.encCursor];
    if (next) {
      sim.nextAt = sim.player.x + next.walk;
      sim.banner = "Area clear. Move up.";
    } else {
      sim.banner = "Road's open. Reach the door.";
    }
    sim.bannerT = 1.8;
    return;
  }
  if (sim.encCursor >= list.length) return;
  if (sim.player.x < sim.nextAt) return;
  const enc = list[sim.encCursor];
  if (!enc) return;
  const view = sim.viewW > 0 ? sim.viewW : VW;
  const offscreen = sim.camX + view + 24;
  let base = Math.min(offscreen, sim.player.x + 480);
  base = Math.max(base, sim.player.x + 300);
  const maxX = sim.level.width - 200;
  if (base > maxX) base = Math.max(sim.player.x + 300, maxX);
  const lvl = sim.level.id;
  const mul = (1 + (lvl - 1) * 0.18) * (1 + sim.encCursor * 0.08);
  let last = base;
  enc.foes.forEach((f, i) => {
    const x = Math.min(sim.level.width - 80, base + i * 86);
    last = x;
    const e = makeEnemy(sim, x, f.rank, f.faction ?? sim.level.faction, mul * (f.rank === "boss" ? 1.2 : 1));
    e.enc = sim.encCursor;
    e.touch = Math.round(e.touch * (1 + (lvl - 1) * 0.1));
    e.speed *= 1 + (lvl - 1) * 0.04 + (f.rank === "elite" ? 0.08 : 0);
    if (lvl >= 2 && f.rank !== "pawn") e.cd *= 0.8;
    sim.enemies.push(e);
  });
  sim.gateX = Math.min(sim.level.width - 70, last + 130);
  sim.liveEnc = sim.encCursor;
  const hasBoss = enc.foes.some((f) => f.rank === "boss");
  sim.banner = hasBoss ? "Boss on the road." : sim.encCursor === 0 ? "Here they come." : "Next group.";
  sim.bannerT = 1.5;
}

function integratePlayer(sim: Sim, dt: number, dead: boolean) {
  const p = sim.player;
  p.vy += 1700 * dt;
  if (p.vy > 820) p.vy = 820;
  const prevY = p.y;
  p.x += p.vx * dt;
  const minX = 40;
  const maxX = sim.level.survival ? p.x + 2000 : sim.level.width - 40;
  if (p.x < minX) p.x = minX;
  if (!sim.level.survival && p.x > maxX) p.x = maxX;
  p.y += p.vy * dt;
  let landed = false;
  if (p.vy >= 0 && prevY <= GROUND && p.y >= GROUND) {
    p.y = GROUND;
    p.vy = 0;
    landed = true;
  }
  if (!dead && p.vy >= 0) {
    for (const plat of sim.level.platforms) {
      const within = p.x > plat.x - 8 && p.x < plat.x + plat.w + 8;
      if (within && prevY <= plat.y && p.y >= plat.y) {
        p.y = plat.y;
        p.vy = 0;
        landed = true;
      }
    }
  }
  const was = p.onGround;
  p.onGround = landed || (p.y >= GROUND && p.vy === 0);
  if (p.onGround && !was && prevY < p.y - 0.5) burst(sim, p.x, p.y, "#cbb89a", 4, 60);
  if (p.onGround && !p.dead) {
    const lamps = sim.level.survival ? p.checkpoint : Math.floor(p.x / 700) * 700 + 80;
    if (!sim.level.survival && p.x > p.checkpoint + 500) p.checkpoint = Math.max(80, p.x - 40);
    void lamps;
  }
  const look = p.facing * 56;
  const view = sim.viewW > 0 ? sim.viewW : VW;
  let target = p.x - view * 0.36 + look;
  const maxCam = sim.level.survival ? Math.max(0, p.x - 80) : Math.max(0, sim.level.width - view);
  if (target < 0) target = 0;
  if (!sim.level.survival && target > maxCam) target = maxCam;
  const k = 1 - Math.exp(-5 * dt);
  sim.camX += (target - sim.camX) * k;
}

function glide(e: Enemy, target: number, dt: number, rate = 980) {
  const step = rate * dt;
  if (Math.abs(e.vx - target) <= step) e.vx = target;
  else e.vx += Math.sign(target - e.vx) * step;
  e.x += e.vx * dt;
}

function stepEnemies(sim: Sim, dt: number) {
  const p = sim.player;
  for (const e of sim.enemies) {
    if (e.removed) continue;
    e.hurt = Math.max(0, e.hurt - dt);
    e.cd = Math.max(0, e.cd - dt);
    e.shootCd = Math.max(0, e.shootCd - dt);
    e.touchCd = Math.max(0, e.touchCd - dt);
    e.stun = Math.max(0, e.stun - dt);
    e.guard = Math.max(0, e.guard - dt);
    e.walk += dt * (50 + e.speed);
    if (e.intro > 0 && e.dead <= 0) {
      e.intro = Math.max(0, e.intro - dt);
      e.lift = e.intro * 280;
      e.liftV = 0;
      e.vx = 0;
      e.attackT = 0;
      if (e.intro <= 0) {
        e.lift = 0;
        sim.shake = 10;
        sim.banner = "STAKE";
        sim.bannerT = 1.3;
        burst(sim, e.x, GROUND, "#dbe7ff", 14, 180);
      }
      continue;
    }
    if (e.lift > 0 || e.liftV !== 0) {
      e.lift += e.liftV * dt;
      e.liftV += 1200 * dt;
      if (e.lift <= 0 && e.liftV > 0) {
        e.lift = 0;
        e.liftV = 0;
        if (e.intro > 0) {
          e.intro = 0;
          sim.shake = 10;
          sim.banner = "STAKE";
          sim.bannerT = 1.3;
          burst(sim, e.x, GROUND, "#dbe7ff", 14, 180);
        } else {
          e.stun = Math.max(e.stun, 0.22);
          burst(sim, e.x, GROUND, "#cbb89a", 6, 80);
        }
      }
    }
    if (e.dead > 0) {
      e.dead += dt;
      e.vx *= 0.8;
      e.x += e.vx * dt;
      if (e.dead > 0.85) e.removed = true;
      continue;
    }
    const dx = p.x - e.x;
    const adx = Math.abs(dx);
    const see = sim.level.survival ? adx < 780 : adx < 980;
    if (!see || p.dead) {
      e.vx *= 0.9;
      e.x += e.vx * dt;
      e.attackT = 0;
      continue;
    }
    e.facing = dx === 0 ? e.facing : dx > 0 ? 1 : -1;
    const phase2 = e.rank === "boss" && e.hp < e.maxHp * 0.5;
    if (phase2 && !e.phased) {
      e.phased = true;
      e.speed *= 1.18;
      sim.banner = `${e.name} gets serious`;
      sim.bannerT = 1.4;
    }
    const reach = e.rank === "boss" ? 124 : e.rank === "elite" ? 102 : 88;
    if (e.stun > 0 || e.lift > 0) {
      e.attackT = 0;
      e.x += e.vx * dt;
      e.vx *= 0.88;
    } else if (e.attackT > 0) {
      const prev = e.attackT;
      e.attackT -= dt;
      if (e.hurt > 0.02) {
        e.x += e.vx * dt;
        e.vx *= 0.86;
      } else {
        const lunging = prev > 0.12;
        e.vx = e.facing * (lunging ? (e.rank === "boss" ? 140 : 260) : 60);
        e.x += e.vx * dt;
      }
      if (prev > 0.13 && e.attackT <= 0.13 && Math.abs(p.y - e.y) < 120 && Math.abs(p.x - e.x) < reach + 36) {
        hurtPlayer(sim, e.touch + (e.rank === "boss" ? 10 : 0), e.x, e.infect);
        spray(sim, (p.x + e.x) * 0.5, p.y - 90, e.facing, e.color, 5, 140, "spark");
      }
    } else if (e.hurt > 0.02) {
      e.x += e.vx * dt;
      e.vx *= 0.86;
    } else if (e.slam > 0) {
      e.slam -= dt;
      e.vx = 0;
      e.attackT = Math.max(e.attackT, 0.2);
      if (e.slam <= 0.02) {
        if (Math.abs(p.x - e.x) < 170 && Math.abs(p.y - e.y) < 140 && !p.dead) hurtPlayer(sim, e.touch + 18, e.x, e.infect);
        burst(sim, e.x, GROUND, e.color, 12, 160);
        sim.shake = 8;
        e.attackT = 0;
      }
    } else if (e.charge !== 0) {
      if (e.charge < 0) {
        e.charge += dt;
        e.vx = 0;
        e.attackT = 0.28;
        if (e.charge >= 0) e.charge = 0.36;
      } else {
        e.charge -= dt;
        e.attackT = 0;
        e.vx = e.facing * (e.rank === "boss" ? 460 : 340);
        e.x += e.vx * dt;
        if (e.charge <= 0) {
          e.charge = 0;
          if (Math.abs(p.x - e.x) < reach + 28 && Math.abs(p.y - e.y) < 130) hurtPlayer(sim, e.touch + 8, e.x, e.infect);
          burst(sim, e.x, GROUND, e.color, 8, 120);
        }
      }
    } else if (e.ranged && adx > 168 && adx < 540 && e.rank !== "boss") {
      const prefer = e.rank === "pawn" ? 250 : 300;
      const target = adx < prefer - 30 ? -e.facing * e.speed * 0.9 : adx > prefer + 70 ? e.facing * e.speed : 0;
      glide(e, target, dt, 860);
      if (e.shootCd <= 0) {
        e.shootCd = e.rank === "boss" ? 0.85 : e.rank === "elite" ? 1.15 : 1.45;
        const vy = ((p.y - 100 - (e.y - e.h * 0.62)) / Math.max(0.25, adx)) * 240;
        sim.bullets.push({
          x: e.x + e.facing * (e.w * 0.45),
          y: e.y - e.h * 0.62,
          vx: e.facing * (e.rank === "boss" ? 360 : 300),
          vy: Math.max(-180, Math.min(180, vy)),
        dmg: Math.round((e.rank === "boss" ? 18 : e.rank === "elite" ? 14 : 11) * (1 + (sim.level.id - 1) * 0.08)),
          r: 5,
          life: 1.6,
          friendly: false,
          color: e.color,
          explosive: false,
          pierce: 0,
          hit: [],
        });
        spray(sim, e.x + e.facing * 24, e.y - e.h * 0.62, e.facing, e.color, 3, 80, "spark");
      }
    } else if (adx > reach + (e.rank === "boss" ? 220 : 8)) {
      glide(e, e.facing * e.speed * (phase2 ? 1.35 : 1.22), dt, 1100);
    } else if (e.cd <= 0) {
      const threatened = p.combo >= 3 && adx < 150 && e.rank !== "boss";
      if (e.rank !== "pawn" && threatened && Math.random() < 0.55) {
        e.guard = 0.5;
        e.cd = 0.45;
        e.vx = 0;
      } else if (e.rank === "boss") {
        e.pattern = (e.pattern + 1) % 3;
        e.vx = 0;
        if (e.pattern === 1 && adx > 140) {
          e.charge = -0.34;
          e.cd = phase2 ? 1.05 : 1.35;
          sim.banner = `${e.name} is charging.`;
          sim.bannerT = 0.7;
        } else if (e.pattern === 2) {
          e.slam = phase2 ? 0.42 : 0.62;
          e.cd = phase2 ? 1.4 : 1.8;
          sim.banner = "Slam incoming.";
          sim.bannerT = 0.7;
        } else {
          e.attackT = phase2 ? 0.4 : 0.58;
          e.cd = phase2 ? 0.75 : 1;
        }
      } else {
        e.attackT = e.rank === "elite" ? 0.48 : 0.34;
        e.cd = (e.rank === "elite" ? 0.62 : 0.7) * (sim.level.id >= 3 ? 0.9 : 1);
        e.vx = 0;
      }
    } else if (adx < reach * 0.7) {
      glide(e, -e.facing * e.speed * 0.62, dt, 820);
    } else {
      glide(e, 0, dt, 1400);
    }
    if (phase2 && e.rank === "boss" && e.slam <= 0 && e.charge === 0 && e.attackT <= 0 && e.cd <= 0 && adx < 260 && Math.random() < dt * 0.35) {
      e.slam = 0.48;
      e.cd = 1.6;
    }
    const bb = body(p);
    if (
      e.attackT <= 0 &&
      e.stun <= 0 &&
      e.lift <= 0 &&
      e.touchCd <= 0 &&
      !p.dead &&
      overlap(bb.x, bb.y, bb.w, bb.h, e.x - e.w * 0.32, e.y - e.h * 0.9, e.w * 0.64, e.h * 0.9)
    ) {
      e.touchCd = 1.05;
      hurtPlayer(sim, Math.max(8, Math.round(e.touch * 0.65)), e.x, e.infect && e.rank !== "pawn");
    }
    if (!sim.level.survival) {
      e.x = Math.max(40, Math.min(sim.level.width - 40, e.x));
    }
  }
  sim.enemies = sim.enemies.filter((e) => !e.removed);
}

function stepBullets(sim: Sim, dt: number) {
  const p = sim.player;
  for (const b of sim.bullets) {
    b.life -= dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.friendly) {
      for (const e of sim.enemies) {
        if (e.dead > 0 || b.hit.includes(e.id)) continue;
        if (overlap(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2, e.x - e.w * 0.4, e.y - e.h, e.w * 0.85, e.h)) {
          b.hit.push(e.id);
          if (b.explosive) {
            explode(sim, b.x, b.y, b.dmg);
            b.life = 0;
          } else {
            hurtEnemy(sim, e, b.dmg, 40, b.x - b.vx, { gun: true });
            if (b.hit.length > b.pierce) b.life = 0;
          }
        }
      }
    } else if (!p.dead) {
      const bb = body(p);
      if (overlap(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2, bb.x, bb.y, bb.w, bb.h)) {
        const infect = b.color === FACTIONS.rainbet.color;
        hurtPlayer(sim, b.dmg, b.x, infect);
        b.life = 0;
      }
    }
  }
  sim.bullets = sim.bullets.filter((b) => b.life > 0);
}

function stepRobot(sim: Sim, dt: number) {
  const r = sim.robot;
  if (!r || sim.player.dead) return;
  const goal = sim.player.x - sim.player.facing * 58;
  r.x += (goal - r.x) * Math.min(1, dt * 4);
  r.y = GROUND;
  r.facing = sim.player.facing;
  r.walk += Math.abs(goal - r.x) * dt;
  r.cd -= dt;
  if (r.cd <= 0) {
    let best: Enemy | null = null;
    let bestD = 520;
    for (const e of sim.enemies) {
      if (e.dead > 0) continue;
      const d = Math.abs(e.x - r.x);
      if (d < bestD) {
        best = e;
        bestD = d;
      }
    }
    if (best) {
      r.facing = best.x >= r.x ? 1 : -1;
      r.cd = 0.38;
      sim.bullets.push({
        x: r.x + r.facing * 24,
        y: r.y - 42,
        vx: r.facing * 740,
        vy: 0,
        dmg: 14,
        r: 3,
        life: 0.7,
        friendly: true,
        color: "#7dd3fc",
        explosive: false,
        pierce: 0,
        hit: [],
      });
      sim.muzzle = Math.max(sim.muzzle, 0.04);
    }
  }
}

function stepWorld(sim: Sim, dt: number) {
  for (const part of sim.particles) {
    part.life -= dt;
    if (part.kind === "pool") continue;
    part.x += part.vx * dt;
    part.y += part.vy * dt;
    part.vy += part.g * dt;
    if (part.y > GROUND - 1 && part.vy > 0 && part.kind !== "spark") {
      part.y = GROUND - 1;
      part.vy *= -0.18;
      part.vx *= 0.4;
      if (Math.abs(part.vy) < 40) part.vy = 0;
    }
  }
  sim.particles = sim.particles.filter((p) => p.life > 0);
  for (const f of sim.floats) {
    f.life -= dt;
    f.y -= 36 * dt;
  }
  sim.floats = sim.floats.filter((f) => f.life > 0);
  for (const ring of sim.rings) ring.life -= dt;
  sim.rings = sim.rings.filter((r) => r.life > 0);
}

function checkExit(sim: Sim, input: Input, dt: number) {
  if (sim.level.survival || sim.player.dead) return;
  const goal = sim.level.width - 130;
  const near = Math.abs(sim.player.x - goal) < 54 && sim.player.onGround;
  if (near && routeOpen(sim)) {
    sim.exitHold += dt;
    if (input.crouch || sim.exitHold > 0.45) {
      sim.phase = "win";
      sfx("win");
    }
  } else sim.exitHold = 0;
}

const WAVE_FACTIONS: FactionId[] = ["roobet", "stake", "bcgame", "rollbit", "shuffle", "duelbits", "rainbet"];

function stepWaves(sim: Sim, dt: number) {
  sim.waveT -= dt;
  if (sim.waveT > 0) return;
  sim.wave += 1;
  sim.waveT = Math.max(5.5, 9 - sim.wave * 0.15);
  const faction = WAVE_FACTIONS[(sim.wave - 1) % WAVE_FACTIONS.length] ?? "roobet";
  const mul = 1 + sim.wave * 0.08;
  const count = 2 + Math.floor(sim.wave / 2);
  for (let i = 0; i < count; i++) {
    const rank: Rank = sim.wave % 7 === 0 ? "boss" : sim.wave % 3 === 0 && i === 0 ? "elite" : "pawn";
    const x = sim.player.x + 460 + i * 70 + (sim.wave % 2 === 0 ? 0 : 40);
    sim.enemies.push(makeEnemy(sim, x, rank === "boss" && i > 0 ? "elite" : rank, faction, mul));
  }
  sim.banner = `Wave ${sim.wave}`;
  sim.bannerT = 1.4;
  sim.enemies = sim.enemies.filter((e) => e.dead > 0 || e.x > sim.player.x - 800);
}

export function goalX(sim: Sim) {
  return sim.level.width - 130;
}

export function routeOpen(sim: Sim) {
  if (sim.level.survival) return false;
  return sim.liveEnc < 0 && sim.encCursor >= sim.level.encounters.length && !bossesAlive(sim);
}

export function bossesLeft(sim: Sim) {
  return sim.enemies.filter((e) => e.rank === "boss" && e.dead <= 0).length;
}
