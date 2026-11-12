import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { exportJson } from "@/lib/lifequest/engine";
import { actions, useEconomy } from "@/lib/lifequest/store";
import type { Settings } from "@/lib/lifequest/types";
import { Shell } from "@/components/lifequest/shell";
import { Btn, Eyebrow, Field, Panel, inputClass } from "@/components/lifequest/ui";
import { flash, Toaster } from "@/components/lifequest/toast";

export const Route = createFileRoute("/settings")({ component: RulesPage });

const FIELDS: { key: keyof Settings; label: string; hint: string }[] = [
  { key: "csPerGold", label: "CS per gold", hint: "Original formula is 10,000." },
  { key: "vaultDeposit", label: "Vault deposit", hint: "Silver locked per lot." },
  { key: "vaultFee", label: "Vault fee", hint: "Paid on top of the deposit." },
  { key: "vaultMonths", label: "Months to mature", hint: "Original is 6." },
  { key: "vaultMultiplier", label: "Mature multiplier", hint: "Simulated. Original is 3." },
  { key: "powerCost", label: "Power priority cost", hint: "Original is 45 CS." },
  { key: "powerDays", label: "Power days", hint: "Original is 7." },
  { key: "powerMultiplier", label: "Power multiplier", hint: "Original is 2." },
  { key: "dailyGoal", label: "Daily CS goal", hint: "Used for the streak, if streaks are on." },
  { key: "xpPerLevel", label: "XP per level", hint: "Lifetime earned CS divided by this." },
];

function RulesPage() {
  const { economy, ready } = useEconomy();
  const [importText, setImportText] = useState("");
  if (!ready) return <Shell><p className="text-muted">Loading rules…</p></Shell>;
  const s = economy.settings;

  return (
    <Shell>
      <Toaster />
      <Eyebrow>Rules</Eyebrow>
      <h1 className="mt-1 text-4xl">Make the formula yours</h1>
      <p className="mt-2 max-w-xl text-muted">
        The starter numbers come from your Creative Formula sheet. Change any of them. They apply to the next action, not to history already written.
      </p>

      <Panel className="mt-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="App name">
            <input className={inputClass} value={s.appName} onChange={(e) => actions.updateSettings({ appName: e.target.value })} />
          </Field>
          <Field label="What should the greeting use">
            <input
              className={inputClass}
              value={s.displayName}
              placeholder="Optional"
              onChange={(e) => actions.updateSettings({ displayName: e.target.value })}
            />
          </Field>
          {FIELDS.map((f) => (
            <Field key={f.key} label={f.label}>
              <input
                className={inputClass}
                inputMode="decimal"
                value={String(s[f.key])}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isFinite(n)) return;
                  actions.updateSettings({ [f.key]: n } as Partial<Settings>);
                }}
              />
              <span className="text-xs text-faint">{f.hint}</span>
            </Field>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={s.effects}
              onChange={(e) => actions.updateSettings({ effects: e.target.checked })}
            />
            Completion flash when something pays
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={s.streaksEnabled}
              onChange={(e) => actions.updateSettings({ streaksEnabled: e.target.checked })}
            />
            Track a streak against the daily goal
          </label>
          <p className="text-xs text-faint">
            Streaks never punish you. Turning this off hides the count. Missing a day does not take silver away.
          </p>
        </div>
      </Panel>

      <Panel className="mt-3">
        <h2 className="text-xl">Save file</h2>
        <p className="mt-1 text-sm text-muted">Copy the ledger out, or paste one back in. It replaces what is on this device.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Btn
            kind="ghost"
            onClick={async () => {
              const text = exportJson(economy);
              try {
                await navigator.clipboard.writeText(text);
                flash("Save copied.");
              } catch {
                setImportText(text);
                flash("Clipboard blocked. The save is in the box.");
              }
            }}
          >
            Copy save
          </Btn>
          <Btn
            kind="ghost"
            onClick={() => {
              const blob = new Blob([exportJson(economy)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "lifequest.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download
          </Btn>
        </div>
        <textarea
          className={`${inputClass} mt-3 h-28 py-2 font-mono text-xs`}
          placeholder="Paste a save here"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
        />
        <div className="mt-2 flex gap-2">
          <Btn
            onClick={() => {
              try {
                actions.importSave(importText);
                flash("Save restored.");
                setImportText("");
              } catch (err) {
                flash(err instanceof Error ? err.message : "Could not read that save.");
              }
            }}
          >
            Restore
          </Btn>
          <Btn
            kind="quiet"
            onClick={() => {
              if (!window.confirm("Erase this device’s LifeQuest data and start from the original formula?")) return;
              actions.reset();
              flash("Reset to the starter formula.");
            }}
          >
            Reset
          </Btn>
        </div>
      </Panel>
    </Shell>
  );
}
