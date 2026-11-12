import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { dayPoints, formatCs, savingsTotal, spendingsToday, todayKey } from "@/lib/lifequest/engine";
import { useEconomy } from "@/lib/lifequest/store";
import { CATEGORIES } from "@/lib/lifequest/types";
import { Shell } from "@/components/lifequest/shell";
import { Eyebrow, Panel } from "@/components/lifequest/ui";

export const Route = createFileRoute("/ledger")({ component: LedgerPage });

function LedgerPage() {
  const { economy, ready } = useEconomy();
  const [filter, setFilter] = useState<"all" | "earn" | "spend" | "vault" | "power">("all");
  const rows = useMemo(() => {
    if (!ready) return [];
    return economy.txs.filter((t) => (filter === "all" ? true : t.kind === filter || (filter === "spend" && t.amount < 0 && t.kind !== "vault")));
  }, [economy.txs, filter, ready]);

  if (!ready) return <Shell><p className="text-muted">Opening the ledger…</p></Shell>;

  const date = todayKey();
  const sheet = economy.activities.map((a) => {
    const log = economy.logs.find((l) => l.activityId === a.id && l.date === date);
    return { a, points: log?.points ?? null };
  });
  const byCat = CATEGORIES.map((c) => ({
    ...c,
    total: sheet.filter((s) => s.a.category === c.id).reduce((n, s) => n + (s.points ?? 0), 0),
  }));

  return (
    <Shell>
      <Eyebrow>Ledger</Eyebrow>
      <h1 className="mt-1 text-4xl">Where the silver went</h1>
      <p className="mt-2 max-w-xl text-muted">
        Every earn, spend, conversion, vault move, and power priority is a line. Refreshing the page cannot pay you twice.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-faint">Today in</p>
          <p className="num mt-1 font-[family-name:var(--font-display)] text-3xl">{formatCs(dayPoints(economy))}</p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-faint">Today out</p>
          <p className="num mt-1 font-[family-name:var(--font-display)] text-3xl">{formatCs(spendingsToday(economy))}</p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-faint">Vault</p>
          <p className="num mt-1 font-[family-name:var(--font-display)] text-3xl">{formatCs(savingsTotal(economy))}</p>
        </Panel>
      </div>

      <Panel className="mt-3">
        <h2 className="text-xl">Today’s formula</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.12em] text-faint">
              <tr>
                <th className="py-2 font-medium">Code</th>
                <th className="font-medium">Activity</th>
                <th className="font-medium">Room</th>
                <th className="text-right font-medium">CS</th>
              </tr>
            </thead>
            <tbody>
              {sheet.filter((s) => s.a.enabled || s.points).map(({ a, points }) => (
                <tr key={a.id} className="border-t border-line">
                  <td className="py-2 text-faint">{a.code}</td>
                  <td>{a.name}</td>
                  <td className="text-muted">{CATEGORIES.find((c) => c.id === a.category)?.label}</td>
                  <td className="num text-right">{points == null ? "—" : points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted">
          {byCat.map((c) => (
            <span key={c.id}>
              {c.short} {c.total}
            </span>
          ))}
        </div>
      </Panel>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", "earn", "spend", "vault", "power"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`press h-10 rounded-full px-3 text-sm ${filter === k ? "bg-accent text-accent-ink" : "bg-surface text-muted"}`}
          >
            {k}
          </button>
        ))}
      </div>
      <ul className="mt-3 flex flex-col">
        {rows.length === 0 && <li className="text-sm text-muted">No lines yet.</li>}
        {rows.slice(0, 80).map((t) => (
          <li key={t.id} className="flex items-baseline justify-between gap-3 border-b border-line py-3 text-sm">
            <div>
              <p>{t.label}</p>
              <p className="text-xs text-faint">
                {t.kind} · {new Date(t.at).toLocaleString()}
              </p>
            </div>
            <span className={`num ${t.amount < 0 ? "text-bad" : "text-good"}`}>
              {t.amount > 0 ? "+" : ""}
              {formatCs(t.amount)} {t.currency.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
