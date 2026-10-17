export type HeroId = "gambino" | "gamby" | "steve";

export type HeroKit = {
  id: HeroId;
  name: string;
  blurb: string;
  special: string;
  specialText: string;
  hp: number;
  speed: number;
  melee: number;
  knock: number;
  swing: number;
  height: number;
  bodyH: number;
  bodyW: number;
};

export const HEROES: Record<HeroId, HeroKit> = {
  gambino: {
    id: "gambino",
    name: "Gambino",
    blurb: "Small and quick. Rainbow hat, pacifier, faster steps, and a slip that dodges.",
    special: "Crown Set",
    specialText: "Same moves as Gamby. Cycles power punches, slams, and dashes.",
    hp: 0.72,
    speed: 1.28,
    melee: 0.84,
    knock: 0.9,
    swing: 1,
    height: 150,
    bodyH: 92,
    bodyW: 30,
  },
  gamby: {
    id: "gamby",
    name: "Gamby",
    blurb: "The crowned fighter. Even health, damage, and speed.",
    special: "Crown Set",
    specialText: "Cycles power punches, slams, and dashes. Ultimate at a full meter.",
    hp: 1,
    speed: 1,
    melee: 1,
    knock: 1,
    swing: 1,
    height: 176,
    bodyH: 108,
    bodyW: 34,
  },
  steve: {
    id: "steve",
    name: "Steve",
    blurb: "Straw hat, green shirt, black shorts. More health, harder punches, slower steps.",
    special: "Crown Set",
    specialText: "Same moves as Gamby. Cycles power punches, slams, and dashes.",
    hp: 1.34,
    speed: 0.78,
    melee: 1.4,
    knock: 1.38,
    swing: 1,
    height: 196,
    bodyH: 118,
    bodyW: 40,
  },
};

export const HERO_ORDER: HeroId[] = ["gambino", "gamby", "steve"];

export function heroOf(id: string | undefined | null): HeroId {
  if (id === "gamby" || id === "steve" || id === "gambino") return id;
  return "gambino";
}

export function heroKit(id: string | undefined | null): HeroKit {
  return HEROES[heroOf(id)];
}

export function heroPortrait(id: string | undefined | null): string {
  const hero = heroOf(id);
  if (hero === "gamby") return "/sprites/gamby-original/idle1.png?v=1";
  return `/sprites/cast/${hero}/idle.png?v=13`;
}
