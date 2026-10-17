import { i as __toESM } from "../_runtime.mjs";
import { G as require_react, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-u3ny5Uyd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var agr170_default = "/assets/agr170-Chghjs95.png";
var ammo_default = "/assets/ammo-Dk1UEr3E.png";
var armor_default = "/assets/armor-DioLj1xL.png";
var axe_default = "/assets/axe-Jrax7viR.png";
var bat_default = "/assets/bat-DXwr30IR.png";
var boom_default = "/assets/boom-CjCYurgb.png";
var boots_default = "/assets/boots-CeNNY3N9.png";
var core_default = "/assets/core-DQUd30Mq.png";
var cross_default = "/assets/cross-BC5gTFnr.png";
var fillmeds_default = "/assets/meds-Cdiyzh7G.png";
var fists_default = "/assets/fists-C5ekecX7.png";
var hp_default = "/assets/hp-DZnkaOlb.png";
var knife_default = "/assets/knife-B3GlitNQ.png";
var launcher_default = "/assets/launcher-Bq1DND0U.png";
var meds_default = "/assets/meds-Cdiyzh7G.png";
var minigun_default = "/assets/minigun-BmoTWSNi.png";
var pulse_default = "/assets/pulse-S7BPBTRr.png";
var rail_default = "/assets/rail-CrHWEH8M.png";
var ranger_default = "/assets/ranger-D8i0GaLZ.png";
var resist_default = "/assets/resist-BRJ74hJ5.png";
var squad_default = "/assets/squad-CiKCbjlX.png";
var steal_default = "/assets/steal-DsvNEXuO.png";
var viper_default = "/assets/viper-D1mmjJjg.png";
var gamdom_title_default = "/assets/gamdom-title-B1anG9i4.jpg";
var ctx = null;
var musicAcc = 0;
var musicStep = 0;
var musicOn = true;
var sfxOn = true;
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
	}
	return ctx;
}
function unlockAudio() {
	const c = ac();
	if (c && c.state === "suspended") c.resume();
}
function setAudioPrefs(sfx, music) {
	sfxOn = sfx;
	musicOn = music;
}
function tone(freq, dur, type, gain, slide = 0) {
	const c = ac();
	if (!c || !sfxOn) return;
	const t = c.currentTime;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = type;
	o.frequency.setValueAtTime(freq, t);
	if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
	g.gain.setValueAtTime(gain, t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	o.connect(g);
	g.connect(c.destination);
	o.start(t);
	o.stop(t + dur + .02);
}
function sfx(name) {
	if (!sfxOn) return;
	switch (name) {
		case "jump":
			tone(420, .12, "square", .04, 180);
			break;
		case "punch":
			tone(180, .08, "sawtooth", .05, -80);
			break;
		case "kick":
			tone(140, .1, "square", .05, -60);
			break;
		case "shot":
			tone(640, .06, "square", .035, -400);
			break;
		case "boom":
			tone(90, .22, "sawtooth", .06, -40);
			break;
		case "hit":
			tone(240, .07, "square", .04, -100);
			break;
		case "hurt":
			tone(160, .14, "sawtooth", .05, -90);
			break;
		case "coin":
			tone(880, .06, "square", .03, 200);
			break;
		case "cross":
			tone(520, .18, "triangle", .05, 240);
			break;
		case "heal":
			tone(660, .12, "sine", .04, 120);
			break;
		case "ui":
			tone(500, .05, "square", .03);
			break;
		case "win":
			tone(523, .12, "square", .04);
			setTimeout(() => tone(659, .12, "square", .04), 90);
			setTimeout(() => tone(784, .18, "square", .04), 180);
			break;
		case "lose":
			tone(200, .25, "sawtooth", .05, -80);
			break;
		case "reload": tone(300, .08, "square", .03, 80);
	}
}
var SCALE = [
	220,
	261.6,
	293.7,
	196,
	246.9,
	174.6,
	329.6,
	261.6
];
function tickMusic(dt) {
	if (!musicOn) return;
	const c = ac();
	if (!c) return;
	musicAcc += dt;
	const step = .32;
	while (musicAcc >= step) {
		musicAcc -= step;
		const freq = SCALE[musicStep % SCALE.length] ?? 220;
		musicStep += 1;
		const t = c.currentTime;
		const o = c.createOscillator();
		const g = c.createGain();
		o.type = "triangle";
		o.frequency.setValueAtTime(freq / 2, t);
		g.gain.setValueAtTime(.018, t);
		g.gain.exponentialRampToValueAtTime(1e-4, t + .28);
		o.connect(g);
		g.connect(c.destination);
		o.start(t);
		o.stop(t + .3);
	}
}
var FACTIONS = {
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
		speed: 86
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
		speed: 92
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
		speed: 108
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
		speed: 64
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
		speed: 88
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
		speed: 74
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
		speed: 70
	}
};
var GUNS = [
	{
		id: "agr170",
		name: "AGR-170",
		page: 3,
		cost: 750,
		damage: 26,
		mag: 12,
		reload: 1.15,
		delay: .28,
		speed: 820,
		pellets: 1,
		spread: .02,
		auto: false,
		explosive: false,
		pierce: 0,
		color: "#5eead4",
		blurb: "Reliable sidearm. Steady damage, short reload."
	},
	{
		id: "viper",
		name: "VIPER",
		page: 3,
		cost: 1400,
		damage: 14,
		mag: 30,
		reload: 1.35,
		delay: .08,
		speed: 860,
		pellets: 1,
		spread: .05,
		auto: true,
		explosive: false,
		pierce: 0,
		color: "#c084fc",
		blurb: "Spray SMG. Hold fire and walk them down."
	},
	{
		id: "ranger",
		name: "RANGER",
		page: 3,
		cost: 2200,
		damage: 46,
		mag: 8,
		reload: 1.45,
		delay: .46,
		speed: 1100,
		pellets: 1,
		spread: 0,
		auto: false,
		explosive: false,
		pierce: 1,
		color: "#f87171",
		blurb: "Marksman rifle. Punches through a second target."
	},
	{
		id: "boom",
		name: "BOOM-6",
		page: 3,
		cost: 3e3,
		damage: 16,
		mag: 5,
		reload: 1.55,
		delay: .62,
		speed: 700,
		pellets: 5,
		spread: .2,
		auto: false,
		explosive: false,
		pierce: 0,
		color: "#fb923c",
		blurb: "Shotgun spread. Brutal up close."
	},
	{
		id: "pulse",
		name: "PULSE",
		page: 3,
		cost: 4200,
		damage: 22,
		mag: 20,
		reload: 1.4,
		delay: .11,
		speed: 940,
		pellets: 1,
		spread: .03,
		auto: true,
		explosive: false,
		pierce: 0,
		color: "#67e8f9",
		blurb: "Energy carbine. Fast bolts, clean recoil."
	},
	{
		id: "rail",
		name: "RAIL",
		page: 4,
		cost: 7e3,
		damage: 110,
		mag: 4,
		reload: 1.85,
		delay: .78,
		speed: 1500,
		pellets: 1,
		spread: 0,
		auto: false,
		explosive: false,
		pierce: 3,
		color: "#fde68a",
		blurb: "Heavy rail. Deletes a line of bodies."
	},
	{
		id: "minigun",
		name: "MINIGUN",
		page: 4,
		cost: 9e3,
		damage: 11,
		mag: 80,
		reload: 2.2,
		delay: .05,
		speed: 900,
		pellets: 1,
		spread: .07,
		auto: true,
		explosive: false,
		pierce: 0,
		color: "#facc15",
		blurb: "Spin-up wall of lead. Hungry for ammo."
	},
	{
		id: "launcher",
		name: "THUMPER",
		page: 4,
		cost: 11e3,
		damage: 86,
		mag: 3,
		reload: 2.05,
		delay: .72,
		speed: 460,
		pellets: 1,
		spread: 0,
		auto: false,
		explosive: true,
		pierce: 0,
		color: "#fb7185",
		blurb: "Grenade launcher. Splash hurts crowds."
	}
];
var GUN_MAP = Object.fromEntries(GUNS.map((g) => [g.id, g]));
var MELEE = {
	fists: {
		name: "FISTS",
		cost: 0,
		mul: 1,
		blurb: "Always with you. Punch and kick."
	},
	knife: {
		name: "KNIFE",
		cost: 450,
		mul: 1.3,
		blurb: "Quick blade. Melee hits harder."
	},
	bat: {
		name: "BAT",
		cost: 800,
		mul: 1.55,
		blurb: "Wide swings. Extra knockback."
	},
	axe: {
		name: "AXE",
		cost: 1400,
		mul: 1.9,
		blurb: "Heavy chop. Bosses feel it."
	}
};
var streetPlat = (xs) => xs.map((x, i) => ({
	x,
	y: i % 2 === 0 ? 348 : 332,
	w: 150,
	h: 70
}));
var foe = (rank, faction) => ({
	x: 0,
	rank,
	faction
});
var LEVELS = [
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
			{
				walk: 720,
				foes: [foe("pawn"), foe("pawn")]
			},
			{
				walk: 560,
				foes: [
					foe("pawn"),
					foe("pawn"),
					foe("pawn")
				]
			},
			{
				walk: 620,
				foes: [foe("pawn"), foe("elite")]
			},
			{
				walk: 700,
				foes: [foe("pawn"), foe("boss")]
			}
		],
		platforms: streetPlat([
			1100,
			2e3,
			2900,
			3800
		])
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
			{
				walk: 700,
				foes: [
					foe("pawn"),
					foe("pawn"),
					foe("pawn")
				]
			},
			{
				walk: 480,
				foes: [
					foe("pawn"),
					foe("pawn", "rollbit"),
					foe("elite")
				]
			},
			{
				walk: 520,
				foes: [
					foe("elite"),
					foe("pawn", "rollbit"),
					foe("pawn")
				]
			},
			{
				walk: 500,
				foes: [
					foe("elite"),
					foe("elite"),
					foe("pawn", "shuffle")
				]
			},
			{
				walk: 640,
				foes: [
					foe("pawn"),
					foe("elite"),
					foe("boss")
				]
			}
		],
		platforms: streetPlat([
			1e3,
			1900,
			2800,
			3700,
			4600
		])
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
			{
				walk: 680,
				foes: [
					foe("pawn"),
					foe("pawn"),
					foe("elite")
				]
			},
			{
				walk: 520,
				foes: [
					foe("elite"),
					foe("pawn"),
					foe("boss")
				]
			},
			{
				walk: 640,
				foes: [
					foe("pawn", "rollbit"),
					foe("elite", "rollbit"),
					foe("elite")
				]
			},
			{
				walk: 600,
				foes: [
					foe("elite", "shuffle"),
					foe("pawn", "shuffle"),
					foe("boss", "rollbit")
				]
			},
			{
				walk: 680,
				foes: [
					foe("elite"),
					foe("elite", "duelbits"),
					foe("pawn"),
					foe("boss")
				]
			}
		],
		platforms: streetPlat([
			1200,
			2200,
			3400,
			4600,
			5600
		])
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
			{
				walk: 640,
				foes: [
					foe("pawn"),
					foe("pawn"),
					foe("pawn")
				]
			},
			{
				walk: 480,
				foes: [
					foe("pawn"),
					foe("elite"),
					foe("pawn")
				]
			},
			{
				walk: 500,
				foes: [
					foe("elite"),
					foe("elite"),
					foe("pawn")
				]
			},
			{
				walk: 520,
				foes: [
					foe("pawn"),
					foe("elite"),
					foe("elite")
				]
			},
			{
				walk: 640,
				foes: [foe("elite"), foe("boss")]
			}
		],
		platforms: [
			{
				x: 900,
				y: 340,
				w: 180,
				h: 78
			},
			{
				x: 1800,
				y: 318,
				w: 200,
				h: 100
			},
			{
				x: 2800,
				y: 340,
				w: 160,
				h: 78
			},
			{
				x: 4e3,
				y: 322,
				w: 180,
				h: 96
			}
		]
	},
	{
		id: 5,
		name: "Jester Hall",
		theme: "interior",
		faction: "shuffle",
		width: 6e3,
		time: 270,
		sky: ["#c9d4ea", "#a9b6d4"],
		brief: "Dealers throw cards. Two elite rooms, then the Grand Jester.",
		spawns: [],
		encounters: [
			{
				walk: 620,
				foes: [
					foe("pawn"),
					foe("pawn"),
					foe("elite")
				]
			},
			{
				walk: 480,
				foes: [
					foe("pawn"),
					foe("elite"),
					foe("pawn")
				]
			},
			{
				walk: 500,
				foes: [
					foe("elite"),
					foe("elite"),
					foe("pawn")
				]
			},
			{
				walk: 520,
				foes: [
					foe("elite"),
					foe("pawn"),
					foe("elite")
				]
			},
			{
				walk: 660,
				foes: [
					foe("elite"),
					foe("elite"),
					foe("boss")
				]
			}
		],
		platforms: [
			{
				x: 1e3,
				y: 336,
				w: 160,
				h: 82
			},
			{
				x: 2100,
				y: 322,
				w: 210,
				h: 96
			},
			{
				x: 3400,
				y: 340,
				w: 150,
				h: 78
			},
			{
				x: 4600,
				y: 326,
				w: 180,
				h: 92
			}
		]
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
			{
				walk: 640,
				foes: [
					foe("pawn"),
					foe("pawn"),
					foe("pawn")
				]
			},
			{
				walk: 480,
				foes: [
					foe("elite"),
					foe("pawn"),
					foe("pawn")
				]
			},
			{
				walk: 500,
				foes: [
					foe("elite"),
					foe("elite"),
					foe("pawn")
				]
			},
			{
				walk: 520,
				foes: [
					foe("pawn", "rainbet"),
					foe("elite"),
					foe("elite")
				]
			},
			{
				walk: 680,
				foes: [
					foe("elite"),
					foe("elite"),
					foe("boss")
				]
			}
		],
		platforms: streetPlat([
			1100,
			2200,
			3400,
			4600,
			5400
		])
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
			{
				walk: 620,
				foes: [
					foe("pawn"),
					foe("pawn"),
					foe("elite")
				]
			},
			{
				walk: 480,
				foes: [
					foe("elite"),
					foe("pawn"),
					foe("pawn")
				]
			},
			{
				walk: 500,
				foes: [
					foe("elite"),
					foe("elite"),
					foe("pawn")
				]
			},
			{
				walk: 540,
				foes: [
					foe("elite"),
					foe("pawn"),
					foe("elite")
				]
			},
			{
				walk: 680,
				foes: [foe("elite"), foe("boss")]
			}
		],
		platforms: [
			{
				x: 900,
				y: 330,
				w: 180,
				h: 88
			},
			{
				x: 1900,
				y: 300,
				w: 200,
				h: 118
			},
			{
				x: 3100,
				y: 334,
				w: 170,
				h: 84
			},
			{
				x: 4300,
				y: 310,
				w: 160,
				h: 108
			},
			{
				x: 5200,
				y: 328,
				w: 170,
				h: 90
			}
		]
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
			{
				walk: 640,
				foes: [
					foe("pawn", "roobet"),
					foe("pawn", "stake"),
					foe("elite", "bcgame")
				]
			},
			{
				walk: 500,
				foes: [
					foe("elite", "rollbit"),
					foe("pawn", "shuffle"),
					foe("elite", "duelbits")
				]
			},
			{
				walk: 560,
				foes: [
					foe("elite", "stake"),
					foe("pawn", "roobet"),
					foe("boss", "stake")
				]
			},
			{
				walk: 600,
				foes: [
					foe("elite", "rainbet"),
					foe("elite", "shuffle"),
					foe("pawn", "bcgame")
				]
			},
			{
				walk: 680,
				foes: [
					foe("elite", "duelbits"),
					foe("elite", "rainbet"),
					foe("boss", "duelbits")
				]
			}
		],
		platforms: [
			{
				x: 1e3,
				y: 340,
				w: 160,
				h: 78
			},
			{
				x: 2200,
				y: 318,
				w: 190,
				h: 100
			},
			{
				x: 3600,
				y: 336,
				w: 170,
				h: 82
			},
			{
				x: 5e3,
				y: 310,
				w: 180,
				h: 108
			},
			{
				x: 6100,
				y: 332,
				w: 160,
				h: 86
			}
		]
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
			{
				walk: 600,
				foes: [
					foe("elite", "roobet"),
					foe("pawn", "bcgame"),
					foe("elite", "stake")
				]
			},
			{
				walk: 520,
				foes: [
					foe("elite", "rollbit"),
					foe("pawn", "shuffle"),
					foe("boss", "rollbit")
				]
			},
			{
				walk: 600,
				foes: [
					foe("elite", "rainbet"),
					foe("elite", "duelbits"),
					foe("pawn", "roobet")
				]
			},
			{
				walk: 560,
				foes: [
					foe("elite", "shuffle"),
					foe("elite", "stake"),
					foe("boss", "rainbet")
				]
			},
			{
				walk: 620,
				foes: [
					foe("elite", "bcgame"),
					foe("elite", "duelbits"),
					foe("pawn", "rollbit")
				]
			},
			{
				walk: 700,
				foes: [
					foe("elite", "duelbits"),
					foe("elite", "rainbet"),
					foe("boss", "bcgame")
				]
			}
		],
		platforms: [
			{
				x: 1100,
				y: 328,
				w: 180,
				h: 90
			},
			{
				x: 2400,
				y: 340,
				w: 150,
				h: 78
			},
			{
				x: 3800,
				y: 316,
				w: 200,
				h: 102
			},
			{
				x: 5200,
				y: 334,
				w: 170,
				h: 84
			},
			{
				x: 6600,
				y: 320,
				w: 180,
				h: 98
			}
		]
	},
	{
		id: 10,
		name: "Survival",
		theme: "street",
		faction: "roobet",
		width: 4e3,
		time: 9999,
		sky: ["#f6b07a", "#e36a3a"],
		brief: "Endless street. Cash out from the pause menu. Stars at 30s, 60s, 90s.",
		survival: true,
		spawns: [],
		encounters: [],
		platforms: []
	}
];
var LEVEL_MAP = Object.fromEntries(LEVELS.map((l) => [l.id, l]));
function hpCost(nextLevel) {
	return [
		0,
		8,
		12,
		18,
		26,
		36,
		50,
		70
	][nextLevel] ?? 99;
}
function crossCost(nextLevel) {
	return [
		0,
		10,
		14,
		20,
		28,
		40,
		56
	][nextLevel] ?? 99;
}
function bootCost(nextLevel) {
	return [
		0,
		350,
		700,
		1200,
		1800
	][nextLevel] ?? 9999;
}
function armorCost(nextLevel) {
	return [
		0,
		400,
		900,
		1500,
		2300
	][nextLevel] ?? 9999;
}
function coreCost(nextLevel) {
	return [
		0,
		8,
		14,
		22
	][nextLevel] ?? 99;
}
function medCost(nextLevel) {
	return [
		0,
		8,
		12,
		16,
		22,
		30
	][nextLevel] ?? 99;
}
function stealCost(nextLevel) {
	return [
		500,
		900,
		1400
	][nextLevel] ?? 9999;
}
var ROBOT_COST = 8e3;
var ROBOT_WAS = 13400;
function gunUpgradeCost(gun, nextLevel) {
	const mul = gun.page === 4 ? 2 : 1;
	return Math.round(160 * nextLevel * mul);
}
function comma(n) {
	return Math.floor(n).toLocaleString("en-US");
}
function formatClock(seconds) {
	const s = Math.max(0, Math.ceil(seconds));
	const m = Math.floor(s / 60);
	const r = s % 60;
	return `00:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
var HEROES = {
	gambino: {
		id: "gambino",
		name: "Gambino",
		blurb: "Small and quick. Rainbow hat, pacifier, faster steps, and a slip that dodges.",
		special: "Crown Set",
		specialText: "Same moves as Gamby. Cycles power punches, slams, and dashes.",
		hp: .72,
		speed: 1.28,
		melee: .84,
		knock: .9,
		swing: 1,
		height: 150,
		bodyH: 92,
		bodyW: 30
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
		bodyW: 34
	},
	steve: {
		id: "steve",
		name: "Steve",
		blurb: "Straw hat, green shirt, black shorts. More health, harder punches, slower steps.",
		special: "Crown Set",
		specialText: "Same moves as Gamby. Cycles power punches, slams, and dashes.",
		hp: 1.34,
		speed: .78,
		melee: 1.4,
		knock: 1.38,
		swing: 1,
		height: 196,
		bodyH: 118,
		bodyW: 40
	}
};
var HERO_ORDER = [
	"gambino",
	"gamby",
	"steve"
];
function heroOf(id) {
	if (id === "gamby" || id === "steve" || id === "gambino") return id;
	return "gambino";
}
function heroKit(id) {
	return HEROES[heroOf(id)];
}
function heroPortrait(id) {
	const hero = heroOf(id);
	if (hero === "gamby") return "/sprites/gamby-original/idle1.png?v=1";
	return `/sprites/cast/${hero}/idle.png?v=13`;
}
var KEY = "crownbreak-save-v1";
function defaultSave() {
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
		music: true
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return defaultSave();
		const parsed = JSON.parse(raw);
		if (parsed.version !== 1) return defaultSave();
		return {
			...defaultSave(),
			...parsed,
			version: 1,
			hero: heroOf(parsed.hero)
		};
	} catch {
		return defaultSave();
	}
}
function writeSave(save) {
	try {
		localStorage.setItem(KEY, JSON.stringify(save));
	} catch {}
}
function derived(save) {
	const melee = MELEE[save.melee] ?? MELEE.fists;
	const hero = heroKit(save.hero);
	return {
		maxHp: Math.round((380 + (save.hpLevel - 1) * 80) * hero.hp),
		speed: (1 + (save.boots - 1) * .07) * hero.speed,
		armor: Math.min(.35, (save.armor - 1) * .07),
		charges: Math.min(6, 2 + save.crossLevel),
		crossDmg: 70 + (save.crossLevel - 1) * 22,
		medCap: 3 + save.medLevel * 2,
		healPct: .28 + (save.coreLevel - 1) * .06,
		meleeMul: melee.mul * hero.melee,
		knock: (save.melee === "bat" || save.melee === "axe" ? 1.3 : 1) * hero.knock,
		lives: save.squad,
		steal: save.lifesteal * 6,
		resist: save.resist === 1
	};
}
function gunDamage(id, level) {
	const g = GUN_MAP[id];
	if (!g) return 0;
	return Math.round(g.damage * (1 + .12 * (level - 1)));
}
function clone(save) {
	return {
		...save,
		ownedMelee: [...save.ownedMelee],
		ownedGuns: [...save.ownedGuns],
		gunLevels: { ...save.gunLevels },
		ammo: { ...save.ammo },
		unlocked: [...save.unlocked],
		stars: { ...save.stars }
	};
}
function purchase(prev, id) {
	const save = clone(prev);
	const need = (currency, cost) => {
		if (currency === "coins" && save.coins < cost) return "Not enough coins";
		if (currency === "gems" && save.gems < cost) return "Not enough gems";
		return "";
	};
	const pay = (currency, cost) => {
		if (currency === "coins") save.coins -= cost;
		else save.gems -= cost;
	};
	if (id === "hp") {
		if (save.hpLevel >= 7) return {
			ok: false,
			reason: "LIFE is maxed",
			save: prev
		};
		const cost = hpCost(save.hpLevel);
		const err = need("gems", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("gems", cost);
		save.hpLevel += 1;
		return {
			ok: true,
			reason: "LIFE upgraded",
			save
		};
	}
	if (id === "cross") {
		if (save.crossLevel >= 6) return {
			ok: false,
			reason: "CROSS is maxed",
			save: prev
		};
		const cost = crossCost(save.crossLevel);
		const err = need("gems", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("gems", cost);
		save.crossLevel += 1;
		return {
			ok: true,
			reason: "Holy Cross upgraded",
			save
		};
	}
	if (id === "boots") {
		if (save.boots >= 5) return {
			ok: false,
			reason: "BOOTS are maxed",
			save: prev
		};
		const cost = bootCost(save.boots);
		const err = need("coins", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", cost);
		save.boots += 1;
		return {
			ok: true,
			reason: "Boots upgraded",
			save
		};
	}
	if (id === "armor") {
		if (save.armor >= 5) return {
			ok: false,
			reason: "PLATE is maxed",
			save: prev
		};
		const cost = armorCost(save.armor);
		const err = need("coins", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", cost);
		save.armor += 1;
		return {
			ok: true,
			reason: "Plate upgraded",
			save
		};
	}
	if (id === "core") {
		if (save.coreLevel >= 4) return {
			ok: false,
			reason: "CORE is maxed",
			save: prev
		};
		const cost = coreCost(save.coreLevel);
		const err = need("gems", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("gems", cost);
		save.coreLevel += 1;
		return {
			ok: true,
			reason: "Heal core upgraded",
			save
		};
	}
	if (id === "squad") {
		if (save.squad >= 3) return {
			ok: false,
			reason: "Squad is maxed",
			save: prev
		};
		const err = need("gems", 24);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("gems", 24);
		save.squad += 1;
		return {
			ok: true,
			reason: "Extra life unlocked",
			save
		};
	}
	if (id === "meds") {
		if (save.medLevel >= 6) return {
			ok: false,
			reason: "Medicine is maxed",
			save: prev
		};
		const cost = medCost(save.medLevel);
		const err = need("gems", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("gems", cost);
		save.medLevel += 1;
		save.medicine = Math.min(3 + save.medLevel * 2, save.medicine + 2);
		return {
			ok: true,
			reason: "Medicine stock grew",
			save
		};
	}
	if (id === "steal") {
		if (save.lifesteal >= 3) return {
			ok: false,
			reason: "Siphon is maxed",
			save: prev
		};
		const cost = stealCost(save.lifesteal);
		const err = need("coins", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", cost);
		save.lifesteal += 1;
		return {
			ok: true,
			reason: "Melee siphon upgraded",
			save
		};
	}
	if (id === "resist") {
		if (save.resist >= 1) return {
			ok: false,
			reason: "Already owned",
			save: prev
		};
		const err = need("coins", 600);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", 600);
		save.resist = 1;
		return {
			ok: true,
			reason: "Ward owned. Infection fades faster.",
			save
		};
	}
	if (id === "fillmeds") {
		const cap = derived(save).medCap;
		if (save.medicine >= cap) return {
			ok: false,
			reason: "Medicine is full",
			save: prev
		};
		const err = need("coins", 120);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", 120);
		save.medicine = cap;
		return {
			ok: true,
			reason: "Medicine restocked",
			save
		};
	}
	if (id === "knife" || id === "bat" || id === "axe") {
		const m = MELEE[id];
		if (save.ownedMelee.includes(id)) {
			save.melee = id;
			return {
				ok: true,
				reason: `${m.name} equipped`,
				save
			};
		}
		const err = need("coins", m.cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", m.cost);
		save.ownedMelee.push(id);
		save.melee = id;
		return {
			ok: true,
			reason: `${m.name} bought`,
			save
		};
	}
	if (id === "fists") {
		save.melee = "fists";
		return {
			ok: true,
			reason: "Fists equipped",
			save
		};
	}
	if (id.startsWith("gun:")) {
		const gid = id.slice(4);
		const g = GUN_MAP[gid];
		if (!g) return {
			ok: false,
			reason: "Unknown weapon",
			save: prev
		};
		if (save.ownedGuns.includes(gid)) {
			save.gunId = gid;
			return {
				ok: true,
				reason: `${g.name} equipped`,
				save
			};
		}
		const err = need("coins", g.cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", g.cost);
		save.ownedGuns.push(gid);
		save.gunLevels[gid] = 1;
		save.ammo[gid] = g.mag * 6;
		save.gunId = gid;
		return {
			ok: true,
			reason: `${g.name} bought`,
			save
		};
	}
	if (id.startsWith("up:")) {
		const gid = id.slice(3);
		const g = GUN_MAP[gid];
		if (!g || !save.ownedGuns.includes(gid)) return {
			ok: false,
			reason: "Buy it first",
			save: prev
		};
		const lvl = save.gunLevels[gid] ?? 1;
		if (lvl >= 5) return {
			ok: false,
			reason: "Weapon is maxed",
			save: prev
		};
		const cost = gunUpgradeCost(g, lvl);
		const err = need("coins", cost);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", cost);
		save.gunLevels[gid] = lvl + 1;
		return {
			ok: true,
			reason: `${g.name} upgraded`,
			save
		};
	}
	if (id === "ammo") {
		if (save.ownedGuns.length === 0) return {
			ok: false,
			reason: "Buy a gun first",
			save: prev
		};
		const err = need("coins", 280);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", 280);
		for (const gid of save.ownedGuns) {
			const g = GUN_MAP[gid];
			if (!g) continue;
			save.ammo[gid] = Math.max(save.ammo[gid] ?? 0, g.mag * 6);
		}
		return {
			ok: true,
			reason: "Magazines refilled",
			save
		};
	}
	if (id === "robot") {
		if (save.robot) {
			save.robotOn = !save.robotOn;
			return {
				ok: true,
				reason: save.robotOn ? "Robot deployed" : "Robot standing by",
				save
			};
		}
		const err = need("coins", ROBOT_COST);
		if (err) return {
			ok: false,
			reason: err,
			save: prev
		};
		pay("coins", ROBOT_COST);
		save.robot = true;
		save.robotOn = true;
		return {
			ok: true,
			reason: "Combat robot online",
			save
		};
	}
	return {
		ok: false,
		reason: "Nothing to buy",
		save: prev
	};
}
function finishRun(prev, run) {
	const save = clone(prev);
	save.medicine = Math.max(0, Math.min(derived(save).medCap, run.medicine));
	save.ammo = {
		...save.ammo,
		...run.ammo
	};
	let stars = 0;
	if (run.survival) {
		if (run.elapsed >= 30) stars += 1;
		if (run.elapsed >= 60) stars += 1;
		if (run.elapsed >= 90) stars += 1;
	} else if (run.outcome === "win") {
		stars = 1;
		if (run.maxHp > 0 && run.hp / run.maxHp >= .5) stars += 1;
		if (run.timeMax > 0 && run.timeLeft / run.timeMax >= .35) stars += 1;
	}
	const prevStars = save.stars[run.levelId] ?? 0;
	if (stars > prevStars) save.stars[run.levelId] = stars;
	let coinsGained = 0;
	let gemsGained = 0;
	if (run.outcome === "lose") coinsGained = Math.floor(run.coins * .5);
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
	return {
		save,
		stars,
		coinsGained,
		gemsGained,
		best: stars > prevStars
	};
}
var BOSS_TAG = {
	roobet: "ROOBET",
	stake: "STAKE",
	bcgame: "BC.GAME",
	rollbit: "ROLLBIT",
	shuffle: "SHUFFLE",
	duelbits: "DUELBITS",
	rainbet: "RAINBET"
};
function rankSize(rank) {
	if (rank === "boss") return {
		h: 228,
		w: 92,
		hp: 980,
		touch: 34,
		speedMul: .78
	};
	if (rank === "elite") return {
		h: 198,
		w: 70,
		hp: 240,
		touch: 26,
		speedMul: 1.05
	};
	return {
		h: 176,
		w: 58,
		hp: 112,
		touch: 20,
		speedMul: 1.12
	};
}
function makeEnemy(sim, x, rank, faction, hpMul = 1) {
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
		y: 418,
		vx: 0,
		hp: Math.round(sz.hp * hpMul),
		maxHp: Math.round(sz.hp * hpMul),
		facing: -1,
		hurt: 0,
		cd: .4 + Math.random() * .4,
		shootCd: .8,
		slam: 0,
		dead: 0,
		walk: Math.random() * 10,
		ranged,
		infect: f.infect && (rank !== "pawn" || Math.random() < .35),
		h: sz.h,
		w: sz.w,
		speed: f.speed * sz.speedMul,
		touch: sz.touch,
		touchCd: .35,
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
		pattern: 0
	});
}
function stampEnemy(enemy) {
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
function createSim(level, save, heroId) {
	const hero = heroOf(heroId ?? save.hero);
	const stats = derived({
		...save,
		hero
	});
	const ammo = {};
	for (const id of save.ownedGuns) ammo[id] = save.ammo[id] ?? 0;
	const gun = save.gunId && save.ownedGuns.includes(save.gunId) ? GUN_MAP[save.gunId] : null;
	let mag = 0;
	if (gun) {
		const have = ammo[gun.id] ?? 0;
		mag = Math.min(gun.mag, have);
		ammo[gun.id] = have - mag;
	}
	return {
		level,
		phase: "play",
		elapsed: 0,
		timeLeft: level.time,
		camX: 0,
		viewW: 960,
		player: {
			x: 160,
			y: 418,
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
			moveDur: .32,
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
			swingStun: .08,
			hero
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
		banner: level.survival ? "Survive. Pause to cash out. Stars at 30 / 60 / 90s." : "The street is empty. Move up.",
		bannerT: 7,
		exitHold: 0,
		wave: 0,
		waveT: 1.2,
		ammo,
		gunId: gun ? gun.id : null,
		robot: save.robot && save.robotOn ? {
			x: 80,
			y: 418,
			facing: 1,
			cd: .4,
			walk: 0
		} : null,
		stats,
		nextId: 1,
		resolved: false,
		muzzle: 0,
		encCursor: 0,
		liveEnc: -1,
		gateX: 1e9,
		nextAt: level.encounters[0]?.walk ?? 1e9
	};
}
function overlap(ax, ay, aw, ah, bx, by, bw, bh) {
	return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}
function trimParts(sim) {
	const cap = 220;
	if (sim.particles.length > cap) sim.particles.splice(0, sim.particles.length - cap);
}
function burst(sim, x, y, color, n, speed = 140) {
	for (let i = 0; i < n; i++) {
		const a = Math.random() * Math.PI * 2;
		const v = speed * (.4 + Math.random());
		sim.particles.push({
			x,
			y,
			vx: Math.cos(a) * v,
			vy: Math.sin(a) * v - 40,
			life: .35 + Math.random() * .3,
			max: .55,
			color,
			s: 2 + Math.random() * 3,
			kind: "bit",
			g: 520
		});
	}
	trimParts(sim);
}
function spray(sim, x, y, dir, color, n, power, kind) {
	for (let i = 0; i < n; i++) {
		const side = dir * (.25 + Math.random() * 1.15);
		const up = -.95 + Math.random() * .85;
		const v = power * (.4 + Math.random() * .85);
		sim.particles.push({
			x: x + (Math.random() - .5) * 10,
			y: y + (Math.random() - .5) * 12,
			vx: side * v,
			vy: up * v,
			life: .42 + Math.random() * .45,
			max: .9,
			color,
			s: kind === "spark" ? 1.6 + Math.random() * 2 : 2.4 + Math.random() * 3.6,
			kind,
			g: kind === "spark" ? 220 : 1100
		});
	}
	trimParts(sim);
}
function fluidOf(id) {
	if (id === "stake" || id === "rainbet") return "#38bdf8";
	if (id === "bcgame") return "#4ade80";
	if (id === "rollbit") return "#fbbf24";
	if (id === "duelbits") return "#2dd4bf";
	return "#e879f9";
}
function hitFx(sim, e, fromX, big) {
	const dir = e.x >= fromX ? 1 : -1;
	const y = e.y - e.h * .55;
	const wet = e.faction === "stake" || e.faction === "rainbet";
	spray(sim, e.x, y, dir, wet ? "#7dd3fc" : "#e11d48", big ? 16 : 8, big ? 240 : 170, "drop");
	spray(sim, e.x, y, dir, fluidOf(e.faction), big ? 12 : 6, big ? 210 : 150, "drop");
	spray(sim, e.x, y, dir, "#fff6c8", big ? 7 : 3, 260, "spark");
	if (big) {
		sim.particles.push({
			x: e.x + dir * 8,
			y: 416,
			vx: 0,
			vy: 0,
			life: 2.4,
			max: 2.4,
			color: wet ? "#38bdf8" : "#dc2626",
			s: e.rank === "boss" ? 46 : e.rank === "elite" ? 32 : 22,
			kind: "pool",
			g: 0
		});
		trimParts(sim);
	}
}
function floatText(sim, x, y, text, color) {
	sim.floats.push({
		x,
		y,
		text,
		life: .8,
		color
	});
	if (sim.floats.length > 24) sim.floats.shift();
}
function killEnemy(sim, e) {
	if (e.dead > 0) return;
	e.dead = .01;
	e.hp = 0;
	e.vx = 0;
	const gain = (e.rank === "boss" ? 260 : e.rank === "elite" ? 72 : 32) + e.id * 17 % (e.rank === "pawn" ? 14 : 24);
	sim.coins += gain;
	sim.kills += 1;
	floatText(sim, e.x, e.y - e.h, `+${gain}`, "#ffe27a");
	hitFx(sim, e, e.x - e.facing * 40, true);
	sfx("coin");
	if (sim.gunId && Math.random() < .45) {
		const add = e.rank === "boss" ? 18 : e.rank === "elite" ? 8 : 4;
		sim.ammo[sim.gunId] = (sim.ammo[sim.gunId] ?? 0) + add;
		floatText(sim, e.x, e.y - e.h - 16, `+${add} ammo`, "#b6fff2");
	}
}
function comboRank(n) {
	if (n >= 16) return "LEGENDARY";
	if (n >= 10) return "BRUTAL";
	if (n >= 6) return "GREAT";
	if (n >= 3) return "GOOD";
	return "";
}
function noteCombo(sim, heavy) {
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
	if (rank && (p.combo === 3 || p.combo === 6 || p.combo === 10 || p.combo === 16)) floatText(sim, p.x, p.y - 188, rank, "#ffe27a");
}
function breakCombo(sim) {
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
function hurtEnemy(sim, e, dmg, kb, fromX, opts = {}) {
	if (e.dead > 0) return;
	const p = sim.player;
	let dealt = dmg * (p.rageT > 0 ? 1.4 : 1) * (p.perfect > 0 && !opts.gun ? 1.8 : 1);
	let knock = kb * (p.rageT > 0 ? 1.35 : 1);
	if (!opts.gun && !opts.heavy && !opts.finisher && e.guard > 0) {
		dealt *= .35;
		knock *= .25;
		floatText(sim, e.x, e.y - e.h - 18, "GUARD", "#c9d4e0");
	} else if (!opts.gun && !opts.heavy && !opts.finisher && !opts.launch && e.stun <= 0 && e.lift <= 0 && e.rank !== "pawn" && p.chain <= 1 && Math.random() < (e.rank === "boss" ? .14 : .08)) {
		e.vx = (e.x >= fromX ? 1 : -1) * 280;
		e.guard = 0;
		floatText(sim, e.x, e.y - e.h - 8, "DODGE", "#d7ecff");
		return;
	}
	e.hp -= dealt;
	e.hurt = .14;
	const dir = e.x >= fromX ? 1 : -1;
	e.vx = dir * knock;
	e.x += dir * 4;
	if (opts.heavy || opts.finisher) {
		e.attackT = 0;
		e.guard = 0;
		e.stun = Math.max(e.stun, opts.stun ?? .28);
	} else if (opts.stun) e.stun = Math.max(e.stun, opts.stun);
	if (opts.launch) {
		e.liftV = -360;
		e.stun = Math.max(e.stun, .12);
	}
	floatText(sim, e.x, e.y - e.h - e.lift - 8, String(Math.round(dealt)), dealt >= 50 ? "#ffe27a" : "#fff");
	sim.shake = Math.min(10, sim.shake + (opts.finisher ? 6 : e.rank === "boss" ? 3 : 1.6));
	if (opts.finisher) sim.hitstop = Math.max(sim.hitstop, .09);
	if (!opts.gun) noteCombo(sim, !!opts.heavy || !!opts.finisher);
	if (sim.stats.steal > 0 && dealt > 0) p.hp = Math.min(p.maxHp, p.hp + sim.stats.steal * .15);
	if (e.hp <= 0) killEnemy(sim, e);
	else {
		hitFx(sim, e, fromX, false);
		sfx("hit");
	}
}
function hurtPlayer(sim, dmg, fromX, infect = false) {
	const p = sim.player;
	if (p.dead || sim.phase !== "play") return;
	if (p.dodgeT > 0 || p.invuln > 0 && p.dodgeT <= 0 && !p.blocking) {
		if (p.dodgeT > 0) {
			p.perfect = .7;
			floatText(sim, p.x, p.y - 160, "PERFECT", "#fff4a8");
			sim.rings.push({
				x: p.x,
				y: p.y - 80,
				r: 18,
				life: .22,
				max: .22,
				color: "#fff4a8"
			});
		}
		return;
	}
	if (p.invuln > 0) return;
	let dealt = Math.max(1, Math.round(dmg * (1 - sim.stats.armor)));
	if (p.blocking) {
		dealt = Math.max(1, Math.round(dealt * .22));
		p.vx = (p.x >= fromX ? 1 : -1) * 70;
		floatText(sim, p.x, p.y - 150, "BLOCK", "#d7ecff");
		for (const e of sim.enemies) {
			if (e.dead > 0) continue;
			if (Math.abs(e.x - fromX) < 30) e.stun = Math.max(e.stun, .16);
		}
		sfx("hit");
		p.hp -= dealt;
	} else {
		p.hp -= dealt;
		p.invuln = .55;
		p.hurtT = .16;
		const dir = p.x >= fromX ? 1 : -1;
		p.vx = dir * 220;
		p.vy = Math.min(p.vy, -160);
		sim.shake = 7;
		sim.hitstop = .045;
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
function body(p) {
	const kit = heroKit(p.hero);
	const h = p.crouch ? kit.bodyH * .62 : kit.bodyH;
	const w = p.crouch ? kit.bodyW * .9 : kit.bodyW;
	return {
		x: p.x - w / 2,
		y: p.y - h,
		w,
		h
	};
}
function fireGun(sim) {
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
	p.shootT = Math.max(p.shootT, .18);
	sim.muzzle = .06;
	gunDamage(gun.id, 1);
	spawnShot(sim, gun, dmgFromSim(sim));
	sfx(gun.explosive ? "boom" : "shot");
	if (p.mag <= 0) startReload(sim);
}
function dmgFromSim(sim) {
	if (!sim.gunId) return 0;
	const level = sim.gunLevel ?? 1;
	return gunDamage(sim.gunId, level);
}
function spawnShot(sim, gun, dmg) {
	const p = sim.player;
	const y = p.y - (p.crouch ? 70 : 112);
	const origin = p.x + p.facing * 48;
	for (let i = 0; i < gun.pellets; i++) {
		const ang = (Math.random() - .5) * gun.spread * 2;
		const vx = Math.cos(ang) * gun.speed * p.facing;
		const vy = Math.sin(ang) * gun.speed;
		sim.bullets.push({
			x: origin,
			y,
			vx,
			vy,
			dmg,
			r: gun.explosive ? 7 : 4,
			life: gun.explosive ? 1.3 : .85,
			friendly: true,
			color: gun.color,
			explosive: gun.explosive,
			pierce: gun.pierce,
			hit: []
		});
	}
}
function startReload(sim) {
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
function explode(sim, x, y, dmg) {
	burst(sim, x, y, "#ffb020", 16, 220);
	sim.rings.push({
		x,
		y,
		r: 20,
		life: .25,
		max: .25,
		color: "#ffd27a"
	});
	sim.shake = Math.min(10, sim.shake + 4);
	for (const e of sim.enemies) {
		if (e.dead > 0) continue;
		const dx = e.x - x;
		const dy = e.y - e.h * .5 - y;
		if (dx * dx + dy * dy < 7396) hurtEnemy(sim, e, dmg, 260, x, {
			gun: true,
			heavy: true
		});
	}
}
function bossesAlive(sim) {
	return sim.enemies.some((e) => e.rank === "boss" && e.dead <= 0);
}
function respawn(sim) {
	const p = sim.player;
	p.lives -= 1;
	p.dead = false;
	p.deadT = 0;
	p.hp = Math.round(p.maxHp * .55);
	p.x = p.checkpoint;
	p.y = 418;
	p.vx = 0;
	p.vy = 0;
	p.invuln = 1.3;
	p.infect = 0;
	sim.banner = "Back in. Watch the crowd.";
	sim.bannerT = 1.6;
}
var LIGHTS = [
	{
		name: "Jab",
		kind: "punch",
		dur: .2,
		dmg: 16,
		kb: 90,
		stun: .06
	},
	{
		name: "Cross",
		kind: "punch",
		dur: .24,
		dmg: 24,
		kb: 140,
		stun: .08
	},
	{
		name: "Hook",
		kind: "punch",
		dur: .28,
		dmg: 32,
		kb: 210,
		stun: .14
	},
	{
		name: "Uppercut",
		kind: "kick",
		dur: .32,
		dmg: 40,
		kb: 80,
		launch: true,
		stun: .16
	}
];
var SPECIALS = [
	{
		name: "Power Punch",
		kind: "punch",
		dur: .34,
		dmg: 56,
		kb: 480,
		heavy: true,
		stun: .32
	},
	{
		name: "Uppercut",
		kind: "kick",
		dur: .3,
		dmg: 48,
		kb: 90,
		launch: true,
		heavy: true,
		stun: .18
	},
	{
		name: "Spin Attack",
		kind: "kick",
		dur: .4,
		dmg: 36,
		kb: 250,
		aoe: true,
		heavy: true,
		stun: .12
	},
	{
		name: "Ground Slam",
		kind: "kick",
		dur: .34,
		dmg: 46,
		kb: 320,
		aoe: true,
		heavy: true,
		stun: .2
	},
	{
		name: "Dash Strike",
		kind: "punch",
		dur: .26,
		dmg: 42,
		kb: 280,
		heavy: true,
		dash: 740,
		stun: .16
	}
];
function beginSwing(sim, swing) {
	const p = sim.player;
	const haste = (p.rageT > 0 ? .8 : 1) * heroKit(p.hero).swing;
	p.meleeT = swing.dur * haste;
	p.moveDur = Math.max(.05, p.meleeT);
	p.meleeKind = swing.kind;
	p.moveName = swing.name;
	p.hitThisSwing = false;
	p.heavySwing = !!swing.heavy;
	p.launchHit = !!swing.launch;
	p.aoeHit = !!swing.aoe;
	p.finisher = !!swing.finisher;
	p.swingDmg = swing.dmg * (p.perfect > 0 ? 1.15 : 1);
	p.swingKb = swing.kb;
	p.swingStun = swing.stun ?? .08;
	p.blocking = false;
	p.bufLight = 0;
	p.bufHeavy = 0;
	if (swing.dash) p.vx = p.facing * swing.dash;
	else if (p.onGround) p.vx *= .4;
	sfx(swing.heavy || swing.kind === "kick" ? "kick" : "punch");
}
function connectSwing(sim) {
	const p = sim.player;
	if (p.hitThisSwing) return;
	p.hitThisSwing = true;
	const dmg = p.swingDmg * sim.stats.meleeMul;
	const kb = p.swingKb * sim.stats.knock;
	const opts = {
		heavy: p.heavySwing,
		launch: p.launchHit,
		finisher: p.finisher,
		stun: p.swingStun
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
		sim.rings.push({
			x: p.x,
			y: p.y - 20,
			r: 26,
			life: .22,
			max: .22,
			color: "#ffe1a8"
		});
		sim.shake = Math.min(10, sim.shake + 3);
	}
	if (p.finisher && landed) {
		sim.banner = "FINISHER";
		sim.bannerT = .8;
		sim.hitstop = Math.max(sim.hitstop, .1);
	}
	if (!landed && !p.aoeHit) p.comboT = Math.min(p.comboT, .35);
}
function weakenedInFront(sim) {
	const p = sim.player;
	for (const e of sim.enemies) {
		if (e.dead > 0 || e.hp > e.maxHp * .28) continue;
		const dx = e.x - p.x;
		if (dx * p.facing < -12) continue;
		if (Math.abs(dx) < 124 && e.lift <= 0) return true;
	}
	return false;
}
function step(sim, input, dt, gunLevel) {
	if (sim.phase !== "play") return;
	sim.gunLevel = gunLevel;
	const real = dt;
	if (sim.hitstop > 0) {
		sim.hitstop -= real;
		dt *= .25;
	}
	dt = Math.min(dt, .05);
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
	p.coyote = p.onGround ? .12 : Math.max(0, p.coyote - real);
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
		p.vx *= .9;
		if (p.deadT > .85) {
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
	let dir = 0;
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
	const running = dir !== 0 && p.holdT > .26 && !crouch;
	const cap = crouch ? walkSpeed * .46 : running ? runSpeed : walkSpeed;
	const swinging = p.meleeT > .1;
	if (p.dodgeT > 0) p.vx *= Math.max(0, 1 - dt * 1.4);
	else if (dir !== 0 && !p.blocking) {
		const accel = (running ? 1700 : 1120) * (p.onGround ? 1 : .72) * (swinging ? .45 : 1);
		const target = dir * (swinging ? cap * .4 : cap);
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
		p.gait += Math.abs(p.vx) * real / stride * Math.PI * 2;
	}
	if (input.jump) p.jumpBuf = .14;
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
	if (input.punch) p.bufLight = .18;
	if (input.kick) p.bufHeavy = .18;
	p.blocking = input.guard && p.onGround && p.dodgeT <= 0 && p.meleeT <= .02 && !p.slamPending;
	if (p.blocking) {
		p.vx *= .45;
		p.bufLight = 0;
		p.bufHeavy = 0;
	}
	const canAct = !p.blocking && p.dodgeT <= 0 && p.meleeT <= .08;
	if (canAct && p.bufHeavy > 0) {
		if (!p.onGround) {
			beginSwing(sim, {
				name: "Air Kick",
				kind: "kick",
				dur: .28,
				dmg: 34,
				kb: 180,
				heavy: true,
				stun: .1
			});
			p.vy = Math.max(p.vy, 240);
			p.slamPending = true;
		} else if (weakenedInFront(sim)) beginSwing(sim, {
			name: "Finisher",
			kind: "kick",
			dur: .42,
			dmg: 86,
			kb: 360,
			heavy: true,
			finisher: true,
			stun: .35
		});
		else beginSwing(sim, {
			name: "Heavy Kick",
			kind: "kick",
			dur: .36,
			dmg: 48,
			kb: 340,
			heavy: true,
			stun: .26
		});
	} else if (canAct && p.bufLight > 0) {
		if (!p.onGround) beginSwing(sim, {
			name: "Air Jab",
			kind: "punch",
			dur: .24,
			dmg: 26,
			kb: 120,
			stun: .08
		});
		else {
			const spec = LIGHTS[p.chain % LIGHTS.length];
			beginSwing(sim, spec);
			p.chain = (p.chain + 1) % LIGHTS.length;
			if (p.chain === 0) p.comboT = Math.max(p.comboT, .45);
		}
	}
	if (input.shoot) {
		if (sim.gunId) fireGun(sim);
		else if (canAct) beginSwing(sim, SPECIALS[4]);
	}
	if (input.reload) {
		if (!startReload(sim) && p.dodgeT <= 0 && p.meleeT <= .02) {
			const dir = input.left ? -1 : input.right ? 1 : p.facing;
			p.facing = dir;
			p.dodgeT = .24;
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
	if (input.cross && p.specialCd <= 0 && p.dodgeT <= 0 && p.meleeT <= .08) {
		if (p.meter >= 100) {
			p.meter = 0;
			beginSwing(sim, {
				name: "Ultimate",
				kind: "kick",
				dur: .48,
				dmg: 96,
				kb: 400,
				aoe: true,
				heavy: true,
				finisher: true,
				stun: .4
			});
			sim.banner = "ULTIMATE";
			sim.bannerT = 1.1;
			sim.hitstop = .12;
			p.specialCd = 1.3;
		} else {
			const spec = { ...SPECIALS[p.specialIx % SPECIALS.length] };
			p.specialIx = (p.specialIx + 1) % SPECIALS.length;
			if (p.charges > 0) {
				p.charges -= 1;
				p.infect = 0;
				spec.dmg *= 1.2;
				sim.rings.push({
					x: p.x,
					y: p.y - 40,
					r: 24,
					life: .28,
					max: .28,
					color: "#d8fff4"
				});
			}
			beginSwing(sim, spec);
			if (spec.name === "Ground Slam" && !p.onGround) p.slamPending = true;
			p.specialCd = p.rageT > 0 ? .7 : 1.05;
			sim.banner = spec.name;
			sim.bannerT = .7;
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
		if (along >= .36 && along <= .7) connectSwing(sim);
	}
	integratePlayer(sim, dt, false);
	if (p.slamPending && p.onGround) {
		p.slamPending = false;
		beginSwing(sim, {
			name: "Ground Slam",
			kind: "kick",
			dur: .22,
			dmg: 50,
			kb: 330,
			aoe: true,
			heavy: true,
			stun: .22
		});
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
function stepRoute(sim) {
	if (sim.level.survival) return;
	const list = sim.level.encounters;
	if (sim.liveEnc >= 0) {
		if (sim.enemies.some((e) => e.enc === sim.liveEnc && e.dead <= 0)) {
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
		} else sim.banner = "Road's open. Reach the door.";
		sim.bannerT = 1.8;
		return;
	}
	if (sim.encCursor >= list.length) return;
	if (sim.player.x < sim.nextAt) return;
	const enc = list[sim.encCursor];
	if (!enc) return;
	const view = sim.viewW > 0 ? sim.viewW : 960;
	const offscreen = sim.camX + view + 24;
	let base = Math.min(offscreen, sim.player.x + 480);
	base = Math.max(base, sim.player.x + 300);
	const maxX = sim.level.width - 200;
	if (base > maxX) base = Math.max(sim.player.x + 300, maxX);
	const lvl = sim.level.id;
	const mul = (1 + (lvl - 1) * .18) * (1 + sim.encCursor * .08);
	let last = base;
	enc.foes.forEach((f, i) => {
		const x = Math.min(sim.level.width - 80, base + i * 86);
		last = x;
		const e = makeEnemy(sim, x, f.rank, f.faction ?? sim.level.faction, mul * (f.rank === "boss" ? 1.2 : 1));
		e.enc = sim.encCursor;
		e.touch = Math.round(e.touch * (1 + (lvl - 1) * .1));
		e.speed *= 1 + (lvl - 1) * .04 + (f.rank === "elite" ? .08 : 0);
		if (lvl >= 2 && f.rank !== "pawn") e.cd *= .8;
		sim.enemies.push(e);
	});
	sim.gateX = Math.min(sim.level.width - 70, last + 130);
	sim.liveEnc = sim.encCursor;
	sim.banner = enc.foes.some((f) => f.rank === "boss") ? "Boss on the road." : sim.encCursor === 0 ? "Here they come." : "Next group.";
	sim.bannerT = 1.5;
}
function integratePlayer(sim, dt, dead) {
	const p = sim.player;
	p.vy += 1700 * dt;
	if (p.vy > 820) p.vy = 820;
	const prevY = p.y;
	p.x += p.vx * dt;
	const minX = 40;
	const maxX = sim.level.survival ? p.x + 2e3 : sim.level.width - 40;
	if (p.x < minX) p.x = minX;
	if (!sim.level.survival && p.x > maxX) p.x = maxX;
	p.y += p.vy * dt;
	let landed = false;
	if (p.vy >= 0 && prevY <= 418 && p.y >= 418) {
		p.y = 418;
		p.vy = 0;
		landed = true;
	}
	if (!dead && p.vy >= 0) {
		for (const plat of sim.level.platforms) if (p.x > plat.x - 8 && p.x < plat.x + plat.w + 8 && prevY <= plat.y && p.y >= plat.y) {
			p.y = plat.y;
			p.vy = 0;
			landed = true;
		}
	}
	const was = p.onGround;
	p.onGround = landed || p.y >= 418 && p.vy === 0;
	if (p.onGround && !was && prevY < p.y - .5) burst(sim, p.x, p.y, "#cbb89a", 4, 60);
	if (p.onGround && !p.dead) {
		sim.level.survival ? p.checkpoint : Math.floor(p.x / 700) * 700 + 80;
		if (!sim.level.survival && p.x > p.checkpoint + 500) p.checkpoint = Math.max(80, p.x - 40);
	}
	const look = p.facing * 56;
	const view = sim.viewW > 0 ? sim.viewW : 960;
	let target = p.x - view * .36 + look;
	const maxCam = sim.level.survival ? Math.max(0, p.x - 80) : Math.max(0, sim.level.width - view);
	if (target < 0) target = 0;
	if (!sim.level.survival && target > maxCam) target = maxCam;
	const k = 1 - Math.exp(-5 * dt);
	sim.camX += (target - sim.camX) * k;
}
function glide(e, target, dt, rate = 980) {
	const step = rate * dt;
	if (Math.abs(e.vx - target) <= step) e.vx = target;
	else e.vx += Math.sign(target - e.vx) * step;
	e.x += e.vx * dt;
}
function stepEnemies(sim, dt) {
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
				burst(sim, e.x, 418, "#dbe7ff", 14, 180);
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
					burst(sim, e.x, 418, "#dbe7ff", 14, 180);
				} else {
					e.stun = Math.max(e.stun, .22);
					burst(sim, e.x, 418, "#cbb89a", 6, 80);
				}
			}
		}
		if (e.dead > 0) {
			e.dead += dt;
			e.vx *= .8;
			e.x += e.vx * dt;
			if (e.dead > .85) e.removed = true;
			continue;
		}
		const dx = p.x - e.x;
		const adx = Math.abs(dx);
		if (!(sim.level.survival ? adx < 780 : adx < 980) || p.dead) {
			e.vx *= .9;
			e.x += e.vx * dt;
			e.attackT = 0;
			continue;
		}
		e.facing = dx === 0 ? e.facing : dx > 0 ? 1 : -1;
		const phase2 = e.rank === "boss" && e.hp < e.maxHp * .5;
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
			e.vx *= .88;
		} else if (e.attackT > 0) {
			const prev = e.attackT;
			e.attackT -= dt;
			if (e.hurt > .02) {
				e.x += e.vx * dt;
				e.vx *= .86;
			} else {
				const lunging = prev > .12;
				e.vx = e.facing * (lunging ? e.rank === "boss" ? 140 : 260 : 60);
				e.x += e.vx * dt;
			}
			if (prev > .13 && e.attackT <= .13 && Math.abs(p.y - e.y) < 120 && Math.abs(p.x - e.x) < reach + 36) {
				hurtPlayer(sim, e.touch + (e.rank === "boss" ? 10 : 0), e.x, e.infect);
				spray(sim, (p.x + e.x) * .5, p.y - 90, e.facing, e.color, 5, 140, "spark");
			}
		} else if (e.hurt > .02) {
			e.x += e.vx * dt;
			e.vx *= .86;
		} else if (e.slam > 0) {
			e.slam -= dt;
			e.vx = 0;
			e.attackT = Math.max(e.attackT, .2);
			if (e.slam <= .02) {
				if (Math.abs(p.x - e.x) < 170 && Math.abs(p.y - e.y) < 140 && !p.dead) hurtPlayer(sim, e.touch + 18, e.x, e.infect);
				burst(sim, e.x, 418, e.color, 12, 160);
				sim.shake = 8;
				e.attackT = 0;
			}
		} else if (e.charge !== 0) {
			if (e.charge < 0) {
				e.charge += dt;
				e.vx = 0;
				e.attackT = .28;
				if (e.charge >= 0) e.charge = .36;
			} else {
				e.charge -= dt;
				e.attackT = 0;
				e.vx = e.facing * (e.rank === "boss" ? 460 : 340);
				e.x += e.vx * dt;
				if (e.charge <= 0) {
					e.charge = 0;
					if (Math.abs(p.x - e.x) < reach + 28 && Math.abs(p.y - e.y) < 130) hurtPlayer(sim, e.touch + 8, e.x, e.infect);
					burst(sim, e.x, 418, e.color, 8, 120);
				}
			}
		} else if (e.ranged && adx > 168 && adx < 540 && e.rank !== "boss") {
			const prefer = e.rank === "pawn" ? 250 : 300;
			glide(e, adx < prefer - 30 ? -e.facing * e.speed * .9 : adx > prefer + 70 ? e.facing * e.speed : 0, dt, 860);
			if (e.shootCd <= 0) {
				e.shootCd = e.rank === "boss" ? .85 : e.rank === "elite" ? 1.15 : 1.45;
				const vy = (p.y - 100 - (e.y - e.h * .62)) / Math.max(.25, adx) * 240;
				sim.bullets.push({
					x: e.x + e.facing * (e.w * .45),
					y: e.y - e.h * .62,
					vx: e.facing * (e.rank === "boss" ? 360 : 300),
					vy: Math.max(-180, Math.min(180, vy)),
					dmg: Math.round((e.rank === "boss" ? 18 : e.rank === "elite" ? 14 : 11) * (1 + (sim.level.id - 1) * .08)),
					r: 5,
					life: 1.6,
					friendly: false,
					color: e.color,
					explosive: false,
					pierce: 0,
					hit: []
				});
				spray(sim, e.x + e.facing * 24, e.y - e.h * .62, e.facing, e.color, 3, 80, "spark");
			}
		} else if (adx > reach + (e.rank === "boss" ? 220 : 8)) glide(e, e.facing * e.speed * (phase2 ? 1.35 : 1.22), dt, 1100);
		else if (e.cd <= 0) {
			const threatened = p.combo >= 3 && adx < 150 && e.rank !== "boss";
			if (e.rank !== "pawn" && threatened && Math.random() < .55) {
				e.guard = .5;
				e.cd = .45;
				e.vx = 0;
			} else if (e.rank === "boss") {
				e.pattern = (e.pattern + 1) % 3;
				e.vx = 0;
				if (e.pattern === 1 && adx > 140) {
					e.charge = -.34;
					e.cd = phase2 ? 1.05 : 1.35;
					sim.banner = `${e.name} is charging.`;
					sim.bannerT = .7;
				} else if (e.pattern === 2) {
					e.slam = phase2 ? .42 : .62;
					e.cd = phase2 ? 1.4 : 1.8;
					sim.banner = "Slam incoming.";
					sim.bannerT = .7;
				} else {
					e.attackT = phase2 ? .4 : .58;
					e.cd = phase2 ? .75 : 1;
				}
			} else {
				e.attackT = e.rank === "elite" ? .48 : .34;
				e.cd = (e.rank === "elite" ? .62 : .7) * (sim.level.id >= 3 ? .9 : 1);
				e.vx = 0;
			}
		} else if (adx < reach * .7) glide(e, -e.facing * e.speed * .62, dt, 820);
		else glide(e, 0, dt, 1400);
		if (phase2 && e.rank === "boss" && e.slam <= 0 && e.charge === 0 && e.attackT <= 0 && e.cd <= 0 && adx < 260 && Math.random() < dt * .35) {
			e.slam = .48;
			e.cd = 1.6;
		}
		const bb = body(p);
		if (e.attackT <= 0 && e.stun <= 0 && e.lift <= 0 && e.touchCd <= 0 && !p.dead && overlap(bb.x, bb.y, bb.w, bb.h, e.x - e.w * .32, e.y - e.h * .9, e.w * .64, e.h * .9)) {
			e.touchCd = 1.05;
			hurtPlayer(sim, Math.max(8, Math.round(e.touch * .65)), e.x, e.infect && e.rank !== "pawn");
		}
		if (!sim.level.survival) e.x = Math.max(40, Math.min(sim.level.width - 40, e.x));
	}
	sim.enemies = sim.enemies.filter((e) => !e.removed);
}
function stepBullets(sim, dt) {
	const p = sim.player;
	for (const b of sim.bullets) {
		b.life -= dt;
		b.x += b.vx * dt;
		b.y += b.vy * dt;
		if (b.friendly) for (const e of sim.enemies) {
			if (e.dead > 0 || b.hit.includes(e.id)) continue;
			if (overlap(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2, e.x - e.w * .4, e.y - e.h, e.w * .85, e.h)) {
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
		else if (!p.dead) {
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
function stepRobot(sim, dt) {
	const r = sim.robot;
	if (!r || sim.player.dead) return;
	const goal = sim.player.x - sim.player.facing * 58;
	r.x += (goal - r.x) * Math.min(1, dt * 4);
	r.y = 418;
	r.facing = sim.player.facing;
	r.walk += Math.abs(goal - r.x) * dt;
	r.cd -= dt;
	if (r.cd <= 0) {
		let best = null;
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
			r.cd = .38;
			sim.bullets.push({
				x: r.x + r.facing * 24,
				y: r.y - 42,
				vx: r.facing * 740,
				vy: 0,
				dmg: 14,
				r: 3,
				life: .7,
				friendly: true,
				color: "#7dd3fc",
				explosive: false,
				pierce: 0,
				hit: []
			});
			sim.muzzle = Math.max(sim.muzzle, .04);
		}
	}
}
function stepWorld(sim, dt) {
	for (const part of sim.particles) {
		part.life -= dt;
		if (part.kind === "pool") continue;
		part.x += part.vx * dt;
		part.y += part.vy * dt;
		part.vy += part.g * dt;
		if (part.y > 417 && part.vy > 0 && part.kind !== "spark") {
			part.y = 417;
			part.vy *= -.18;
			part.vx *= .4;
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
function checkExit(sim, input, dt) {
	if (sim.level.survival || sim.player.dead) return;
	const goal = sim.level.width - 130;
	if (Math.abs(sim.player.x - goal) < 54 && sim.player.onGround && routeOpen(sim)) {
		sim.exitHold += dt;
		if (input.crouch || sim.exitHold > .45) {
			sim.phase = "win";
			sfx("win");
		}
	} else sim.exitHold = 0;
}
var WAVE_FACTIONS = [
	"roobet",
	"stake",
	"bcgame",
	"rollbit",
	"shuffle",
	"duelbits",
	"rainbet"
];
function stepWaves(sim, dt) {
	sim.waveT -= dt;
	if (sim.waveT > 0) return;
	sim.wave += 1;
	sim.waveT = Math.max(5.5, 9 - sim.wave * .15);
	const faction = WAVE_FACTIONS[(sim.wave - 1) % WAVE_FACTIONS.length] ?? "roobet";
	const mul = 1 + sim.wave * .08;
	const count = 2 + Math.floor(sim.wave / 2);
	for (let i = 0; i < count; i++) {
		const rank = sim.wave % 7 === 0 ? "boss" : sim.wave % 3 === 0 && i === 0 ? "elite" : "pawn";
		const x = sim.player.x + 460 + i * 70 + (sim.wave % 2 === 0 ? 0 : 40);
		sim.enemies.push(makeEnemy(sim, x, rank === "boss" && i > 0 ? "elite" : rank, faction, mul));
	}
	sim.banner = `Wave ${sim.wave}`;
	sim.bannerT = 1.4;
	sim.enemies = sim.enemies.filter((e) => e.dead > 0 || e.x > sim.player.x - 800);
}
function goalX(sim) {
	return sim.level.width - 130;
}
function routeOpen(sim) {
	if (sim.level.survival) return false;
	return sim.liveEnc < 0 && sim.encCursor >= sim.level.encounters.length && !bossesAlive(sim);
}
function bossesLeft(sim) {
	return sim.enemies.filter((e) => e.rank === "boss" && e.dead <= 0).length;
}
var OUTDOOR = [
	"street",
	"gnc",
	"foundry",
	"roof"
];
function hash(n) {
	const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
}
function wrap(n, m) {
	return (n % m + m) % m;
}
function pick(frames, index) {
	if (!frames || frames.length === 0) return void 0;
	return frames[(Math.floor(index) % frames.length + frames.length) % frames.length];
}
function paintSprite(ctx, img, x, y, destH, facing, pad, alpha, squat, rot, flash) {
	if (!img) return false;
	const dw = destH * (img.width / img.height);
	const dh = destH;
	ctx.save();
	ctx.translate(x, y);
	if (rot) ctx.rotate(rot);
	ctx.scale(facing >= 0 ? 1 : -1, squat ? .8 : 1);
	ctx.globalAlpha = alpha;
	if (flash) ctx.filter = "brightness(1.85)";
	ctx.drawImage(img, -dw / 2, -dh * (1 - pad), dw, dh);
	ctx.restore();
	return true;
}
function knight(ctx, x, y, h, facing, squat, alpha) {
	ctx.save();
	ctx.translate(x, y);
	ctx.scale(facing >= 0 ? 1 : -1, squat ? .7 : 1);
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
function enemyTag(ctx, e, gy) {
	const boss = e.rank === "boss";
	const stakeBoss = boss && e.faction === "stake";
	const label = boss ? e.tag : "PAWN";
	if (!label) return;
	const scale = Math.max(.2, Math.abs(ctx.getTransform().a) || 1);
	const font = (stakeBoss ? 22 : boss ? 18 : 14) / scale;
	const head = gy - e.h * (stakeBoss ? 1.22 : 1.08);
	const showBar = e.dead <= 0 && e.rank !== "pawn";
	const barH = stakeBoss ? 10 : boss ? 8 : 5;
	const barW = stakeBoss ? 78 : 56;
	const barY = head - 6 / scale - barH;
	const labelY = (showBar ? barY : head) - 3 / scale;
	if (showBar) {
		if (stakeBoss) {
			ctx.fillStyle = "#f4f7fb";
			ctx.fillRect(e.x - barW / 2 - 2, barY - 2, barW + 4, barH + 4);
			bar(ctx, e.x - barW / 2, barY, barW, barH, e.hp / Math.max(1, e.maxHp), "#123a8c");
		} else bar(ctx, e.x - 28, barY, 56, barH, e.hp / Math.max(1, e.maxHp), e.color);
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
function enemySprite(e, assets) {
	if (e.faction === "stake" && assets.stake.walk.length > 0) return stakeFrame(e, assets.stake);
	return pick(assets.enemies[e.faction], e.dead > 0 ? 0 : e.walk / 18);
}
function stakeFrame(e, clips) {
	if (e.dead > 0) return pick(clips.dead, e.dead * 4) ?? pick(clips.walk, 0);
	if (e.hurt > .02 && clips.hurt.length) return clips.hurt[0];
	if (e.attackT > 0 || e.slam > 0 || e.charge !== 0) {
		const along = e.attackT > 0 ? 1 - Math.min(1, e.attackT / .48) : e.charge < 0 ? .15 : .7;
		return pick(clips.attack, along * clips.attack.length) ?? pick(clips.walk, 0);
	}
	if (Math.abs(e.vx) > e.speed * .82 && clips.run.length) return pick(clips.run, e.walk / 10);
	if (Math.abs(e.vx) > 16 && clips.walk.length) return pick(clips.walk, e.walk / 16);
	return pick(clips.idle, e.walk / 28) ?? pick(clips.walk, 0);
}
function foeFallback(ctx, e, alpha) {
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
function skyline(ctx, sim) {
	const par = .22;
	ctx.save();
	ctx.translate(sim.camX * .78, 0);
	const left = sim.camX * par - 80;
	const right = left + 960 + 260;
	let x = Math.floor(left / 24) * 24;
	while (x < right) {
		const bw = 34 + Math.floor(hash(x * .17) * 54);
		const top = 250 - (50 + Math.floor(hash(x * .31) * 90));
		ctx.fillStyle = hash(x) > .5 ? "#5c6170" : "#4a5160";
		ctx.fillRect(x, top, bw, 250 - top);
		ctx.fillStyle = "#f6d48a";
		for (let wy = top + 8; wy < 240; wy += 14) for (let wx = x + 6; wx < x + bw - 6; wx += 12) if (hash(wx * 3 + wy) > .55) ctx.fillRect(wx, wy, 4, 5);
		x += bw + 8 + Math.floor(hash(x + 9) * 16);
	}
	ctx.restore();
}
function fence(ctx, x0, x1) {
	ctx.fillStyle = "#6d4a2e";
	ctx.fillRect(x0, 292, x1 - x0, 46);
	ctx.fillStyle = "#8a5e38";
	for (let x = Math.floor(x0 / 14) * 14; x < x1; x += 14) ctx.fillRect(x, 286, 8, 52);
	ctx.fillStyle = "#5a3e28";
	ctx.fillRect(x0, 300, x1 - x0, 4);
	ctx.fillRect(x0, 322, x1 - x0, 4);
}
function grass(ctx, x0, x1) {
	ctx.fillStyle = "#7dbe4a";
	ctx.fillRect(x0, 338, x1 - x0, 30);
	ctx.fillStyle = "#8ed056";
	for (let x = Math.floor(x0 / 10) * 10; x < x1; x += 10) {
		const h = 8 + (x % 20 === 0 ? 6 : 0);
		ctx.fillRect(x, 338 - h, 3, h);
	}
}
function tree(ctx, x) {
	const top = 168 + Math.floor(x) % 5 * 8;
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
function bush(ctx, x) {
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
function bench(ctx, x) {
	ctx.fillStyle = "#8d623c";
	ctx.fillRect(x, 390, 54, 6);
	ctx.fillRect(x + 4, 396, 4, 16);
	ctx.fillRect(x + 46, 396, 4, 16);
	ctx.fillStyle = "#6b4a2e";
	ctx.fillRect(x + 6, 378, 42, 4);
	for (let i = 0; i < 4; i++) ctx.fillRect(x + 8 + i * 10, 382, 3, 8);
}
function trashCan(ctx, x) {
	ctx.fillStyle = "#6d7680";
	ctx.fillRect(x, 382, 22, 32);
	ctx.fillStyle = "#9aa3ad";
	ctx.fillRect(x - 2, 378, 26, 5);
	ctx.fillStyle = "#d7e2c8";
	ctx.fillRect(x + 4, 400, 8, 6);
	ctx.fillRect(x + 14, 406, 10, 5);
}
function hydrant(ctx, x) {
	ctx.fillStyle = "#d4534a";
	ctx.fillRect(x, 390, 12, 24);
	ctx.fillRect(x - 6, 398, 8, 5);
	ctx.fillStyle = "#f0d37a";
	ctx.fillRect(x + 2, 384, 8, 6);
}
function crate(ctx, x) {
	ctx.fillStyle = "#c4a06a";
	ctx.fillRect(x, 390, 32, 28);
	ctx.strokeStyle = "#6b4a2e";
	ctx.lineWidth = 2;
	ctx.strokeRect(x, 390, 32, 28);
	ctx.beginPath();
	ctx.moveTo(x, 404);
	ctx.lineTo(x + 32, 404);
	ctx.moveTo(x + 16, 390);
	ctx.lineTo(x + 16, 418);
	ctx.stroke();
}
function cone(ctx, x) {
	ctx.fillStyle = "#f08a2a";
	ctx.beginPath();
	ctx.moveTo(x + 8, 392);
	ctx.lineTo(x, 418);
	ctx.lineTo(x + 16, 418);
	ctx.fill();
	ctx.fillStyle = "#fff";
	ctx.fillRect(x + 2, 406, 12, 4);
}
function streetSign(ctx, x, label) {
	ctx.fillStyle = "#d5dbe2";
	ctx.fillRect(x, 268, 5, 150);
	ctx.fillStyle = "#1d4e89";
	ctx.fillRect(x - 28, 250, 78, 22);
	ctx.fillStyle = "#fff";
	ctx.font = "800 11px Trebuchet MS, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(label, x + 11, 266);
}
function facade(ctx, x, w, tone, seed) {
	const top = 88 + Math.floor(hash(seed) * 36);
	ctx.fillStyle = tone;
	ctx.fillRect(x, top, w, 360 - top);
	ctx.fillStyle = "#3c4450";
	ctx.fillRect(x - 6, top - 10, w + 12, 12);
	const cols = Math.max(2, Math.floor((w - 20) / 52));
	for (let row = 0; row < 2; row++) for (let i = 0; i < cols; i++) {
		const wx = x + 12 + i * ((w - 20) / cols);
		const wy = top + 16 + row * 42;
		if (wy > 250) continue;
		ctx.fillStyle = hash(wx + seed + row) > .22 ? "#d7eaf4" : "#1d2836";
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
	const shopX = x + 16;
	const shopW = Math.max(48, w * .38);
	ctx.fillStyle = "#b9d7e6";
	ctx.fillRect(shopX, 268, shopW, 88);
	ctx.strokeStyle = "#3a4450";
	ctx.lineWidth = 3;
	ctx.strokeRect(shopX, 268, shopW, 88);
	ctx.strokeStyle = "rgba(255,255,255,0.45)";
	ctx.beginPath();
	ctx.moveTo(shopX + 6, 276);
	ctx.lineTo(shopX + shopW * .45, 340);
	ctx.stroke();
	const dx = x + w * .62;
	const open = hash(seed + 11) > .62;
	ctx.fillStyle = open ? "#1c2430" : hash(seed + 3) > .5 ? "#efe6d4" : "#5e6a78";
	ctx.fillRect(dx, 250, 48, 168);
	ctx.strokeStyle = "#2a261f";
	ctx.lineWidth = 3;
	ctx.strokeRect(dx, 250, 48, 168);
	if (open) {
		ctx.fillStyle = "#c4553a";
		ctx.fillRect(dx + 6, 348, 22, 8);
		ctx.fillStyle = "#3a4654";
		ctx.fillRect(dx + 8, 298, 30, 16);
	} else {
		ctx.fillStyle = "#9fd4ea";
		ctx.fillRect(dx + 8, 266, 32, 28);
		ctx.fillStyle = "#c9a15a";
		ctx.beginPath();
		ctx.arc(dx + 38, 334, 2.5, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.fillStyle = "#f4efe4";
	ctx.fillRect(dx - 46, 270, 40, 52);
	ctx.strokeStyle = "#222";
	ctx.strokeRect(dx - 46, 270, 40, 52);
	ctx.fillStyle = "#222";
	ctx.font = "700 9px Trebuchet MS, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(hash(seed + 9) > .5 ? "WANTED" : "NOTICE", dx - 26, 300);
	if (hash(seed + 4) > .45) {
		ctx.strokeStyle = "rgba(40,30,24,0.45)";
		ctx.beginPath();
		ctx.moveTo(x + w - 18, top + 8);
		ctx.lineTo(x + w - 6, top + 40);
		ctx.lineTo(x + w - 22, top + 70);
		ctx.stroke();
	}
}
function streetLife(ctx, sim, x0, x1) {
	if (sim.level.theme === "roof") return;
	ctx.save();
	const par = .45;
	ctx.translate(sim.camX * .55, 0);
	const left = sim.camX * par - 120;
	const right = left + 960 + 320;
	for (let x = Math.floor(left / 110) * 110; x < right; x += 110) {
		if (hash(x * .37) < .45) continue;
		ctx.fillStyle = hash(x) > .5 ? "#5b9a49" : "#467a3c";
		ctx.beginPath();
		ctx.ellipse(x, 318, 20 + hash(x + 1) * 16, 11, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
	for (let x = Math.floor((x0 - 20) / 280) * 280; x < x1 + 20; x += 280) {
		const n = hash(x * .17 + sim.level.id);
		if (n > .38) tree(ctx, x + hash(x + 2) * 36);
		if (n > .55) bush(ctx, x + 150);
	}
}
function interiorSet(ctx, x0, x1, vault) {
	for (let x = Math.floor(x0 / 360) * 360 + 70; x < x1; x += 360) {
		ctx.fillStyle = vault ? "#3a3148" : "#d9e0e6";
		ctx.fillRect(x, 326, 34, 92);
		ctx.fillStyle = vault ? "#241c30" : "#8ec6de";
		ctx.fillRect(x + 6, 340, 22, 28);
		ctx.strokeStyle = vault ? "#c6a15a" : "#5c6570";
		ctx.lineWidth = 2;
		ctx.strokeRect(x, 326, 34, 92);
		if (!vault && hash(x) > .4) {
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
			ctx.moveTo(bx + i * 8, 288);
			ctx.lineTo(bx + i * 8, 400);
		}
		ctx.moveTo(bx, 288);
		ctx.lineTo(bx + 40, 288);
		ctx.stroke();
		ctx.fillStyle = vault ? "#4a3d5c" : "#7d878f";
		ctx.fillRect(x + 70, 386, 22, 28);
		ctx.fillStyle = "#222";
		ctx.fillRect(x + 66, 382, 30, 6);
		ctx.fillStyle = vault ? "#6ee7b7" : "#d7e2c8";
		ctx.fillRect(x + 90, 408, 14, 6);
		ctx.fillRect(x + 104, 402, 8, 8);
	}
}
function ground(ctx, sim, x0, x1) {
	const theme = sim.level.theme;
	if (theme === "interior" || theme === "vault") {
		ctx.fillStyle = theme === "vault" ? "#2a2438" : "#9aa3ab";
		ctx.fillRect(x0, 410, x1 - x0, 900);
		ctx.fillStyle = theme === "vault" ? "#3a334c" : "#b7c0c8";
		ctx.fillRect(x0, 410, x1 - x0, 10);
		ctx.fillStyle = theme === "vault" ? "rgba(80,220,160,0.18)" : "rgba(90,140,160,0.18)";
		for (let x = Math.floor(x0 / 220) * 220 + 40; x < x1; x += 220) {
			ctx.beginPath();
			ctx.ellipse(x, 428, 16, 5, 0, 0, Math.PI * 2);
			ctx.fill();
		}
		return;
	}
	ctx.fillStyle = "#c8ccd1";
	ctx.fillRect(x0, 356, x1 - x0, 62);
	ctx.fillStyle = "#b4bac2";
	for (let x = Math.floor(x0 / 48) * 48; x < x1; x += 48) ctx.fillRect(x, 356, 1, 62);
	ctx.fillStyle = "#9aa1a8";
	ctx.fillRect(x0, 412, x1 - x0, 8);
	ctx.fillStyle = theme === "foundry" ? "#2a2422" : "#3a3e44";
	ctx.fillRect(x0, 420, x1 - x0, 1200);
	ctx.fillStyle = "rgba(255,255,255,0.35)";
	for (let x = Math.floor(x0 / 46) * 46; x < x1; x += 46) ctx.fillRect(x, 456, 18, 3);
	ctx.strokeStyle = "rgba(210,214,220,0.35)";
	ctx.lineWidth = 2;
	for (let x = Math.floor(x0 / 280) * 280 + 90; x < x1; x += 280) {
		ctx.beginPath();
		ctx.arc(x, 470, 10, 0, Math.PI * 2);
		ctx.stroke();
	}
}
function tiles(ctx, sim, x0, x1) {
	const vault = sim.level.theme === "vault";
	const tile = 32;
	for (let y = 0; y < 418; y += tile) for (let x = Math.floor(x0 / tile) * tile; x < x1; x += tile) {
		ctx.fillStyle = vault ? hash(x + y) > .5 ? "#2a2038" : "#342848" : hash(x * .2 + y) > .5 ? "#c5ced6" : "#d7e0e7";
		ctx.fillRect(x, y, tile, tile);
		ctx.strokeStyle = vault ? "#6d5a2a" : "#9aa6b2";
		ctx.lineWidth = 1;
		ctx.strokeRect(x + .5, y + .5, 31, 31);
	}
	const span = x1 - x0;
	const count = Math.max(2, Math.ceil(span / 220));
	for (let i = 0; i < count; i++) {
		const x = x0 + i * 230 % Math.max(230, span);
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
		ctx.lineTo(x - 40, 418);
		ctx.lineTo(x + 40, 418);
		ctx.fill();
	}
}
function outdoor(ctx, sim, x0, x1) {
	const theme = sim.level.theme;
	skyline(ctx, sim);
	if (theme === "roof") {
		ctx.fillStyle = "#6e7680";
		ctx.fillRect(x0, 300, x1 - x0, 118);
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
		const gap = 280 + Math.floor(hash(lamp * .02) * 220);
		if (lamp > x0 - 40) {
			ctx.fillStyle = "#d5dbe2";
			ctx.fillRect(lamp, 188, 6, 230);
			ctx.beginPath();
			ctx.fillStyle = "#f7fbff";
			ctx.arc(lamp + 3, 180, 12, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "rgba(255,244,210,0.2)";
			ctx.beginPath();
			ctx.moveTo(lamp + 3, 192);
			ctx.lineTo(lamp - 36, 410);
			ctx.lineTo(lamp + 42, 410);
			ctx.fill();
		}
		lamp += gap;
	}
}
function dressing(ctx, sim, x0, x1) {
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
			ctx.fillText(hash(x) > .5 ? "WANTED" : "ENLIST", x + 27, 174);
			ctx.fillStyle = "#66717a";
			ctx.fillRect(x + 90, 384, 24, 30);
			ctx.fillStyle = "#222";
			ctx.fillRect(x + 86, 378, 32, 7);
		}
		if (theme === "vault") for (let x = Math.floor(x0 / 200) * 200; x < x1; x += 200) {
			ctx.fillStyle = "#c6a15a";
			ctx.fillRect(x + 8, 80, 10, 338);
		}
	}
	if (theme === "gnc") {
		const bx = sim.level.width - 700;
		ctx.fillStyle = "#8d949c";
		ctx.fillRect(bx, 110, 620, 308);
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
			const tones = [
				"#9aa3ad",
				"#b08968",
				"#7f8b86",
				"#c4b49a",
				"#6e7c88",
				"#a67c52"
			];
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
		const signs = [
			"MILE",
			"OPEN",
			"SLOW",
			"EAST"
		];
		let prop = 200;
		while (prop < x1) {
			const n = hash(prop * .17 + sim.level.id);
			const step = 150 + Math.floor(hash(prop + 3) * 120);
			if (prop > x0 - 30) {
				if (n > .82) bench(ctx, prop);
				else if (n > .66) trashCan(ctx, prop);
				else if (n > .5) hydrant(ctx, prop);
				else if (n > .36) crate(ctx, prop);
				else if (n > .22) cone(ctx, prop);
				else streetSign(ctx, prop, signs[Math.floor(hash(prop + 9) * signs.length)] ?? "MILE");
			}
			prop += step;
		}
	}
}
function platforms(ctx, sim) {
	for (const plat of sim.level.platforms) {
		ctx.fillStyle = "#5c4634";
		ctx.fillRect(plat.x + 10, plat.y + 10, 6, Math.max(8, 418 - plat.y - 10));
		ctx.fillRect(plat.x + plat.w - 16, plat.y + 10, 6, Math.max(8, 418 - plat.y - 10));
		ctx.fillStyle = "#8d6a45";
		ctx.fillRect(plat.x, plat.y, plat.w, 14);
		ctx.fillStyle = "#c4a06a";
		ctx.fillRect(plat.x, plat.y, plat.w, 5);
	}
}
function door(ctx, sim) {
	if (sim.level.survival) return;
	const gx = goalX(sim);
	const locked = !routeOpen(sim);
	ctx.fillStyle = "#d7c39a";
	ctx.fillRect(gx - 26, 246, 54, 172);
	ctx.fillStyle = "#8ec8e4";
	ctx.fillRect(gx - 14, 264, 30, 32);
	ctx.strokeStyle = "#5c4630";
	ctx.lineWidth = 3;
	ctx.strokeRect(gx - 26, 246, 54, 172);
	ctx.fillStyle = "#6b5432";
	ctx.beginPath();
	ctx.arc(gx + 16, 332, 3, 0, Math.PI * 2);
	ctx.fill();
	if (locked) {
		ctx.fillStyle = "#e23b3b";
		ctx.fillRect(gx - 8, 322, 16, 14);
		ctx.strokeStyle = "#fff";
		ctx.strokeRect(gx - 8, 322, 16, 14);
	} else if (sim.exitHold > 0) {
		const open = Math.min(1, sim.exitHold / .45);
		ctx.fillStyle = "#14161c";
		ctx.fillRect(gx - 26, 246, 54 * open, 172);
	}
	if (Math.abs(sim.player.x - gx) < 70 && !sim.player.dead && sim.phase === "play") {
		ctx.fillStyle = "#111";
		ctx.font = "800 13px Trebuchet MS, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(locked ? "CLEAR THE BOSS" : "ENTER", gx, 230);
	}
}
function bar(ctx, x, y, w, h, pct, color) {
	ctx.fillStyle = "#111";
	ctx.fillRect(x, y, w, h);
	ctx.fillStyle = color;
	ctx.fillRect(x + 1, y + 1, Math.max(0, (w - 2) * pct), h - 2);
}
var FOOT = {
	roobet: .141,
	stake: .012,
	bcgame: .078,
	rollbit: .089,
	shuffle: .089,
	duelbits: .089,
	rainbet: .089,
	robot: .089
};
function actors(ctx, sim, assets) {
	const p = sim.player;
	if (sim.robot) {
		const r = sim.robot;
		const img = pick(assets.enemies.robot, r.walk / 16);
		ctx.fillStyle = "rgba(0,0,0,0.25)";
		ctx.beginPath();
		ctx.ellipse(r.x, r.y - 2, 18, 6, 0, 0, Math.PI * 2);
		ctx.fill();
		if (!paintSprite(ctx, img, r.x, r.y, 128, r.facing, FOOT.robot ?? .09, 1, false, 0, false)) {
			ctx.fillStyle = "#3b82f6";
			ctx.fillRect(r.x - 16, r.y - 90, 32, 90);
		}
	}
	for (const e of sim.enemies) {
		if (e.x < sim.camX - 260 || e.x > sim.camX + (sim.viewW > 0 ? sim.viewW : 960) + 260) continue;
		const alpha = e.dead > 0 ? Math.max(0, 1 - e.dead * 1.15) : 1;
		ctx.fillStyle = "rgba(0,0,0,0.28)";
		ctx.beginPath();
		ctx.ellipse(e.x, e.y - 2, Math.max(14, e.w * .42), 6, 0, 0, Math.PI * 2);
		ctx.fill();
		const gy = e.y - e.lift;
		const falling = e.dead > 0 && e.faction !== "stake" ? Math.min(1.35, e.dead * 2.6) * (e.facing || 1) : e.lift > 8 ? -.15 * e.facing : 0;
		const wind = e.faction === "stake" ? 0 : e.attackT > .2 ? -.35 * e.facing : e.attackT > 0 ? .28 * e.facing : 0;
		const img = enemySprite(e, assets);
		const stakeBoss = e.faction === "stake" && e.rank === "boss";
		const dest = e.h * (stakeBoss ? 1.35 : 1.24);
		if (stakeBoss && img) {
			ctx.save();
			ctx.filter = "brightness(0)";
			ctx.globalAlpha = .45 * alpha;
			paintSprite(ctx, img, e.x, gy, dest + 10, e.facing, FOOT.stake ?? .02, 1, false, 0, false);
			ctx.restore();
		}
		if (!paintSprite(ctx, img, e.x, gy, dest, e.facing, FOOT[e.faction] ?? .09, alpha, false, falling || wind, e.hurt > 0)) foeFallback(ctx, e, alpha);
		if (e.dead <= 0 && e.guard > 0) {
			ctx.strokeStyle = "#d7ecff";
			ctx.lineWidth = 3;
			ctx.strokeRect(e.x - e.w * .35, gy - e.h * .72, e.w * .7, e.h * .45);
		}
		if (e.dead <= 0 && e.attackT > .16) {
			ctx.save();
			ctx.strokeStyle = "#ffe27a";
			ctx.globalAlpha = .9;
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.arc(e.x + e.facing * 18, gy - e.h * .55, 22 + (.5 - Math.min(.5, e.attackT)) * 20, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();
		}
	}
	const pose = heroPose(sim, assets);
	const alpha = p.invuln > 0 && Math.floor(sim.elapsed * 16) % 2 === 0 ? .45 : 1;
	const kit = heroKit(p.hero);
	const tall = p.crouch || pose.duck ? kit.height * .78 : kit.height;
	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.beginPath();
	ctx.ellipse(p.x, p.y - 1, p.crouch ? 20 : kit.bodyW * .55, 6, 0, 0, Math.PI * 2);
	ctx.fill();
	const rot = p.dead ? Math.min(1.25, p.deadT * 2.1) * p.facing : pose.tilt;
	if (!paintSprite(ctx, pose.img, p.x, p.y, tall, p.facing, 0, alpha, p.crouch || pose.duck, rot, p.hurtT > 0) && !p.hero) knight(ctx, p.x, p.y, p.crouch ? 150 : 200, p.facing, p.crouch, alpha);
	if (p.meleeT > 0 && !p.dead) {
		const punch = p.meleeKind === "punch";
		const dur = punch ? .32 : .38;
		const swing = 1 - p.meleeT / dur;
		if (swing > .25 && swing < .85) {
			ctx.save();
			ctx.strokeStyle = punch ? "#d9ffe4" : "#ffe1a8";
			ctx.globalAlpha = .8;
			ctx.lineWidth = punch ? 4 : 6;
			ctx.beginPath();
			const low = !punch || /slam/i.test(p.moveName);
			const ax = p.x + p.facing * (low ? 28 : 46);
			const ay = p.y - (low ? 46 : p.crouch ? 70 : 118);
			ctx.arc(ax, ay, punch ? 34 : 48, p.facing > 0 ? -.9 : Math.PI - .9, p.facing > 0 ? .9 : Math.PI + .9);
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
		const total = GUN_MAP[sim.gunId].reload;
		bar(ctx, p.x - 18, p.y - 210, 36, 5, 1 - p.reloadT / total, "#8dffb3");
	}
	if (p.infect > 0 && !p.dead) {
		ctx.fillStyle = "#3dde67";
		ctx.globalAlpha = .35 + .25 * Math.sin(sim.elapsed * 10);
		ctx.beginPath();
		ctx.arc(p.x, p.y - 176, 7, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
	for (const e of sim.enemies) {
		if (e.removed) continue;
		if (e.x < sim.camX - 260 || e.x > sim.camX + (sim.viewW > 0 ? sim.viewW : 960) + 260) continue;
		enemyTag(ctx, e, e.y - e.lift);
	}
}
function heroPose(sim, assets) {
	const p = sim.player;
	const cast = assets.cast?.[p.hero];
	const idle = cast?.idle ?? [];
	const run = cast?.run?.length ? cast.run : idle;
	const attack = cast?.attack?.length ? cast.attack : idle;
	const still = {
		pad: .02,
		tilt: 0,
		duck: false
	};
	if (idle.length > 0) {
		if (p.dead) return {
			img: pick(idle, 0),
			...still
		};
		if (p.meleeT > 0) {
			const name = p.moveName;
			const kick = p.meleeKind === "kick";
			const along = 1 - p.meleeT / Math.max(.05, p.moveDur);
			const spin = /spin|ultimate/i.test(name);
			const slam = /slam/i.test(name);
			const frames = kick && !slam ? run : attack;
			return {
				img: pick(frames, along * Math.max(1, frames.length)),
				pad: .02,
				tilt: spin ? along * Math.PI * 2 : 0,
				duck: slam
			};
		}
		if (p.shootT > 0) return {
			img: pick(attack, 0),
			...still
		};
		if (!p.onGround) return {
			img: pick(cast?.jump?.length ? cast.jump : idle, 0),
			...still
		};
		if (Math.abs(p.vx) > 22 && p.hurtT <= 0) return {
			img: pick(run, p.gait / Math.PI),
			...still
		};
		return {
			img: pick(idle, p.animT * 1.5),
			...still
		};
	}
	return {
		img: void 0,
		...still
	};
}
function fx(ctx, sim) {
	for (const b of sim.bullets) {
		ctx.fillStyle = b.color;
		ctx.beginPath();
		ctx.arc(b.x, b.y, b.explosive ? b.r + 2 : b.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#111";
		ctx.lineWidth = 1.5;
		ctx.stroke();
		ctx.strokeStyle = b.color;
		ctx.globalAlpha = .45;
		ctx.beginPath();
		ctx.moveTo(b.x, b.y);
		ctx.lineTo(b.x - b.vx * .03, b.y - b.vy * .03);
		ctx.stroke();
		ctx.globalAlpha = 1;
	}
	for (const part of sim.particles) {
		ctx.globalAlpha = Math.max(0, part.life / part.max);
		ctx.fillStyle = part.color;
		if (part.kind === "pool") {
			ctx.beginPath();
			ctx.ellipse(part.x, part.y, part.s, part.s * .32, 0, 0, Math.PI * 2);
			ctx.fill();
		} else if (part.kind === "spark") {
			ctx.strokeStyle = part.color;
			ctx.lineWidth = 1.7;
			ctx.beginPath();
			ctx.moveTo(part.x, part.y);
			ctx.lineTo(part.x - part.vx * .028, part.y - part.vy * .028);
			ctx.stroke();
		} else if (part.kind === "drop") {
			ctx.beginPath();
			ctx.ellipse(part.x, part.y, Math.max(1.2, part.s * .55), Math.max(1.8, part.s), 0, 0, Math.PI * 2);
			ctx.fill();
		} else ctx.fillRect(part.x, part.y, part.s, part.s);
	}
	ctx.globalAlpha = 1;
	for (const ring of sim.rings) {
		const t = 1 - ring.life / Math.max(.001, ring.max);
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
		ctx.globalAlpha = Math.max(0, f.life / .8);
		ctx.strokeStyle = "#111";
		ctx.strokeText(f.text, f.x, f.y);
		ctx.fillStyle = f.color;
		ctx.fillText(f.text, f.x, f.y);
	}
	ctx.globalAlpha = 1;
}
function clouds(ctx, sim, w) {
	if (!OUTDOOR.includes(sim.level.theme)) return;
	ctx.fillStyle = "rgba(255,255,255,0.38)";
	for (let i = 0; i < 4; i++) {
		const x = wrap(i * 280 - sim.camX * .12, w + 180) - 80;
		const y = hBand(i);
		ctx.beginPath();
		ctx.ellipse(x, y, 46, 14, 0, 0, Math.PI * 2);
		ctx.ellipse(x + 28, y + 4, 30, 12, 0, 0, Math.PI * 2);
		ctx.fill();
	}
}
function hBand(i) {
	return 28 + i % 3 * 22;
}
function fightReadout(ctx, sim, w) {
	const p = sim.player;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.textAlign = "center";
	ctx.lineWidth = 4;
	const rank = p.combo >= 16 ? "LEGENDARY" : p.combo >= 10 ? "BRUTAL" : p.combo >= 6 ? "GREAT" : p.combo >= 3 ? "GOOD" : "";
	if (p.combo > 1) {
		ctx.font = "800 22px Trebuchet MS, sans-serif";
		ctx.strokeStyle = "#111";
		ctx.strokeText(`${p.combo} ${rank}`, w * .5, 54);
		ctx.fillStyle = p.rageT > 0 ? "#ffb020" : "#fff";
		ctx.fillText(`${p.combo} ${rank}`, w * .5, 54);
	}
	if (p.moveName && p.meleeT > 0) {
		ctx.font = "800 13px Trebuchet MS, sans-serif";
		ctx.fillStyle = "#ffe7b0";
		ctx.fillText(p.moveName, w * .5, 74);
	}
	const bx = w * .5 - 60;
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
		ctx.fillText(`SPECIAL ${p.specialCd.toFixed(1)}`, w * .5, 104);
	} else if (p.meter >= 100) {
		ctx.font = "800 12px Trebuchet MS, sans-serif";
		ctx.fillStyle = "#ffd24a";
		ctx.fillText("ULTIMATE READY", w * .5, 104);
	}
	if (p.rageT > 0) {
		ctx.font = "800 14px Trebuchet MS, sans-serif";
		ctx.fillStyle = "#ff7a3c";
		ctx.fillText("RAGE", w * .5, 122);
	}
}
function draw(ctx, sim, assets) {
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	const view = sim.viewW > 0 ? sim.viewW : 960;
	const scale = h > 0 ? h / 420 : 1;
	const ox = 0;
	const oy = h * .86 - 418 * scale;
	const cam = sim.camX;
	const sh = sim.shake > 0 ? (Math.random() - .5) * sim.shake * scale : 0;
	const sv = sim.shake > 0 ? (Math.random() - .5) * sim.shake * .45 * scale : 0;
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
		ctx.arc(w * .74, h * .16, Math.min(w, h) * .055, 0, Math.PI * 2);
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
		ctx.fillStyle = `rgba(60, 210, 90, ${.07 + .05 * Math.sin(sim.elapsed * 8)})`;
		ctx.fillRect(0, 0, w, h);
	}
	fightReadout(ctx, sim, w);
	if (!sim.level.survival && sim.phase === "play") {
		if (ox + (goalX(sim) - cam) * scale + sh > w - 20) {
			const y = oy + 258 * scale;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.fillStyle = "#fff";
			ctx.strokeStyle = "#222";
			ctx.lineWidth = Math.max(2, w * .003);
			ctx.beginPath();
			const ax = w - Math.max(28, w * .04);
			const s = Math.max(10, w * .014);
			ctx.moveTo(ax - s, y - s);
			ctx.lineTo(ax + s * .8, y);
			ctx.lineTo(ax - s, y + s);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}
}
var pad = {
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
	guard: false
};
var pulses = {
	jump: 0,
	punch: 0,
	kick: 0,
	cross: 0,
	meds: 0,
	reload: 0
};
var held = /* @__PURE__ */ new Set();
var override = null;
var prevKeys = /* @__PURE__ */ new Set();
function keysNow() {
	return override ? new Set(override) : held;
}
function take(name) {
	if ((pulses[name] ?? 0) > 0) {
		pulses[name] -= 1;
		return true;
	}
	return false;
}
function readInput() {
	const keys = keysNow();
	const edge = (codes) => codes.some((c) => keys.has(c) && !prevKeys.has(c));
	const down = (codes) => codes.some((c) => keys.has(c));
	const input = {
		left: pad.left || down(["KeyA", "ArrowLeft"]),
		right: pad.right || down(["KeyD", "ArrowRight"]),
		crouch: pad.crouch || down(["KeyS", "ArrowDown"]),
		shoot: pad.shoot || down([
			"KeyF",
			"KeyL",
			"KeyC"
		]),
		punch: pad.punch || down(["KeyJ", "KeyZ"]),
		kick: pad.kick || down(["KeyK", "KeyX"]),
		jump: edge([
			"Space",
			"KeyW",
			"ArrowUp"
		]) || take("jump"),
		cross: edge(["KeyQ"]) || take("cross"),
		meds: edge(["KeyE"]) || take("meds"),
		reload: edge(["KeyR"]) || take("reload"),
		guard: pad.guard || down([
			"KeyB",
			"ShiftRight",
			"ShiftLeft"
		])
	};
	prevKeys = keys;
	return input;
}
function pulse(name) {
	if (name in pulses) pulses[name] = (pulses[name] ?? 0) + 1;
}
function setProbeKeys(codes) {
	override = codes.length ? [...codes] : null;
}
function clearProbe() {
	override = null;
}
var bound = false;
function bindKeyboard() {
	if (bound || typeof window === "undefined") return;
	bound = true;
	const block = /* @__PURE__ */ new Set([
		"Space",
		"ArrowUp",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight"
	]);
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
		Object.keys(pad).forEach((k) => {
			pad[k] = false;
		});
	});
}
function loadImage(src) {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => resolve(null);
		img.src = src;
	});
}
async function loadSet(base, count = 4) {
	return (await Promise.all(Array.from({ length: count }, (_, i) => loadImage(`${base}/f${i + 1}.png?v=2`)))).filter((f) => !!f);
}
async function loadList(paths) {
	return (await Promise.all(paths.map((src) => loadImage(src)))).filter((f) => !!f);
}
var HERO = [
	"idle",
	"run",
	"jump",
	"shoot",
	"melee"
];
var ENEMIES = [
	"roobet",
	"stake",
	"bcgame",
	"rollbit",
	"shuffle",
	"duelbits",
	"rainbet",
	"robot"
];
async function loadCast(id) {
	if (id === "gamby") {
		const base = "/sprites/gamby-original";
		const [idle, run, attack, jump] = await Promise.all([
			loadList([`${base}/idle1.png?v=1`, `${base}/idle2.png?v=1`]),
			loadList([`${base}/run1.png?v=1`, `${base}/run2.png?v=1`]),
			loadList([`${base}/attack1.png?v=1`, `${base}/attack2.png?v=1`]),
			loadList([`${base}/jump1.png?v=4`])
		]);
		return {
			idle,
			run: run.length ? run : idle,
			attack: attack.length ? attack : idle,
			jump: jump.length ? jump : idle
		};
	}
	const base = `/sprites/cast/${id}`;
	const v = "v=13";
	const [idle, run, attack, jump] = await Promise.all([
		loadList([`${base}/idle.png?${v}`]),
		loadList([`${base}/run1.png?${v}`, `${base}/run2.png?${v}`]),
		loadList([`${base}/attack1.png?${v}`, `${base}/attack2.png?${v}`]),
		id === "gambino" || id === "steve" ? loadList([`${base}/jump.png?${v}`]) : Promise.resolve([])
	]);
	return {
		idle,
		run: run.length ? run : idle,
		attack: attack.length ? attack : idle,
		jump: jump.length ? jump : idle
	};
}
async function loadAssets() {
	const heroEntries = await Promise.all(HERO.map(async (name) => [name, await loadSet(`/sprites/hero/${name}`)]));
	const enemyEntries = await Promise.all(ENEMIES.map(async (name) => [name, await loadSet(`/sprites/enemies/${name}`)]));
	const castEntries = await Promise.all(HERO_ORDER.map(async (id) => [id, await loadCast(id)]));
	const stakeBase = "/sprites/enemies/stake";
	const stake = {
		idle: await loadList([1, 2].map((i) => `${stakeBase}/idle${i}.png?v=8`)),
		walk: await loadList([
			1,
			2,
			3,
			4
		].map((i) => `${stakeBase}/walk${i}.png?v=8`)),
		run: await loadList([
			1,
			2,
			3,
			4
		].map((i) => `${stakeBase}/run${i}.png?v=8`)),
		attack: await loadList([
			1,
			2,
			3
		].map((i) => `${stakeBase}/atk${i}.png?v=8`)),
		hurt: await loadList([`${stakeBase}/hurt1.png?v=8`]),
		dead: await loadList([
			1,
			2,
			3
		].map((i) => `${stakeBase}/dead${i}.png?v=8`))
	};
	return {
		ready: true,
		hero: Object.fromEntries(heroEntries),
		cast: Object.fromEntries(castEntries),
		enemies: Object.fromEntries(enemyEntries),
		stake
	};
}
var emptyAssets = () => ({
	ready: false,
	hero: {},
	cast: {
		gambino: {
			idle: [],
			run: [],
			attack: [],
			jump: []
		},
		gamby: {
			idle: [],
			run: [],
			attack: [],
			jump: []
		},
		steve: {
			idle: [],
			run: [],
			attack: [],
			jump: []
		}
	},
	enemies: {},
	stake: {
		idle: [],
		walk: [],
		run: [],
		attack: [],
		hurt: [],
		dead: []
	}
});
var weaponModules = /* #__PURE__ */ Object.assign({
	"../assets/weapons/agr170.png": agr170_default,
	"../assets/weapons/ammo.png": ammo_default,
	"../assets/weapons/armor.png": armor_default,
	"../assets/weapons/axe.png": axe_default,
	"../assets/weapons/bat.png": bat_default,
	"../assets/weapons/boom.png": boom_default,
	"../assets/weapons/boots.png": boots_default,
	"../assets/weapons/core.png": core_default,
	"../assets/weapons/cross.png": cross_default,
	"../assets/weapons/fillmeds.png": fillmeds_default,
	"../assets/weapons/fists.png": fists_default,
	"../assets/weapons/hp.png": hp_default,
	"../assets/weapons/knife.png": knife_default,
	"../assets/weapons/launcher.png": launcher_default,
	"../assets/weapons/meds.png": meds_default,
	"../assets/weapons/minigun.png": minigun_default,
	"../assets/weapons/pulse.png": pulse_default,
	"../assets/weapons/rail.png": rail_default,
	"../assets/weapons/ranger.png": ranger_default,
	"../assets/weapons/resist.png": resist_default,
	"../assets/weapons/squad.png": squad_default,
	"../assets/weapons/steal.png": steal_default,
	"../assets/weapons/viper.png": viper_default
});
var weaponArt = {};
for (const [path, url] of Object.entries(weaponModules)) {
	const name = path.split("/").pop()?.replace(/\.(png|jpe?g|webp)$/i, "") ?? "";
	if (name) weaponArt[name] = url;
}
var PAGES = [
	{
		title: "GEAR",
		ids: [
			"hp",
			"cross",
			"boots",
			"armor",
			"squad",
			"resist",
			"core",
			"steal"
		]
	},
	{
		title: "EQUIPMENT",
		ids: [
			"meds",
			"fillmeds",
			"fists",
			"knife",
			"bat",
			"axe",
			"ammo"
		]
	},
	{
		title: "ITEMS",
		ids: GUNS.filter((g) => g.page === 3).map((g) => g.id)
	},
	{
		title: "ITEMS",
		ids: [...GUNS.filter((g) => g.page === 4).map((g) => g.id), "robot"]
	}
];
function cardFor(id, save) {
	const d = derived(save);
	if (id === "hp") {
		const maxed = save.hpLevel >= 7;
		const cost = hpCost(save.hpLevel);
		return {
			id,
			label: "LIFE",
			badge: `${save.hpLevel}/7`,
			locked: false,
			equipped: true,
			blurb: "Raises the health you bring into every fight.",
			lines: [`HP ${comma(d.maxHp)}`, maxed ? "Maxed" : "Next rank +80 HP"],
			acts: [{
				id: "hp",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(cost),
				currency: "gems"
			}]
		};
	}
	if (id === "cross") {
		const maxed = save.crossLevel >= 6;
		const cost = crossCost(save.crossLevel);
		return {
			id,
			label: "CROSS",
			badge: `${d.charges}`,
			locked: false,
			equipped: true,
			blurb: "Holy cross. A burst that clears infection and hurts everything close.",
			lines: [`Charges ${d.charges}`, `Damage ${d.crossDmg}`],
			acts: [{
				id: "cross",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(cost),
				currency: "gems"
			}]
		};
	}
	if (id === "boots") {
		const maxed = save.boots >= 5;
		const cost = bootCost(save.boots);
		return {
			id,
			label: "BOOTS",
			badge: `${save.boots}/5`,
			locked: false,
			equipped: true,
			blurb: "Lighter steps. Run speed climbs with each rank.",
			lines: [`Speed ${Math.round(d.speed * 100)}%`],
			acts: [{
				id: "boots",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(cost),
				currency: "coins"
			}]
		};
	}
	if (id === "armor") {
		const maxed = save.armor >= 5;
		const cost = armorCost(save.armor);
		return {
			id,
			label: "PLATE",
			badge: `${save.armor}/5`,
			locked: false,
			equipped: true,
			blurb: "Cuts a share of incoming damage. Caps at 35%.",
			lines: [`Reduction ${Math.round(d.armor * 100)}%`],
			acts: [{
				id: "armor",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(cost),
				currency: "coins"
			}]
		};
	}
	if (id === "fists" || id === "knife" || id === "bat" || id === "axe") {
		const m = MELEE[id];
		const owned = save.ownedMelee.includes(id);
		const eq = save.melee === id;
		return {
			id,
			label: m.name,
			badge: owned ? eq ? "EQ" : "OWN" : comma(m.cost),
			locked: !owned,
			equipped: eq,
			blurb: m.blurb,
			lines: [`Melee x${m.mul.toFixed(2)}`, id === "bat" || id === "axe" ? "Extra knockback" : "Close range"],
			acts: [{
				id,
				label: !owned ? "BUY" : eq ? "EQUIPPED" : "EQUIP",
				price: !owned ? comma(m.cost) : "",
				currency: !owned ? "coins" : "none"
			}]
		};
	}
	if (id === "meds") {
		const maxed = save.medLevel >= 6;
		const cost = medCost(save.medLevel);
		return {
			id,
			label: "MEDICINE",
			badge: `${save.medicine}/${d.medCap}`,
			locked: false,
			equipped: true,
			blurb: "Drink to cure infection and restore a chunk of health.",
			lines: [`Carried ${save.medicine}`, `Cap ${d.medCap}`],
			acts: [{
				id: "meds",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(cost),
				currency: "gems"
			}]
		};
	}
	if (id === "fillmeds") {
		const full = save.medicine >= d.medCap;
		return {
			id,
			label: "REFILL",
			badge: `${save.medicine}/${d.medCap}`,
			locked: false,
			equipped: false,
			blurb: "Restock medicine bottles up to your current cap.",
			lines: ["Coins, not gems"],
			acts: [{
				id: "fillmeds",
				label: full ? "FULL" : "REFILL",
				price: full ? "" : comma(120),
				currency: "coins"
			}]
		};
	}
	if (id === "core") {
		const maxed = save.coreLevel >= 4;
		const cost = coreCost(save.coreLevel);
		return {
			id,
			label: "CORE",
			badge: `${save.coreLevel}/4`,
			locked: false,
			equipped: true,
			blurb: "Each bottle heals a larger share of max HP.",
			lines: [`Heal ${Math.round(d.healPct * 100)}%`],
			acts: [{
				id: "core",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(cost),
				currency: "gems"
			}]
		};
	}
	if (id === "squad") {
		const maxed = save.squad >= 3;
		return {
			id,
			label: "SQUAD",
			badge: `x${save.squad}`,
			locked: false,
			equipped: true,
			blurb: "An extra life. You come back at the last checkpoint.",
			lines: [`Lives ${save.squad}`],
			acts: [{
				id: "squad",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(24),
				currency: "gems"
			}]
		};
	}
	if (id === "steal") {
		const maxed = save.lifesteal >= 3;
		const cost = stealCost(save.lifesteal);
		return {
			id,
			label: "SIPHON",
			badge: `${save.lifesteal}/3`,
			locked: save.lifesteal === 0,
			equipped: save.lifesteal > 0,
			blurb: "Melee hits give a little health back.",
			lines: [`On hit +${d.steal}`],
			acts: [{
				id: "steal",
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(cost),
				currency: "coins"
			}]
		};
	}
	if (id === "resist") {
		const owned = save.resist >= 1;
		return {
			id,
			label: "WARD",
			badge: owned ? "OWN" : "LOCK",
			locked: !owned,
			equipped: owned,
			blurb: "Infection fades faster and bites for less.",
			lines: [owned ? "Ward online" : "One-time buy"],
			acts: [{
				id: "resist",
				label: owned ? "OWNED" : "BUY",
				price: owned ? "" : comma(600),
				currency: "coins"
			}]
		};
	}
	if (id === "ammo") return {
		id,
		label: "AMMO",
		badge: "ALL",
		locked: save.ownedGuns.length === 0,
		equipped: false,
		blurb: "Refill every owned firearm to six magazines.",
		lines: save.ownedGuns.length ? save.ownedGuns.map((g) => GUN_MAP[g]?.name ?? g) : ["Buy a gun first"],
		acts: [{
			id: "ammo",
			label: "REFILL",
			price: comma(280),
			currency: "coins"
		}]
	};
	if (id === "robot") return {
		id,
		label: "ROBOT",
		badge: save.robot ? save.robotOn ? "ON" : "OFF" : "LOCK",
		locked: !save.robot,
		equipped: !!save.robotOn,
		blurb: "A combat robot follows you and shoots on its own.",
		lines: [
			`Was ${comma(ROBOT_WAS)}`,
			"40% off this run",
			"Stays with you after the buy"
		],
		acts: [{
			id: "robot",
			label: save.robot ? save.robotOn ? "STANDBY" : "DEPLOY" : "BUY",
			price: save.robot ? "" : comma(ROBOT_COST),
			currency: save.robot ? "none" : "coins"
		}]
	};
	const g = GUN_MAP[id];
	if (g) {
		const owned = save.ownedGuns.includes(g.id);
		const lvl = save.gunLevels[g.id] ?? 1;
		const dmg = gunDamage(g.id, owned ? lvl : 1);
		const maxed = owned && lvl >= 5;
		const up = gunUpgradeCost(g, Math.max(1, lvl));
		const acts = [];
		if (!owned) acts.push({
			id: `gun:${g.id}`,
			label: "BUY",
			price: comma(g.cost),
			currency: "coins"
		});
		else {
			acts.push({
				id: `gun:${g.id}`,
				label: save.gunId === g.id ? "EQUIPPED" : "EQUIP",
				price: "",
				currency: "none"
			});
			acts.push({
				id: `up:${g.id}`,
				label: maxed ? "MAX" : "Upgrade",
				price: maxed ? "" : comma(up),
				currency: "coins"
			});
		}
		return {
			id: g.id,
			label: g.name,
			badge: owned ? `${save.ammo[g.id] ?? 0}/${g.mag}` : `0/${g.mag}`,
			locked: !owned,
			equipped: save.gunId === g.id,
			blurb: g.blurb,
			lines: [
				`LV ${owned ? lvl : 1} · Damage ${dmg}`,
				`Mag ${g.mag} · Reload ${g.reload.toFixed(1)}s`,
				`Fire ${Math.round(g.delay * 1e3)}ms`
			],
			acts
		};
	}
	return {
		id,
		label: id,
		badge: "",
		locked: true,
		equipped: false,
		blurb: "",
		lines: [],
		acts: []
	};
}
function releasePad() {
	Object.keys(pad).forEach((k) => {
		pad[k] = false;
	});
	clearProbe();
}
function ammoBank(sim) {
	const ammo = { ...sim.ammo };
	if (sim.gunId) ammo[sim.gunId] = (ammo[sim.gunId] ?? 0) + sim.player.mag;
	return ammo;
}
var landscapeLockTried = false;
function edgeStrips(img) {
	const sw = Math.max(16, Math.round(img.naturalWidth * .08));
	const paint = (sx) => {
		const canvas = document.createElement("canvas");
		canvas.width = sw;
		canvas.height = img.naturalHeight;
		const ctx = canvas.getContext("2d");
		if (!ctx) return "";
		ctx.drawImage(img, sx, 0, sw, img.naturalHeight, 0, 0, sw, img.naturalHeight);
		return canvas.toDataURL("image/jpeg", .85);
	};
	return {
		left: paint(0),
		right: paint(img.naturalWidth - sw)
	};
}
function requestGameLandscape() {
	if (landscapeLockTried) return;
	if (!(window.matchMedia?.("(pointer: coarse)").matches === true)) return;
	const orientation = screen.orientation;
	if (typeof orientation?.lock !== "function") return;
	landscapeLockTried = true;
	const lock = orientation.lock.bind(orientation);
	lock("landscape").catch(() => {
		const root = document.documentElement;
		if (document.fullscreenElement || typeof root.requestFullscreen !== "function") return;
		root.requestFullscreen().then(() => lock("landscape")).catch(() => {});
	});
}
function GameApp() {
	const [save, setSave] = (0, import_react.useState)(() => defaultSave());
	const [screen, setScreen] = (0, import_react.useState)("menu");
	const [titleReady, setTitleReady] = (0, import_react.useState)(false);
	const [titleBox, setTitleBox] = (0, import_react.useState)({
		left: 0,
		top: 0,
		width: 0,
		height: 0
	});
	const [edgeArt, setEdgeArt] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(0);
	const [pick, setPick] = (0, import_react.useState)("hp");
	const [settings, setSettings] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)("");
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [runPhase, setRunPhase] = (0, import_react.useState)("play");
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [hud, setHud] = (0, import_react.useState)(null);
	const saveRef = (0, import_react.useRef)(defaultSave());
	const heroRef = (0, import_react.useRef)(heroOf(defaultSave().hero));
	const screenRef = (0, import_react.useRef)("menu");
	const pausedRef = (0, import_react.useRef)(false);
	const phaseRef = (0, import_react.useRef)("play");
	const simRef = (0, import_react.useRef)(null);
	const assetsRef = (0, import_react.useRef)(emptyAssets());
	const canvasRef = (0, import_react.useRef)(null);
	const shellRef = (0, import_react.useRef)(null);
	const titleHomeRef = (0, import_react.useRef)(null);
	const settled = (0, import_react.useRef)(false);
	const heard = (0, import_react.useRef)(false);
	const portraitHoldRef = (0, import_react.useRef)(false);
	const shopFrom = (0, import_react.useRef)("menu");
	const [needsRotate, setNeedsRotate] = (0, import_react.useState)(() => typeof window !== "undefined" && window.innerHeight > window.innerWidth + 40);
	const hudSig = (0, import_react.useRef)("");
	screenRef.current = screen;
	pausedRef.current = paused;
	function applySave(next) {
		const hero = heroOf(next.hero);
		const fixed = hero === next.hero ? next : {
			...next,
			hero
		};
		heroRef.current = fixed.hero;
		saveRef.current = fixed;
		writeSave(fixed);
		setSave(fixed);
		setAudioPrefs(fixed.sfx, fixed.music);
	}
	function chooseHero(id) {
		heroRef.current = id;
		applySave({
			...saveRef.current,
			hero: id
		});
		sfx("ui");
	}
	function poke() {
		heard.current = true;
		unlockAudio();
		requestGameLandscape();
	}
	function goPage(dir) {
		const next = (page + dir + PAGES.length) % PAGES.length;
		const ids = PAGES[next].ids;
		setPage(next);
		if (!ids.includes(pick)) setPick(ids[0]);
		sfx("ui");
	}
	function buy(id) {
		const cur = saveRef.current;
		if (!cur) return;
		poke();
		const result = purchase(cur, id);
		if (result.ok) applySave(result.save);
		setToast(result.reason);
		sfx(result.ok ? "coin" : "ui");
	}
	function openShop(levelId) {
		const cur = saveRef.current;
		if (!cur) return;
		poke();
		if (levelId && cur.unlocked.includes(levelId)) applySave({
			...cur,
			selected: levelId
		});
		shopFrom.current = screenRef.current === "levels" ? "levels" : "menu";
		setPage(0);
		setPick("hp");
		setScreen("shop");
		sfx("ui");
	}
	function startLevel(id) {
		const level = LEVEL_MAP[id];
		const hero = heroOf(heroRef.current);
		const cur = {
			...saveRef.current,
			hero
		};
		if (!level || !cur.unlocked.includes(id)) {
			setToast("That street is still locked.");
			sfx("ui");
			return;
		}
		poke();
		releasePad();
		const next = cur.selected === id ? cur : {
			...cur,
			selected: id
		};
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
	function settle(outcome) {
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
			survival: !!sim.level.survival
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
	function leave(to) {
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
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		const loaded = loadSave();
		const hero = heroOf(loaded.hero);
		const fixed = {
			...loaded,
			hero
		};
		heroRef.current = hero;
		saveRef.current = fixed;
		setSave(fixed);
		setAudioPrefs(loaded.sfx, loaded.music);
		bindKeyboard();
		loadAssets().then((assets) => {
			assetsRef.current = assets;
		});
	}, []);
	(0, import_react.useEffect)(() => {
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
				height
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
	(0, import_react.useEffect)(() => {
		const root = shellRef.current;
		if (!root) return;
		const swallow = (event) => {
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
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = window.setTimeout(() => setToast(""), 1600);
		return () => window.clearTimeout(id);
	}, [toast]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code !== "Escape") return;
			if (screenRef.current === "play" && phaseRef.current === "play") setPaused((prev) => {
				pausedRef.current = !prev;
				return !prev;
			});
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		let frame = 0;
		let last = performance.now();
		let alive = true;
		const loop = (now) => {
			if (!alive) return;
			frame = requestAnimationFrame(loop);
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			window.__controlsTest = {
				getX: () => simRef.current?.player.x ?? 0,
				getYaw: () => simRef.current?.player.facing ?? 1,
				getSpeed: () => Math.abs(simRef.current?.player.vx ?? 0),
				setKeys: (codes) => setProbeKeys(codes),
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
						hpMax: sim?.player.maxHp ?? 0
					};
				}
			};
			if (heard.current) tickMusic(dt);
			if (screenRef.current !== "play") return;
			const sim = simRef.current;
			const canvas = canvasRef.current;
			if (!sim || !canvas) return;
			const bw = canvas.width;
			const bh = canvas.height;
			sim.viewW = bh > 0 ? bw / bh * 420 : 960;
			if (!pausedRef.current && !portraitHoldRef.current && sim.phase === "play") {
				const lvl = sim.gunId ? saveRef.current?.gunLevels[sim.gunId] ?? 1 : 1;
				step(sim, readInput(), dt, lvl);
			} else readInput();
			const ctx = canvas.getContext("2d");
			if (ctx) draw(ctx, sim, assetsRef.current);
			if (sim.phase !== phaseRef.current) {
				phaseRef.current = sim.phase;
				setRunPhase(sim.phase);
				if (sim.phase === "win" || sim.phase === "lose") settle(sim.phase);
			}
			const gun = sim.gunId ? GUN_MAP[sim.gunId] : null;
			const pct = sim.level.survival ? `Wave ${sim.wave}` : bossesLeft(sim) > 0 ? "BOSS" : `${Math.min(100, Math.round(sim.player.x / sim.level.width * 100))}%`;
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
				sim.player.hero
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
					reserve: sim.gunId ? sim.ammo[sim.gunId] ?? 0 : 0,
					gun: gun ? gun.name : "FISTS",
					clock: formatClock(sim.level.survival ? sim.elapsed : sim.timeLeft),
					progress: pct,
					levelName: sim.level.name,
					banner: sim.banner,
					bannerOn: sim.bannerT > 0,
					survival: !!sim.level.survival,
					infect: sim.player.infect > 0,
					reloading: sim.player.reloadT > 0,
					hero: sim.player.hero
				});
			}
		};
		frame = requestAnimationFrame(loop);
		return () => {
			alive = false;
			cancelAnimationFrame(frame);
		};
	}, []);
	function menuTap(action) {
		let used = false;
		return {
			onPointerUp: (e) => {
				if (e.pointerType === "mouse" && e.button !== 0) return;
				if (used) return;
				used = true;
				action();
			},
			onClick: (e) => {
				e.preventDefault();
				if (used) return;
				used = true;
				action();
			}
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
			onPointerDown: (e) => {
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
				} catch {}
			},
			onPointerUp: release,
			onPointerCancel: release,
			onLostPointerCapture: release,
			onContextMenu: (e) => e.preventDefault()
		};
	}
	function tap(key) {
		return {
			onPointerDown: (e) => {
				e.preventDefault();
				poke();
				pulse(key);
			},
			onContextMenu: (e) => e.preventDefault()
		};
	}
	function hold(key) {
		const release = () => {
			pad[key] = false;
		};
		return {
			onPointerDown: (e) => {
				if (e.pointerType === "mouse" && e.button !== 0) return;
				e.preventDefault();
				poke();
				pad[key] = true;
				try {
					e.currentTarget.setPointerCapture(e.pointerId);
				} catch {}
			},
			onPointerUp: release,
			onPointerCancel: release,
			onLostPointerCapture: release,
			onContextMenu: (e) => e.preventDefault()
		};
	}
	const level = LEVEL_MAP[save.selected] ?? LEVELS[0];
	const shownCoins = screen === "play" && runPhase === "play" && !summary ? save.coins + (hud?.coins ?? 0) : save.coins;
	const stats = derived(save);
	const card = cardFor(pick, save);
	const pageDef = PAGES[page] ?? PAGES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		className: `shell ${screen === "play" ? "is-play" : "is-menu"}`,
		onPointerDown: poke,
		onContextMenu: (e) => e.preventDefault(),
		children: [
			needsRotate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rotate-gate",
				role: "dialog",
				"aria-label": "Rotate your phone sideways to play",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotatePhone, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rotate your phone to landscape" })]
			}),
			screen === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `title-home ${titleReady ? "is-ready" : ""}`,
				ref: titleHomeRef,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "title-bleed",
						src: edgeArt?.left ?? "",
						alt: "",
						draggable: false,
						"aria-hidden": true,
						style: {
							left: 0,
							top: titleBox.top,
							width: titleBox.left + 10,
							height: titleBox.height,
							objectFit: "fill",
							transform: "scaleX(-1)",
							display: titleBox.left > 2 && edgeArt ? "block" : "none"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "title-bleed",
						src: edgeArt?.right ?? "",
						alt: "",
						draggable: false,
						"aria-hidden": true,
						style: {
							left: titleBox.left + titleBox.width - 10,
							top: titleBox.top,
							width: titleBox.left + 10,
							height: titleBox.height,
							objectFit: "fill",
							transform: "scaleX(-1)",
							display: titleBox.left > 2 && edgeArt ? "block" : "none"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "title-art",
						src: gamdom_title_default,
						alt: "Anger of Gamdom",
						draggable: false,
						style: titleBox.width > 0 ? {
							left: titleBox.left,
							top: titleBox.top,
							width: titleBox.width,
							height: titleBox.height,
							right: "auto",
							bottom: "auto"
						} : void 0,
						ref: (node) => {
							if (node?.complete && node.naturalWidth > 0) {
								setTitleReady(true);
								setEdgeArt((prev) => prev ?? edgeStrips(node));
							}
						},
						onLoad: (event) => {
							setTitleReady(true);
							const img = event.currentTarget;
							if (img.naturalWidth > 0) setEdgeArt(edgeStrips(img));
						},
						onError: () => setTitleReady(true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "title-hits",
						"aria-label": "Main menu",
						style: {
							left: titleBox.left,
							top: titleBox.top,
							width: titleBox.width,
							height: titleBox.height
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "hit hit-play",
								"aria-label": "PLAY",
								onClick: () => {
									poke();
									setScreen("cast");
									sfx("ui");
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "hit hit-shop",
								"aria-label": "SHOP",
								onClick: () => openShop()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "hit hit-opt",
								"aria-label": "OPTIONS",
								onClick: () => {
									poke();
									setSettings(true);
									sfx("ui");
								}
							})
						]
					})
				]
			}),
			screen === "cast" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage levels-screen",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, {
					save,
					coins: save.coins,
					hp: stats.maxHp,
					maxHp: stats.maxHp,
					lives: save.squad,
					meds: save.medicine,
					level: save.hpLevel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stage-body cast-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel cast",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "x",
								"aria-label": "Back",
								onClick: () => setScreen("menu"),
								children: "X"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Choose Fighter" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "cast-row",
								children: HERO_ORDER.map((id) => {
									const kit = HEROES[id];
									const on = heroKit(save.hero).id === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: `fighter${on ? " sel" : ""}`,
										onClick: () => chooseHero(id),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: heroPortrait(id),
												alt: "",
												draggable: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: kit.name }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"HP ",
												Math.round(kit.hp * 100),
												" · ATK ",
												Math.round(kit.melee * 100),
												" · SPD ",
												Math.round(kit.speed * 100)
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: kit.special }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: kit.specialText }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: on ? "SELECTED" : "SELECT" })
										]
									}, id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "cast-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "menu-btn ghost",
									onClick: () => setScreen("menu"),
									children: "BACK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "menu-btn start",
									onClick: () => {
										poke();
										heroRef.current = heroOf(saveRef.current.hero);
										applySave({
											...saveRef.current,
											hero: heroRef.current
										});
										setScreen("levels");
										sfx("ui");
									},
									children: [
										"FIGHT AS ",
										heroKit(save.hero).name.toUpperCase(),
										" →"
									]
								})]
							})
						]
					})
				})]
			}),
			screen === "levels" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage levels-screen",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, {
					save,
					coins: save.coins,
					hp: stats.maxHp,
					maxHp: stats.maxHp,
					lives: save.squad,
					meds: save.medicine,
					level: save.hpLevel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stage-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel levels",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "x",
								"aria-label": "Close",
								onClick: () => setScreen("menu"),
								children: "X"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Level Selection" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "level-grid",
								children: LEVELS.map((lv) => {
									const open = save.unlocked.includes(lv.id);
									const stars = save.stars[lv.id] ?? 0;
									const picked = save.selected === lv.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: `tile${open ? "" : " lock"}${picked ? " sel" : ""}`,
										disabled: !open,
										onClick: () => openShop(lv.id),
										children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: lv.id }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { n: stars })]
									}, lv.id);
								})
							})
						]
					})
				})]
			}),
			screen === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage shop-screen",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, {
					save,
					coins: save.coins,
					hp: stats.maxHp,
					maxHp: stats.maxHp,
					lives: save.squad,
					meds: save.medicine,
					level: save.hpLevel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stage-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shop",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "x",
							"aria-label": "Close",
							onClick: () => setScreen(shopFrom.current),
							children: "X"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shop-main",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid",
								children: pageDef.ids.map((id) => {
									const item = cardFor(id, save);
									const on = pick === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: `card${item.locked ? " lock" : ""}${on ? " sel" : ""}${item.equipped ? " eq" : ""}`,
										onClick: () => {
											setPick(id);
											sfx("ui");
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "art",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemArt, { id })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "cap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "name",
													children: item.label
												}), item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "count",
													children: item.badge
												}) : null]
											}),
											item.locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "pad",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {})
											})
										]
									}, id);
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "detail",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "detail-ico",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemArt, { id: pick })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "detail-copy",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: card.label }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: card.blurb }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "lines",
												children: card.lines.join(" · ")
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "acts",
										children: card.acts.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: `pill ${act.currency === "gems" ? "gem" : act.currency === "coins" ? "coin" : "plain"}`,
											onClick: () => buy(act.id),
											children: [act.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [act.currency === "gems" ? "◆ " : "", act.price] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: act.label })]
										}, act.id + act.label))
									})
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "shop-foot",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "nav",
								"aria-label": "Previous page",
								onClick: () => goPage(-1),
								children: "←"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pager",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									page + 1,
									"/",
									PAGES.length
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "nav",
									"aria-label": "Next page",
									onClick: () => goPage(1),
									children: "→"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "menu-btn start",
								onClick: () => startLevel(level.id),
								children: "START →"
							})
						]
					})]
				})]
			}),
			screen === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "play",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "hud",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "status",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: heroPortrait(hud?.hero ?? save.hero),
										alt: ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hp",
										"aria-label": "Health",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${Math.max(0, Math.min(100, (hud?.hp ?? stats.maxHp) / (hud?.maxHp ?? stats.maxHp) * 100))}%` } })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "meta",
										children: [
											heroKit(hud?.hero ?? save.hero).name,
											" · LV ",
											save.hpLevel,
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [" x", hud?.lives ?? save.squad] }),
											hud?.infect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: " INFECT" }) : null
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "vial",
										"aria-label": "Medicine",
										...tap("meds"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glyph, { id: "meds" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hud?.meds ?? save.medicine })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "clock",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hud?.clock ?? formatClock(level.time) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										hud?.levelName ?? level.name,
										" · ",
										hud?.progress ?? "0%"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: hud?.reloading ? "RELOADING" : !hud?.gun || hud.gun === "FISTS" ? "FISTS" : `${hud.gun} ${hud.mag}/${hud.reserve}` })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "curr",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dot" }),
										" ",
										comma(shownCoins)
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip gems",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "gemstone" }),
										" ",
										comma(save.gems)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "pause",
								"aria-label": "Pause",
								onPointerUp: (e) => {
									if (e.button !== 0 && e.pointerType === "mouse") return;
									if (runPhase === "play") {
										setPaused(true);
										pausedRef.current = true;
									}
								},
								children: "II"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "view",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: canvasRef,
							"aria-label": "Battle"
						}), hud?.bannerOn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "banner",
							children: hud.banner
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "deck",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pad",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "arrows",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "arrow",
									"aria-label": "Move left",
									...hold("left"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chevron, { dir: "left" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "arrow",
									"aria-label": "Move right",
									...hold("right"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chevron, { dir: "right" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fight-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "cluster",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "round",
										"aria-label": "Holy cross",
										...tap("cross"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cross, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["x", hud?.charges ?? stats.charges] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "round reload",
										"aria-label": "Reload",
										...guardTap(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reload, {})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "face",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "joy jump",
											"aria-label": "Jump",
											...tap("jump")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "joy punch",
											"aria-label": "Punch",
											...hold("punch")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "joy kick",
											"aria-label": "Kick",
											...hold("kick")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "joy shoot",
											"aria-label": "Shoot",
											...hold("shoot")
										})
									]
								})]
							})]
						})
					}),
					runPhase !== "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overlay",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "modal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: runPhase === "win" ? level.survival ? "CASHED OUT" : "CLEARED" : "DOWN" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { n: summary?.stars ?? 0 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"+",
									comma(summary?.coinsGained ?? 0),
									" coins",
									(summary?.gemsGained ?? 0) > 0 ? ` · +${summary?.gemsGained} gems` : ""
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "lines",
									children: summary?.best ? "New best stars." : "Replay anytime for a better mark."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "modal-actions",
									children: [
										runPhase === "win" && !level.survival && save.unlocked.includes(level.id + 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn",
											...menuTap(() => startLevel(level.id + 1)),
											children: "NEXT"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn",
											...menuTap(() => startLevel(level.id)),
											children: "RETRY"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn ghost",
											...menuTap(() => {
												releasePad();
												shopFrom.current = "menu";
												setScreen("shop");
											}),
											children: "ARMORY"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn ghost",
											...menuTap(() => {
												releasePad();
												setScreen("menu");
											}),
											children: "MENU"
										})
									]
								})
							]
						})
					}),
					runPhase === "play" && paused && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overlay",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "modal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "PAUSED" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: level.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "modal-actions",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn",
											onClick: () => {
												setPaused(false);
												pausedRef.current = false;
											},
											children: "RESUME"
										}),
										level.survival && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn",
											onClick: cashOut,
											children: "CASH OUT"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn ghost",
											onClick: () => startLevel(level.id),
											children: "RETRY"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn ghost",
											onClick: () => leave("shop"),
											children: "ARMORY"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "menu-btn ghost",
											onClick: () => leave("menu"),
											children: "MENU"
										})
									]
								})
							]
						})
					})
				]
			}),
			settings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overlay",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "modal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "OPTIONS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sound and music stay on this device." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "modal-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "menu-btn",
									onClick: () => applySave({
										...save,
										sfx: !save.sfx
									}),
									children: ["SOUND ", save.sfx ? "ON" : "OFF"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "menu-btn",
									onClick: () => applySave({
										...save,
										music: !save.music
									}),
									children: ["MUSIC ", save.music ? "ON" : "OFF"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "menu-btn ghost",
									onClick: () => setSettings(false),
									children: "CLOSE"
								})
							]
						})
					]
				})
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toast",
				role: "status",
				children: toast
			})
		]
	});
}
function Status(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "hud slim",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "status",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/sprites/portrait.jpg",
				alt: ""
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "life-row",
				"aria-label": "Lives",
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: i < props.lives ? "life on" : "life",
					children: i < props.lives ? "●" : "×"
				}, i))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "curr",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "chip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dot" }),
					" ",
					comma(props.coins)
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "chip gems",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "gemstone" }),
					" ",
					comma(props.save.gems)
				]
			})]
		})]
	});
}
function Stars({ n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "stars",
		"aria-label": `${n} of 3 stars`,
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: i < n ? "on" : "" }, i))
	});
}
function Lock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "lock-ico",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "5",
			y: "10",
			width: "14",
			height: "10",
			rx: "2",
			fill: "#fff",
			stroke: "#111",
			strokeWidth: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 10 V7 a4 4 0 0 1 8 0 V10",
			fill: "none",
			stroke: "#111",
			strokeWidth: "2"
		})]
	});
}
function RotatePhone() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "rotate-ico",
		viewBox: "0 0 88 88",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "14",
				width: "32",
				height: "52",
				rx: "6",
				fill: "none",
				stroke: "#f4f7fb",
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "44",
				cy: "58",
				r: "2.5",
				fill: "#f4f7fb"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M58 28 a22 22 0 1 1 -8 4",
				fill: "none",
				stroke: "#3ecf8e",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M58 18 v12 h-12",
				fill: "none",
				stroke: "#3ecf8e",
				strokeWidth: "4",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}
function Chevron({ dir }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 48",
		className: dir === "left" ? "flip" : "",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "6,8 34,8 34,0 58,24 34,48 34,40 6,40",
			fill: "#e8f6ff",
			stroke: "#14365f",
			strokeWidth: "3",
			strokeLinejoin: "round"
		})
	});
}
function Cross() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "32",
			r: "28",
			fill: "#2a1844",
			stroke: "#f0d56a",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M28 8 h8 v16 h16 v8 h-16 v16 h-8 v-16 h-16 v-8 h16 z",
			fill: "#f6e7a2",
			stroke: "#6a4a12",
			strokeWidth: "2"
		})]
	});
}
function Reload() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M46 20 a16 16 0 1 0 2 18",
			fill: "none",
			stroke: "#eceff3",
			strokeWidth: "6",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "40,12 54,16 44,28",
			fill: "#eceff3"
		})]
	});
}
function ItemArt({ id }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const src = !failed ? weaponArt[id] ?? (id === "robot" ? "/sprites/enemies/robot/f1.png" : "") : "";
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		draggable: false,
		onError: () => setFailed(true)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glyph, { id });
}
function Glyph({ id }) {
	const gun = GUN_MAP[id];
	if (gun) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GunGlyph, {
		kind: gun.id,
		color: gun.color
	});
	if (id === "hp") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 54 C10 36 8 20 18 16 C24 13 29 18 32 24 C35 18 40 13 46 16 C56 20 54 36 32 54Z",
			fill: "#ef3b4a",
			stroke: "#111",
			strokeWidth: "3"
		})
	});
	if (id === "cross") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cross, {});
	if (id === "meds" || id === "fillmeds" || id === "core") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "26",
				y: "6",
				width: "12",
				height: "10",
				rx: "3",
				fill: "#c98a3c",
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "20",
				y: "16",
				width: "24",
				height: "40",
				rx: "8",
				fill: "#eafff4",
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "24",
				width: "8",
				height: "22",
				rx: "2",
				fill: id === "core" ? "#7ef9ff" : "#3dce78"
			})
		]
	});
	if (id === "boots") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 8 h16 v28 h16 v12 h-32 z",
			fill: "#3d9a34",
			stroke: "#111",
			strokeWidth: "3"
		})
	});
	if (id === "armor" || id === "resist") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M10 12 h44 v18 c0 16 -12 24 -22 28 c-10 -4 -22 -12 -22 -28 z",
			fill: id === "resist" ? "#7dd3fc" : "#49b83a",
			stroke: "#111",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 18 v28",
			stroke: "#145c22",
			strokeWidth: "3"
		})]
	});
	if (id === "squad") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "20",
				cy: "22",
				r: "8",
				fill: "#3d9a34",
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "44",
				cy: "22",
				r: "8",
				fill: "#3d9a34",
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 48 c2 -12 10 -16 12 -16 h8 c2 0 10 4 12 16 z",
				fill: "#1b1d22",
				stroke: "#111",
				strokeWidth: "3"
			})
		]
	});
	if (id === "fists") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "8",
			y: "22",
			width: "18",
			height: "22",
			rx: "6",
			fill: "#3d9a34",
			stroke: "#111",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "38",
			y: "22",
			width: "18",
			height: "22",
			rx: "6",
			fill: "#3d9a34",
			stroke: "#111",
			strokeWidth: "3"
		})]
	});
	if (id === "knife") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 46 L40 10 h8 L22 50 z",
			fill: "#d7dde2",
			stroke: "#111",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "42",
			width: "10",
			height: "12",
			rx: "2",
			fill: "#6b3a22",
			stroke: "#111",
			strokeWidth: "3"
		})]
	});
	if (id === "bat") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M14 50 L34 8 h10 L24 50 z",
			fill: "#c48a48",
			stroke: "#111",
			strokeWidth: "3"
		})
	});
	if (id === "axe") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "30",
			y: "8",
			width: "6",
			height: "48",
			fill: "#8a5a32",
			stroke: "#111",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M36 12 h16 c4 8 4 18 0 26 h-16 z",
			fill: "#c0c6cc",
			stroke: "#111",
			strokeWidth: "3"
		})]
	});
	if (id === "steal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 52 C14 38 12 24 20 20 C26 17 30 22 32 26 C34 22 38 17 44 20 C52 24 50 38 32 52Z",
			fill: "#ef3b4a",
			stroke: "#111",
			strokeWidth: "3"
		})
	});
	if (id === "ammo") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "22",
				width: "48",
				height: "26",
				rx: "4",
				fill: "#f5c542",
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "14",
				width: "8",
				height: "14",
				fill: "#e8e8e8",
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "12",
				width: "8",
				height: "16",
				fill: "#e8e8e8",
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "42",
				y: "14",
				width: "8",
				height: "14",
				fill: "#e8e8e8",
				stroke: "#111",
				strokeWidth: "3"
			})
		]
	});
	if (id === "robot") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/sprites/enemies/robot/f1.png",
		alt: "",
		draggable: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "24",
			width: "40",
			height: "16",
			rx: "3",
			fill: "#f5c542",
			stroke: "#111",
			strokeWidth: "3"
		})
	});
}
function GunGlyph({ kind, color }) {
	if (kind === "agr170") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 28 h28 l6 -8 h16 v8 h-8 v6 h-8 l-4 10 h-8 l4 -10 h-8 z",
			fill: color,
			stroke: "#111",
			strokeWidth: "3"
		})
	});
	if (kind === "viper") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 30 h40 v-8 h14 v10 h-8 v8 h-10 l-4 8 h-8 l3 -8 h-8 z",
			fill: color,
			stroke: "#111",
			strokeWidth: "3"
		})
	});
	if (kind === "ranger" || kind === "rail") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M2 30 h46 v-6 h14 v8 h-10 v6 h-12 l-2 8 h-6 l2 -8 h-10 z",
			fill: color,
			stroke: "#111",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "18",
			y: "22",
			width: "16",
			height: "5",
			fill: "#222"
		})]
	});
	if (kind === "boom") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 26 h18 l10 -8 h22 v14 h-16 v6 h-10 l-4 10 h-8 l4 -10 h-6 z",
			fill: color,
			stroke: "#111",
			strokeWidth: "3"
		})
	});
	if (kind === "minigun") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "22",
				width: "40",
				height: "16",
				rx: "3",
				fill: color,
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "36",
				y: "16",
				width: "22",
				height: "6",
				fill: color,
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "36",
				y: "24",
				width: "22",
				height: "6",
				fill: color,
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "36",
				y: "32",
				width: "22",
				height: "6",
				fill: color,
				stroke: "#111",
				strokeWidth: "3"
			})
		]
	});
	if (kind === "launcher") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "24",
				width: "46",
				height: "12",
				rx: "6",
				fill: color,
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "40",
				y: "16",
				width: "16",
				height: "8",
				rx: "3",
				fill: color,
				stroke: "#111",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 36 h8 l-2 12 h-6 z",
				fill: "#333",
				stroke: "#111",
				strokeWidth: "3"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 30 h34 l8 -8 h12 v10 h-10 v8 h-10 l-4 8 h-8 z",
			fill: color,
			stroke: "#111",
			strokeWidth: "3"
		})
	});
}
var SplitComponent = GameApp;
//#endregion
export { SplitComponent as component };
