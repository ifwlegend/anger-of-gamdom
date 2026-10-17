import audio from "@/game/audio.ts?raw";
import content from "@/game/content.ts?raw";
import draw from "@/game/draw.ts?raw";
import input from "@/game/input.ts?raw";
import save from "@/game/save.ts?raw";
import sim from "@/game/sim.ts?raw";
import sprites from "@/game/sprites.ts?raw";
import gameApp from "@/components/GameApp.tsx?raw";
import styles from "@/styles.css?raw";
import indexRoute from "@/routes/index.tsx?raw";

const files: [string, string][] = [
  ["src/routes/index.tsx", indexRoute],
  ["src/components/GameApp.tsx", gameApp],
  ["src/styles.css", styles],
  ["src/game/sim.ts", sim],
  ["src/game/draw.ts", draw],
  ["src/game/content.ts", content],
  ["src/game/save.ts", save],
  ["src/game/input.ts", input],
  ["src/game/audio.ts", audio],
  ["src/game/sprites.ts", sprites],
];

export const GAME_SOURCE = files.map(([name, text]) => `===== ${name} =====\n\n${text}`).join("\n\n");
