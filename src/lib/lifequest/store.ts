import { useEffect, useState } from "react";
import {
  activatePower,
  addQuest,
  awardActivity,
  completeQuest,
  convertToGold,
  createEconomy,
  depositVault,
  importJson,
  loadEconomy,
  mutateQuest,
  redeem,
  refreshVault,
  saveEconomy,
  splitQuest,
  withdrawLot,
} from "./engine";
import type { Band, Economy, Quest, Reward, Settings } from "./types";

type Listener = () => void;
const listeners = new Set<Listener>();
let state: Economy = createEconomy();
let hydrated = false;

function emit() {
  saveEconomy(state);
  listeners.forEach((l) => l());
}

export function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  state = refreshVault(loadEconomy());
  hydrated = true;
  saveEconomy(state);
  listeners.forEach((l) => l());
}

export function getState() {
  return state;
}

export function useEconomy() {
  const [snap, setSnap] = useState(state);
  const [ready, setReady] = useState(hydrated);
  useEffect(() => {
    hydrate();
    setSnap(state);
    setReady(true);
    const l = () => setSnap(state);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return { economy: snap, ready };
}

function commit(next: Economy) {
  state = next;
  emit();
}

export const actions = {
  log(activityId: string, band: Band, points: number) {
    const activity = state.activities.find((a) => a.id === activityId);
    if (!activity) return { gained: 0 };
    const res = awardActivity(state, activity, band, points);
    commit(res.economy);
    return { gained: res.gained };
  },
  complete(questId: string) {
    const res = completeQuest(state, questId);
    if (!res) return { gained: 0 };
    commit(res.economy);
    return { gained: res.gained };
  },
  patchQuest(id: string, patch: Partial<Quest>, note: string) {
    commit(mutateQuest(state, id, patch, note));
  },
  addQuest(draft: Parameters<typeof addQuest>[1]) {
    commit(addQuest(state, draft));
  },
  split(id: string, labels: string[]) {
    commit(splitQuest(state, id, labels));
  },
  toggleSub(questId: string, subId: string) {
    const q = state.quests.find((x) => x.id === questId);
    if (!q) return;
    commit(
      mutateQuest(
        state,
        questId,
        {
          subtasks: q.subtasks.map((s) => (s.id === subId ? { ...s, done: !s.done } : s)),
        },
        "Updated a step",
      ),
    );
  },
  redeem(reward: Reward) {
    const res = redeem(state, reward);
    if (res.ok) commit(res.economy);
    return res;
  },
  addReward(reward: Omit<Reward, "id">) {
    commit({ ...state, rewards: [{ ...reward, id: `rw_${Date.now().toString(36)}` }, ...state.rewards] });
  },
  removeReward(id: string) {
    commit({ ...state, rewards: state.rewards.filter((r) => r.id !== id) });
  },
  convert(gold: number) {
    const res = convertToGold(state, gold);
    if (res.ok) commit(res.economy);
    return res;
  },
  vaultDeposit() {
    const res = depositVault(state);
    if (res.ok) commit(res.economy);
    return res;
  },
  vaultWithdraw(id: string) {
    const res = withdrawLot(state, id);
    if (res.ok) commit(res.economy);
    return res;
  },
  power(questId: string) {
    const res = activatePower(state, questId);
    if (res.ok) commit(res.economy);
    return res;
  },
  setStress(n: number) {
    commit({ ...state, stress: n });
  },
  updateSettings(patch: Partial<Settings>) {
    commit({ ...state, settings: { ...state.settings, ...patch } });
  },
  updateActivity(id: string, patch: Partial<Economy["activities"][number]>) {
    commit({
      ...state,
      activities: state.activities.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  },
  addActivity(activity: Economy["activities"][number]) {
    commit({ ...state, activities: [...state.activities, activity] });
  },
  importSave(raw: string) {
    commit(importJson(raw));
  },
  reset() {
    commit(createEconomy());
  },
};
