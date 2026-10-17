import { GUN_MAP, type Theme } from "./content";
import type { Assets, StakeClips } from "./sprites";
import { GROUND, VW, FRAME_H, goalX, routeOpen, type Enemy, type Sim } from "./sim";
import { heroKit } from "./heroes";

const OUTDOOR: Theme[] = ["street", "gnc", "foundry", "roof"];

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function wrap(n: number, m: number) {
  return ((n % m) + m) % m;
}

function pick(frames: HTMLImageElement[] | undefined, index: number) {
  if (!frames || frames.length === 0) return undefined;
  const i = ((Math.floor(index) % frames.length) + frames.length) % frames.length;
  return frames[i];
}

function paintSprite(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | undefined,
  x: number,
  y: number,
  destH: number,
  facing: number,
  pad: number,
  alpha: number,
  squat: boolean,
  rot: number,
  flash: boolean,
) {
  if (!img) return false;
  const dw = destH * (img.width / img.height);
  const dh = destH;
  ctx.save();
  ctx.translate(x, y);
  if (rot) ctx.rotate(rot);
  ctx.scale(facing >= 0 ? 1 : -1, squat ? 0.8 : 1);
  ctx.globalAlpha = alpha;
  if (flash) ctx.filter = "brightness(1.85)";
  ctx.drawImage(img, -dw / 2, -dh * (1 - pad), dw, dh);
  ctx.restore();
  return true;
}

function knight(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  h: number,
  facing: number,
  squat: boolean,
  alpha: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing >= 0 ? 1 : -1, squat ? 0.7 : 1);
  ctx.scale(h / 120, h / 120);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(0, -2, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3d9a34";
  ctx.fillRect(-18, -30, 14, 30);
  ctx.fillRect(4, -30, 14, 30);
  ctx.fillStyle = "#16181e";
  ctx.fillRect(-14, -62, 12, 36);
  ctx.fillRect(2, -62, 12, 36);
  ctx.fillRect(-22, -98, 44, 40);
  ctx.fillStyle = "#49b83a";
  ctx.fillRect(-30, -96, 12, 18);
  ctx.fillRect(18, -96, 12, 18);
  ctx.fillStyle = "#5dce4a";
  ctx.beginPath();
  ctx.moveTo(-8, -86);
  ctx.lineTo(0, -74);
  ctx.lineTo(8, -86);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(-5, -74, 10, 10);
  ctx.fillStyle = "#22262c";
  ctx.fillRect(-30, -78, 12, 16);
  ctx.fillRect(18, -78, 12, 16);
  ctx.fillStyle = "#4caf3a";
  ctx.fillRect(-18, -128, 36, 32);
  ctx.fillRect(-18, -140, 8, 14);
  ctx.fillRect(-4, -146, 8, 20);
  ctx.fillRect(10, -140, 8, 14);
  ctx.fillStyle = "#0c1016";
  ctx.fillRect(-14, -120, 28, 14);
  ctx.fillStyle = "#7ef9ff";
  ctx.fillRect(-10, -116, 7, 6);
  ctx.fillRect(3, -116, 7, 6);
  ctx.restore();
}

function enemyTag(ctx: CanvasRenderingContext2D, e: Enemy, gy: number) {
  const boss = e.rank === "boss";
  const stakeBoss = boss && e.faction === "stake";
  const label = boss ? e.tag : "PAWN";
  if (!label) return;
  const scale = Math.max(0.2, Math.abs(ctx.getTransform().a) || 1);
  const font = (stakeBoss ? 22 : boss ? 18 : 14) / scale;
  const head = gy - e.h * (stakeBoss ? 1.22 : 1.08);
  const showBar = e.dead <= 0 && e.rank !== "pawn";
  const barH = stakeBoss ? 10 : boss ? 8 : 5;
  const barW = stakeBoss ? 78 : 56;
  const gap = 6 / scale;
  const barY = head - gap - barH;
  const labelY = (showBar ? barY : head) - 3 / scale;
  if (showBar) {
    if (stakeBoss) {
      ctx.fillStyle = "#f4f7fb";
      ctx.fillRect(e.x - barW / 2 - 2, barY - 2, barW + 4, barH + 4);
      bar(ctx, e.x - barW / 2, barY, barW, barH, e.hp / Math.max(1, e.maxHp), "#123a8c");
    } else {
      bar(ctx, e.x - 28, barY, 56, barH, e.hp / Math.max(1, e.maxHp), e.color);
    }
  }
  const alpha = e.dead > 0 ? Math.max(0, 1 - e.dead * 1.15) : 1;
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `800 ${font}px Trebuchet MS, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.lineWidth = (boss ? 5 : 4) / scale;
  ctx.strokeStyle = boss ? "#3a2200" : "#111";
  ctx.strokeText(label, e.x, labelY);
  ctx.fillStyle = boss ? "#ffe14a" : "#f7fbff";
  ctx.fillText(label, e.x, labelY);
  ctx.restore();
}

function enemySprite(e: Enemy, assets: Assets) {
  if (e.faction === "stake" && assets.stake.walk.length > 0) return stakeFrame(e, assets.stake);
  return pick(assets.enemies[e.faction], e.dead > 0 ? 0 : e.walk / 18);
}

function stakeFrame(e: Enemy, clips: StakeClips) {
  if (e.dead > 0) return pick(clips.dead, e.dead * 4) ?? pick(clips.walk, 0);
  if (e.hurt > 0.02 && clips.hurt.length) return clips.hurt[0];
  if (e.attackT > 0 || e.slam > 0 || e.charge !== 0) {
    const along = e.attackT > 0 ? 1 - Math.min(1, e.attackT / 0.48) : e.charge < 0 ? 0.15 : 0.7;
    return pick(clips.attack, along * clips.attack.length) ?? pick(clips.walk, 0);
  }
  if (Math.abs(e.vx) > e.speed * 0.82 && clips.run.length) return pick(clips.run, e.walk / 10);
  if (Math.abs(e.vx) > 16 && clips.walk.length) return pick(clips.walk, e.walk / 16);
  return pick(clips.idle, e.walk / 28) ?? pick(clips.walk, 0);
}

function foeFallback(ctx: CanvasRenderingContext2D, e: Enemy, alpha: number) {
  ctx.save();
  ctx.translate(e.x, e.y);
  ctx.scale(e.facing >= 0 ? 1 : -1, 1);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = e.color;
  ctx.fillRect(-e.w / 2, -e.h, e.w, e.h);
  ctx.fillStyle = "#111";
  ctx.fillRect(-e.w / 4, -e.h + 12, e.w / 2, 8);
  ctx.restore();
}

function skyline(ctx: CanvasRenderingContext2D, sim: Sim) {
  const par = 0.22;
  ctx.save();
  ctx.translate(sim.camX * (1 - par), 0);
  const left = sim.camX * par - 80;
  const right = left + VW + 260;
  let x = Math.floor(left / 24) * 24;
  while (x < right) {
    const bw = 34 + Math.floor(hash(x * 0.17) * 54);
    const bh = 50 + Math.floor(hash(x * 0.31) * 90);
    const top = 250 - bh;
    ctx.fillStyle = hash(x) > 0.5 ? "#5c6170" : "#4a5160";
    ctx.fillRect(x, top, bw, 250 - top);
    ctx.fillStyle = "#f6d48a";
    for (let wy = top + 8; wy < 240; wy += 14) {
      for (let wx = x + 6; wx < x + bw - 6; wx += 12) {
        if (hash(wx * 3 + wy) > 0.55) ctx.fillRect(wx, wy, 4, 5);
      }
    }
    x += bw + 8 + Math.floor(hash(x + 9) * 16);
  }
  ctx.restore();
}

function fence(ctx: CanvasRenderingContext2D, x0: number, x1: number) {
  ctx.fillStyle = "#6d4a2e";
  ctx.fillRect(x0, 292, x1 - x0, 46);
  ctx.fillStyle = "#8a5e38";
  for (let x = Math.floor(x0 / 14) * 14; x < x1; x += 14) ctx.fillRect(x, 286, 8, 52);
  ctx.fillStyle = "#5a3e28";
  ctx.fillRect(x0, 300, x1 - x0, 4);
  ctx.fillRect(x0, 322, x1 - x0, 4);
}

function grass(ctx: CanvasRenderingContext2D, x0: number, x1: number) {
  ctx.fillStyle = "#7dbe4a";
  ctx.fillRect(x0, 338, x1 - x0, 30);
  ctx.fillStyle = "#8ed056";
  for (let x = Math.floor(x0 / 10) * 10; x < x1; x += 10) {
    const h = 8 + (x % 20 === 0 ? 6 : 0);
    ctx.fillRect(x, 338 - h, 3, h);
  }
}

function tree(ctx: CanvasRenderingContext2D, x: number) {
  const top = 168 + (Math.floor(x) % 5) * 8;
  ctx.fillStyle = "#6a4630";
  ctx.fillRect(x + 10, top + 36, 8, 348 - top - 36);
  ctx.fillStyle = "#3e8f46";
  ctx.beginPath();
  ctx.arc(x + 14, top + 22, 34, 0, Math.PI * 2);
  ctx.arc(x - 4, top + 40, 22, 0, Math.PI * 2);
  ctx.arc(x + 34, top + 42, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#67b85a";
  ctx.beginPath();
  ctx.arc(x + 8, top + 12, 16, 0, Math.PI * 2);
  ctx.fill();
}

function bush(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = "#4f9a48";
  ctx.beginPath();
  ctx.ellipse(x, 348, 18, 12, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 14, 352, 12, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#7dcc62";
  ctx.beginPath();
  ctx.ellipse(x - 4, 344, 8, 6, 0, 0, Math.PI * 2);
  ctx.fill();
}

function bench(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = "#8d623c";
  ctx.fillRect(x, GROUND - 28, 54, 6);
  ctx.fillRect(x + 4, GROUND - 22, 4, 16);
  ctx.fillRect(x + 46, GROUND - 22, 4, 16);
  ctx.fillStyle = "#6b4a2e";
  ctx.fillRect(x + 6, GROUND - 40, 42, 4);
  for (let i = 0; i < 4; i++) ctx.fillRect(x + 8 + i * 10, GROUND - 36, 3, 8);
}

function trashCan(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = "#6d7680";
  ctx.fillRect(x, GROUND - 36, 22, 32);
  ctx.fillStyle = "#9aa3ad";
  ctx.fillRect(x - 2, GROUND - 40, 26, 5);
  ctx.fillStyle = "#d7e2c8";
  ctx.fillRect(x + 4, GROUND - 18, 8, 6);
  ctx.fillRect(x + 14, GROUND - 12, 10, 5);
}

function hydrant(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = "#d4534a";
  ctx.fillRect(x, GROUND - 28, 12, 24);
  ctx.fillRect(x - 6, GROUND - 20, 8, 5);
  ctx.fillStyle = "#f0d37a";
  ctx.fillRect(x + 2, GROUND - 34, 8, 6);
}

function crate(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = "#c4a06a";
  ctx.fillRect(x, GROUND - 28, 32, 28);
  ctx.strokeStyle = "#6b4a2e";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, GROUND - 28, 32, 28);
  ctx.beginPath();
  ctx.moveTo(x, GROUND - 14);
  ctx.lineTo(x + 32, GROUND - 14);
  ctx.moveTo(x + 16, GROUND - 28);
  ctx.lineTo(x + 16, GROUND);
  ctx.stroke();
}

function cone(ctx: CanvasRenderingContext2D, x: number) {
  ctx.fillStyle = "#f08a2a";
  ctx.beginPath();
  ctx.moveTo(x + 8, GROUND - 26);
  ctx.lineTo(x, GROUND);
  ctx.lineTo(x + 16, GROUND);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillRect(x + 2, GROUND - 12, 12, 4);
}

function streetSign(ctx: CanvasRenderingContext2D, x: number, label: string) {
  ctx.fillStyle = "#d5dbe2";
  ctx.fillRect(x, GROUND - 150, 5, 150);
  ctx.fillStyle = "#1d4e89";
  ctx.fillRect(x - 28, GROUND - 168, 78, 22);
  ctx.fillStyle = "#fff";
  ctx.font = "800 11px Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x + 11, GROUND - 152);
}

function facade(ctx: CanvasRenderingContext2D, x: number, w: number, tone: string, seed: number) {
  const top = 88 + Math.floor(hash(seed) * 36);
  ctx.fillStyle = tone;
  ctx.fillRect(x, top, w, 360 - top);
  ctx.fillStyle = "#3c4450";
  ctx.fillRect(x - 6, top - 10, w + 12, 12);
  const cols = Math.max(2, Math.floor((w - 20) / 52));
  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < cols; i++) {
      const wx = x + 12 + i * ((w - 20) / cols);
      const wy = top + 16 + row * 42;
      if (wy > 250) continue;
      ctx.fillStyle = hash(wx + seed + row) > 0.22 ? "#d7eaf4" : "#1d2836";
      ctx.fillRect(wx, wy, 36, 28);
      ctx.strokeStyle = "#2c333b";
      ctx.lineWidth = 2;
      ctx.strokeRect(wx, wy, 36, 28);
      ctx.beginPath();
      ctx.moveTo(wx + 18, wy);
      ctx.lineTo(wx + 18, wy + 28);
      ctx.moveTo(wx, wy + 14);
      ctx.lineTo(wx + 36, wy + 14);
      ctx.stroke();
    }
  }
  const shopX = x + 16;
  const shopW = Math.max(48, w * 0.38);
  ctx.fillStyle = "#b9d7e6";
  ctx.fillRect(shopX, 268, shopW, 88);
  ctx.strokeStyle = "#3a4450";
  ctx.lineWidth = 3;
  ctx.strokeRect(shopX, 268, shopW, 88);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.beginPath();
  ctx.moveTo(shopX + 6, 276);
  ctx.lineTo(shopX + shopW * 0.45, 340);
  ctx.stroke();
  const dx = x + w * 0.62;
  const open = hash(seed + 11) > 0.62;
  ctx.fillStyle = open ? "#1c2430" : hash(seed + 3) > 0.5 ? "#efe6d4" : "#5e6a78";
  ctx.fillRect(dx, GROUND - 168, 48, 168);
  ctx.strokeStyle = "#2a261f";
  ctx.lineWidth = 3;
  ctx.strokeRect(dx, GROUND - 168, 48, 168);
  if (open) {
    ctx.fillStyle = "#c4553a";
    ctx.fillRect(dx + 6, GROUND - 70, 22, 8);
    ctx.fillStyle = "#3a4654";
    ctx.fillRect(dx + 8, GROUND - 120, 30, 16);
  } else {
    ctx.fillStyle = "#9fd4ea";
    ctx.fillRect(dx + 8, GROUND - 152, 32, 28);
    ctx.fillStyle = "#c9a15a";
    ctx.beginPath();
    ctx.arc(dx + 38, GROUND - 84, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#f4efe4";
  ctx.fillRect(dx - 46, GROUND - 148, 40, 52);
  ctx.strokeStyle = "#222";
  ctx.strokeRect(dx - 46, GROUND - 148, 40, 52);
  ctx.fillStyle = "#222";
  ctx.font = "700 9px Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(hash(seed + 9) > 0.5 ? "WANTED" : "NOTICE", dx - 26, GROUND - 118);
  if (hash(seed + 4) > 0.45) {
    ctx.strokeStyle = "rgba(40,30,24,0.45)";
    ctx.beginPath();
    ctx.moveTo(x + w - 18, top + 8);
    ctx.lineTo(x + w - 6, top + 40);
    ctx.lineTo(x + w - 22, top + 70);
    ctx.stroke();
  }
}

function streetLife(ctx: CanvasRenderingContext2D, sim: Sim, x0: number, x1: number) {
  const theme = sim.level.theme;
  if (theme === "roof") return;
  ctx.save();
  const par = 0.45;
  ctx.translate(sim.camX * (1 - par), 0);
  const left = sim.camX * par - 120;
  const right = left + VW + 320;
  for (let x = Math.floor(left / 110) * 110; x < right; x += 110) {
    if (hash(x * 0.37) < 0.45) continue;
    ctx.fillStyle = hash(x) > 0.5 ? "#5b9a49" : "#467a3c";
    ctx.beginPath();
    ctx.ellipse(x, 318, 20 + hash(x + 1) * 16, 11, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  for (let x = Math.floor((x0 - 20) / 280) * 280; x < x1 + 20; x += 280) {
    const n = hash(x * 0.17 + sim.level.id);
    if (n > 0.38) tree(ctx, x + hash(x + 2) * 36);
    if (n > 0.55) bush(ctx, x + 150);
  }
}

function interiorSet(ctx: CanvasRenderingContext2D, x0: number, x1: number, vault: boolean) {
  for (let x = Math.floor(x0 / 360) * 360 + 70; x < x1; x += 360) {
    ctx.fillStyle = vault ? "#3a3148" : "#d9e0e6";
    ctx.fillRect(x, GROUND - 92, 34, 92);
    ctx.fillStyle = vault ? "#241c30" : "#8ec6de";
    ctx.fillRect(x + 6, GROUND - 78, 22, 28);
    ctx.strokeStyle = vault ? "#c6a15a" : "#5c6570";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, GROUND - 92, 34, 92);
    if (!vault && hash(x) > 0.4) {
      ctx.fillStyle = "#8b949e";
      ctx.fillRect(x + 120, 70, 46, 28);
      ctx.fillStyle = "#222";
      for (let i = 0; i < 3; i++) ctx.fillRect(x + 126 + i * 12, 76, 6, 16);
    }
    ctx.strokeStyle = vault ? "#6d5a2a" : "#9aa4ae";
    ctx.lineWidth = 3;
    const bx = x + 200;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.moveTo(bx + i * 8, GROUND - 130);
      ctx.lineTo(bx + i * 8, GROUND - 18);
    }
    ctx.moveTo(bx, GROUND - 130);
    ctx.lineTo(bx + 40, GROUND - 130);
    ctx.stroke();
    ctx.fillStyle = vault ? "#4a3d5c" : "#7d878f";
    ctx.fillRect(x + 70, GROUND - 32, 22, 28);
    ctx.fillStyle = "#222";
    ctx.fillRect(x + 66, GROUND - 36, 30, 6);
    ctx.fillStyle = vault ? "#6ee7b7" : "#d7e2c8";
    ctx.fillRect(x + 90, GROUND - 10, 14, 6);
    ctx.fillRect(x + 104, GROUND - 16, 8, 8);
  }
}

function ground(ctx: CanvasRenderingContext2D, sim: Sim, x0: number, x1: number) {
  const theme = sim.level.theme;
  if (theme === "interior" || theme === "vault") {
    ctx.fillStyle = theme === "vault" ? "#2a2438" : "#9aa3ab";
    ctx.fillRect(x0, GROUND - 8, x1 - x0, 900);
    ctx.fillStyle = theme === "vault" ? "#3a334c" : "#b7c0c8";
    ctx.fillRect(x0, GROUND - 8, x1 - x0, 10);
    ctx.fillStyle = theme === "vault" ? "rgba(80,220,160,0.18)" : "rgba(90,140,160,0.18)";
    for (let x = Math.floor(x0 / 220) * 220 + 40; x < x1; x += 220) {
      ctx.beginPath();
      ctx.ellipse(x, GROUND + 10, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }
  ctx.fillStyle = "#c8ccd1";
  ctx.fillRect(x0, 356, x1 - x0, GROUND - 356);
  ctx.fillStyle = "#b4bac2";
  for (let x = Math.floor(x0 / 48) * 48; x < x1; x += 48) ctx.fillRect(x, 356, 1, GROUND - 356);
  ctx.fillStyle = "#9aa1a8";
  ctx.fillRect(x0, GROUND - 6, x1 - x0, 8);
  ctx.fillStyle = theme === "foundry" ? "#2a2422" : "#3a3e44";
  ctx.fillRect(x0, GROUND + 2, x1 - x0, 1200);
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  for (let x = Math.floor(x0 / 46) * 46; x < x1; x += 46) ctx.fillRect(x, GROUND + 38, 18, 3);
  ctx.strokeStyle = "rgba(210,214,220,0.35)";
  ctx.lineWidth = 2;
  for (let x = Math.floor(x0 / 280) * 280 + 90; x < x1; x += 280) {
    ctx.beginPath();
    ctx.arc(x, GROUND + 52, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function tiles(ctx: CanvasRenderingContext2D, sim: Sim, x0: number, x1: number) {
  const vault = sim.level.theme === "vault";
  const tile = 32;
  for (let y = 0; y < GROUND; y += tile) {
    for (let x = Math.floor(x0 / tile) * tile; x < x1; x += tile) {
      ctx.fillStyle = vault ? (hash(x + y) > 0.5 ? "#2a2038" : "#342848") : hash(x * 0.2 + y) > 0.5 ? "#c5ced6" : "#d7e0e7";
      ctx.fillRect(x, y, tile, tile);
      ctx.strokeStyle = vault ? "#6d5a2a" : "#9aa6b2";
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, tile - 1, tile - 1);
    }
  }
  const span = x1 - x0;
  const count = Math.max(2, Math.ceil(span / 220));
  for (let i = 0; i < count; i++) {
    const x = x0 + ((i * 230) % Math.max(230, span));
    ctx.strokeStyle = "#222";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 78);
    ctx.stroke();
    ctx.fillStyle = "#efe2b6";
    ctx.fillRect(x - 12, 78, 24, 8);
    ctx.fillStyle = "rgba(255, 230, 170, 0.16)";
    ctx.beginPath();
    ctx.moveTo(x, 86);
    ctx.lineTo(x - 40, GROUND);
    ctx.lineTo(x + 40, GROUND);
    ctx.fill();
  }
}

function outdoor(ctx: CanvasRenderingContext2D, sim: Sim, x0: number, x1: number) {
  const theme = sim.level.theme;
  skyline(ctx, sim);
  if (theme === "roof") {
    ctx.fillStyle = "#6e7680";
    ctx.fillRect(x0, 300, x1 - x0, GROUND - 300);
    ctx.fillStyle = "#d0d5db";
    for (let x = Math.floor(x0 / 28) * 28; x < x1; x += 28) ctx.fillRect(x, 286, 4, 28);
    ctx.fillRect(x0, 286, x1 - x0, 5);
  } else {
    if (theme === "foundry") {
      ctx.fillStyle = "#4a403c";
      ctx.fillRect(x0, 250, x1 - x0, 90);
      for (let x = Math.floor(x0 / 180) * 180; x < x1; x += 180) {
        ctx.fillStyle = "#5c5148";
        ctx.fillRect(x + 20, 160, 36, 180);
        ctx.fillStyle = "#2a2422";
        ctx.fillRect(x + 14, 148, 48, 16);
        ctx.fillStyle = "rgba(255,120,40,0.35)";
        ctx.fillRect(x + 28, 168, 10, 18);
      }
    }
    fence(ctx, x0, x1);
    grass(ctx, x0, x1);
    streetLife(ctx, sim, x0, x1);
  }
  let lamp = 60;
  while (lamp < x1) {
    const gap = 280 + Math.floor(hash(lamp * 0.02) * 220);
    if (lamp > x0 - 40) {
      ctx.fillStyle = "#d5dbe2";
      ctx.fillRect(lamp, GROUND - 230, 6, 230);
      ctx.beginPath();
      ctx.fillStyle = "#f7fbff";
      ctx.arc(lamp + 3, GROUND - 238, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,244,210,0.2)";
      ctx.beginPath();
      ctx.moveTo(lamp + 3, GROUND - 226);
      ctx.lineTo(lamp - 36, GROUND - 8);
      ctx.lineTo(lamp + 42, GROUND - 8);
      ctx.fill();
    }
    lamp += gap;
  }
}

function dressing(ctx: CanvasRenderingContext2D, sim: Sim, x0: number, x1: number) {
  const theme = sim.level.theme;
  if (theme === "interior" || theme === "vault") {
    interiorSet(ctx, x0, x1, theme === "vault");
    for (let x = Math.floor(x0 / 280) * 280 + 40; x < x1; x += 280) {
      ctx.fillStyle = "#efe6d2";
      ctx.fillRect(x, 150, 54, 40);
      ctx.strokeStyle = "#222";
      ctx.strokeRect(x, 150, 54, 40);
      ctx.fillStyle = "#222";
      ctx.font = "700 10px Trebuchet MS, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(hash(x) > 0.5 ? "WANTED" : "ENLIST", x + 27, 174);
      ctx.fillStyle = "#66717a";
      ctx.fillRect(x + 90, GROUND - 34, 24, 30);
      ctx.fillStyle = "#222";
      ctx.fillRect(x + 86, GROUND - 40, 32, 7);
    }
    if (theme === "vault") {
      for (let x = Math.floor(x0 / 200) * 200; x < x1; x += 200) {
        ctx.fillStyle = "#c6a15a";
        ctx.fillRect(x + 8, 80, 10, GROUND - 80);
      }
    }
  }
  if (theme === "gnc") {
    const bx = sim.level.width - 700;
    ctx.fillStyle = "#8d949c";
    ctx.fillRect(bx, 110, 620, GROUND - 110);
    ctx.strokeStyle = "#505860";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx + 70, 190);
    ctx.lineTo(bx + 130, 230);
    ctx.lineTo(bx + 96, 280);
    ctx.stroke();
    ctx.fillStyle = "#f4f1ea";
    ctx.fillRect(bx + 200, 138, 230, 48);
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.strokeRect(bx + 200, 138, 230, 48);
    ctx.fillStyle = "#1b1d22";
    ctx.font = "800 24px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("BLUE GNC", bx + 315, 172);
  }
  if (OUTDOOR.includes(theme) && theme !== "roof") {
    if (theme === "street" || theme === "gnc") {
      const tones = ["#9aa3ad", "#b08968", "#7f8b86", "#c4b49a", "#6e7c88", "#a67c52"];
      let x = 140;
      while (x < x1) {
        const seed = Math.floor(x);
        const w = 190 + Math.floor(hash(seed + 6) * 200);
        const gap = 80 + Math.floor(hash(seed + 2) * 150);
        if (x + w > x0 - 20) {
          const tone = tones[Math.floor(hash(seed + 8) * tones.length)] ?? tones[0];
          facade(ctx, x, w, tone, seed);
        }
        x += w + gap;
      }
    }
    const signs = ["MILE", "OPEN", "SLOW", "EAST"];
    let prop = 200;
    while (prop < x1) {
      const n = hash(prop * 0.17 + sim.level.id);
      const step = 150 + Math.floor(hash(prop + 3) * 120);
      if (prop > x0 - 30) {
        if (n > 0.82) bench(ctx, prop);
        else if (n > 0.66) trashCan(ctx, prop);
        else if (n > 0.5) hydrant(ctx, prop);
        else if (n > 0.36) crate(ctx, prop);
        else if (n > 0.22) cone(ctx, prop);
        else streetSign(ctx, prop, signs[Math.floor(hash(prop + 9) * signs.length)] ?? "MILE");
      }
      prop += step;
    }
  }
}

function platforms(ctx: CanvasRenderingContext2D, sim: Sim) {
  for (const plat of sim.level.platforms) {
    ctx.fillStyle = "#5c4634";
    ctx.fillRect(plat.x + 10, plat.y + 10, 6, Math.max(8, GROUND - plat.y - 10));
    ctx.fillRect(plat.x + plat.w - 16, plat.y + 10, 6, Math.max(8, GROUND - plat.y - 10));
    ctx.fillStyle = "#8d6a45";
    ctx.fillRect(plat.x, plat.y, plat.w, 14);
    ctx.fillStyle = "#c4a06a";
    ctx.fillRect(plat.x, plat.y, plat.w, 5);
  }
}

function door(ctx: CanvasRenderingContext2D, sim: Sim) {
  if (sim.level.survival) return;
  const gx = goalX(sim);
  const locked = !routeOpen(sim);
  ctx.fillStyle = "#d7c39a";
  ctx.fillRect(gx - 26, GROUND - 172, 54, 172);
  ctx.fillStyle = "#8ec8e4";
  ctx.fillRect(gx - 14, GROUND - 154, 30, 32);
  ctx.strokeStyle = "#5c4630";
  ctx.lineWidth = 3;
  ctx.strokeRect(gx - 26, GROUND - 172, 54, 172);
  ctx.fillStyle = "#6b5432";
  ctx.beginPath();
  ctx.arc(gx + 16, GROUND - 86, 3, 0, Math.PI * 2);
  ctx.fill();
  if (locked) {
    ctx.fillStyle = "#e23b3b";
    ctx.fillRect(gx - 8, GROUND - 96, 16, 14);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(gx - 8, GROUND - 96, 16, 14);
  } else if (sim.exitHold > 0) {
    const open = Math.min(1, sim.exitHold / 0.45);
    ctx.fillStyle = "#14161c";
    ctx.fillRect(gx - 26, GROUND - 172, 54 * open, 172);
  }
  const near = Math.abs(sim.player.x - gx) < 70 && !sim.player.dead;
  if (near && sim.phase === "play") {
    ctx.fillStyle = "#111";
    ctx.font = "800 13px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(locked ? "CLEAR THE BOSS" : "ENTER", gx, GROUND - 188);
  }
}

function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, pct: number, color: string) {
  ctx.fillStyle = "#111";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(x + 1, y + 1, Math.max(0, (w - 2) * pct), h - 2);
}

const FOOT: Record<string, number> = {
  roobet: 0.141,
  stake: 0.012,
  bcgame: 0.078,
  rollbit: 0.089,
  shuffle: 0.089,
  duelbits: 0.089,
  rainbet: 0.089,
  robot: 0.089,
};

function actors(ctx: CanvasRenderingContext2D, sim: Sim, assets: Assets) {
  const p = sim.player;
  if (sim.robot) {
    const r = sim.robot;
    const img = pick(assets.enemies.robot, r.walk / 16);
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(r.x, r.y - 2, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    if (!paintSprite(ctx, img, r.x, r.y, 128, r.facing, FOOT.robot ?? 0.09, 1, false, 0, false)) {
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(r.x - 16, r.y - 90, 32, 90);
    }
  }

  for (const e of sim.enemies) {
    if (e.x < sim.camX - 260 || e.x > sim.camX + (sim.viewW > 0 ? sim.viewW : VW) + 260) continue;
    const alpha = e.dead > 0 ? Math.max(0, 1 - e.dead * 1.15) : 1;
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(e.x, e.y - 2, Math.max(14, e.w * 0.42), 6, 0, 0, Math.PI * 2);
    ctx.fill();
    const gy = e.y - e.lift;
    const falling = e.dead > 0 && e.faction !== "stake" ? Math.min(1.35, e.dead * 2.6) * (e.facing || 1) : e.lift > 8 ? -0.15 * e.facing : 0;
    const wind = e.faction === "stake" ? 0 : e.attackT > 0.2 ? -0.35 * e.facing : e.attackT > 0 ? 0.28 * e.facing : 0;
    const img = enemySprite(e, assets);
    const stakeBoss = e.faction === "stake" && e.rank === "boss";
    const dest = e.h * (stakeBoss ? 1.35 : 1.24);
    if (stakeBoss && img) {
      ctx.save();
      ctx.filter = "brightness(0)";
      ctx.globalAlpha = 0.45 * alpha;
      paintSprite(ctx, img, e.x, gy, dest + 10, e.facing, FOOT.stake ?? 0.02, 1, false, 0, false);
      ctx.restore();
    }
    const drew = paintSprite(
      ctx,
      img,
      e.x,
      gy,
      dest,
      e.facing,
      FOOT[e.faction] ?? 0.09,
      alpha,
      false,
      falling || wind,
      e.hurt > 0,
    );
    if (!drew) foeFallback(ctx, e, alpha);
    if (e.dead <= 0 && e.guard > 0) {
      ctx.strokeStyle = "#d7ecff";
      ctx.lineWidth = 3;
      ctx.strokeRect(e.x - e.w * 0.35, gy - e.h * 0.72, e.w * 0.7, e.h * 0.45);
    }
    if (e.dead <= 0 && e.attackT > 0.16) {
      ctx.save();
      ctx.strokeStyle = "#ffe27a";
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(e.x + e.facing * 18, gy - e.h * 0.55, 22 + (0.5 - Math.min(0.5, e.attackT)) * 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  const pose = heroPose(sim, assets);
  const alpha = p.invuln > 0 && Math.floor(sim.elapsed * 16) % 2 === 0 ? 0.45 : 1;
  const kit = heroKit(p.hero);
  const tall = p.crouch || pose.duck ? kit.height * 0.78 : kit.height;
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(p.x, p.y - 1, p.crouch ? 20 : kit.bodyW * 0.55, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  const rot = p.dead ? Math.min(1.25, p.deadT * 2.1) * p.facing : pose.tilt;
  const drew = paintSprite(ctx, pose.img, p.x, p.y, tall, p.facing, 0, alpha, p.crouch || pose.duck, rot, p.hurtT > 0);
  if (!drew && !p.hero) knight(ctx, p.x, p.y, p.crouch ? 150 : 200, p.facing, p.crouch, alpha);

  if (p.meleeT > 0 && !p.dead) {
    const punch = p.meleeKind === "punch";
    const dur = punch ? 0.32 : 0.38;
    const swing = 1 - p.meleeT / dur;
    if (swing > 0.25 && swing < 0.85) {
      ctx.save();
      ctx.strokeStyle = punch ? "#d9ffe4" : "#ffe1a8";
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = punch ? 4 : 6;
      ctx.beginPath();
      const low = !punch || /slam/i.test(p.moveName);
      const ax = p.x + p.facing * (low ? 28 : 46);
      const ay = p.y - (low ? 46 : p.crouch ? 70 : 118);
      ctx.arc(ax, ay, punch ? 34 : 48, p.facing > 0 ? -0.9 : Math.PI - 0.9, p.facing > 0 ? 0.9 : Math.PI + 0.9);
      ctx.stroke();
      ctx.restore();
    }
  }

  if (sim.muzzle > 0 && !p.dead) {
    ctx.fillStyle = "#fff4c2";
    ctx.beginPath();
    ctx.arc(p.x + p.facing * 62, p.y - (p.crouch ? 72 : 116), 9, 0, Math.PI * 2);
    ctx.fill();
  }
  if (p.reloadT > 0 && sim.gunId && GUN_MAP[sim.gunId]) {
    const total = GUN_MAP[sim.gunId]!.reload;
    bar(ctx, p.x - 18, p.y - 210, 36, 5, 1 - p.reloadT / total, "#8dffb3");
  }
  if (p.infect > 0 && !p.dead) {
    ctx.fillStyle = "#3dde67";
    ctx.globalAlpha = 0.35 + 0.25 * Math.sin(sim.elapsed * 10);
    ctx.beginPath();
    ctx.arc(p.x, p.y - 176, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  for (const e of sim.enemies) {
    if (e.removed) continue;
    if (e.x < sim.camX - 260 || e.x > sim.camX + (sim.viewW > 0 ? sim.viewW : VW) + 260) continue;
    enemyTag(ctx, e, e.y - e.lift);
  }
}

function heroPose(sim: Sim, assets: Assets) {
  const p = sim.player;
  const cast = assets.cast?.[p.hero];
  const idle = cast?.idle ?? [];
  const run = cast?.run?.length ? cast.run : idle;
  const attack = cast?.attack?.length ? cast.attack : idle;
  const still = { pad: 0.02, tilt: 0, duck: false };
  if (idle.length > 0) {
    if (p.dead) return { img: pick(idle, 0), ...still };
    if (p.meleeT > 0) {
      const name = p.moveName;
      const kick = p.meleeKind === "kick";
      const along = 1 - p.meleeT / Math.max(0.05, p.moveDur);
      const spin = /spin|ultimate/i.test(name);
      const slam = /slam/i.test(name);
      const frames = kick && !slam ? run : attack;
      return {
        img: pick(frames, along * Math.max(1, frames.length)),
        pad: 0.02,
        tilt: spin ? along * Math.PI * 2 : 0,
        duck: slam,
      };
    }
    if (p.shootT > 0) return { img: pick(attack, 0), ...still };
    if (!p.onGround) return { img: pick(cast?.jump?.length ? cast.jump : idle, 0), ...still };
    if (Math.abs(p.vx) > 22 && p.hurtT <= 0) return { img: pick(run, p.gait / Math.PI), ...still };
    return { img: pick(idle, p.animT * 1.5), ...still };
  }
  return { img: undefined, ...still };
}

function fx(ctx: CanvasRenderingContext2D, sim: Sim) {
  for (const b of sim.bullets) {
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.explosive ? b.r + 2 : b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.strokeStyle = b.color;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x - b.vx * 0.03, b.y - b.vy * 0.03);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  for (const part of sim.particles) {
    ctx.globalAlpha = Math.max(0, part.life / part.max);
    ctx.fillStyle = part.color;
    if (part.kind === "pool") {
      ctx.beginPath();
      ctx.ellipse(part.x, part.y, part.s, part.s * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (part.kind === "spark") {
      ctx.strokeStyle = part.color;
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      ctx.moveTo(part.x, part.y);
      ctx.lineTo(part.x - part.vx * 0.028, part.y - part.vy * 0.028);
      ctx.stroke();
    } else if (part.kind === "drop") {
      ctx.beginPath();
      ctx.ellipse(part.x, part.y, Math.max(1.2, part.s * 0.55), Math.max(1.8, part.s), 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(part.x, part.y, part.s, part.s);
    }
  }
  ctx.globalAlpha = 1;
  for (const ring of sim.rings) {
    const t = 1 - ring.life / Math.max(0.001, ring.max);
    ctx.beginPath();
    ctx.arc(ring.x, ring.y, ring.r + t * 110, 0, Math.PI * 2);
    ctx.strokeStyle = ring.color;
    ctx.globalAlpha = Math.max(0, ring.life / ring.max);
    ctx.lineWidth = 5;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.font = "800 18px Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.lineWidth = 3;
  for (const f of sim.floats) {
    ctx.globalAlpha = Math.max(0, f.life / 0.8);
    ctx.strokeStyle = "#111";
    ctx.strokeText(f.text, f.x, f.y);
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
}

function clouds(ctx: CanvasRenderingContext2D, sim: Sim, w: number) {
  if (!OUTDOOR.includes(sim.level.theme)) return;
  ctx.fillStyle = "rgba(255,255,255,0.38)";
  for (let i = 0; i < 4; i++) {
    const x = wrap(i * 280 - sim.camX * 0.12, w + 180) - 80;
    const y = hBand(i);
    ctx.beginPath();
    ctx.ellipse(x, y, 46, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 28, y + 4, 30, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function hBand(i: number) {
  return 28 + (i % 3) * 22;
}

function fightReadout(ctx: CanvasRenderingContext2D, sim: Sim, w: number) {
  const p = sim.player;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.textAlign = "center";
  ctx.lineWidth = 4;
  const rank = p.combo >= 16 ? "LEGENDARY" : p.combo >= 10 ? "BRUTAL" : p.combo >= 6 ? "GREAT" : p.combo >= 3 ? "GOOD" : "";
  if (p.combo > 1) {
    ctx.font = "800 22px Trebuchet MS, sans-serif";
    ctx.strokeStyle = "#111";
    ctx.strokeText(`${p.combo} ${rank}`, w * 0.5, 54);
    ctx.fillStyle = p.rageT > 0 ? "#ffb020" : "#fff";
    ctx.fillText(`${p.combo} ${rank}`, w * 0.5, 54);
  }
  if (p.moveName && p.meleeT > 0) {
    ctx.font = "800 13px Trebuchet MS, sans-serif";
    ctx.fillStyle = "#ffe7b0";
    ctx.fillText(p.moveName, w * 0.5, 74);
  }
  const bx = w * 0.5 - 60;
  ctx.fillStyle = "#142028";
  ctx.fillRect(bx, 82, 120, 8);
  ctx.fillStyle = p.meter >= 100 ? "#ffd24a" : "#3ecf8e";
  ctx.fillRect(bx, 82, 120 * (p.meter / 100), 8);
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.strokeRect(bx, 82, 120, 8);
  if (p.specialCd > 0) {
    ctx.font = "800 11px Trebuchet MS, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(`SPECIAL ${p.specialCd.toFixed(1)}`, w * 0.5, 104);
  } else if (p.meter >= 100) {
    ctx.font = "800 12px Trebuchet MS, sans-serif";
    ctx.fillStyle = "#ffd24a";
    ctx.fillText("ULTIMATE READY", w * 0.5, 104);
  }
  if (p.rageT > 0) {
    ctx.font = "800 14px Trebuchet MS, sans-serif";
    ctx.fillStyle = "#ff7a3c";
    ctx.fillText("RAGE", w * 0.5, 122);
  }
}

export function draw(ctx: CanvasRenderingContext2D, sim: Sim, assets: Assets) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const view = sim.viewW > 0 ? sim.viewW : VW;
  const scale = h > 0 ? h / FRAME_H : 1;
  const ox = 0;
  const oy = h * 0.86 - GROUND * scale;
  const cam = sim.camX;
  const sh = sim.shake > 0 ? (Math.random() - 0.5) * sim.shake * scale : 0;
  const sv = sim.shake > 0 ? (Math.random() - 0.5) * sim.shake * 0.45 * scale : 0;

  ctx.imageSmoothingEnabled = false;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, sim.level.sky[0]);
  sky.addColorStop(1, sim.level.sky[1]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  if (OUTDOOR.includes(sim.level.theme)) {
    ctx.fillStyle = "rgba(255,244,220,0.92)";
    ctx.beginPath();
    ctx.arc(w * 0.74, h * 0.16, Math.min(w, h) * 0.055, 0, Math.PI * 2);
    ctx.fill();
    clouds(ctx, sim, w);
  }

  const x0 = sim.camX - 80;
  const x1 = sim.camX + view + 80;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, w, h);
  ctx.clip();
  ctx.setTransform(scale, 0, 0, scale, ox - cam * scale + sh, oy + sv);

  if (sim.level.theme === "interior" || sim.level.theme === "vault") tiles(ctx, sim, x0, x1);
  else outdoor(ctx, sim, x0, x1);
  ground(ctx, sim, x0 - 400, x1 + 400);
  dressing(ctx, sim, x0, x1);
  platforms(ctx, sim);
  door(ctx, sim);
  actors(ctx, sim, assets);
  fx(ctx, sim);
  ctx.restore();

  if (sim.player.infect > 0) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = `rgba(60, 210, 90, ${0.07 + 0.05 * Math.sin(sim.elapsed * 8)})`;
    ctx.fillRect(0, 0, w, h);
  }
  fightReadout(ctx, sim, w);

  if (!sim.level.survival && sim.phase === "play") {
    const sx = ox + (goalX(sim) - cam) * scale + sh;
    if (sx > w - 20) {
      const y = oy + (GROUND - 160) * scale;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#222";
      ctx.lineWidth = Math.max(2, w * 0.003);
      ctx.beginPath();
      const ax = w - Math.max(28, w * 0.04);
      const s = Math.max(10, w * 0.014);
      ctx.moveTo(ax - s, y - s);
      ctx.lineTo(ax + s * 0.8, y);
      ctx.lineTo(ax - s, y + s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
}
