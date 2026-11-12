export type CategoryId = "physical" | "intellectual" | "social" | "spiritual" | "stillness";

export type Band = {
  id: string;
  label: string;
  min: number;
  max: number;
};

export type Activity = {
  id: string;
  code: string;
  name: string;
  category: CategoryId;
  description: string;
  bands: Band[];
  weekdays?: number[];
  bonusNote?: string;
  enabled: boolean;
  maxDaily: number;
};

export type Quest = {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  points: number;
  minutes: number;
  priority: "low" | "normal" | "high";
  due?: string;
  status: "open" | "done" | "postponed";
  subtasks: { id: string; label: string; done: boolean }[];
  recurring: "none" | "daily" | "weekdays" | "weekend";
  history: { at: string; action: string }[];
  powerUntil?: string;
};

export type Reward = {
  id: string;
  name: string;
  description: string;
  cost: number;
  currency: "cs" | "cg";
  category: string;
  limitPerWeek?: number;
  note?: string;
};

export type VaultLot = {
  id: string;
  principal: number;
  depositedAt: string;
  maturesAt: string;
  multiplier: number;
  status: "locked" | "mature" | "withdrawn";
};

export type Tx = {
  id: string;
  at: string;
  kind: "earn" | "spend" | "convert" | "vault" | "power";
  amount: number;
  currency: "cs" | "cg";
  label: string;
  ref?: string;
};

export type Log = {
  id: string;
  activityId: string;
  date: string;
  bandId: string;
  points: number;
  note?: string;
  at: string;
};

export type Settings = {
  appName: string;
  displayName: string;
  csPerGold: number;
  vaultDeposit: number;
  vaultFee: number;
  vaultMonths: number;
  vaultMultiplier: number;
  powerCost: number;
  powerDays: number;
  powerMultiplier: number;
  dailyGoal: number;
  xpPerLevel: number;
  effects: boolean;
  streaksEnabled: boolean;
};

export type Economy = {
  cs: number;
  cg: number;
  vault: VaultLot[];
  txs: Tx[];
  logs: Log[];
  quests: Quest[];
  rewards: Reward[];
  activities: Activity[];
  stress: number;
  sleepLogged: Record<string, boolean>;
  settings: Settings;
  awardedKeys: string[];
  createdAt: string;
};

export const CATEGORIES: { id: CategoryId; label: string; short: string }[] = [
  { id: "physical", label: "Physical", short: "P" },
  { id: "intellectual", label: "Intellectual", short: "I" },
  { id: "social", label: "Social", short: "s" },
  { id: "spiritual", label: "Spiritual", short: "S" },
  { id: "stillness", label: "Stillness", short: "N" },
];

export const DAY_MS = 86_400_000;
