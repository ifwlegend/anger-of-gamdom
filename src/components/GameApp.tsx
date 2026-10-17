import { useEffect, useRef, useState, type PointerEvent as PE } from "react";
import titleArt from "@/assets/gamdom-title.jpg";
import { setAudioPrefs, sfx, tickMusic, unlockAudio } from "@/game/audio";
import {
  AMMO_COST,
  GUNS,
  GUN_MAP,
  LEVELS,
  LEVEL_MAP,
  MED_FILL_COST,
  MELEE,
  ROBOT_COST,
  ROBOT_WAS,
  SQUAD_COST,
  WARD_COST,
  armorCost,
  bootCost,
  comma,
  coreCost,
  crossCost,
  formatClock,
  gunUpgradeCost,
  hpCost,
  medCost,
  stealCost,
} from "@/game/content";
import { draw } from "@/game/draw";
import { bindKeyboard, clearProbe, pad, pulse, readInput, setProbeKeys, type PadKey } from "@/game/input";
import {
  derived,
  defaultSave,
  finishRun,
  gunDamage,
  loadSave,
  purchase,
  writeSave,
  type RunSummary,
  type Save,
} from "@/game/save";
import { emptyAssets, loadAssets, type Assets } from "@/game/sprites";
import { VW, FRAME_H, bossesLeft, createSim, step, type Sim } from "@/game/sim";
import { HERO_ORDER, HEROES, heroKit, heroOf, heroPortrait, type HeroId } from "@/game/heroes";

type Screen = "menu" | "cast" | "levels" | "shop" | "play";
type Act = { id: string; label: string; price: string; currency: "coins" | "gems" | "none" };
type Card = {
  id: string;
  label: string;
  badge: string;
  locked: boolean;
  equipped: boolean;
  blurb: string;
  lines: string[];
  acts: Act[];
};
type Hud = {
  hp: number;
  maxHp: number;
  lives: number;
  meds: number;
  coins: number;
  charges: number;
  mag: number;
  reserve: number;
  gun: string;
  clock: string;
  progress: string;
  levelName: string;
  banner: string;
  bannerOn: boolean;
  survival: boolean;
  infect: boolean;
  reloading: boolean;
  hero: HeroId;
};

const weaponModules = import.meta.glob("../assets/weapons/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const weaponArt: Record<string, string> = {};
for (const [path, url] of Object.entries(weaponModules)) {
  const name = path.split("/").pop()?.replace(/\.(png|jpe?g|webp)$/i, "") ?? "";
  if (name) weaponArt[name] = url;
}

const PAGES: { title: string; ids: string[] }[] = [
  { title: "GEAR", ids: ["hp", "cross", "boots", "armor", "squad", "resist", "core", "steal"] },
  { title: "EQUIPMENT", ids: ["meds", "fillmeds", "fists", "knife", "bat", "axe", "ammo"] },
  { title: "ITEMS", ids: GUNS.filter((g) => g.page === 3).map((g) => g.id) },
  { title: "ITEMS", ids: [...GUNS.filter((g) => g.page === 4).map((g) => g.id), "robot"] },
];

function cardFor(id: string, save: Save): Card {
  const d = derived(save);
  if (id === "hp") {
    const maxed = save.hpLevel >= 7;
    const cost = hpCost(save.hpLevel);
    return {
      id, label: "LIFE", badge: `${save.hpLevel}/7`, locked: false, equipped: true,
      blurb: "Raises the health you bring into every fight.",
      lines: [`HP ${comma(d.maxHp)}`, maxed ? "Maxed" : "Next rank +80 HP"],
      acts: [{ id: "hp", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(cost), currency: "gems" }],
    };
  }
  if (id === "cross") {
    const maxed = save.crossLevel >= 6;
    const cost = crossCost(save.crossLevel);
    return {
      id, label: "CROSS", badge: `${d.charges}`, locked: false, equipped: true,
      blurb: "Holy cross. A burst that clears infection and hurts everything close.",
      lines: [`Charges ${d.charges}`, `Damage ${d.crossDmg}`],
      acts: [{ id: "cross", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(cost), currency: "gems" }],
    };
  }
  if (id === "boots") {
    const maxed = save.boots >= 5;
    const cost = bootCost(save.boots);
    return {
      id, label: "BOOTS", badge: `${save.boots}/5`, locked: false, equipped: true,
      blurb: "Lighter steps. Run speed climbs with each rank.",
      lines: [`Speed ${Math.round(d.speed * 100)}%`],
      acts: [{ id: "boots", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(cost), currency: "coins" }],
    };
  }
  if (id === "armor") {
    const maxed = save.armor >= 5;
    const cost = armorCost(save.armor);
    return {
      id, label: "PLATE", badge: `${save.armor}/5`, locked: false, equipped: true,
      blurb: "Cuts a share of incoming damage. Caps at 35%.",
      lines: [`Reduction ${Math.round(d.armor * 100)}%`],
      acts: [{ id: "armor", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(cost), currency: "coins" }],
    };
  }
  if (id === "fists" || id === "knife" || id === "bat" || id === "axe") {
    const m = MELEE[id];
    const owned = save.ownedMelee.includes(id);
    const eq = save.melee === id;
    return {
      id, label: m.name, badge: owned ? (eq ? "EQ" : "OWN") : comma(m.cost),
      locked: !owned, equipped: eq, blurb: m.blurb,
      lines: [`Melee x${m.mul.toFixed(2)}`, id === "bat" || id === "axe" ? "Extra knockback" : "Close range"],
      acts: [{ id, label: !owned ? "BUY" : eq ? "EQUIPPED" : "EQUIP", price: !owned ? comma(m.cost) : "", currency: !owned ? "coins" : "none" }],
    };
  }
  if (id === "meds") {
    const maxed = save.medLevel >= 6;
    const cost = medCost(save.medLevel);
    return {
      id, label: "MEDICINE", badge: `${save.medicine}/${d.medCap}`, locked: false, equipped: true,
      blurb: "Drink to cure infection and restore a chunk of health.",
      lines: [`Carried ${save.medicine}`, `Cap ${d.medCap}`],
      acts: [{ id: "meds", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(cost), currency: "gems" }],
    };
  }
  if (id === "fillmeds") {
    const full = save.medicine >= d.medCap;
    return {
      id, label: "REFILL", badge: `${save.medicine}/${d.medCap}`, locked: false, equipped: false,
      blurb: "Restock medicine bottles up to your current cap.",
      lines: ["Coins, not gems"],
      acts: [{ id: "fillmeds", label: full ? "FULL" : "REFILL", price: full ? "" : comma(MED_FILL_COST), currency: "coins" }],
    };
  }
  if (id === "core") {
    const maxed = save.coreLevel >= 4;
    const cost = coreCost(save.coreLevel);
    return {
      id, label: "CORE", badge: `${save.coreLevel}/4`, locked: false, equipped: true,
      blurb: "Each bottle heals a larger share of max HP.",
      lines: [`Heal ${Math.round(d.healPct * 100)}%`],
      acts: [{ id: "core", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(cost), currency: "gems" }],
    };
  }
  if (id === "squad") {
    const maxed = save.squad >= 3;
    return {
      id, label: "SQUAD", badge: `x${save.squad}`, locked: false, equipped: true,
      blurb: "An extra life. You come back at the last checkpoint.",
      lines: [`Lives ${save.squad}`],
      acts: [{ id: "squad", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(SQUAD_COST), currency: "gems" }],
    };
  }
  if (id === "steal") {
    const maxed = save.lifesteal >= 3;
    const cost = stealCost(save.lifesteal);
    return {
      id, label: "SIPHON", badge: `${save.lifesteal}/3`, locked: save.lifesteal === 0, equipped: save.lifesteal > 0,
      blurb: "Melee hits give a little health back.",
      lines: [`On hit +${d.steal}`],
      acts: [{ id: "steal", label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(cost), currency: "coins" }],
    };
  }
  if (id === "resist") {
    const owned = save.resist >= 1;
    return {
      id, label: "WARD", badge: owned ? "OWN" : "LOCK", locked: !owned, equipped: owned,
      blurb: "Infection fades faster and bites for less.",
      lines: [owned ? "Ward online" : "One-time buy"],
      acts: [{ id: "resist", label: owned ? "OWNED" : "BUY", price: owned ? "" : comma(WARD_COST), currency: "coins" }],
    };
  }
  if (id === "ammo") {
    return {
      id, label: "AMMO", badge: "ALL", locked: save.ownedGuns.length === 0, equipped: false,
      blurb: "Refill every owned firearm to six magazines.",
      lines: save.ownedGuns.length ? save.ownedGuns.map((g) => GUN_MAP[g]?.name ?? g) : ["Buy a gun first"],
      acts: [{ id: "ammo", label: "REFILL", price: comma(AMMO_COST), currency: "coins" }],
    };
  }
  if (id === "robot") {
    return {
      id, label: "ROBOT", badge: save.robot ? (save.robotOn ? "ON" : "OFF") : "LOCK",
      locked: !save.robot, equipped: !!save.robotOn,
      blurb: "A combat robot follows you and shoots on its own.",
      lines: [`Was ${comma(ROBOT_WAS)}`, "40% off this run", "Stays with you after the buy"],
      acts: [{
        id: "robot",
        label: save.robot ? (save.robotOn ? "STANDBY" : "DEPLOY") : "BUY",
        price: save.robot ? "" : comma(ROBOT_COST),
        currency: save.robot ? "none" : "coins",
      }],
    };
  }
  const g = GUN_MAP[id];
  if (g) {
    const owned = save.ownedGuns.includes(g.id);
    const lvl = save.gunLevels[g.id] ?? 1;
    const dmg = gunDamage(g.id, owned ? lvl : 1);
    const maxed = owned && lvl >= 5;
    const up = gunUpgradeCost(g, Math.max(1, lvl));
    const acts: Act[] = [];
    if (!owned) acts.push({ id: `gun:${g.id}`, label: "BUY", price: comma(g.cost), currency: "coins" });
    else {
      acts.push({ id: `gun:${g.id}`, label: save.gunId === g.id ? "EQUIPPED" : "EQUIP", price: "", currency: "none" });
      acts.push({ id: `up:${g.id}`, label: maxed ? "MAX" : "Upgrade", price: maxed ? "" : comma(up), currency: "coins" });
    }
    return {
      id: g.id, label: g.name,
      badge: owned ? `${save.ammo[g.id] ?? 0}/${g.mag}` : `0/${g.mag}`,
      locked: !owned, equipped: save.gunId === g.id, blurb: g.blurb,
      lines: [`LV ${owned ? lvl : 1} · Damage ${dmg}`, `Mag ${g.mag} · Reload ${g.reload.toFixed(1)}s`, `Fire ${Math.round(g.delay * 1000)}ms`],
      acts,
    };
  }
  return { id, label: id, badge: "", locked: true, equipped: false, blurb: "", lines: [], acts: [] };
}

function releasePad() {
  (Object.keys(pad) as PadKey[]).forEach((k) => {
    pad[k] = false;
  });
  clearProbe();
}

function ammoBank(sim: Sim) {
  const ammo = { ...sim.ammo };
  if (sim.gunId) ammo[sim.gunId] = (ammo[sim.gunId] ?? 0) + sim.player.mag;
  return ammo;
}

let landscapeLockTried = false;

function edgeStrips(img: HTMLImageElement) {
  const sw = Math.max(16, Math.round(img.naturalWidth * 0.08));
  const paint = (sx: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.drawImage(img, sx, 0, sw, img.naturalHeight, 0, 0, sw, img.naturalHeight);
    return canvas.toDataURL("image/jpeg", 0.85);
  };
  return { left: paint(0), right: paint(img.naturalWidth - sw) };
}

function requestGameLandscape() {
  if (landscapeLockTried) return;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches === true;
  if (!coarse) return;
  const orientation = screen.orientation as (ScreenOrientation & { lock?: (mode: string) => Promise<void> }) | undefined;
  if (typeof orientation?.lock !== "function") return;
  landscapeLockTried = true;
  const lock = orientation.lock.bind(orientation);
  void lock("landscape").catch(() => {
    const root = document.documentElement;
    if (document.fullscreenElement || typeof root.requestFullscreen !== "function") return;
    void root.requestFullscreen().then(() => lock("landscape")).catch(() => {});
  });
}

export function GameApp() {
  const [save, setSave] = useState<Save>(() => defaultSave());
  const [screen, setScreen] = useState<Screen>("menu");
  const [titleReady, setTitleReady] = useState(false);
  const [titleBox, setTitleBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [edgeArt, setEdgeArt] = useState<{ left: string; right: string } | null>(null);
  const [page, setPage] = useState(0);
  const [pick, setPick] = useState("hp");
  const [settings, setSettings] = useState(false);
  const [toast, setToast] = useState("");
  const [paused, setPaused] = useState(false);
  const [runPhase, setRunPhase] = useState<Sim["phase"]>("play");
  const [summary, setSummary] = useState<RunSummary | null>(null);
  const [hud, setHud] = useState<Hud | null>(null);

  const saveRef = useRef<Save>(defaultSave());
  const heroRef = useRef<HeroId>(heroOf(defaultSave().hero));
  const screenRef = useRef<Screen>("menu");
  const pausedRef = useRef(false);
  const phaseRef = useRef<Sim["phase"]>("play");
  const simRef = useRef<Sim | null>(null);
  const assetsRef = useRef<Assets>(emptyAssets());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const titleHomeRef = useRef<HTMLDivElement | null>(null);
  const settled = useRef(false);
  const heard = useRef(false);
  const portraitHoldRef = useRef(false);
  const shopFrom = useRef<Screen>("menu");
  const [needsRotate, setNeedsRotate] = useState(() => typeof window !== "undefined" && window.innerHeight > window.innerWidth + 40);
  const hudSig = useRef("");

  screenRef.current = screen;
  pausedRef.current = paused;

  function applySave(next: Save) {
    const hero = heroOf(next.hero);
    const fixed = hero === next.hero ? next : { ...next, hero };
    heroRef.current = fixed.hero;
    saveRef.current = fixed;
    writeSave(fixed);
    setSave(fixed);
    setAudioPrefs(fixed.sfx, fixed.music);
  }

  function chooseHero(id: HeroId) {
    heroRef.current = id;
    applySave({ ...saveRef.current, hero: id });
    sfx("ui");
  }

  function poke() {
    heard.current = true;
    unlockAudio();
    requestGameLandscape();
  }

  function goPage(dir: number) {
    const next = (page + dir + PAGES.length) % PAGES.length;
    const ids = PAGES[next]!.ids;
    setPage(next);
    if (!ids.includes(pick)) setPick(ids[0]!);
    sfx("ui");
  }

  function buy(id: string) {
    const cur = saveRef.current;
    if (!cur) return;
    poke();
    const result = purchase(cur, id);
    if (result.ok) applySave(result.save);
    setToast(result.reason);
    sfx(result.ok ? "coin" : "ui");
  }

  function openShop(levelId?: number) {
    const cur = saveRef.current;
    if (!cur) return;
    poke();
    if (levelId && cur.unlocked.includes(levelId)) applySave({ ...cur, selected: levelId });
    shopFrom.current = screenRef.current === "levels" ? "levels" : "menu";
    setPage(0);
    setPick("hp");
    setScreen("shop");
    sfx("ui");
  }

  function startLevel(id: number) {
    const level = LEVEL_MAP[id];
    const hero = heroOf(heroRef.current);
    const cur = { ...saveRef.current, hero };
    if (!level || !cur.unlocked.includes(id)) {
      setToast("That street is still locked.");
      sfx("ui");
      return;
    }
    poke();
    releasePad();
    const next = cur.selected === id ? cur : { ...cur, selected: id };
    applySave(next);
    const sim = createSim(level, next, hero);
    sim.player.hero = hero;
    simRef.current = sim;
    settled.current = false;
    phaseRef.current = "play";
    hudSig.current = "";
    setSummary(null);
    setRunPhase("play");
    setPaused(false);
    pausedRef.current = false;
    setScreen("play");
    screenRef.current = "play";
    sfx("ui");
  }

  function settle(outcome: "win" | "lose") {
    const sim = simRef.current;
    const cur = saveRef.current;
    if (!sim || !cur || settled.current) return;
    settled.current = true;
    const summaryNext = finishRun(cur, {
      levelId: sim.level.id,
      outcome,
      coins: sim.coins,
      hp: Math.max(0, sim.player.hp),
      maxHp: sim.player.maxHp,
      timeLeft: sim.timeLeft,
      timeMax: sim.level.time,
      elapsed: sim.elapsed,
      medicine: sim.player.meds,
      ammo: ammoBank(sim),
      survival: !!sim.level.survival,
    });
    applySave(summaryNext.save);
    setSummary(summaryNext);
  }

  function cashOut() {
    const sim = simRef.current;
    if (!sim || sim.phase !== "play") return;
    sim.phase = "win";
    phaseRef.current = "win";
    setRunPhase("win");
    setPaused(false);
    pausedRef.current = false;
    sfx("win");
    settle("win");
  }

  function leave(to: Screen) {
    const sim = simRef.current;
    if (sim && sim.phase === "play" && !settled.current) {
      sim.phase = "lose";
      phaseRef.current = "lose";
      settle("lose");
      setToast("Run over. Half the coins on you were banked.");
    }
    if (to === "shop") shopFrom.current = "menu";
    releasePad();
    setPaused(false);
    pausedRef.current = false;
    setScreen(to);
  }

  useEffect(() => {
    const check = () => {
      const portrait = window.innerHeight > window.innerWidth + 40;
      portraitHoldRef.current = portrait;
      setNeedsRotate(portrait);
      if (portrait) releasePad();
    };
    check();
    const media = window.matchMedia("(orientation: portrait)");
    media.addEventListener?.("change", check);
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      media.removeEventListener?.("change", check);
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  useEffect(() => {
    const loaded = loadSave();
    const hero = heroOf(loaded.hero);
    const fixed = { ...loaded, hero };
    heroRef.current = hero;
    saveRef.current = fixed;
    setSave(fixed);
    setAudioPrefs(loaded.sfx, loaded.music);
    bindKeyboard();
    void loadAssets().then((assets) => {
      assetsRef.current = assets;
    });
  }, []);

  useEffect(() => {
    if (screen !== "menu") return;
    const el = titleHomeRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const img = el.querySelector(".title-art");
      const aspect = img && img.naturalWidth > 0 ? img.naturalWidth / img.naturalHeight : 3 / 2;
      let width = rect.width;
      let height = width / aspect;
      if (height > rect.height) {
        height = rect.height;
        width = height * aspect;
      }
      setTitleBox({
        left: (rect.width - width) / 2,
        top: (rect.height - height) / 2,
        width,
        height,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [screen]);

  useEffect(() => {
    const root = shellRef.current;
    if (!root) return;
    const swallow = (event: Event) => {
      const node = event.target instanceof Element ? event.target : null;
      if (!node || !root.contains(node)) return;
      if (event.type === "touchstart") {
        if (!node.closest(".play")) return;
        if (node.closest(".overlay")) return;
      }
      event.preventDefault();
    };
    root.addEventListener("touchstart", swallow, { passive: false });
    root.addEventListener("contextmenu", swallow);
    root.addEventListener("selectstart", swallow);
    root.addEventListener("dragstart", swallow);
    return () => {
      root.removeEventListener("touchstart", swallow);
      root.removeEventListener("contextmenu", swallow);
      root.removeEventListener("selectstart", swallow);
      root.removeEventListener("dragstart", swallow);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 1600);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Escape") return;
      if (screenRef.current === "play" && phaseRef.current === "play") {
        setPaused((prev) => {
          pausedRef.current = !prev;
          return !prev;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || screen !== "play") return;
    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(2, Math.floor(rect.width * dpr));
      const h = Math.max(2, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, [screen]);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    let alive = true;
    const loop = (now: number) => {
      if (!alive) return;
      frame = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      window.__controlsTest = {
        getX: () => simRef.current?.player.x ?? 0,
        getYaw: () => simRef.current?.player.facing ?? 1,
        getSpeed: () => Math.abs(simRef.current?.player.vx ?? 0),
        setKeys: (codes: string[]) => setProbeKeys(codes),
        combat: () => {
          const sim = simRef.current;
          const foe = sim?.enemies.find((e) => e.dead <= 0);
          return {
            combo: sim?.player.combo ?? 0,
            chain: sim?.player.chain ?? 0,
            meter: sim?.player.meter ?? 0,
            move: sim?.player.moveName ?? "",
            rage: sim?.player.rageT ?? 0,
            hp: foe ? Math.round(foe.hp) : -1,
            stun: foe?.stun ?? 0,
            lift: foe?.lift ?? 0,
            name: foe?.name ?? "",
            tag: foe?.tag ?? "",
            tags: sim?.enemies.filter((e) => e.dead <= 0).map((e) => `${e.rank}:${e.tag}`).join(",") ?? "",
            count: sim?.enemies.filter((e) => e.dead <= 0).length ?? 0,
            px: Math.round(sim?.player.x ?? 0),
            ex: foe ? Math.round(foe.x) : -1,
            gate: Math.round(sim?.gateX ?? 0),
            cursor: sim?.encCursor ?? 0,
            rank: foe?.rank ?? "",
            hero: sim?.player.hero ?? "",
            facing: sim?.player.facing ?? 0,
            hpMax: sim?.player.maxHp ?? 0,
          };
        },
      };
      if (heard.current) tickMusic(dt);
      if (screenRef.current !== "play") return;
      const sim = simRef.current;
      const canvas = canvasRef.current;
      if (!sim || !canvas) return;
      const bw = canvas.width;
      const bh = canvas.height;
      sim.viewW = bh > 0 ? (bw / bh) * FRAME_H : VW;
      if (!pausedRef.current && !portraitHoldRef.current && sim.phase === "play") {
        const lvl = sim.gunId ? (saveRef.current?.gunLevels[sim.gunId] ?? 1) : 1;
        step(sim, readInput(), dt, lvl);
      } else {
        readInput();
      }
      const ctx = canvas.getContext("2d");
      if (ctx) draw(ctx, sim, assetsRef.current);
      if (sim.phase !== phaseRef.current) {
        phaseRef.current = sim.phase;
        setRunPhase(sim.phase);
        if (sim.phase === "win" || sim.phase === "lose") settle(sim.phase);
      }
      const gun = sim.gunId ? GUN_MAP[sim.gunId] : null;
      const pct = sim.level.survival
        ? `Wave ${sim.wave}`
        : bossesLeft(sim) > 0
          ? "BOSS"
          : `${Math.min(100, Math.round((sim.player.x / sim.level.width) * 100))}%`;
      const sig = [
        Math.round(sim.player.hp),
        sim.player.lives,
        sim.player.meds,
        sim.player.charges,
        sim.player.mag,
        sim.coins,
        Math.ceil(sim.level.survival ? sim.elapsed : sim.timeLeft),
        sim.phase,
        sim.banner,
        sim.bannerT > 0 ? 1 : 0,
        pct,
        sim.player.infect > 0 ? 1 : 0,
        sim.player.reloadT > 0 ? 1 : 0,
        sim.player.hero,
      ].join("|");
      if (sig !== hudSig.current) {
        hudSig.current = sig;
        setHud({
          hp: sim.player.hp,
          maxHp: sim.player.maxHp,
          lives: sim.player.lives,
          meds: sim.player.meds,
          coins: sim.coins,
          charges: sim.player.charges,
          mag: sim.player.mag,
          reserve: sim.gunId ? (sim.ammo[sim.gunId] ?? 0) : 0,
          gun: gun ? gun.name : "FISTS",
          clock: formatClock(sim.level.survival ? sim.elapsed : sim.timeLeft),
          progress: pct,
          levelName: sim.level.name,
          banner: sim.banner,
          bannerOn: sim.bannerT > 0,
          survival: !!sim.level.survival,
          infect: sim.player.infect > 0,
          reloading: sim.player.reloadT > 0,
          hero: sim.player.hero,
        });
      }
    };
    frame = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
    // settle closes over latest applySave via refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function menuTap(action: () => void) {
    let used = false;
    return {
      onPointerUp: (e: PE<HTMLButtonElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if (used) return;
        used = true;
        action();
      },
      onClick: (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (used) return;
        used = true;
        action();
      },
    };
  }

  function guardTap() {
    let timer = 0;
    let used = false;
    const release = () => {
      if (used) return;
      used = true;
      window.clearTimeout(timer);
      if (pad.guard) pad.guard = false;
      else pulse("reload");
    };
    return {
      onPointerDown: (e: PE<HTMLButtonElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        poke();
        window.clearTimeout(timer);
        pad.guard = false;
        timer = window.setTimeout(() => {
          pad.guard = true;
        }, 90);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // Pointer capture is optional.
        }
      },
      onPointerUp: release,
      onPointerCancel: release,
      onLostPointerCapture: release,
      onContextMenu: (e: PE<HTMLButtonElement>) => e.preventDefault(),
    };
  }

  function tap(key: PadKey) {
    return {
      onPointerDown: (e: PE<HTMLButtonElement>) => {
        e.preventDefault();
        poke();
        pulse(key);
      },
      onContextMenu: (e: PE<HTMLButtonElement>) => e.preventDefault(),
    };
  }
  function hold(key: PadKey) {
    const release = () => {
      pad[key] = false;
    };
    return {
      onPointerDown: (e: PE<HTMLButtonElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        poke();
        pad[key] = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // Some mobile browsers reject capture; pointerup still clears the hold.
        }
      },
      onPointerUp: release,
      onPointerCancel: release,
      onLostPointerCapture: release,
      onContextMenu: (e: PE<HTMLButtonElement>) => e.preventDefault(),
    };
  }

  const level = LEVEL_MAP[save.selected] ?? LEVELS[0]!;
  const shownCoins = screen === "play" && runPhase === "play" && !summary ? save.coins + (hud?.coins ?? 0) : save.coins;
  const stats = derived(save);
  const card = cardFor(pick, save);
  const pageDef = PAGES[page] ?? PAGES[0]!;

  return (
    <div
      ref={shellRef}
      className={`shell ${screen === "play" ? "is-play" : "is-menu"}`}
      onPointerDown={poke}
      onContextMenu={(e) => e.preventDefault()}
    >
      {needsRotate && (
        <div className="rotate-gate" role="dialog" aria-label="Rotate your phone sideways to play">
          <RotatePhone />
          <p>Rotate your phone to landscape</p>
        </div>
      )}
      {screen === "menu" && (
        <div className={`title-home ${titleReady ? "is-ready" : ""}`} ref={titleHomeRef}>
          <img
            className="title-bleed"
            src={edgeArt?.left ?? ""}
            alt=""
            draggable={false}
            aria-hidden
            style={{
              left: 0,
              top: titleBox.top,
              width: titleBox.left + 10,
              height: titleBox.height,
              objectFit: "fill",
              transform: "scaleX(-1)",
              display: titleBox.left > 2 && edgeArt ? "block" : "none",
            }}
          />
          <img
            className="title-bleed"
            src={edgeArt?.right ?? ""}
            alt=""
            draggable={false}
            aria-hidden
            style={{
              left: titleBox.left + titleBox.width - 10,
              top: titleBox.top,
              width: titleBox.left + 10,
              height: titleBox.height,
              objectFit: "fill",
              transform: "scaleX(-1)",
              display: titleBox.left > 2 && edgeArt ? "block" : "none",
            }}
          />
          <img
            className="title-art"
            src={titleArt}
            alt="Anger of Gamdom"
            draggable={false}
            style={
              titleBox.width > 0
                ? {
                    left: titleBox.left,
                    top: titleBox.top,
                    width: titleBox.width,
                    height: titleBox.height,
                    right: "auto",
                    bottom: "auto",
                  }
                : undefined
            }
            ref={(node) => {
              if (node?.complete && node.naturalWidth > 0) {
                setTitleReady(true);
                setEdgeArt((prev) => prev ?? edgeStrips(node));
              }
            }}
            onLoad={(event) => {
              setTitleReady(true);
              const img = event.currentTarget;
              if (img.naturalWidth > 0) setEdgeArt(edgeStrips(img));
            }}
            onError={() => setTitleReady(true)}
          />
          <nav
            className="title-hits"
            aria-label="Main menu"
            style={{ left: titleBox.left, top: titleBox.top, width: titleBox.width, height: titleBox.height }}
          >
            <button type="button" className="hit hit-play" aria-label="PLAY" onClick={() => { poke(); setScreen("cast"); sfx("ui"); }} />
            <button type="button" className="hit hit-shop" aria-label="SHOP" onClick={() => openShop()} />
            <button type="button" className="hit hit-opt" aria-label="OPTIONS" onClick={() => { poke(); setSettings(true); sfx("ui"); }} />
          </nav>
        </div>
      )}

      {screen === "cast" && (
        <div className="stage levels-screen">
          <Status save={save} coins={save.coins} hp={stats.maxHp} maxHp={stats.maxHp} lives={save.squad} meds={save.medicine} level={save.hpLevel} />
          <div className="stage-body cast-body">
            <section className="panel cast">
              <button type="button" className="x" aria-label="Back" onClick={() => setScreen("menu")}>X</button>
              <h2>Choose Fighter</h2>
              <div className="cast-row">
                {HERO_ORDER.map((id) => {
                  const kit = HEROES[id];
                  const on = heroKit(save.hero).id === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`fighter${on ? " sel" : ""}`}
                      onClick={() => chooseHero(id)}
                    >
                      <img src={heroPortrait(id)} alt="" draggable={false} />
                      <strong>{kit.name}</strong>
                      <span>HP {Math.round(kit.hp * 100)} · ATK {Math.round(kit.melee * 100)} · SPD {Math.round(kit.speed * 100)}</span>
                      <em>{kit.special}</em>
                      <small>{kit.specialText}</small>
                      <b>{on ? "SELECTED" : "SELECT"}</b>
                    </button>
                  );
                })}
              </div>
              <div className="cast-actions">
                <button type="button" className="menu-btn ghost" onClick={() => setScreen("menu")}>BACK</button>
                <button type="button" className="menu-btn start" onClick={() => { poke(); heroRef.current = heroOf(saveRef.current.hero); applySave({ ...saveRef.current, hero: heroRef.current }); setScreen("levels"); sfx("ui"); }}>
                  FIGHT AS {heroKit(save.hero).name.toUpperCase()} →
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      {screen === "levels" && (
        <div className="stage levels-screen">
          <Status save={save} coins={save.coins} hp={stats.maxHp} maxHp={stats.maxHp} lives={save.squad} meds={save.medicine} level={save.hpLevel} />
          <div className="stage-body">
            <section className="panel levels">
              <button type="button" className="x" aria-label="Close" onClick={() => setScreen("menu")}>X</button>
              <h2>Level Selection</h2>
              <div className="level-grid">
                {LEVELS.map((lv) => {
                  const open = save.unlocked.includes(lv.id);
                  const stars = save.stars[lv.id] ?? 0;
                  const picked = save.selected === lv.id;
                  return (
                    <button
                      key={lv.id}
                      type="button"
                      className={`tile${open ? "" : " lock"}${picked ? " sel" : ""}`}
                      disabled={!open}
                      onClick={() => openShop(lv.id)}
                    >
                      {open ? <b>{lv.id}</b> : <Lock />}
                      {open && <Stars n={stars} />}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}

      {screen === "shop" && (
        <div className="stage shop-screen">
          <Status save={save} coins={save.coins} hp={stats.maxHp} maxHp={stats.maxHp} lives={save.squad} meds={save.medicine} level={save.hpLevel} />
          <div className="stage-body">
            <section className="shop">
              <button type="button" className="x" aria-label="Close" onClick={() => setScreen(shopFrom.current)}>X</button>
              <div className="shop-main">
                <div className="grid">
                  {pageDef.ids.map((id) => {
                    const item = cardFor(id, save);
                    const on = pick === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`card${item.locked ? " lock" : ""}${on ? " sel" : ""}${item.equipped ? " eq" : ""}`}
                        onClick={() => { setPick(id); sfx("ui"); }}
                      >
                        <span className="art"><ItemArt id={id} /></span>
                        <span className="cap">
                          <span className="name">{item.label}</span>
                          {item.badge ? <span className="count">{item.badge}</span> : null}
                        </span>
                        {item.locked && <span className="pad"><Lock /></span>}
                      </button>
                    );
                  })}
                </div>
                <div className="detail">
                  <div className="detail-ico">
                    <ItemArt id={pick} />
                  </div>
                  <div className="detail-copy">
                    <strong>{card.label}</strong>
                    <p>{card.blurb}</p>
                    <p className="lines">{card.lines.join(" · ")}</p>
                  </div>
                  <div className="acts">
                    {card.acts.map((act) => (
                      <button key={act.id + act.label} type="button" className={`pill ${act.currency === "gems" ? "gem" : act.currency === "coins" ? "coin" : "plain"}`} onClick={() => buy(act.id)}>
                        {act.price ? <b>{act.currency === "gems" ? "◆ " : ""}{act.price}</b> : null}
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <footer className="shop-foot">
              <button type="button" className="nav" aria-label="Previous page" onClick={() => goPage(-1)}>←</button>
              <div className="pager">
                <span>{page + 1}/{PAGES.length}</span>
                <button type="button" className="nav" aria-label="Next page" onClick={() => goPage(1)}>→</button>
              </div>
              <button type="button" className="menu-btn start" onClick={() => startLevel(level.id)}>START →</button>
            </footer>
          </div>
        </div>
      )}

      {screen === "play" && (
        <div className="play">
          <header className="hud">
            <div className="status">
              <img src={heroPortrait(hud?.hero ?? save.hero)} alt="" />
              <div>
                <div className="hp" aria-label="Health">
                  <span style={{ width: `${Math.max(0, Math.min(100, ((hud?.hp ?? stats.maxHp) / (hud?.maxHp ?? stats.maxHp)) * 100))}%` }} />
                </div>
                <div className="meta">
                  {heroKit(hud?.hero ?? save.hero).name} · LV {save.hpLevel}
                  <b> x{hud?.lives ?? save.squad}</b>
                  {hud?.infect ? <em> INFECT</em> : null}
                </div>
              </div>
              <button type="button" className="vial" aria-label="Medicine" {...tap("meds")}>
                <Glyph id="meds" />
                <b>{hud?.meds ?? save.medicine}</b>
              </button>
            </div>
            <div className="clock">
              <b>{hud?.clock ?? formatClock(level.time)}</b>
              <small>{hud?.levelName ?? level.name} · {hud?.progress ?? "0%"}</small>
              <small>
                {hud?.reloading
                  ? "RELOADING"
                  : !hud?.gun || hud.gun === "FISTS"
                    ? "FISTS"
                    : `${hud.gun} ${hud.mag}/${hud.reserve}`}
              </small>
            </div>
            <div className="curr">
              <span className="chip"><i className="dot" /> {comma(shownCoins)}</span>
              <span className="chip gems"><i className="gemstone" /> {comma(save.gems)}</span>
            </div>
            <button type="button" className="pause" aria-label="Pause" onPointerUp={(e) => { if (e.button !== 0 && e.pointerType === "mouse") return; if (runPhase === "play") { setPaused(true); pausedRef.current = true; } }}>II</button>
          </header>
          <div className="view">
            <canvas ref={canvasRef} aria-label="Battle" />
            {hud?.bannerOn && <p className="banner">{hud.banner}</p>}
          </div>
          <div className="deck">
            <div className="pad">
              <div className="arrows">
                <button type="button" className="arrow" aria-label="Move left" {...hold("left")}><Chevron dir="left" /></button>
                <button type="button" className="arrow" aria-label="Move right" {...hold("right")}><Chevron dir="right" /></button>
              </div>
              <div className="fight-right">
                <div className="cluster">
                  <button type="button" className="round" aria-label="Holy cross" {...tap("cross")}>
                    <Cross />
                    <b>x{hud?.charges ?? stats.charges}</b>
                  </button>
                  <button type="button" className="round reload" aria-label="Reload" {...guardTap()}><Reload /></button>
                </div>
                <div className="face">
                  <button type="button" className="joy jump" aria-label="Jump" {...tap("jump")} />
                  <button type="button" className="joy punch" aria-label="Punch" {...hold("punch")} />
                  <button type="button" className="joy kick" aria-label="Kick" {...hold("kick")} />
                  <button type="button" className="joy shoot" aria-label="Shoot" {...hold("shoot")} />
                </div>
              </div>
            </div>
          </div>
          {runPhase !== "play" && (
            <div className="overlay">
              <div className="modal">
                <h2>{runPhase === "win" ? (level.survival ? "CASHED OUT" : "CLEARED") : "DOWN"}</h2>
                <Stars n={summary?.stars ?? 0} />
                <p>
                  +{comma(summary?.coinsGained ?? 0)} coins
                  {(summary?.gemsGained ?? 0) > 0 ? ` · +${summary?.gemsGained} gems` : ""}
                </p>
                <p className="lines">{summary?.best ? "New best stars." : "Replay anytime for a better mark."}</p>
                <div className="modal-actions">
                  {runPhase === "win" && !level.survival && save.unlocked.includes(level.id + 1) && (
                    <button type="button" className="menu-btn" {...menuTap(() => startLevel(level.id + 1))}>NEXT</button>
                  )}
                  <button type="button" className="menu-btn" {...menuTap(() => startLevel(level.id))}>RETRY</button>
                  <button type="button" className="menu-btn ghost" {...menuTap(() => { releasePad(); shopFrom.current = "menu"; setScreen("shop"); })}>ARMORY</button>
                  <button type="button" className="menu-btn ghost" {...menuTap(() => { releasePad(); setScreen("menu"); })}>MENU</button>
                </div>
              </div>
            </div>
          )}
          {runPhase === "play" && paused && (
            <div className="overlay">
              <div className="modal">
                <h2>PAUSED</h2>
                <p>{level.name}</p>
                <div className="modal-actions">
                  <button type="button" className="menu-btn" onClick={() => { setPaused(false); pausedRef.current = false; }}>RESUME</button>
                  {level.survival && <button type="button" className="menu-btn" onClick={cashOut}>CASH OUT</button>}
                  <button type="button" className="menu-btn ghost" onClick={() => startLevel(level.id)}>RETRY</button>
                  <button type="button" className="menu-btn ghost" onClick={() => leave("shop")}>ARMORY</button>
                  <button type="button" className="menu-btn ghost" onClick={() => leave("menu")}>MENU</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {settings && (
        <div className="overlay">
          <div className="modal">
            <h2>OPTIONS</h2>
            <p>Sound and music stay on this device.</p>
            <div className="modal-actions">
              <button type="button" className="menu-btn" onClick={() => applySave({ ...save, sfx: !save.sfx })}>SOUND {save.sfx ? "ON" : "OFF"}</button>
              <button type="button" className="menu-btn" onClick={() => applySave({ ...save, music: !save.music })}>MUSIC {save.music ? "ON" : "OFF"}</button>
              <button type="button" className="menu-btn ghost" onClick={() => setSettings(false)}>CLOSE</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function Status(props: { save: Save; coins: number; hp: number; maxHp: number; lives: number; meds: number; level: number }) {
  return (
    <header className="hud slim">
      <div className="status">
        <img src="/sprites/portrait.jpg" alt="" />
        <div className="life-row" aria-label="Lives">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < props.lives ? "life on" : "life"}>{i < props.lives ? "●" : "×"}</span>
          ))}
        </div>
      </div>
      <div className="curr">
        <span className="chip"><i className="dot" /> {comma(props.coins)}</span>
        <span className="chip gems"><i className="gemstone" /> {comma(props.save.gems)}</span>
      </div>
    </header>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n} of 3 stars`}>
      {[0, 1, 2].map((i) => <i key={i} className={i < n ? "on" : ""} />)}
    </span>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 24 24" className="lock-ico" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" fill="#fff" stroke="#111" strokeWidth="2" />
      <path d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke="#111" strokeWidth="2" />
    </svg>
  );
}

function RotatePhone() {
  return (
    <svg className="rotate-ico" viewBox="0 0 88 88" aria-hidden>
      <rect x="28" y="14" width="32" height="52" rx="6" fill="none" stroke="#f4f7fb" strokeWidth="4" />
      <circle cx="44" cy="58" r="2.5" fill="#f4f7fb" />
      <path d="M58 28 a22 22 0 1 1 -8 4" fill="none" stroke="#3ecf8e" strokeWidth="4" strokeLinecap="round" />
      <path d="M58 18 v12 h-12" fill="none" stroke="#3ecf8e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 64 48" className={dir === "left" ? "flip" : ""} aria-hidden>
      <polygon points="6,8 34,8 34,0 58,24 34,48 34,40 6,40" fill="#e8f6ff" stroke="#14365f" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="28" fill="#2a1844" stroke="#f0d56a" strokeWidth="3" />
      <path d="M28 8 h8 v16 h16 v8 h-16 v16 h-8 v-16 h-16 v-8 h16 z" fill="#f6e7a2" stroke="#6a4a12" strokeWidth="2" />
    </svg>
  );
}

function Reload() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <path d="M46 20 a16 16 0 1 0 2 18" fill="none" stroke="#eceff3" strokeWidth="6" strokeLinecap="round" />
      <polygon points="40,12 54,16 44,28" fill="#eceff3" />
    </svg>
  );
}

function ItemArt({ id }: { id: string }) {
  const [failed, setFailed] = useState(false);
  const src = !failed ? weaponArt[id] ?? (id === "robot" ? "/sprites/enemies/robot/f1.png" : "") : "";
  if (src) return <img src={src} alt="" draggable={false} onError={() => setFailed(true)} />;
  return <Glyph id={id} />;
}

function Glyph({ id }: { id: string }) {
  const gun = GUN_MAP[id];
  if (gun) return <GunGlyph kind={gun.id} color={gun.color} />;
  if (id === "hp") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M32 54 C10 36 8 20 18 16 C24 13 29 18 32 24 C35 18 40 13 46 16 C56 20 54 36 32 54Z" fill="#ef3b4a" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "cross") return <Cross />;
  if (id === "meds" || id === "fillmeds" || id === "core") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="26" y="6" width="12" height="10" rx="3" fill="#c98a3c" stroke="#111" strokeWidth="3" />
        <rect x="20" y="16" width="24" height="40" rx="8" fill="#eafff4" stroke="#111" strokeWidth="3" />
        <rect x="28" y="24" width="8" height="22" rx="2" fill={id === "core" ? "#7ef9ff" : "#3dce78"} />
      </svg>
    );
  }
  if (id === "boots") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M16 8 h16 v28 h16 v12 h-32 z" fill="#3d9a34" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "armor" || id === "resist") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M10 12 h44 v18 c0 16 -12 24 -22 28 c-10 -4 -22 -12 -22 -28 z" fill={id === "resist" ? "#7dd3fc" : "#49b83a"} stroke="#111" strokeWidth="3" />
        <path d="M32 18 v28" stroke="#145c22" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "squad") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <circle cx="20" cy="22" r="8" fill="#3d9a34" stroke="#111" strokeWidth="3" />
        <circle cx="44" cy="22" r="8" fill="#3d9a34" stroke="#111" strokeWidth="3" />
        <path d="M8 48 c2 -12 10 -16 12 -16 h8 c2 0 10 4 12 16 z" fill="#1b1d22" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "fists") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="8" y="22" width="18" height="22" rx="6" fill="#3d9a34" stroke="#111" strokeWidth="3" />
        <rect x="38" y="22" width="18" height="22" rx="6" fill="#3d9a34" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "knife") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M8 46 L40 10 h8 L22 50 z" fill="#d7dde2" stroke="#111" strokeWidth="3" />
        <rect x="10" y="42" width="10" height="12" rx="2" fill="#6b3a22" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "bat") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M14 50 L34 8 h10 L24 50 z" fill="#c48a48" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "axe") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="30" y="8" width="6" height="48" fill="#8a5a32" stroke="#111" strokeWidth="3" />
        <path d="M36 12 h16 c4 8 4 18 0 26 h-16 z" fill="#c0c6cc" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "steal") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M32 52 C14 38 12 24 20 20 C26 17 30 22 32 26 C34 22 38 17 44 20 C52 24 50 38 32 52Z" fill="#ef3b4a" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "ammo") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="8" y="22" width="48" height="26" rx="4" fill="#f5c542" stroke="#111" strokeWidth="3" />
        <rect x="14" y="14" width="8" height="14" fill="#e8e8e8" stroke="#111" strokeWidth="3" />
        <rect x="28" y="12" width="8" height="16" fill="#e8e8e8" stroke="#111" strokeWidth="3" />
        <rect x="42" y="14" width="8" height="14" fill="#e8e8e8" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (id === "robot") return <img src="/sprites/enemies/robot/f1.png" alt="" draggable={false} />;
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <rect x="12" y="24" width="40" height="16" rx="3" fill="#f5c542" stroke="#111" strokeWidth="3" />
    </svg>
  );
}

function GunGlyph({ kind, color }: { kind: string; color: string }) {
  if (kind === "agr170") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M6 28 h28 l6 -8 h16 v8 h-8 v6 h-8 l-4 10 h-8 l4 -10 h-8 z" fill={color} stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (kind === "viper") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M4 30 h40 v-8 h14 v10 h-8 v8 h-10 l-4 8 h-8 l3 -8 h-8 z" fill={color} stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (kind === "ranger" || kind === "rail") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M2 30 h46 v-6 h14 v8 h-10 v6 h-12 l-2 8 h-6 l2 -8 h-10 z" fill={color} stroke="#111" strokeWidth="3" />
        <rect x="18" y="22" width="16" height="5" fill="#222" />
      </svg>
    );
  }
  if (kind === "boom") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M6 26 h18 l10 -8 h22 v14 h-16 v6 h-10 l-4 10 h-8 l4 -10 h-6 z" fill={color} stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (kind === "minigun") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="8" y="22" width="40" height="16" rx="3" fill={color} stroke="#111" strokeWidth="3" />
        <rect x="36" y="16" width="22" height="6" fill={color} stroke="#111" strokeWidth="3" />
        <rect x="36" y="24" width="22" height="6" fill={color} stroke="#111" strokeWidth="3" />
        <rect x="36" y="32" width="22" height="6" fill={color} stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  if (kind === "launcher") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="6" y="24" width="46" height="12" rx="6" fill={color} stroke="#111" strokeWidth="3" />
        <rect x="40" y="16" width="16" height="8" rx="3" fill={color} stroke="#111" strokeWidth="3" />
        <path d="M16 36 h8 l-2 12 h-6 z" fill="#333" stroke="#111" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <path d="M6 30 h34 l8 -8 h12 v10 h-10 v8 h-10 l-4 8 h-8 z" fill={color} stroke="#111" strokeWidth="3" />
    </svg>
  );
}
