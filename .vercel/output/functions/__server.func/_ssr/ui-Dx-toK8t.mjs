import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LayoutDashboard, i as Settings, o as CalendarDays, r as Store, s as BookOpen, t as Vault } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-Dx-toK8t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function band(id, label, min, max) {
	return {
		id,
		label,
		min,
		max
	};
}
function act(partial) {
	const cap = Math.max(...partial.bands.map((b) => b.max), 0);
	return {
		enabled: true,
		maxDaily: partial.maxDaily ?? cap,
		...partial
	};
}
/** Original Creative Formula, stored as a customizable starter — not a moral standard. */
function starterActivities() {
	const P = "physical";
	const I = "intellectual";
	const s = "social";
	const S = "spiritual";
	const N = "stillness";
	return [
		act({
			id: "pp1",
			code: "Pp1",
			name: "Nutrition",
			category: P,
			description: "How the day was nourished. A log, not a verdict — skip a day whenever you want.",
			bands: [
				band("none", "Ate unwell / skip", 0, 0),
				band("decent", "Decently well", 7, 10),
				band("meals", "Decently, within mealtimes", 11, 13),
				band("healthy", "Healthy nourishment", 14, 17)
			]
		}),
		act({
			id: "pp2",
			code: "Pp2",
			name: "Run",
			category: P,
			description: "A run relative to your own average. Stop if it hurts.",
			bands: [
				band("none", "Did not run", 0, 0),
				band("slow", "Slow run, 1+ mile", 6, 9),
				band("avg", "Average run", 10, 12),
				band("above", "Above average", 13, 16)
			]
		}),
		act({
			id: "pp3",
			code: "Pp3",
			name: "Plank",
			category: P,
			description: "Core hold. Choose the band that matches what you actually held.",
			bands: [
				band("none", "No plank", 0, 0),
				band("m1", "1 minute", 5, 8),
				band("m3", "3 minutes", 9, 11),
				band("m4", "4 minutes or more", 12, 15)
			]
		}),
		act({
			id: "pp4",
			code: "Pp4",
			name: "Hike or sport",
			category: P,
			description: "A hike, game, or sport session.",
			bands: [band("none", "Did not", 0, 0), band("did", "Showed up", 4, 14)]
		}),
		act({
			id: "ip1",
			code: "Ip1",
			name: "School and study",
			category: I,
			description: "Class, homework, or deliberate study.",
			bands: [
				band("none", "No learning today", 0, 0),
				band("little", "A little", 7, 10),
				band("tried", "Meaningful effort", 11, 13),
				band("deep", "Extensive study", 14, 17)
			]
		}),
		act({
			id: "ip2",
			code: "Ip2",
			name: "Book writing or reading",
			category: I,
			description: "Original formula awards this only Friday–Sunday. Change the days anytime.",
			weekdays: [
				5,
				6,
				0
			],
			bands: [
				band("none", "Did not write or read", 0, 0),
				band("h2", "About 2 hours", 6, 9),
				band("h3", "About 3 hours", 10, 12),
				band("h4", "4 hours or more", 13, 16)
			]
		}),
		act({
			id: "ip3",
			code: "Ip3",
			name: "Music practice",
			category: I,
			description: "Piano, trumpet, or whatever you are actually practicing.",
			bands: [
				band("none", "No practice", 0, 0),
				band("m15", "15 min per instrument", 5, 8),
				band("m30", "30 min per instrument", 9, 11),
				band("m60", "60 min per instrument", 12, 15)
			]
		}),
		act({
			id: "ip4",
			code: "Ip4",
			name: "Game design",
			category: I,
			description: "Design work on a game you are making.",
			bands: [
				band("none", "Did not design", 0, 0),
				band("start", "Started designing", 4, 7),
				band("done", "Designed or finished", 8, 14)
			]
		}),
		act({
			id: "sp1",
			code: "sp1",
			name: "Friends",
			category: s,
			description: "Time talking with friends, including school friends.",
			bands: [
				band("none", "Did not socialize", 0, 0),
				band("some", "Somewhat socially active", 7, 10),
				band("very", "Very socially active", 11, 13),
				band("extreme", "Extremely socially active", 14, 17)
			]
		}),
		act({
			id: "sp2",
			code: "sp2",
			name: "Scouts",
			category: s,
			description: "A scouts gathering. Only log it on days you were there.",
			bands: [band("none", "Not today", 0, 0), band("active", "Very socially active at scouts", 10, 16)]
		}),
		act({
			id: "sp3",
			code: "sp3",
			name: "Ballroom",
			category: s,
			description: "Ballroom class or practice.",
			bands: [
				band("none", "Did not go", 0, 0),
				band("quiet", "Went, not very social", 5, 9),
				band("active", "Very socially active", 10, 15)
			]
		}),
		act({
			id: "sp4",
			code: "sp4",
			name: "Young Men's",
			category: s,
			description: "Young Men's or an equivalent gathering.",
			bands: [band("none", "Not today", 0, 0), band("did", "Participated", 4, 14)]
		}),
		act({
			id: "Sp1",
			code: "Sp1",
			name: "Acting in faith",
			category: S,
			description: "A deliberate act of faith. Binary in the original formula.",
			bands: [band("no", "Did not", 0, 0), band("yes", "Did", 17, 17)]
		}),
		act({
			id: "Sp2",
			code: "Sp2",
			name: "Calling",
			category: S,
			description: "Did the work of a calling or assignment.",
			bands: [band("no", "Did not", 0, 0), band("yes", "Did the job", 16, 16)]
		}),
		act({
			id: "Sp3",
			code: "Sp3",
			name: "Prayer",
			category: S,
			description: "Personal prayer.",
			bands: [
				band("none", "Did not pray", 0, 0),
				band("afternoon", "Afternoon prayers", 5, 9),
				band("both", "Morning and afternoon", 10, 15)
			]
		}),
		act({
			id: "Sp4",
			code: "Sp4",
			name: "Scriptures",
			category: S,
			description: "Scripture study.",
			bands: [
				band("none", "Did not read", 0, 0),
				band("read", "Read", 4, 8),
				band("diligent", "Read diligently", 9, 14)
			]
		}),
		act({
			id: "Np1",
			code: "Np1",
			name: "Meditation",
			category: N,
			description: "Quiet sitting. Stillness is a category of its own, not a penalty.",
			bands: [
				band("none", "Did not meditate", 0, 0),
				band("m5", "5 minutes", 7, 11),
				band("m10", "10 minutes or more", 12, 17)
			]
		}),
		act({
			id: "Np2",
			code: "Np2",
			name: "Wall sit / stare",
			category: N,
			description: "Original formula: plus five if you meditated by staring at a wall.",
			bonusNote: "Stacks with meditation. Log only if you actually did it.",
			bands: [band("none", "Did not", 0, 0), band("yes", "Stared at a wall", 5, 5)]
		}),
		act({
			id: "sleep",
			code: "Slp",
			name: "Sleep",
			category: P,
			description: "A full night, 8–10 hours. Logged once per morning.",
			bands: [band("none", "Not this range", 0, 0), band("full", "8–10 hours", 15, 15)]
		})
	];
}
var STARTER_REWARDS = [
	{
		id: "treat",
		name: "A treat",
		description: "One cookie, bar, or bowl of ice cream.",
		cost: 50,
		currency: "cs",
		category: "Food",
		note: "Original shop: −50 CS per serving."
	},
	{
		id: "small-treat",
		name: "Small treat",
		description: "A graham cracker or a bowl of cereal.",
		cost: 20,
		currency: "cs",
		category: "Food",
		note: "Original shop: −20 CS per serving."
	},
	{
		id: "friends-hour",
		name: "Hour with friends",
		description: "Fun time that is not also a social quest. Net −10 after the +10 social credit in the original sheet.",
		cost: 10,
		currency: "cs",
		category: "People"
	},
	{
		id: "entertainment",
		name: "Hour of entertainment",
		description: "A movie, a game session, or an hour of something purely for fun.",
		cost: 50,
		currency: "cs",
		category: "Rest"
	},
	{
		id: "rest-day",
		name: "Rest day",
		description: "A day you spend however you want, without earning. Not a failure — a purchase.",
		cost: 500,
		currency: "cs",
		category: "Rest",
		limitPerWeek: 1
	}
];
var CATEGORIES = [
	{
		id: "physical",
		label: "Physical",
		short: "P"
	},
	{
		id: "intellectual",
		label: "Intellectual",
		short: "I"
	},
	{
		id: "social",
		label: "Social",
		short: "s"
	},
	{
		id: "spiritual",
		label: "Spiritual",
		short: "S"
	},
	{
		id: "stillness",
		label: "Stillness",
		short: "N"
	}
];
var DAY_MS = 864e5;
var STORAGE_KEY = "lifequest.v1";
var DEFAULT_SETTINGS = {
	appName: "LifeQuest",
	displayName: "",
	csPerGold: 1e4,
	vaultDeposit: 100,
	vaultFee: 10,
	vaultMonths: 6,
	vaultMultiplier: 3,
	powerCost: 45,
	powerDays: 7,
	powerMultiplier: 2,
	dailyGoal: 80,
	xpPerLevel: 400,
	effects: true,
	streaksEnabled: true
};
function uid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function addMonths(iso, months) {
	const d = new Date(iso);
	const day = d.getDate();
	d.setMonth(d.getMonth() + months);
	if (d.getDate() < day) d.setDate(0);
	return d.toISOString();
}
function createEconomy() {
	return {
		cs: 0,
		cg: 0,
		vault: [],
		txs: [],
		logs: [],
		quests: starterQuests(),
		rewards: STARTER_REWARDS.map((r) => ({ ...r })),
		activities: starterActivities(),
		stress: 3,
		sleepLogged: {},
		settings: { ...DEFAULT_SETTINGS },
		awardedKeys: [],
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function starterQuests() {
	return [
		{
			name: "Morning prayer",
			description: "A short, honest prayer before the day gets loud.",
			category: "spiritual",
			points: 8,
			minutes: 10,
			priority: "high",
			recurring: "daily"
		},
		{
			name: "Physics problem set",
			description: "One focused block on the current assignment.",
			category: "intellectual",
			points: 14,
			minutes: 50,
			priority: "high",
			recurring: "weekdays"
		},
		{
			name: "Easy run",
			description: "Whatever pace you can hold without forcing it.",
			category: "physical",
			points: 10,
			minutes: 25,
			priority: "normal",
			recurring: "none"
		},
		{
			name: "Check in with a sibling",
			description: "A real conversation, not a drive-by text.",
			category: "social",
			points: 8,
			minutes: 15,
			priority: "normal",
			recurring: "daily"
		}
	].map((q) => ({
		...q,
		id: uid("q"),
		status: "open",
		subtasks: [],
		history: [{
			at: (/* @__PURE__ */ new Date()).toISOString(),
			action: "Created"
		}]
	}));
}
function loadEconomy() {
	if (typeof window === "undefined") return createEconomy();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return createEconomy();
		return normalize(JSON.parse(raw));
	} catch {
		return createEconomy();
	}
}
function normalize(e) {
	const fresh = createEconomy();
	return {
		...fresh,
		...e,
		settings: {
			...fresh.settings,
			...e.settings ?? {}
		},
		vault: e.vault ?? [],
		txs: e.txs ?? [],
		logs: e.logs ?? [],
		quests: e.quests ?? fresh.quests,
		rewards: e.rewards?.length ? e.rewards : fresh.rewards,
		activities: e.activities?.length ? e.activities : fresh.activities,
		awardedKeys: e.awardedKeys ?? [],
		sleepLogged: e.sleepLogged ?? {},
		stress: typeof e.stress === "number" ? e.stress : 3
	};
}
function saveEconomy(e) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(e));
}
function pushTx(e, tx) {
	const next = {
		id: uid("tx"),
		at: tx.at ?? (/* @__PURE__ */ new Date()).toISOString(),
		kind: tx.kind,
		amount: tx.amount,
		currency: tx.currency,
		label: tx.label,
		ref: tx.ref
	};
	return {
		...e,
		txs: [next, ...e.txs].slice(0, 400)
	};
}
function levelFromXp(xp, per) {
	const safe = Math.max(100, per);
	const level = Math.floor(xp / safe) + 1;
	const into = xp - (level - 1) * safe;
	return {
		level,
		into,
		per: safe,
		pct: Math.min(100, Math.round(into / safe * 100))
	};
}
function totalEarnedCs(e) {
	return e.txs.filter((t) => t.kind === "earn" && t.currency === "cs" && t.amount > 0).reduce((s, t) => s + t.amount, 0);
}
function bandPoints(band, chosen) {
	if (band.min === band.max) return band.max;
	if (chosen == null || Number.isNaN(chosen)) return band.max;
	return Math.min(band.max, Math.max(band.min, Math.round(chosen)));
}
function activityOpenToday(a, date = /* @__PURE__ */ new Date()) {
	if (!a.enabled) return false;
	if (!a.weekdays || a.weekdays.length === 0) return true;
	return a.weekdays.includes(date.getDay());
}
function logFor(e, activityId, date = todayKey()) {
	return e.logs.find((l) => l.activityId === activityId && l.date === date);
}
function awardActivity(e, activity, band, points, date = todayKey()) {
	const key = `act:${activity.id}:${date}`;
	const existing = logFor(e, activity.id, date);
	const capped = Math.max(0, Math.min(activity.maxDaily || points, points));
	const replaced = existing?.points ?? 0;
	const delta = capped - replaced;
	const logs = existing ? e.logs.map((l) => l.id === existing.id ? {
		...l,
		bandId: band.id,
		points: capped,
		at: (/* @__PURE__ */ new Date()).toISOString()
	} : l) : [{
		id: uid("log"),
		activityId: activity.id,
		date,
		bandId: band.id,
		points: capped,
		at: (/* @__PURE__ */ new Date()).toISOString()
	}, ...e.logs];
	let next = {
		...e,
		logs
	};
	if (!next.awardedKeys.includes(key)) next = {
		...next,
		awardedKeys: [...next.awardedKeys, key]
	};
	if (delta !== 0) {
		next = {
			...next,
			cs: Math.max(0, next.cs + delta)
		};
		next = pushTx(next, {
			kind: "earn",
			amount: delta,
			currency: "cs",
			label: delta > 0 ? `${activity.code} ${activity.name}` : `Adjusted ${activity.code}`,
			ref: key
		});
	}
	return {
		economy: next,
		gained: Math.max(0, delta),
		replaced
	};
}
function completeQuest(e, questId, now = /* @__PURE__ */ new Date()) {
	const q = e.quests.find((x) => x.id === questId);
	if (!q || q.status === "done") return null;
	const key = `quest:${q.id}:${todayKey(now)}`;
	if (e.awardedKeys.includes(key)) return null;
	const powered = q.powerUntil ? new Date(q.powerUntil).getTime() > now.getTime() : false;
	const mult = powered ? e.settings.powerMultiplier : 1;
	const gained = Math.round(q.points * mult);
	let next = {
		...e,
		cs: e.cs + gained,
		awardedKeys: [...e.awardedKeys, key],
		quests: e.quests.map((item) => item.id === questId ? {
			...item,
			status: "done",
			history: [{
				at: now.toISOString(),
				action: powered ? `Completed · ${mult}× power` : "Completed"
			}, ...item.history]
		} : item)
	};
	next = pushTx(next, {
		kind: "earn",
		amount: gained,
		currency: "cs",
		label: q.name + (powered ? ` (${mult}×)` : ""),
		ref: key
	});
	return {
		economy: next,
		gained
	};
}
function mutateQuest(e, questId, patch, note) {
	return {
		...e,
		quests: e.quests.map((q) => q.id === questId ? {
			...q,
			...patch,
			history: [{
				at: (/* @__PURE__ */ new Date()).toISOString(),
				action: note
			}, ...q.history].slice(0, 24)
		} : q)
	};
}
function addQuest(e, draft) {
	const q = {
		...draft,
		id: uid("q"),
		status: "open",
		subtasks: draft.subtasks ?? [],
		history: [{
			at: (/* @__PURE__ */ new Date()).toISOString(),
			action: "Created"
		}]
	};
	return {
		...e,
		quests: [q, ...e.quests]
	};
}
function splitQuest(e, questId, labels) {
	const q = e.quests.find((x) => x.id === questId);
	if (!q) return e;
	const clean = labels.map((l) => l.trim()).filter(Boolean);
	if (clean.length < 2) return e;
	const each = Math.max(1, Math.round(q.points / clean.length));
	const children = clean.map((label) => ({
		...q,
		id: uid("q"),
		name: label,
		description: `Split from “${q.name}”.`,
		points: each,
		status: "open",
		subtasks: [],
		powerUntil: void 0,
		history: [{
			at: (/* @__PURE__ */ new Date()).toISOString(),
			action: `Split from ${q.name}`
		}]
	}));
	return {
		...e,
		quests: [...children, ...e.quests.filter((x) => x.id !== questId)]
	};
}
function redeem(e, reward) {
	const weekStart = startOfWeek(/* @__PURE__ */ new Date());
	if (reward.limitPerWeek) {
		if (e.txs.filter((t) => t.kind === "spend" && t.ref === reward.id && new Date(t.at) >= weekStart).length >= reward.limitPerWeek) return {
			economy: e,
			ok: false,
			reason: "Weekly limit reached."
		};
	}
	if (reward.currency === "cs") {
		if (e.cs < reward.cost) return {
			economy: e,
			ok: false,
			reason: "Not enough Creative Silver."
		};
		let next = {
			...e,
			cs: e.cs - reward.cost
		};
		next = pushTx(next, {
			kind: "spend",
			amount: -reward.cost,
			currency: "cs",
			label: reward.name,
			ref: reward.id
		});
		return {
			economy: next,
			ok: true
		};
	}
	if (e.cg < reward.cost) return {
		economy: e,
		ok: false,
		reason: "Not enough Creative Gold."
	};
	let next = {
		...e,
		cg: e.cg - reward.cost
	};
	next = pushTx(next, {
		kind: "spend",
		amount: -reward.cost,
		currency: "cg",
		label: reward.name,
		ref: reward.id
	});
	return {
		economy: next,
		ok: true
	};
}
function convertToGold(e, gold = 1) {
	const cost = gold * e.settings.csPerGold;
	if (gold < 1) return {
		economy: e,
		ok: false,
		reason: "Choose at least 1 gold."
	};
	if (e.cs < cost) return {
		economy: e,
		ok: false,
		reason: `Need ${cost.toLocaleString()} CS.`
	};
	let next = {
		...e,
		cs: e.cs - cost,
		cg: e.cg + gold
	};
	next = pushTx(next, {
		kind: "convert",
		amount: -cost,
		currency: "cs",
		label: `Converted to ${gold} CG`
	});
	next = pushTx(next, {
		kind: "convert",
		amount: gold,
		currency: "cg",
		label: `From ${cost.toLocaleString()} CS`
	});
	return {
		economy: next,
		ok: true
	};
}
function depositVault(e, now = /* @__PURE__ */ new Date()) {
	const { vaultDeposit, vaultFee, vaultMonths, vaultMultiplier } = e.settings;
	const total = vaultDeposit + vaultFee;
	if (e.cs < total) return {
		economy: e,
		ok: false,
		reason: `Need ${total} CS (${vaultDeposit} + ${vaultFee} fee).`
	};
	const lot = {
		id: uid("lot"),
		principal: vaultDeposit,
		depositedAt: now.toISOString(),
		maturesAt: addMonths(now.toISOString(), vaultMonths),
		multiplier: vaultMultiplier,
		status: "locked"
	};
	let next = {
		...e,
		cs: e.cs - total,
		vault: [lot, ...e.vault]
	};
	next = pushTx(next, {
		kind: "vault",
		amount: -total,
		currency: "cs",
		label: `Vault ${vaultDeposit} CS · fee ${vaultFee}`,
		ref: lot.id
	});
	return {
		economy: next,
		ok: true
	};
}
function refreshVault(e, now = /* @__PURE__ */ new Date()) {
	let bonus = 0;
	const vault = e.vault.map((lot) => {
		if (lot.status !== "locked") return lot;
		if (new Date(lot.maturesAt).getTime() > now.getTime()) return lot;
		bonus += Math.round(lot.principal * (lot.multiplier - 1));
		return {
			...lot,
			status: "mature"
		};
	});
	if (bonus === 0 && vault.every((l, i) => l === e.vault[i])) return e;
	let next = {
		...e,
		vault,
		cs: e.cs + bonus
	};
	if (bonus > 0) next = pushTx(next, {
		kind: "vault",
		amount: bonus,
		currency: "cs",
		label: "Vault matured · simulated bonus"
	});
	return next;
}
function withdrawLot(e, lotId) {
	const lot = e.vault.find((l) => l.id === lotId);
	if (!lot || lot.status === "withdrawn") return {
		economy: e,
		ok: false,
		reason: "Nothing to withdraw."
	};
	const now = /* @__PURE__ */ new Date();
	const mature = lot.status === "mature" || new Date(lot.maturesAt).getTime() <= now.getTime();
	const payout = mature ? Math.round(lot.principal * lot.multiplier) : lot.principal;
	const note = mature ? `Withdrew mature vault · ${payout} CS (simulated ${lot.multiplier}×)` : `Broke vault early · principal ${lot.principal} only`;
	let next = {
		...e,
		cs: e.cs + payout,
		vault: e.vault.map((l) => l.id === lotId ? {
			...l,
			status: "withdrawn"
		} : l)
	};
	next = pushTx(next, {
		kind: "vault",
		amount: payout,
		currency: "cs",
		label: note,
		ref: lotId
	});
	return {
		economy: next,
		ok: true
	};
}
function activatePower(e, questId, now = /* @__PURE__ */ new Date()) {
	const q = e.quests.find((x) => x.id === questId);
	if (!q) return {
		economy: e,
		ok: false,
		reason: "Quest missing."
	};
	if (q.powerUntil && new Date(q.powerUntil).getTime() > now.getTime()) return {
		economy: e,
		ok: false,
		reason: "Already powered. Wait until it ends."
	};
	if (e.cs < e.settings.powerCost) return {
		economy: e,
		ok: false,
		reason: `Need ${e.settings.powerCost} CS.`
	};
	let next = mutateQuest(e, questId, { powerUntil: new Date(now.getTime() + e.settings.powerDays * DAY_MS).toISOString() }, `Power ×${e.settings.powerMultiplier} for ${e.settings.powerDays} days`);
	next = {
		...next,
		cs: next.cs - e.settings.powerCost
	};
	next = pushTx(next, {
		kind: "power",
		amount: -e.settings.powerCost,
		currency: "cs",
		label: `Power priority · ${q.name}`,
		ref: questId
	});
	return {
		economy: next,
		ok: true
	};
}
function dayPoints(e, date = todayKey()) {
	return e.logs.filter((l) => l.date === date).reduce((s, l) => s + l.points, 0) + e.txs.filter((t) => t.kind === "earn" && t.ref?.startsWith("quest:") && t.at.slice(0, 10) === date && t.amount > 0).reduce((s, t) => s + t.amount, 0);
}
function categoryPoints(e, date = todayKey()) {
	const map = {
		physical: 0,
		intellectual: 0,
		social: 0,
		spiritual: 0,
		stillness: 0
	};
	for (const log of e.logs) {
		if (log.date !== date) continue;
		const act = e.activities.find((a) => a.id === log.activityId);
		if (!act) continue;
		map[act.category] = (map[act.category] ?? 0) + log.points;
	}
	return map;
}
function spendingsToday(e, date = todayKey()) {
	return e.txs.filter((t) => t.at.slice(0, 10) === date && t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
}
function savingsTotal(e) {
	return e.vault.filter((l) => l.status !== "withdrawn").reduce((s, l) => s + (l.status === "mature" ? Math.round(l.principal * l.multiplier) : l.principal), 0);
}
function startOfWeek(d) {
	const x = new Date(d);
	const day = x.getDay();
	const diff = day === 0 ? 6 : day - 1;
	x.setDate(x.getDate() - diff);
	x.setHours(0, 0, 0, 0);
	return x;
}
function streakDays(e, goal) {
	if (!e.settings.streaksEnabled) return 0;
	let count = 0;
	const cursor = /* @__PURE__ */ new Date();
	if (dayPoints(e, todayKey(cursor)) < goal) cursor.setDate(cursor.getDate() - 1);
	for (let i = 0; i < 365; i++) if (dayPoints(e, todayKey(cursor)) >= goal) {
		count += 1;
		cursor.setDate(cursor.getDate() - 1);
	} else break;
	return count;
}
function weeklySeries(e) {
	const days = [];
	for (let i = 6; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - i);
		days.push({
			key: todayKey(d),
			label: d.toLocaleDateString(void 0, { weekday: "narrow" }),
			points: dayPoints(e, todayKey(d))
		});
	}
	return days;
}
function personalRecords(e) {
	const byDay = /* @__PURE__ */ new Map();
	for (const log of e.logs) byDay.set(log.date, (byDay.get(log.date) ?? 0) + log.points);
	for (const tx of e.txs) {
		if (tx.kind !== "earn" || !tx.ref?.startsWith("quest:") || tx.amount <= 0) continue;
		const date = tx.at.slice(0, 10);
		byDay.set(date, (byDay.get(date) ?? 0) + tx.amount);
	}
	let best = 0;
	let bestDay = "";
	for (const [day, pts] of byDay) if (pts > best) {
		best = pts;
		bestDay = day;
	}
	return {
		best,
		bestDay,
		daysLogged: byDay.size
	};
}
function achievements(e) {
	const earned = totalEarnedCs(e);
	const days = new Set(e.logs.map((l) => l.date)).size;
	const cats = new Set(e.logs.filter((l) => l.date === todayKey() && l.points > 0).map((l) => e.activities.find((a) => a.id === l.activityId)?.category).filter(Boolean));
	return [
		{
			id: "first",
			name: "First mark",
			detail: "Log any activity.",
			earned: e.logs.length > 0
		},
		{
			id: "century",
			name: "Hundred",
			detail: "Earn 100 CS in total.",
			earned: earned >= 100
		},
		{
			id: "balanced",
			name: "Four rooms",
			detail: "Score in four categories today.",
			earned: cats.size >= 4
		},
		{
			id: "week",
			name: "A week of ink",
			detail: "Log on 7 different days.",
			earned: days >= 7
		},
		{
			id: "vault",
			name: "Locked drawer",
			detail: "Make a vault deposit.",
			earned: e.vault.length > 0
		},
		{
			id: "gold",
			name: "First gold",
			detail: "Convert silver into one Creative Gold.",
			earned: e.cg > 0 || e.txs.some((t) => t.currency === "cg" && t.amount > 0)
		}
	];
}
function formatCs(n) {
	return Math.round(n).toLocaleString();
}
function relativeUntil(iso, now = Date.now()) {
	const ms = new Date(iso).getTime() - now;
	if (ms <= 0) return "Ready";
	const days = Math.ceil(ms / DAY_MS);
	if (days < 2) return "Under a day";
	if (days < 45) return `${days} days`;
	return `${Math.round(days / 30)} mo`;
}
function exportJson(e) {
	return JSON.stringify(e, null, 2);
}
function importJson(raw) {
	const parsed = JSON.parse(raw);
	if (!parsed || !Array.isArray(parsed.activities)) throw new Error("That file is not a LifeQuest save.");
	return normalize(parsed);
}
var listeners = /* @__PURE__ */ new Set();
var state = createEconomy();
var hydrated = false;
function emit() {
	saveEconomy(state);
	listeners.forEach((l) => l());
}
function hydrate() {
	if (hydrated || typeof window === "undefined") return;
	state = refreshVault(loadEconomy());
	hydrated = true;
	saveEconomy(state);
	listeners.forEach((l) => l());
}
function useEconomy() {
	const [snap, setSnap] = (0, import_react.useState)(state);
	const [ready, setReady] = (0, import_react.useState)(hydrated);
	(0, import_react.useEffect)(() => {
		hydrate();
		setSnap(state);
		setReady(true);
		const l = () => setSnap(state);
		listeners.add(l);
		return () => {
			listeners.delete(l);
		};
	}, []);
	return {
		economy: snap,
		ready
	};
}
function commit(next) {
	state = next;
	emit();
}
var actions = {
	log(activityId, band, points) {
		const activity = state.activities.find((a) => a.id === activityId);
		if (!activity) return { gained: 0 };
		const res = awardActivity(state, activity, band, points);
		commit(res.economy);
		return { gained: res.gained };
	},
	complete(questId) {
		const res = completeQuest(state, questId);
		if (!res) return { gained: 0 };
		commit(res.economy);
		return { gained: res.gained };
	},
	patchQuest(id, patch, note) {
		commit(mutateQuest(state, id, patch, note));
	},
	addQuest(draft) {
		commit(addQuest(state, draft));
	},
	split(id, labels) {
		commit(splitQuest(state, id, labels));
	},
	toggleSub(questId, subId) {
		const q = state.quests.find((x) => x.id === questId);
		if (!q) return;
		commit(mutateQuest(state, questId, { subtasks: q.subtasks.map((s) => s.id === subId ? {
			...s,
			done: !s.done
		} : s) }, "Updated a step"));
	},
	redeem(reward) {
		const res = redeem(state, reward);
		if (res.ok) commit(res.economy);
		return res;
	},
	addReward(reward) {
		commit({
			...state,
			rewards: [{
				...reward,
				id: `rw_${Date.now().toString(36)}`
			}, ...state.rewards]
		});
	},
	removeReward(id) {
		commit({
			...state,
			rewards: state.rewards.filter((r) => r.id !== id)
		});
	},
	convert(gold) {
		const res = convertToGold(state, gold);
		if (res.ok) commit(res.economy);
		return res;
	},
	vaultDeposit() {
		const res = depositVault(state);
		if (res.ok) commit(res.economy);
		return res;
	},
	vaultWithdraw(id) {
		const res = withdrawLot(state, id);
		if (res.ok) commit(res.economy);
		return res;
	},
	power(questId) {
		const res = activatePower(state, questId);
		if (res.ok) commit(res.economy);
		return res;
	},
	setStress(n) {
		commit({
			...state,
			stress: n
		});
	},
	updateSettings(patch) {
		commit({
			...state,
			settings: {
				...state.settings,
				...patch
			}
		});
	},
	updateActivity(id, patch) {
		commit({
			...state,
			activities: state.activities.map((a) => a.id === id ? {
				...a,
				...patch
			} : a)
		});
	},
	addActivity(activity) {
		commit({
			...state,
			activities: [...state.activities, activity]
		});
	},
	importSave(raw) {
		commit(importJson(raw));
	},
	reset() {
		commit(createEconomy());
	}
};
var NAV = [
	{
		to: "/",
		label: "Today",
		icon: LayoutDashboard
	},
	{
		to: "/formula",
		label: "Formula",
		icon: BookOpen
	},
	{
		to: "/ledger",
		label: "Ledger",
		icon: CalendarDays
	},
	{
		to: "/shop",
		label: "Shop",
		icon: Store
	},
	{
		to: "/vault",
		label: "Vault",
		icon: Vault
	},
	{
		to: "/settings",
		label: "Rules",
		icon: Settings
	}
];
function Shell({ children }) {
	const { economy, ready } = useEconomy();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const name = economy.settings.appName || "LifeQuest";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-28 pt-5 sm:px-6 lg:pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6 flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-faint",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-[family-name:var(--font-display)] text-2xl text-ink",
				children: [ready ? `${formatCs(economy.cs)} CS` : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-3 text-base text-muted",
					children: ready ? `${economy.cg} CG` : ""
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "hidden text-right text-sm text-muted sm:block",
				children: [
					"Silver stays on this device.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Nothing is sent anywhere."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-5 lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-2 py-2 backdrop-blur lg:static lg:z-auto lg:w-44 lg:shrink-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-6 gap-1 lg:grid-cols-1",
					children: NAV.map((item) => {
						const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `press flex h-12 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-md)] text-[11px] lg:h-11 lg:flex-row lg:justify-start lg:gap-2 lg:px-3 lg:text-sm ${active ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 18,
								strokeWidth: 1.75
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
						}) }, item.to);
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-w-0 flex-1",
				children
			})]
		})]
	});
}
function Panel({ children, className = "", id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: `rounded-[var(--radius-xl)] border border-line bg-surface p-4 sm:p-5 ${className}`,
		children
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-medium uppercase tracking-[0.16em] text-faint",
		children
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5 text-sm text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), children]
	});
}
var inputClass = "h-11 w-full rounded-[var(--radius-sm)] border border-line bg-bg px-3 text-sm text-ink outline-none focus:border-accent";
function Btn({ children, onClick, kind = "solid", type = "button", disabled, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		disabled,
		onClick,
		className: `press inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-4 text-sm font-medium disabled:opacity-40 ${kind === "solid" ? "bg-accent text-accent-ink hover:brightness-110" : kind === "ghost" ? "border border-line bg-surface-2 text-ink hover:border-accent" : "text-muted hover:text-ink"} ${className}`,
		children
	});
}
//#endregion
export { todayKey as C, weeklySeries as E, streakDays as S, useEconomy as T, logFor as _, Panel as a, savingsTotal as b, actions as c, categoryPoints as d, dayPoints as f, levelFromXp as g, inputClass as h, Field as i, activityOpenToday as l, formatCs as m, CATEGORIES as n, Shell as o, exportJson as p, Eyebrow as r, achievements as s, Btn as t, bandPoints as u, personalRecords as v, totalEarnedCs as w, spendingsToday as x, relativeUntil as y };
