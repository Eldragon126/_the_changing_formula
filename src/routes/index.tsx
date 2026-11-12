import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  achievements,
  categoryPoints,
  dayPoints,
  formatCs,
  levelFromXp,
  logFor,
  personalRecords,
  relativeUntil,
  streakDays,
  todayKey,
  totalEarnedCs,
  weeklySeries,
} from "@/lib/lifequest/engine";
import { actions, useEconomy } from "@/lib/lifequest/store";
import { CATEGORIES, type CategoryId, type Quest } from "@/lib/lifequest/types";
import { Shell } from "@/components/lifequest/shell";
import { Btn, Eyebrow, Field, Panel, inputClass } from "@/components/lifequest/ui";
import { flash, Toaster } from "@/components/lifequest/toast";

export const Route = createFileRoute("/")({ component: Home });

function greeting(name: string) {
  const h = new Date().getHours();
  const part = h < 5 ? "Late" : h < 12 ? "Morning" : h < 17 ? "Afternoon" : "Evening";
  return name ? `${part}, ${name}` : part;
}

function Home() {
  const { economy, ready } = useEconomy();
  const [now, setNow] = useState(() => new Date());
  const [editing, setEditing] = useState<Quest | null>(null);
  const [composing, setComposing] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!ready) {
    return (
      <Shell>
        <p className="text-muted">Opening the day…</p>
      </Shell>
    );
  }

  const s = economy.settings;
  const earned = totalEarnedCs(economy);
  const lvl = levelFromXp(earned, s.xpPerLevel);
  const today = dayPoints(economy);
  const cats = categoryPoints(economy);
  const streak = streakDays(economy, s.dailyGoal);
  const open = economy.quests.filter((q) => q.status === "open");
  const done = economy.quests.filter((q) => q.status === "done");
  const week = weeklySeries(economy);
  const maxWeek = Math.max(1, ...week.map((d) => d.points));
  const records = personalRecords(economy);
  const badges = achievements(economy);
  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeLabel = now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  return (
    <Shell>
      <Toaster />
      <div className="flex flex-col gap-4">
        <header className="rise">
          <Eyebrow>Daily command</Eyebrow>
          <h1 className="mt-1 text-4xl text-ink sm:text-5xl">{greeting(s.displayName)}</h1>
          <p className="mt-2 text-muted">
            {dateLabel}
            <span className="num"> · {timeLabel}</span>
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat k="Level" v={String(lvl.level)} sub={`${lvl.into} / ${lvl.per} XP`} />
          <Stat k="Today" v={formatCs(today)} sub={`of ${s.dailyGoal} CS goal`} />
          <Stat k="Open quests" v={String(open.length)} sub={`${done.length} finished`} />
          <Stat
            k={s.streaksEnabled ? "Streak" : "Streak paused"}
            v={s.streaksEnabled ? `${streak}d` : "—"}
            sub={records.best ? `Best day ${records.best} CS` : "No record yet"}
          />
        </div>

        <Panel>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xl">Four rooms</h2>
            <span className="text-xs text-faint">Today’s Creative Silver by life area</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {CATEGORIES.map((c) => {
              const value = cats[c.id] ?? 0;
              const cap = Math.max(
                20,
                ...economy.activities.filter((a) => a.category === c.id).map((a) => a.maxDaily),
              );
              const pct = Math.min(100, Math.round((value / (cap * 2)) * 100));
              return (
                <div key={c.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>
                      <span className="text-faint">{c.short}</span> {c.label}
                    </span>
                    <span className="num text-muted">{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-bg">
                    <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-faint">
            Empty bars are information, not a grade. A quiet category is allowed.
          </p>
        </Panel>

        <Panel>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl">Quest board</h2>
            <Btn kind="ghost" onClick={() => setComposing(true)}>
              New quest
            </Btn>
          </div>
          {open.length === 0 ? (
            <p className="text-sm text-muted">Nothing open. Add a quest, or log the formula instead.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {open.map((q) => (
                <QuestRow
                  key={q.id}
                  quest={q}
                  multiplier={economy.settings.powerMultiplier}
                  onDone={() => {
                    const res = actions.complete(q.id);
                    if (economy.settings.effects && res.gained) flash(`+${res.gained} CS · ${q.name}`);
                  }}
                  onEdit={() => setEditing(q)}
                />
              ))}
            </ul>
          )}
          {done.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-muted">Finished today ({done.length})</summary>
              <ul className="mt-2 flex flex-col gap-1 text-sm text-faint">
                {done.map((q) => (
                  <li key={q.id} className="flex justify-between">
                    <span>{q.name}</span>
                    <button
                      className="text-accent"
                      onClick={() => actions.patchQuest(q.id, { status: "open" }, "Reopened")}
                    >
                      Reopen
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </Panel>

        <div className="grid gap-3 lg:grid-cols-2">
          <Panel>
            <h2 className="text-xl">Seven days</h2>
            <div className="mt-4 flex h-28 items-end gap-2">
              {week.map((d) => (
                <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex h-20 w-full items-end">
                    <div
                      className="w-full rounded-[var(--radius-xs)] bg-accent/80"
                      style={{ height: `${Math.max(4, (d.points / maxWeek) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-faint">{d.label}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <h2 className="text-xl">Marks</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {badges.map((b) => (
                <li
                  key={b.id}
                  className={`rounded-[var(--radius-md)] border px-3 py-2 ${b.earned ? "border-accent/50 bg-surface-2" : "border-line opacity-60"}`}
                >
                  <p className="text-sm">{b.name}</p>
                  <p className="text-xs text-faint">{b.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xl">Formula, today</h2>
            <a href="/formula" className="text-sm text-accent">
              Full sheet
            </a>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {economy.activities
              .filter((a) => a.enabled)
              .slice(0, 6)
              .map((a) => {
                const logged = logFor(economy, a.id, todayKey());
                return (
                  <div key={a.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-bg px-3 py-2">
                    <div>
                      <p className="text-sm">
                        <span className="text-faint">{a.code}</span> {a.name}
                      </p>
                      <p className="text-xs text-faint">{logged ? `${logged.points} CS logged` : "Not logged"}</p>
                    </div>
                    <a href="/formula" className="text-sm text-accent">
                      Log
                    </a>
                  </div>
                );
              })}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl">Stress</h2>
              <p className="text-sm text-muted">Noted, not scored. 1 is calm, 10 is a lot.</p>
            </div>
            <span className="num font-[family-name:var(--font-display)] text-3xl">{economy.stress}</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={economy.stress}
            onChange={(ev) => actions.setStress(Number(ev.target.value))}
            className="mt-3 w-full accent-[var(--color-accent)]"
            aria-label="Stress, 1 to 10"
          />
        </Panel>
      </div>

      {editing && (
        <QuestDialog
          quest={editing}
          onClose={() => setEditing(null)}
          powerCost={economy.settings.powerCost}
          powerDays={economy.settings.powerDays}
          onPower={() => {
            const res = actions.power(editing.id);
            flash(res.ok ? "Power priority is on." : res.reason ?? "Could not activate.");
            if (res.ok) setEditing(null);
          }}
        />
      )}
      {composing && <Compose onClose={() => setComposing(false)} />}
    </Shell>
  );
}

function Stat({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface px-4 py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-faint">{k}</p>
      <p className="num mt-1 font-[family-name:var(--font-display)] text-3xl">{v}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}

function QuestRow({
  quest,
  onDone,
  onEdit,
  multiplier,
}: {
  quest: Quest;
  onDone: () => void;
  onEdit: () => void;
  multiplier: number;
}) {
  const powered = quest.powerUntil && new Date(quest.powerUntil).getTime() > Date.now();
  return (
    <li className="rounded-[var(--radius-lg)] border border-line bg-bg p-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base text-ink">{quest.name}</p>
          <p className="mt-0.5 text-sm text-muted">{quest.description}</p>
          <p className="mt-2 text-xs text-faint">
            {quest.category} · {quest.minutes} min · {quest.priority}
            {quest.due ? ` · due ${quest.due}` : ""} · {quest.points} CS
            {powered ? ` · ${multiplier}× until ${relativeUntil(quest.powerUntil!)}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Btn kind="ghost" onClick={onEdit}>
            Edit
          </Btn>
          <Btn onClick={onDone}>Done</Btn>
        </div>
      </div>
      {quest.subtasks.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1">
          {quest.subtasks.map((st) => (
            <li key={st.id}>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={st.done}
                  onChange={() => actions.toggleSub(quest.id, st.id)}
                />
                <span className={st.done ? "line-through" : ""}>{st.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function QuestDialog({
  quest,
  onClose,
  onPower,
  powerCost,
  powerDays,
}: {
  quest: Quest;
  onClose: () => void;
  onPower: () => void;
  powerCost: number;
  powerDays: number;
}) {
  const [name, setName] = useState(quest.name);
  const [description, setDescription] = useState(quest.description);
  const [points, setPoints] = useState(String(quest.points));
  const [minutes, setMinutes] = useState(String(quest.minutes));
  const [due, setDue] = useState(quest.due ?? "");
  const [priority, setPriority] = useState(quest.priority);
  const [recurring, setRecurring] = useState(quest.recurring);
  const [category, setCategory] = useState<CategoryId>(quest.category);
  const [split, setSplit] = useState("");

  return (
    <Modal title="Edit quest" onClose={onClose}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name">
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Category">
          <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Points">
          <input className={inputClass} inputMode="numeric" value={points} onChange={(e) => setPoints(e.target.value)} />
        </Field>
        <Field label="Minutes">
          <input className={inputClass} inputMode="numeric" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        </Field>
        <Field label="Due time">
          <input className={inputClass} value={due} placeholder="4:30 pm" onChange={(e) => setDue(e.target.value)} />
        </Field>
        <Field label="Priority">
          <select className={inputClass} value={priority} onChange={(e) => setPriority(e.target.value as Quest["priority"])}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </Field>
        <Field label="Repeats">
          <select className={inputClass} value={recurring} onChange={(e) => setRecurring(e.target.value as Quest["recurring"])}>
            <option value="none">Once</option>
            <option value="daily">Daily</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekend">Weekend</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea className={`${inputClass} h-20 py-2`} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Btn
          onClick={() => {
            actions.patchQuest(
              quest.id,
              {
                name: name.trim() || quest.name,
                description,
                points: Math.max(0, Number(points) || 0),
                minutes: Math.max(0, Number(minutes) || 0),
                due: due || undefined,
                priority,
                recurring,
                category,
              },
              "Edited",
            );
            onClose();
          }}
        >
          Save
        </Btn>
        <Btn kind="ghost" onClick={() => { actions.patchQuest(quest.id, { status: "postponed" }, "Postponed"); onClose(); }}>
          Postpone
        </Btn>
        <Btn kind="ghost" onClick={onPower}>
          Power · {powerCost} CS / {powerDays}d
        </Btn>
      </div>
      <div className="mt-4 border-t border-line pt-4">
        <Field label="Split into smaller quests (one per line)">
          <textarea className={`${inputClass} h-20 py-2`} value={split} onChange={(e) => setSplit(e.target.value)} />
        </Field>
        <Btn
          className="mt-2"
          kind="ghost"
          onClick={() => {
            actions.split(quest.id, split.split("\n"));
            onClose();
          }}
        >
          Split
        </Btn>
      </div>
      {quest.history.length > 0 && (
        <ul className="mt-4 text-xs text-faint">
          {quest.history.slice(0, 5).map((h, i) => (
            <li key={i}>
              {h.action} · {new Date(h.at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}

function Compose({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [points, setPoints] = useState("10");
  const [category, setCategory] = useState<CategoryId>("intellectual");
  const [description, setDescription] = useState("");
  return (
    <Modal title="New quest" onClose={onClose}>
      <div className="grid gap-3">
        <Field label="Name">
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        </Field>
        <Field label="Why it matters">
          <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="CS">
            <input className={inputClass} value={points} onChange={(e) => setPoints(e.target.value)} />
          </Field>
          <Field label="Category">
            <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </Field>
        </div>
        <Btn
          onClick={() => {
            if (!name.trim()) return;
            actions.addQuest({
              name: name.trim(),
              description,
              category,
              points: Math.max(1, Number(points) || 1),
              minutes: 25,
              priority: "normal",
              recurring: "none",
            });
            onClose();
          }}
        >
          Add to today
        </Btn>
      </div>
    </Modal>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-3 sm:items-center" onClick={onClose}>
      <div
        className="sheet-in max-h-[88vh] w-full max-w-lg overflow-auto rounded-[var(--radius-xl)] border border-line bg-surface p-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl">{title}</h2>
          <button className="text-sm text-muted" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
