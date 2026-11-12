import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as todayKey, T as useEconomy, _ as logFor, a as Panel, c as actions, l as activityOpenToday, m as formatCs, n as CATEGORIES, o as Shell, r as Eyebrow, t as Btn, u as bandPoints } from "./ui-Dx-toK8t.mjs";
import { n as flash, t as Toaster } from "./toast-g-kKkg4B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formula-CrxJO_JD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAYS = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
function FormulaPage() {
	const { economy, ready } = useEconomy();
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [value, setValue] = (0, import_react.useState)(0);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Loading formula…"
	}) });
	const date = todayKey();
	const weekday = (/* @__PURE__ */ new Date()).getDay();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Creative formula" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl",
			children: "Today’s sheet"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-xl text-muted",
			children: [
				"Pick the band that matches what you actually did. Ranges let you choose a number inside them. Logging again replaces today’s score instead of stacking it. ",
				DAYS[weekday],
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-col gap-6",
			children: CATEGORIES.map((cat) => {
				const items = economy.activities.filter((a) => a.category === cat.id);
				if (!items.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-2 text-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint",
							children: cat.short
						}),
						" ",
						cat.label
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityCard, {
						activity: a,
						open: activityOpenToday(a),
						logged: logFor(economy, a.id, date),
						onPick: (band) => {
							const pts = band.min === band.max ? band.max : band.max;
							setValue(pts);
							setPicked({
								activity: a,
								band
							});
						}
					}, a.id))
				})] }, cat.id);
			})
		}),
		picked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-3 sm:items-center",
			onClick: () => setPicked(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-in w-full max-w-md rounded-[var(--radius-xl)] border border-line bg-surface p-5",
				onClick: (e) => e.stopPropagation(),
				role: "dialog",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: picked.activity.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: picked.band.label
					}),
					picked.band.min !== picked.band.max ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-sm text-muted",
						children: [
							"Points inside ",
							picked.band.min,
							"–",
							picked.band.max,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: picked.band.min,
								max: picked.band.max,
								value,
								onChange: (e) => setValue(Number(e.target.value)),
								className: "mt-2 w-full accent-[var(--color-accent)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num mt-1 block font-[family-name:var(--font-display)] text-3xl text-ink",
								children: value
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "num mt-4 font-[family-name:var(--font-display)] text-3xl",
						children: [picked.band.max, " CS"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => {
								const pts = bandPoints(picked.band, value);
								const res = actions.log(picked.activity.id, picked.band, pts);
								if (economy.settings.effects) flash(res.gained ? `+${formatCs(res.gained)} CS · ${picked.activity.code}` : "Logged. No change in silver.");
								setPicked(null);
							},
							children: "Log it"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							onClick: () => setPicked(null),
							children: "Cancel"
						})]
					})
				]
			})
		})
	] });
}
function ActivityCard({ activity, open, logged, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: !activity.enabled ? "opacity-50" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint",
							children: activity.code
						}),
						" ",
						activity.name
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-prose text-sm text-muted",
					children: activity.description
				}),
				!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-warn",
					children: "Original window is closed today. You can still log it — the day rule is a reminder, not a lock."
				}),
				logged && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-accent",
					children: [
						"Logged ",
						logged.points,
						" CS"
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-xs text-faint underline",
				onClick: () => actions.updateActivity(activity.id, { enabled: !activity.enabled }),
				children: activity.enabled ? "Hide" : "Show"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: activity.bands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				disabled: !activity.enabled,
				onClick: () => onPick(b),
				className: `press h-auto min-h-11 rounded-[var(--radius-sm)] border px-3 py-2 text-left text-sm ${logged?.bandId === b.id ? "border-accent bg-surface-2 text-ink" : "border-line text-muted hover:text-ink"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block",
					children: b.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "num text-xs text-faint",
					children: b.min === b.max ? b.max : `${b.min}–${b.max}`
				})]
			}, b.id))
		})]
	});
}
//#endregion
export { FormulaPage as component };
