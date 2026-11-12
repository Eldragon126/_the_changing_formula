import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as todayKey, T as useEconomy, a as Panel, b as savingsTotal, f as dayPoints, m as formatCs, n as CATEGORIES, o as Shell, r as Eyebrow, x as spendingsToday } from "./ui-Dx-toK8t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-D0m979eq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LedgerPage() {
	const { economy, ready } = useEconomy();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		if (!ready) return [];
		return economy.txs.filter((t) => filter === "all" ? true : t.kind === filter || filter === "spend" && t.amount < 0 && t.kind !== "vault");
	}, [
		economy.txs,
		filter,
		ready
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Opening the ledger…"
	}) });
	const date = todayKey();
	const sheet = economy.activities.map((a) => {
		return {
			a,
			points: economy.logs.find((l) => l.activityId === a.id && l.date === date)?.points ?? null
		};
	});
	const byCat = CATEGORIES.map((c) => ({
		...c,
		total: sheet.filter((s) => s.a.category === c.id).reduce((n, s) => n + (s.points ?? 0), 0)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Ledger" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl",
			children: "Where the silver went"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-muted",
			children: "Every earn, spend, conversion, vault move, and power priority is a line. Refreshing the page cannot pay you twice."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-faint",
					children: "Today in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-1 font-[family-name:var(--font-display)] text-3xl",
					children: formatCs(dayPoints(economy))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-faint",
					children: "Today out"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-1 font-[family-name:var(--font-display)] text-3xl",
					children: formatCs(spendingsToday(economy))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-faint",
					children: "Vault"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-1 font-[family-name:var(--font-display)] text-3xl",
					children: formatCs(savingsTotal(economy))
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl",
					children: "Today’s formula"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-[0.12em] text-faint",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "Code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Activity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Room"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-right font-medium",
									children: "CS"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sheet.filter((s) => s.a.enabled || s.points).map(({ a, points }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-faint",
									children: a.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "text-muted",
									children: CATEGORIES.find((c) => c.id === a.category)?.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num text-right",
									children: points == null ? "—" : points
								})
							]
						}, a.id)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-3 text-sm text-muted",
					children: byCat.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						c.short,
						" ",
						c.total
					] }, c.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				"all",
				"earn",
				"spend",
				"vault",
				"power"
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(k),
				className: `press h-10 rounded-full px-3 text-sm ${filter === k ? "bg-accent text-accent-ink" : "bg-surface text-muted"}`,
				children: k
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-3 flex flex-col",
			children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm text-muted",
				children: "No lines yet."
			}), rows.slice(0, 80).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-baseline justify-between gap-3 border-b border-line py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-faint",
					children: [
						t.kind,
						" · ",
						new Date(t.at).toLocaleString()
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `num ${t.amount < 0 ? "text-bad" : "text-good"}`,
					children: [
						t.amount > 0 ? "+" : "",
						formatCs(t.amount),
						" ",
						t.currency.toUpperCase()
					]
				})]
			}, t.id))]
		})
	] });
}
//#endregion
export { LedgerPage as component };
