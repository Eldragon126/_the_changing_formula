import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as useEconomy, a as Panel, c as actions, h as inputClass, i as Field, m as formatCs, o as Shell, r as Eyebrow, t as Btn } from "./ui-Dx-toK8t.mjs";
import { n as flash, t as Toaster } from "./toast-g-kKkg4B.mjs";
import { n as Modal } from "./router-BcYFjBOF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Bu1jWB8x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const { economy, ready } = useEconomy();
	const [confirming, setConfirming] = (0, import_react.useState)(null);
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [gold, setGold] = (0, import_react.useState)(1);
	const [burst, setBurst] = (0, import_react.useState)(null);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Opening the shop…"
	}) });
	const rate = economy.settings.csPerGold;
	const canConvert = economy.cs >= rate * gold;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The shop" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-4xl",
					children: "Spend what you earned"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted",
					children: "Rewards are things you actually want. Redeeming spends silver or gold and writes a line in the ledger."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				kind: "ghost",
				onClick: () => setAdding(true),
				children: "New reward"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2",
			children: economy.rewards.map((r) => {
				const afford = r.currency === "cs" ? economy.cs >= r.cost : economy.cg >= r.cost;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-faint",
						children: r.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl",
						children: r.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: r.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "num mt-3 font-[family-name:var(--font-display)] text-3xl",
						children: [
							formatCs(r.cost),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base text-muted",
								children: r.currency.toUpperCase()
							})
						]
					}),
					r.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-faint",
						children: r.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							disabled: !afford,
							onClick: () => setConfirming(r),
							children: afford ? "Redeem" : "Short"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "quiet",
							onClick: () => actions.removeReward(r.id),
							children: "Remove"
						})]
					})
				] }, r.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Mint gold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [formatCs(rate), " Creative Silver becomes 1 Creative Gold. The rate lives in Rules."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Gold to mint",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: `${inputClass} w-28`,
							inputMode: "numeric",
							value: gold,
							onChange: (e) => setGold(Math.max(1, Number(e.target.value) || 1))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						disabled: !canConvert,
						onClick: () => {
							const res = actions.convert(gold);
							flash(res.ok ? `Minted ${gold} CG.` : res.reason ?? "Not enough silver.");
						},
						children: [
							"Convert ",
							formatCs(rate * gold),
							" CS"
						]
					})]
				})
			]
		}),
		confirming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "Redeem",
			onClose: () => setConfirming(null),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					"Spend ",
					formatCs(confirming.cost),
					" ",
					confirming.currency.toUpperCase(),
					" on ",
					confirming.name,
					"?"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						const res = actions.redeem(confirming);
						if (!res.ok) {
							flash(res.reason ?? "Could not redeem.");
							return;
						}
						setBurst(confirming.name);
						setConfirming(null);
						window.setTimeout(() => setBurst(null), 1600);
					},
					children: "Confirm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "ghost",
					onClick: () => setConfirming(null),
					children: "Keep it"
				})]
			})]
		}),
		adding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewReward, { onClose: () => setAdding(false) }),
		burst && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none fixed inset-0 z-50 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise font-[family-name:var(--font-display)] text-4xl text-ink",
				children: burst
			})
		})
	] });
}
function NewReward({ onClose }) {
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [cost, setCost] = (0, import_react.useState)("40");
	const [currency, setCurrency] = (0, import_react.useState)("cs");
	const [category, setCategory] = (0, import_react.useState)("Custom");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: "New reward",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: name,
						onChange: (e) => setName(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "What you get",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: description,
						onChange: (e) => setDescription(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: cost,
							onChange: (e) => setCost(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Currency",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: inputClass,
							value: currency,
							onChange: (e) => setCurrency(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cs",
								children: "CS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cg",
								children: "CG"
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Category",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: category,
						onChange: (e) => setCategory(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (!name.trim()) return;
						actions.addReward({
							name: name.trim(),
							description,
							cost: Math.max(1, Number(cost) || 1),
							currency,
							category
						});
						onClose();
					},
					children: "Put it on the shelf"
				})
			]
		})
	});
}
//#endregion
export { ShopPage as component };
