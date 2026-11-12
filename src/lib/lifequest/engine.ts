import { STARTER_REWARDS, starterActivities } from "./formula";
import type {
  Activity,
  Band,
  Economy,
  Log,
  Quest,
  Reward,
  Settings,
  Tx,
  VaultLot,
} from "./types";
import { DAY_MS } from "./types";

export const STORAGE_KEY = "lifequest.v1";

const DEFAULT_SETTINGS: Settings = {
  appName: "LifeQuest",
  displayName: "",
  csPerGold: 10_000,
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
  streaksEnabled: true,
};

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addMonths(iso: string, months: number) {
  const d = new Date(iso);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0);
  return d.toISOString();
}

export function createEconomy(): Economy {
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
    createdAt: new Date().toISOString(),
  };
}

function starterQuests(): Quest[] {
  const base: Omit<Quest, "id" | "history" | "status" | "subtasks">[] = [
    {
      name: "Morning prayer",
      description: "A short, honest prayer before the day gets loud.",
      category: "spiritual",
      points: 8,
      minutes: 10,
      priority: "high",
      recurring: "daily",
    },
    {
      name: "Physics problem set",
      description: "One focused block on the current assignment.",
      category: "intellectual",
      points: 14,
      minutes: 50,
      priority: "high",
      recurring: "weekdays",
    },
    {
      name: "Easy run",
      description: "Whatever pace you can hold without forcing it.",
      category: "physical",
      points: 10,
      minutes: 25,
      priority: "normal",
      recurring: "none",
    },
    {
      name: "Check in with a sibling",
      description: "A real conversation, not a drive-by text.",
      category: "social",
      points: 8,
      minutes: 15,
      priority: "normal",
      recurring: "daily",
    },
  ];
  return base.map((q) => ({
    ...q,
    id: uid("q"),
    status: "open",
    subtasks: [],
    history: [{ at: new Date().toISOString(), action: "Created" }],
  }));
}

export function loadEconomy(): Economy {
  if (typeof window === "undefined") return createEconomy();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEconomy();
    const parsed = JSON.parse(raw) as Economy;
    return normalize(parsed);
  } catch {
    return createEconomy();
  }
}

function normalize(e: Partial<Economy>): Economy {
  const fresh = createEconomy();
  return {
    ...fresh,
    ...e,
    settings: { ...fresh.settings, ...(e.settings ?? {}) },
    vault: e.vault ?? [],
    txs: e.txs ?? [],
    logs: e.logs ?? [],
    quests: e.quests ?? fresh.quests,
    rewards: e.rewards?.length ? e.rewards : fresh.rewards,
    activities: e.activities?.length ? e.activities : fresh.activities,
    awardedKeys: e.awardedKeys ?? [],
    sleepLogged: e.sleepLogged ?? {},
    stress: typeof e.stress === "number" ? e.stress : 3,
  };
}

export function saveEconomy(e: Economy) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(e));
}

function pushTx(e: Economy, tx: Omit<Tx, "id" | "at"> & { at?: string }): Economy {
  const next: Tx = {
    id: uid("tx"),
    at: tx.at ?? new Date().toISOString(),
    kind: tx.kind,
    amount: tx.amount,
    currency: tx.currency,
    label: tx.label,
    ref: tx.ref,
  };
  return { ...e, txs: [next, ...e.txs].slice(0, 400) };
}

export function levelFromXp(xp: number, per: number) {
  const safe = Math.max(100, per);
  const level = Math.floor(xp / safe) + 1;
  const into = xp - (level - 1) * safe;
  return { level, into, per: safe, pct: Math.min(100, Math.round((into / safe) * 100)) };
}

export function totalEarnedCs(e: Economy) {
  return e.txs.filter((t) => t.kind === "earn" && t.currency === "cs" && t.amount > 0).reduce((s, t) => s + t.amount, 0);
}

export function bandPoints(band: Band, chosen?: number) {
  if (band.min === band.max) return band.max;
  if (chosen == null || Number.isNaN(chosen)) return band.max;
  return Math.min(band.max, Math.max(band.min, Math.round(chosen)));
}

export function activityOpenToday(a: Activity, date = new Date()) {
  if (!a.enabled) return false;
  if (!a.weekdays || a.weekdays.length === 0) return true;
  return a.weekdays.includes(date.getDay());
}

export function logFor(e: Economy, activityId: string, date = todayKey()) {
  return e.logs.find((l) => l.activityId === activityId && l.date === date);
}

export function awardActivity(
  e: Economy,
  activity: Activity,
  band: Band,
  points: number,
  date = todayKey(),
): { economy: Economy; gained: number; replaced: number } {
  const key = `act:${activity.id}:${date}`;
  const existing = logFor(e, activity.id, date);
  const capped = Math.max(0, Math.min(activity.maxDaily || points, points));
  const replaced = existing?.points ?? 0;
  const delta = capped - replaced;
  const logs: Log[] = existing
    ? e.logs.map((l) =>
        l.id === existing.id
          ? { ...l, bandId: band.id, points: capped, at: new Date().toISOString() }
          : l,
      )
    : [
        {
          id: uid("log"),
          activityId: activity.id,
          date,
          bandId: band.id,
          points: capped,
          at: new Date().toISOString(),
        },
        ...e.logs,
      ];
  let next: Economy = { ...e, logs };
  if (!next.awardedKeys.includes(key)) next = { ...next, awardedKeys: [...next.awardedKeys, key] };
  if (delta !== 0) {
    next = { ...next, cs: Math.max(0, next.cs + delta) };
    next = pushTx(next, {
      kind: "earn",
      amount: delta,
      currency: "cs",
      label: delta > 0 ? `${activity.code} ${activity.name}` : `Adjusted ${activity.code}`,
      ref: key,
    });
  }
  return { economy: next, gained: Math.max(0, delta), replaced };
}

export function completeQuest(e: Economy, questId: string, now = new Date()): { economy: Economy; gained: number } | null {
  const q = e.quests.find((x) => x.id === questId);
  if (!q || q.status === "done") return null;
  const key = `quest:${q.id}:${todayKey(now)}`;
  if (e.awardedKeys.includes(key)) return null;
  const powered = q.powerUntil ? new Date(q.powerUntil).getTime() > now.getTime() : false;
  const mult = powered ? e.settings.powerMultiplier : 1;
  const gained = Math.round(q.points * mult);
  let next: Economy = {
    ...e,
    cs: e.cs + gained,
    awardedKeys: [...e.awardedKeys, key],
    quests: e.quests.map((item) =>
      item.id === questId
        ? {
            ...item,
            status: "done" as const,
            history: [{ at: now.toISOString(), action: powered ? `Completed · ${mult}× power` : "Completed" }, ...item.history],
          }
        : item,
    ),
  };
  next = pushTx(next, {
    kind: "earn",
    amount: gained,
    currency: "cs",
    label: q.name + (powered ? ` (${mult}×)` : ""),
    ref: key,
  });
  return { economy: next, gained };
}

export function mutateQuest(e: Economy, questId: string, patch: Partial<Quest>, note: string): Economy {
  return {
    ...e,
    quests: e.quests.map((q) =>
      q.id === questId
        ? { ...q, ...patch, history: [{ at: new Date().toISOString(), action: note }, ...q.history].slice(0, 24) }
        : q,
    ),
  };
}

export function addQuest(e: Economy, draft: Omit<Quest, "id" | "history" | "status" | "subtasks"> & { subtasks?: Quest["subtasks"] }): Economy {
  const q: Quest = {
    ...draft,
    id: uid("q"),
    status: "open",
    subtasks: draft.subtasks ?? [],
    history: [{ at: new Date().toISOString(), action: "Created" }],
  };
  return { ...e, quests: [q, ...e.quests] };
}

export function splitQuest(e: Economy, questId: string, labels: string[]): Economy {
  const q = e.quests.find((x) => x.id === questId);
  if (!q) return e;
  const clean = labels.map((l) => l.trim()).filter(Boolean);
  if (clean.length < 2) return e;
  const each = Math.max(1, Math.round(q.points / clean.length));
  const children: Quest[] = clean.map((label) => ({
    ...q,
    id: uid("q"),
    name: label,
    description: `Split from “${q.name}”.`,
    points: each,
    status: "open",
    subtasks: [],
    powerUntil: undefined,
    history: [{ at: new Date().toISOString(), action: `Split from ${q.name}` }],
  }));
  return {
    ...e,
    quests: [...children, ...e.quests.filter((x) => x.id !== questId)],
  };
}

export function redeem(e: Economy, reward: Reward): { economy: Economy; ok: boolean; reason?: string } {
  const weekStart = startOfWeek(new Date());
  if (reward.limitPerWeek) {
    const used = e.txs.filter(
      (t) => t.kind === "spend" && t.ref === reward.id && new Date(t.at) >= weekStart,
    ).length;
    if (used >= reward.limitPerWeek) return { economy: e, ok: false, reason: "Weekly limit reached." };
  }
  if (reward.currency === "cs") {
    if (e.cs < reward.cost) return { economy: e, ok: false, reason: "Not enough Creative Silver." };
    let next: Economy = { ...e, cs: e.cs - reward.cost };
    next = pushTx(next, { kind: "spend", amount: -reward.cost, currency: "cs", label: reward.name, ref: reward.id });
    return { economy: next, ok: true };
  }
  if (e.cg < reward.cost) return { economy: e, ok: false, reason: "Not enough Creative Gold." };
  let next: Economy = { ...e, cg: e.cg - reward.cost };
  next = pushTx(next, { kind: "spend", amount: -reward.cost, currency: "cg", label: reward.name, ref: reward.id });
  return { economy: next, ok: true };
}

export function convertToGold(e: Economy, gold = 1): { economy: Economy; ok: boolean; reason?: string } {
  const cost = gold * e.settings.csPerGold;
  if (gold < 1) return { economy: e, ok: false, reason: "Choose at least 1 gold." };
  if (e.cs < cost) return { economy: e, ok: false, reason: `Need ${cost.toLocaleString()} CS.` };
  let next: Economy = { ...e, cs: e.cs - cost, cg: e.cg + gold };
  next = pushTx(next, { kind: "convert", amount: -cost, currency: "cs", label: `Converted to ${gold} CG` });
  next = pushTx(next, { kind: "convert", amount: gold, currency: "cg", label: `From ${cost.toLocaleString()} CS` });
  return { economy: next, ok: true };
}

export function depositVault(e: Economy, now = new Date()): { economy: Economy; ok: boolean; reason?: string } {
  const { vaultDeposit, vaultFee, vaultMonths, vaultMultiplier } = e.settings;
  const total = vaultDeposit + vaultFee;
  if (e.cs < total) return { economy: e, ok: false, reason: `Need ${total} CS (${vaultDeposit} + ${vaultFee} fee).` };
  const lot: VaultLot = {
    id: uid("lot"),
    principal: vaultDeposit,
    depositedAt: now.toISOString(),
    maturesAt: addMonths(now.toISOString(), vaultMonths),
    multiplier: vaultMultiplier,
    status: "locked",
  };
  let next: Economy = { ...e, cs: e.cs - total, vault: [lot, ...e.vault] };
  next = pushTx(next, {
    kind: "vault",
    amount: -total,
    currency: "cs",
    label: `Vault ${vaultDeposit} CS · fee ${vaultFee}`,
    ref: lot.id,
  });
  return { economy: next, ok: true };
}

export function refreshVault(e: Economy, now = new Date()): Economy {
  let bonus = 0;
  const vault = e.vault.map((lot) => {
    if (lot.status !== "locked") return lot;
    if (new Date(lot.maturesAt).getTime() > now.getTime()) return lot;
    bonus += Math.round(lot.principal * (lot.multiplier - 1));
    return { ...lot, status: "mature" as const };
  });
  if (bonus === 0 && vault.every((l, i) => l === e.vault[i])) return e;
  let next: Economy = { ...e, vault, cs: e.cs + bonus };
  if (bonus > 0) {
    next = pushTx(next, {
      kind: "vault",
      amount: bonus,
      currency: "cs",
      label: "Vault matured · simulated bonus",
    });
  }
  return next;
}

export function withdrawLot(e: Economy, lotId: string): { economy: Economy; ok: boolean; reason?: string } {
  const lot = e.vault.find((l) => l.id === lotId);
  if (!lot || lot.status === "withdrawn") return { economy: e, ok: false, reason: "Nothing to withdraw." };
  const now = new Date();
  const mature = lot.status === "mature" || new Date(lot.maturesAt).getTime() <= now.getTime();
  const payout = mature ? Math.round(lot.principal * lot.multiplier) : lot.principal;
  const note = mature
    ? `Withdrew mature vault · ${payout} CS (simulated ${lot.multiplier}×)`
    : `Broke vault early · principal ${lot.principal} only`;
  let next: Economy = {
    ...e,
    cs: e.cs + payout,
    vault: e.vault.map((l) => (l.id === lotId ? { ...l, status: "withdrawn" as const } : l)),
  };
  next = pushTx(next, { kind: "vault", amount: payout, currency: "cs", label: note, ref: lotId });
  return { economy: next, ok: true };
}

export function activatePower(e: Economy, questId: string, now = new Date()): { economy: Economy; ok: boolean; reason?: string } {
  const q = e.quests.find((x) => x.id === questId);
  if (!q) return { economy: e, ok: false, reason: "Quest missing." };
  if (q.powerUntil && new Date(q.powerUntil).getTime() > now.getTime()) {
    return { economy: e, ok: false, reason: "Already powered. Wait until it ends." };
  }
  if (e.cs < e.settings.powerCost) return { economy: e, ok: false, reason: `Need ${e.settings.powerCost} CS.` };
  const until = new Date(now.getTime() + e.settings.powerDays * DAY_MS).toISOString();
  let next = mutateQuest(e, questId, { powerUntil: until }, `Power ×${e.settings.powerMultiplier} for ${e.settings.powerDays} days`);
  next = { ...next, cs: next.cs - e.settings.powerCost };
  next = pushTx(next, {
    kind: "power",
    amount: -e.settings.powerCost,
    currency: "cs",
    label: `Power priority · ${q.name}`,
    ref: questId,
  });
  return { economy: next, ok: true };
}

export function dayPoints(e: Economy, date = todayKey()) {
  const fromLogs = e.logs.filter((l) => l.date === date).reduce((s, l) => s + l.points, 0);
  const fromQuests = e.txs
    .filter((t) => t.kind === "earn" && t.ref?.startsWith("quest:") && t.at.slice(0, 10) === date && t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);
  return fromLogs + fromQuests;
}

export function categoryPoints(e: Economy, date = todayKey()) {
  const map: Record<string, number> = {
    physical: 0,
    intellectual: 0,
    social: 0,
    spiritual: 0,
    stillness: 0,
  };
  for (const log of e.logs) {
    if (log.date !== date) continue;
    const act = e.activities.find((a) => a.id === log.activityId);
    if (!act) continue;
    map[act.category] = (map[act.category] ?? 0) + log.points;
  }
  return map;
}

export function spendingsToday(e: Economy, date = todayKey()) {
  return e.txs
    .filter((t) => t.at.slice(0, 10) === date && t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);
}

export function savingsTotal(e: Economy) {
  return e.vault
    .filter((l) => l.status !== "withdrawn")
    .reduce((s, l) => s + (l.status === "mature" ? Math.round(l.principal * l.multiplier) : l.principal), 0);
}

function startOfWeek(d: Date) {
  const x = new Date(d);
  const day = x.getDay();
  const diff = day === 0 ? 6 : day - 1;
  x.setDate(x.getDate() - diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function streakDays(e: Economy, goal: number) {
  if (!e.settings.streaksEnabled) return 0;
  let count = 0;
  const cursor = new Date();
  if (dayPoints(e, todayKey(cursor)) < goal) cursor.setDate(cursor.getDate() - 1);
  for (let i = 0; i < 365; i++) {
    if (dayPoints(e, todayKey(cursor)) >= goal) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return count;
}

export function weeklySeries(e: Economy) {
  const days: { key: string; label: string; points: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      key: todayKey(d),
      label: d.toLocaleDateString(undefined, { weekday: "narrow" }),
      points: dayPoints(e, todayKey(d)),
    });
  }
  return days;
}

export function personalRecords(e: Economy) {
  const byDay = new Map<string, number>();
  for (const log of e.logs) byDay.set(log.date, (byDay.get(log.date) ?? 0) + log.points);
  for (const tx of e.txs) {
    if (tx.kind !== "earn" || !tx.ref?.startsWith("quest:") || tx.amount <= 0) continue;
    const date = tx.at.slice(0, 10);
    byDay.set(date, (byDay.get(date) ?? 0) + tx.amount);
  }
  let best = 0;
  let bestDay = "";
  for (const [day, pts] of byDay) {
    if (pts > best) {
      best = pts;
      bestDay = day;
    }
  }
  return { best, bestDay, daysLogged: byDay.size };
}

export type Achievement = { id: string; name: string; detail: string; earned: boolean };

export function achievements(e: Economy): Achievement[] {
  const earned = totalEarnedCs(e);
  const days = new Set(e.logs.map((l) => l.date)).size;
  const cats = new Set(
    e.logs
      .filter((l) => l.date === todayKey() && l.points > 0)
      .map((l) => e.activities.find((a) => a.id === l.activityId)?.category)
      .filter(Boolean),
  );
  return [
    { id: "first", name: "First mark", detail: "Log any activity.", earned: e.logs.length > 0 },
    { id: "century", name: "Hundred", detail: "Earn 100 CS in total.", earned: earned >= 100 },
    { id: "balanced", name: "Four rooms", detail: "Score in four categories today.", earned: cats.size >= 4 },
    { id: "week", name: "A week of ink", detail: "Log on 7 different days.", earned: days >= 7 },
    { id: "vault", name: "Locked drawer", detail: "Make a vault deposit.", earned: e.vault.length > 0 },
    { id: "gold", name: "First gold", detail: "Convert silver into one Creative Gold.", earned: e.cg > 0 || e.txs.some((t) => t.currency === "cg" && t.amount > 0) },
  ];
}

export function formatCs(n: number) {
  return Math.round(n).toLocaleString();
}

export function relativeUntil(iso: string, now = Date.now()) {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return "Ready";
  const days = Math.ceil(ms / DAY_MS);
  if (days < 2) return "Under a day";
  if (days < 45) return `${days} days`;
  const months = Math.round(days / 30);
  return `${months} mo`;
}

export function exportJson(e: Economy) {
  return JSON.stringify(e, null, 2);
}

export function importJson(raw: string): Economy {
  const parsed = JSON.parse(raw) as Economy;
  if (!parsed || !Array.isArray(parsed.activities)) throw new Error("That file is not a LifeQuest save.");
  return normalize(parsed);
}
