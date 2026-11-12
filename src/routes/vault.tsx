import { createFileRoute } from "@tanstack/react-router";
import { formatCs, relativeUntil, savingsTotal } from "@/lib/lifequest/engine";
import { actions, useEconomy } from "@/lib/lifequest/store";
import { Shell } from "@/components/lifequest/shell";
import { Btn, Eyebrow, Panel } from "@/components/lifequest/ui";
import { flash, Toaster } from "@/components/lifequest/toast";

export const Route = createFileRoute("/vault")({ component: VaultPage });

function VaultPage() {
  const { economy, ready } = useEconomy();
  if (!ready) return <Shell><p className="text-muted">Opening the vault…</p></Shell>;
  const s = economy.settings;
  const cost = s.vaultDeposit + s.vaultFee;
  const locked = economy.vault.filter((l) => l.status !== "withdrawn");
  const savings = savingsTotal(economy);
  const projected = locked
    .filter((l) => l.status === "locked")
    .reduce((sum, l) => sum + Math.round(l.principal * l.multiplier), 0);

  return (
    <Shell>
      <Toaster />
      <Eyebrow>The vault</Eyebrow>
      <h1 className="mt-1 text-4xl">Silver you leave alone</h1>
      <p className="mt-2 max-w-xl text-muted">
        This is a simulated bonus inside the app, not a bank and not an investment. A deposit of {s.vaultDeposit} CS
        costs a {s.vaultFee} CS fee. If the lot sits for {s.vaultMonths} months, it is marked worth {s.vaultMultiplier}×.
        Taking it early returns only the principal.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-faint">Inside</p>
          <p className="num mt-1 font-[family-name:var(--font-display)] text-3xl">{formatCs(savings)}</p>
          <p className="text-xs text-muted">Principal, or mature value</p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-faint">If the locked lots mature</p>
          <p className="num mt-1 font-[family-name:var(--font-display)] text-3xl">{formatCs(projected)}</p>
          <p className="text-xs text-muted">Simulated, only if untouched</p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-faint">Spendable now</p>
          <p className="num mt-1 font-[family-name:var(--font-display)] text-3xl">{formatCs(economy.cs)}</p>
          <p className="text-xs text-muted">Not in the vault</p>
        </Panel>
      </div>

      <Panel className="mt-3">
        <h2 className="text-2xl">Deposit</h2>
        <p className="mt-1 text-sm text-muted">
          {formatCs(s.vaultDeposit)} goes in. {formatCs(s.vaultFee)} is the fee. Total {formatCs(cost)} CS.
        </p>
        <Btn
          className="mt-3"
          disabled={economy.cs < cost}
          onClick={() => {
            const res = actions.vaultDeposit();
            flash(res.ok ? "Locked in the vault." : res.reason ?? "Could not deposit.");
          }}
        >
          Lock {formatCs(cost)} CS
        </Btn>
      </Panel>

      <div className="mt-4 flex flex-col gap-3">
        {locked.length === 0 && <p className="text-sm text-muted">The vault is empty.</p>}
        {economy.vault.map((lot) => (
          <Panel key={lot.id} className={lot.status === "withdrawn" ? "opacity-50" : ""}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg">{formatCs(lot.principal)} CS principal</p>
                <p className="text-sm text-muted">
                  {lot.status === "withdrawn"
                    ? "Withdrawn"
                    : lot.status === "mature"
                      ? `Mature · simulated value ${formatCs(Math.round(lot.principal * lot.multiplier))}`
                      : `Locked · ${relativeUntil(lot.maturesAt)} until the ${lot.multiplier}× mark`}
                </p>
                <p className="text-xs text-faint">Deposited {new Date(lot.depositedAt).toLocaleDateString()}</p>
              </div>
              {lot.status !== "withdrawn" && (
                <Btn
                  kind="ghost"
                  onClick={() => {
                    const early = lot.status === "locked" && new Date(lot.maturesAt).getTime() > Date.now();
                    if (early && !window.confirm("Withdraw early? You only get the principal back. The bonus is forfeited.")) return;
                    const res = actions.vaultWithdraw(lot.id);
                    flash(res.ok ? "Returned to spendable silver." : res.reason ?? "Could not withdraw.");
                  }}
                >
                  Withdraw
                </Btn>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </Shell>
  );
}
