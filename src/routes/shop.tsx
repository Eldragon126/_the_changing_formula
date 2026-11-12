import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatCs } from "@/lib/lifequest/engine";
import { actions, useEconomy } from "@/lib/lifequest/store";
import type { Reward } from "@/lib/lifequest/types";
import { Shell } from "@/components/lifequest/shell";
import { Btn, Eyebrow, Field, Panel, inputClass } from "@/components/lifequest/ui";
import { Modal } from "@/routes/index";
import { flash, Toaster } from "@/components/lifequest/toast";

export const Route = createFileRoute("/shop")({ component: ShopPage });

function ShopPage() {
  const { economy, ready } = useEconomy();
  const [confirming, setConfirming] = useState<Reward | null>(null);
  const [adding, setAdding] = useState(false);
  const [gold, setGold] = useState(1);
  const [burst, setBurst] = useState<string | null>(null);

  if (!ready) return <Shell><p className="text-muted">Opening the shop…</p></Shell>;

  const rate = economy.settings.csPerGold;
  const canConvert = economy.cs >= rate * gold;

  return (
    <Shell>
      <Toaster />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>The shop</Eyebrow>
          <h1 className="mt-1 text-4xl">Spend what you earned</h1>
          <p className="mt-2 max-w-xl text-muted">
            Rewards are things you actually want. Redeeming spends silver or gold and writes a line in the ledger.
          </p>
        </div>
        <Btn kind="ghost" onClick={() => setAdding(true)}>
          New reward
        </Btn>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {economy.rewards.map((r) => {
          const afford = r.currency === "cs" ? economy.cs >= r.cost : economy.cg >= r.cost;
          return (
            <Panel key={r.id}>
              <p className="text-xs uppercase tracking-[0.14em] text-faint">{r.category}</p>
              <h2 className="mt-1 text-2xl">{r.name}</h2>
              <p className="mt-1 text-sm text-muted">{r.description}</p>
              <p className="num mt-3 font-[family-name:var(--font-display)] text-3xl">
                {formatCs(r.cost)} <span className="text-base text-muted">{r.currency.toUpperCase()}</span>
              </p>
              {r.note && <p className="mt-1 text-xs text-faint">{r.note}</p>}
              <div className="mt-3 flex gap-2">
                <Btn
                  disabled={!afford}
                  onClick={() => setConfirming(r)}
                >
                  {afford ? "Redeem" : "Short"}
                </Btn>
                <Btn kind="quiet" onClick={() => actions.removeReward(r.id)}>
                  Remove
                </Btn>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel className="mt-4">
        <h2 className="text-2xl">Mint gold</h2>
        <p className="mt-1 text-sm text-muted">
          {formatCs(rate)} Creative Silver becomes 1 Creative Gold. The rate lives in Rules.
        </p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <Field label="Gold to mint">
            <input
              className={`${inputClass} w-28`}
              inputMode="numeric"
              value={gold}
              onChange={(e) => setGold(Math.max(1, Number(e.target.value) || 1))}
            />
          </Field>
          <Btn
            disabled={!canConvert}
            onClick={() => {
              const res = actions.convert(gold);
              flash(res.ok ? `Minted ${gold} CG.` : res.reason ?? "Not enough silver.");
            }}
          >
            Convert {formatCs(rate * gold)} CS
          </Btn>
        </div>
      </Panel>

      {confirming && (
        <Modal title="Redeem" onClose={() => setConfirming(null)}>
          <p className="text-muted">
            Spend {formatCs(confirming.cost)} {confirming.currency.toUpperCase()} on {confirming.name}?
          </p>
          <div className="mt-4 flex gap-2">
            <Btn
              onClick={() => {
                const res = actions.redeem(confirming);
                if (!res.ok) {
                  flash(res.reason ?? "Could not redeem.");
                  return;
                }
                setBurst(confirming.name);
                setConfirming(null);
                window.setTimeout(() => setBurst(null), 1600);
              }}
            >
              Confirm
            </Btn>
            <Btn kind="ghost" onClick={() => setConfirming(null)}>
              Keep it
            </Btn>
          </div>
        </Modal>
      )}
      {adding && <NewReward onClose={() => setAdding(false)} />}
      {burst && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <p className="rise font-[family-name:var(--font-display)] text-4xl text-ink">{burst}</p>
        </div>
      )}
    </Shell>
  );
}

function NewReward({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("40");
  const [currency, setCurrency] = useState<"cs" | "cg">("cs");
  const [category, setCategory] = useState("Custom");
  return (
    <Modal title="New reward" onClose={onClose}>
      <div className="grid gap-3">
        <Field label="Name">
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="What you get">
          <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Cost">
            <input className={inputClass} value={cost} onChange={(e) => setCost(e.target.value)} />
          </Field>
          <Field label="Currency">
            <select className={inputClass} value={currency} onChange={(e) => setCurrency(e.target.value as "cs" | "cg")}>
              <option value="cs">CS</option>
              <option value="cg">CG</option>
            </select>
          </Field>
        </div>
        <Field label="Category">
          <input className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)} />
        </Field>
        <Btn
          onClick={() => {
            if (!name.trim()) return;
            actions.addReward({
              name: name.trim(),
              description,
              cost: Math.max(1, Number(cost) || 1),
              currency,
              category,
            });
            onClose();
          }}
        >
          Put it on the shelf
        </Btn>
      </div>
    </Modal>
  );
}
