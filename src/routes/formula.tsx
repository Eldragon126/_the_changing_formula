import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { activityOpenToday, bandPoints, formatCs, logFor, todayKey } from "@/lib/lifequest/engine";
import { actions, useEconomy } from "@/lib/lifequest/store";
import { CATEGORIES, type Activity, type Band } from "@/lib/lifequest/types";
import { Shell } from "@/components/lifequest/shell";
import { Btn, Eyebrow, Panel } from "@/components/lifequest/ui";
import { flash, Toaster } from "@/components/lifequest/toast";

export const Route = createFileRoute("/formula")({ component: FormulaPage });

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function FormulaPage() {
  const { economy, ready } = useEconomy();
  const [picked, setPicked] = useState<{ activity: Activity; band: Band } | null>(null);
  const [value, setValue] = useState(0);

  if (!ready) return <Shell><p className="text-muted">Loading formula…</p></Shell>;

  const date = todayKey();
  const weekday = new Date().getDay();

  return (
    <Shell>
      <Toaster />
      <Eyebrow>Creative formula</Eyebrow>
      <h1 className="mt-1 text-4xl">Today’s sheet</h1>
      <p className="mt-2 max-w-xl text-muted">
        Pick the band that matches what you actually did. Ranges let you choose a number inside them.
        Logging again replaces today’s score instead of stacking it. {DAYS[weekday]}.
      </p>
      <div className="mt-5 flex flex-col gap-6">
        {CATEGORIES.map((cat) => {
          const items = economy.activities.filter((a) => a.category === cat.id);
          if (!items.length) return null;
          return (
            <section key={cat.id}>
              <h2 className="mb-2 text-2xl">
                <span className="text-faint">{cat.short}</span> {cat.label}
              </h2>
              <div className="flex flex-col gap-3">
                {items.map((a) => (
                  <ActivityCard
                    key={a.id}
                    activity={a}
                    open={activityOpenToday(a)}
                    logged={logFor(economy, a.id, date)}
                    onPick={(band) => {
                      const pts = band.min === band.max ? band.max : band.max;
                      setValue(pts);
                      setPicked({ activity: a, band });
                    }}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {picked && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-3 sm:items-center" onClick={() => setPicked(null)}>
          <div className="sheet-in w-full max-w-md rounded-[var(--radius-xl)] border border-line bg-surface p-5" onClick={(e) => e.stopPropagation()} role="dialog">
            <h2 className="text-2xl">{picked.activity.name}</h2>
            <p className="mt-1 text-sm text-muted">{picked.band.label}</p>
            {picked.band.min !== picked.band.max ? (
              <label className="mt-4 block text-sm text-muted">
                Points inside {picked.band.min}–{picked.band.max}
                <input
                  type="range"
                  min={picked.band.min}
                  max={picked.band.max}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--color-accent)]"
                />
                <span className="num mt-1 block font-[family-name:var(--font-display)] text-3xl text-ink">{value}</span>
              </label>
            ) : (
              <p className="num mt-4 font-[family-name:var(--font-display)] text-3xl">{picked.band.max} CS</p>
            )}
            <div className="mt-4 flex gap-2">
              <Btn
                onClick={() => {
                  const pts = bandPoints(picked.band, value);
                  const res = actions.log(picked.activity.id, picked.band, pts);
                  if (economy.settings.effects) {
                    flash(res.gained ? `+${formatCs(res.gained)} CS · ${picked.activity.code}` : "Logged. No change in silver.");
                  }
                  setPicked(null);
                }}
              >
                Log it
              </Btn>
              <Btn kind="ghost" onClick={() => setPicked(null)}>
                Cancel
              </Btn>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

function ActivityCard({
  activity,
  open,
  logged,
  onPick,
}: {
  activity: Activity;
  open: boolean;
  logged?: { points: number; bandId: string };
  onPick: (band: Band) => void;
}) {
  return (
    <Panel className={!activity.enabled ? "opacity-50" : ""}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-lg">
            <span className="text-faint">{activity.code}</span> {activity.name}
          </p>
          <p className="mt-1 max-w-prose text-sm text-muted">{activity.description}</p>
          {!open && (
            <p className="mt-1 text-xs text-warn">
              Original window is closed today. You can still log it — the day rule is a reminder, not a lock.
            </p>
          )}
          {logged && <p className="mt-1 text-xs text-accent">Logged {logged.points} CS</p>}
        </div>
        <button
          className="text-xs text-faint underline"
          onClick={() => actions.updateActivity(activity.id, { enabled: !activity.enabled })}
        >
          {activity.enabled ? "Hide" : "Show"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {activity.bands.map((b) => (
          <button
            key={b.id}
            disabled={!activity.enabled}
            onClick={() => onPick(b)}
            className={`press h-auto min-h-11 rounded-[var(--radius-sm)] border px-3 py-2 text-left text-sm ${
              logged?.bandId === b.id ? "border-accent bg-surface-2 text-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            <span className="block">{b.label}</span>
            <span className="num text-xs text-faint">
              {b.min === b.max ? b.max : `${b.min}–${b.max}`}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}
