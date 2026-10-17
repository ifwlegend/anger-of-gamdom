let ctx: AudioContext | null = null;
let musicAcc = 0;
let musicStep = 0;
let musicOn = true;
let sfxOn = true;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (c && c.state === "suspended") void c.resume();
}

export function setAudioPrefs(sfx: boolean, music: boolean) {
  sfxOn = sfx;
  musicOn = music;
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, slide = 0) {
  const c = ac();
  if (!c || !sfxOn) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export function sfx(name: string) {
  if (!sfxOn) return;
  switch (name) {
    case "jump":
      tone(420, 0.12, "square", 0.04, 180);
      break;
    case "punch":
      tone(180, 0.08, "sawtooth", 0.05, -80);
      break;
    case "kick":
      tone(140, 0.1, "square", 0.05, -60);
      break;
    case "shot":
      tone(640, 0.06, "square", 0.035, -400);
      break;
    case "boom":
      tone(90, 0.22, "sawtooth", 0.06, -40);
      break;
    case "hit":
      tone(240, 0.07, "square", 0.04, -100);
      break;
    case "hurt":
      tone(160, 0.14, "sawtooth", 0.05, -90);
      break;
    case "coin":
      tone(880, 0.06, "square", 0.03, 200);
      break;
    case "cross":
      tone(520, 0.18, "triangle", 0.05, 240);
      break;
    case "heal":
      tone(660, 0.12, "sine", 0.04, 120);
      break;
    case "ui":
      tone(500, 0.05, "square", 0.03);
      break;
    case "win":
      tone(523, 0.12, "square", 0.04);
      setTimeout(() => tone(659, 0.12, "square", 0.04), 90);
      setTimeout(() => tone(784, 0.18, "square", 0.04), 180);
      break;
    case "lose":
      tone(200, 0.25, "sawtooth", 0.05, -80);
      break;
    case "reload":
      tone(300, 0.08, "square", 0.03, 80);
      break;
    default:
      break;
  }
}

const SCALE = [220, 261.6, 293.7, 196, 246.9, 174.6, 329.6, 261.6];

export function tickMusic(dt: number) {
  if (!musicOn) return;
  const c = ac();
  if (!c) return;
  musicAcc += dt;
  const step = 0.32;
  while (musicAcc >= step) {
    musicAcc -= step;
    const freq = SCALE[musicStep % SCALE.length] ?? 220;
    musicStep += 1;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(freq / 2, t);
    g.gain.setValueAtTime(0.018, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(g);
    g.connect(c.destination);
    o.start(t);
    o.stop(t + 0.3);
  }
}
