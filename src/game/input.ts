export type PadKey =
  | "left"
  | "right"
  | "crouch"
  | "shoot"
  | "jump"
  | "punch"
  | "kick"
  | "cross"
  | "meds"
  | "reload"
  | "guard";

export const pad: Record<PadKey, boolean> = {
  left: false,
  right: false,
  crouch: false,
  shoot: false,
  jump: false,
  punch: false,
  kick: false,
  cross: false,
  meds: false,
  reload: false,
  guard: false,
};

const pulses: Record<string, number> = {
  jump: 0,
  punch: 0,
  kick: 0,
  cross: 0,
  meds: 0,
  reload: 0,
};

const held = new Set<string>();
let override: string[] | null = null;
let prevKeys = new Set<string>();

export type Input = {
  left: boolean;
  right: boolean;
  crouch: boolean;
  shoot: boolean;
  punch: boolean;
  kick: boolean;
  jump: boolean;
  cross: boolean;
  meds: boolean;
  reload: boolean;
  guard: boolean;
};

function keysNow(): Set<string> {
  return override ? new Set(override) : held;
}

function take(name: string): boolean {
  if ((pulses[name] ?? 0) > 0) {
    pulses[name] -= 1;
    return true;
  }
  return false;
}

export function readInput(): Input {
  const keys = keysNow();
  const edge = (codes: string[]) => codes.some((c) => keys.has(c) && !prevKeys.has(c));
  const down = (codes: string[]) => codes.some((c) => keys.has(c));
  const input: Input = {
    left: pad.left || down(["KeyA", "ArrowLeft"]),
    right: pad.right || down(["KeyD", "ArrowRight"]),
    crouch: pad.crouch || down(["KeyS", "ArrowDown"]),
    shoot: pad.shoot || down(["KeyF", "KeyL", "KeyC"]),
    punch: pad.punch || down(["KeyJ", "KeyZ"]),
    kick: pad.kick || down(["KeyK", "KeyX"]),
    jump: edge(["Space", "KeyW", "ArrowUp"]) || take("jump"),
    cross: edge(["KeyQ"]) || take("cross"),
    meds: edge(["KeyE"]) || take("meds"),
    reload: edge(["KeyR"]) || take("reload"),
    guard: pad.guard || down(["KeyB", "ShiftRight", "ShiftLeft"]),
  };
  prevKeys = keys;
  return input;
}

export function pulse(name: PadKey) {
  if (name in pulses) pulses[name] = (pulses[name] ?? 0) + 1;
}

export function setProbeKeys(codes: string[]) {
  override = codes.length ? [...codes] : null;
}

export function clearProbe() {
  override = null;
}

let bound = false;

export function bindKeyboard() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  const block = new Set(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
  window.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (override) override = null;
    held.add(e.code);
    if (block.has(e.code)) e.preventDefault();
  });
  window.addEventListener("keyup", (e) => {
    held.delete(e.code);
  });
  window.addEventListener("blur", () => {
    held.clear();
    (Object.keys(pad) as PadKey[]).forEach((k) => {
      pad[k] = false;
    });
  });
}

declare global {
  interface Window {
    __controlsTest?: {
      getX: () => number;
      getYaw: () => number;
      getSpeed: () => number;
      setKeys: (codes: string[]) => void;
      combat?: () => {
        combo: number;
        chain: number;
        meter: number;
        move: string;
        rage: number;
        hp: number;
        stun: number;
        lift: number;
        name: string;
        tag: string;
        tags: string;
        count: number;
        px: number;
        ex: number;
        gate: number;
        cursor: number;
        rank: string;
      };
    };
  }
}
