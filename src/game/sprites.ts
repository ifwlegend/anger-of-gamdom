import { HERO_ORDER, type HeroId } from "./heroes";

export type Frames = HTMLImageElement[];

export type StakeClips = {
  idle: Frames;
  walk: Frames;
  run: Frames;
  attack: Frames;
  hurt: Frames;
  dead: Frames;
};

export type HeroClips = { idle: Frames; run: Frames; attack: Frames; jump: Frames };

export type Assets = {
  ready: boolean;
  hero: Record<string, Frames>;
  cast: Record<HeroId, HeroClips>;
  enemies: Record<string, Frames>;
  stake: StakeClips;
};

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function loadSet(base: string, count = 4): Promise<Frames> {
  const frames = await Promise.all(
    Array.from({ length: count }, (_, i) => loadImage(`${base}/f${i + 1}.png?v=2`)),
  );
  return frames.filter((f): f is HTMLImageElement => !!f);
}

async function loadList(paths: string[]): Promise<Frames> {
  const frames = await Promise.all(paths.map((src) => loadImage(src)));
  return frames.filter((f): f is HTMLImageElement => !!f);
}

const HERO = ["idle", "run", "jump", "shoot", "melee"];
const ENEMIES = ["roobet", "stake", "bcgame", "rollbit", "shuffle", "duelbits", "rainbet", "robot"];

async function loadCast(id: HeroId): Promise<HeroClips> {
  if (id === "gamby") {
    const base = "/sprites/gamby-original";
    const [idle, run, attack, jump] = await Promise.all([
      loadList([`${base}/idle1.png?v=1`, `${base}/idle2.png?v=1`]),
      loadList([`${base}/run1.png?v=1`, `${base}/run2.png?v=1`]),
      loadList([`${base}/attack1.png?v=1`, `${base}/attack2.png?v=1`]),
      loadList([`${base}/jump1.png?v=4`]),
    ]);
    return { idle, run: run.length ? run : idle, attack: attack.length ? attack : idle, jump: jump.length ? jump : idle };
  }
  const base = `/sprites/cast/${id}`;
  const v = "v=13";
  const [idle, run, attack, jump] = await Promise.all([
    loadList([`${base}/idle.png?${v}`]),
    loadList([`${base}/run1.png?${v}`, `${base}/run2.png?${v}`]),
    loadList([`${base}/attack1.png?${v}`, `${base}/attack2.png?${v}`]),
    id === "gambino" || id === "steve" ? loadList([`${base}/jump.png?${v}`]) : Promise.resolve([] as Frames),
  ]);
  return {
    idle,
    run: run.length ? run : idle,
    attack: attack.length ? attack : idle,
    jump: jump.length ? jump : idle,
  };
}
export async function loadAssets(): Promise<Assets> {
  const heroEntries = await Promise.all(HERO.map(async (name) => [name, await loadSet(`/sprites/hero/${name}`)] as const));
  const enemyEntries = await Promise.all(
    ENEMIES.map(async (name) => [name, await loadSet(`/sprites/enemies/${name}`)] as const),
  );
  const castEntries = await Promise.all(HERO_ORDER.map(async (id) => [id, await loadCast(id)] as const));
  const stakeBase = "/sprites/enemies/stake";
  const stake: StakeClips = {
    idle: await loadList([1, 2].map((i) => `${stakeBase}/idle${i}.png?v=8`)),
    walk: await loadList([1, 2, 3, 4].map((i) => `${stakeBase}/walk${i}.png?v=8`)),
    run: await loadList([1, 2, 3, 4].map((i) => `${stakeBase}/run${i}.png?v=8`)),
    attack: await loadList([1, 2, 3].map((i) => `${stakeBase}/atk${i}.png?v=8`)),
    hurt: await loadList([`${stakeBase}/hurt1.png?v=8`]),
    dead: await loadList([1, 2, 3].map((i) => `${stakeBase}/dead${i}.png?v=8`)),
  };
  return {
    ready: true,
    hero: Object.fromEntries(heroEntries),
    cast: Object.fromEntries(castEntries) as Record<HeroId, HeroClips>,
    enemies: Object.fromEntries(enemyEntries),
    stake,
  };
}

export const emptyAssets = (): Assets => ({
  ready: false,
  hero: {},
  cast: {
    gambino: { idle: [], run: [], attack: [], jump: [] },
    gamby: { idle: [], run: [], attack: [], jump: [] },
    steve: { idle: [], run: [], attack: [], jump: [] },
  },
  enemies: {},
  stake: { idle: [], walk: [], run: [], attack: [], hurt: [], dead: [] },
});
