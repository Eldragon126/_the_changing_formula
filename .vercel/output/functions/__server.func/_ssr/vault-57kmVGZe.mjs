import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as useEconomy, a as Panel, b as savingsTotal, c as actions, m as formatCs, o as Shell, r as Eyebrow, t as Btn, y as relativeUntil } from "./ui-Dx-toK8t.mjs";
import { n as flash, t as Toaster } from "./toast-g-kKkg4B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault-57kmVGZe.js
var import_jsx_runtime = require_jsx_runtime();
function VaultPage() {
	const { economy, ready } = useEconomy();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Opening the vault…"
	}) });
	const s = economy.settings;
	const cost = s.vaultDeposit + s.vaultFee;
	const locked = economy.vault.filter((l) => l.status !== "withdrawn");
	const savings = savingsTotal(economy);
	const projected = locked.filter((l) => l.status === "locked").reduce((sum, l) => sum + Math.round(l.principal * l.multiplier), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The vault" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl",
			children: "Silver you leave alone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-xl text-muted",
			children: [
				"This is a simulated bonus inside the app, not a bank and not an investment. A deposit of ",
				s.vaultDeposit,
				" CS costs a ",
				s.vaultFee,
				" CS fee. If the lot sits for ",
				s.vaultMonths,
				" months, it is marked worth ",
				s.vaultMultiplier,
				"×. Taking it early returns only the principal."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-faint",
						children: "Inside"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num mt-1 font-[family-name:var(--font-display)] text-3xl",
						children: formatCs(savings)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Principal, or mature value"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-faint",
						children: "If the locked lots mature"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num mt-1 font-[family-name:var(--font-display)] text-3xl",
						children: formatCs(projected)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Simulated, only if untouched"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-faint",
						children: "Spendable now"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num mt-1 font-[family-name:var(--font-display)] text-3xl",
						children: formatCs(economy.cs)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Not in the vault"
					})
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Deposit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						formatCs(s.vaultDeposit),
						" goes in. ",
						formatCs(s.vaultFee),
						" is the fee. Total ",
						formatCs(cost),
						" CS."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					className: "mt-3",
					disabled: economy.cs < cost,
					onClick: () => {
						const res = actions.vaultDeposit();
						flash(res.ok ? "Locked in the vault." : res.reason ?? "Could not deposit.");
					},
					children: [
						"Lock ",
						formatCs(cost),
						" CS"
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-3",
			children: [locked.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "The vault is empty."
			}), economy.vault.map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: lot.status === "withdrawn" ? "opacity-50" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg",
							children: [formatCs(lot.principal), " CS principal"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: lot.status === "withdrawn" ? "Withdrawn" : lot.status === "mature" ? `Mature · simulated value ${formatCs(Math.round(lot.principal * lot.multiplier))}` : `Locked · ${relativeUntil(lot.maturesAt)} until the ${lot.multiplier}× mark`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-faint",
							children: ["Deposited ", new Date(lot.depositedAt).toLocaleDateString()]
						})
					] }), lot.status !== "withdrawn" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "ghost",
						onClick: () => {
							if (lot.status === "locked" && new Date(lot.maturesAt).getTime() > Date.now() && !window.confirm("Withdraw early? You only get the principal back. The bonus is forfeited.")) return;
							const res = actions.vaultWithdraw(lot.id);
							flash(res.ok ? "Returned to spendable silver." : res.reason ?? "Could not withdraw.");
						},
						children: "Withdraw"
					})]
				})
			}, lot.id))]
		})
	] });
}
//#endregion
export { VaultPage as component };
