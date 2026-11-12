import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as useEconomy, a as Panel, c as actions, h as inputClass, i as Field, o as Shell, p as exportJson, r as Eyebrow, t as Btn } from "./ui-Dx-toK8t.mjs";
import { n as flash, t as Toaster } from "./toast-g-kKkg4B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BU2yyjr9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FIELDS = [
	{
		key: "csPerGold",
		label: "CS per gold",
		hint: "Original formula is 10,000."
	},
	{
		key: "vaultDeposit",
		label: "Vault deposit",
		hint: "Silver locked per lot."
	},
	{
		key: "vaultFee",
		label: "Vault fee",
		hint: "Paid on top of the deposit."
	},
	{
		key: "vaultMonths",
		label: "Months to mature",
		hint: "Original is 6."
	},
	{
		key: "vaultMultiplier",
		label: "Mature multiplier",
		hint: "Simulated. Original is 3."
	},
	{
		key: "powerCost",
		label: "Power priority cost",
		hint: "Original is 45 CS."
	},
	{
		key: "powerDays",
		label: "Power days",
		hint: "Original is 7."
	},
	{
		key: "powerMultiplier",
		label: "Power multiplier",
		hint: "Original is 2."
	},
	{
		key: "dailyGoal",
		label: "Daily CS goal",
		hint: "Used for the streak, if streaks are on."
	},
	{
		key: "xpPerLevel",
		label: "XP per level",
		hint: "Lifetime earned CS divided by this."
	}
];
function RulesPage() {
	const { economy, ready } = useEconomy();
	const [importText, setImportText] = (0, import_react.useState)("");
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Loading rules…"
	}) });
	const s = economy.settings;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Rules" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-4xl",
			children: "Make the formula yours"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-muted",
			children: "The starter numbers come from your Creative Formula sheet. Change any of them. They apply to the next action, not to history already written."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "App name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: s.appName,
							onChange: (e) => actions.updateSettings({ appName: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "What should the greeting use",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: s.displayName,
							placeholder: "Optional",
							onChange: (e) => actions.updateSettings({ displayName: e.target.value })
						})
					}),
					FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: f.label,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							inputMode: "decimal",
							value: String(s[f.key]),
							onChange: (e) => {
								const n = Number(e.target.value);
								if (!Number.isFinite(n)) return;
								actions.updateSettings({ [f.key]: n });
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-faint",
							children: f.hint
						})]
					}, f.key))
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: s.effects,
							onChange: (e) => actions.updateSettings({ effects: e.target.checked })
						}), "Completion flash when something pays"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: s.streaksEnabled,
							onChange: (e) => actions.updateSettings({ streaksEnabled: e.target.checked })
						}), "Track a streak against the daily goal"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: "Streaks never punish you. Turning this off hides the count. Missing a day does not take silver away."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl",
					children: "Save file"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Copy the ledger out, or paste one back in. It replaces what is on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "ghost",
						onClick: async () => {
							const text = exportJson(economy);
							try {
								await navigator.clipboard.writeText(text);
								flash("Save copied.");
							} catch {
								setImportText(text);
								flash("Clipboard blocked. The save is in the box.");
							}
						},
						children: "Copy save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "ghost",
						onClick: () => {
							const blob = new Blob([exportJson(economy)], { type: "application/json" });
							const url = URL.createObjectURL(blob);
							const a = document.createElement("a");
							a.href = url;
							a.download = "lifequest.json";
							a.click();
							URL.revokeObjectURL(url);
						},
						children: "Download"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${inputClass} mt-3 h-28 py-2 font-mono text-xs`,
					placeholder: "Paste a save here",
					value: importText,
					onChange: (e) => setImportText(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => {
							try {
								actions.importSave(importText);
								flash("Save restored.");
								setImportText("");
							} catch (err) {
								flash(err instanceof Error ? err.message : "Could not read that save.");
							}
						},
						children: "Restore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "quiet",
						onClick: () => {
							if (!window.confirm("Erase this device’s LifeQuest data and start from the original formula?")) return;
							actions.reset();
							flash("Reset to the starter formula.");
						},
						children: "Reset"
					})]
				})
			]
		})
	] });
}
//#endregion
export { RulesPage as component };
