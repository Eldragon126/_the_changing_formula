import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as todayKey, E as weeklySeries, S as streakDays, T as useEconomy, _ as logFor, a as Panel, c as actions, d as categoryPoints, f as dayPoints, g as levelFromXp, h as inputClass, i as Field, m as formatCs, n as CATEGORIES, o as Shell, r as Eyebrow, s as achievements, t as Btn, v as personalRecords, w as totalEarnedCs, y as relativeUntil } from "./ui-Dx-toK8t.mjs";
import { n as flash, t as Toaster } from "./toast-g-kKkg4B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-YGXLjAsA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function greeting(name) {
	const h = (/* @__PURE__ */ new Date()).getHours();
	const part = h < 5 ? "Late" : h < 12 ? "Morning" : h < 17 ? "Afternoon" : "Evening";
	return name ? `${part}, ${name}` : part;
}
function Home() {
	const { economy, ready } = useEconomy();
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [composing, setComposing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
		return () => window.clearInterval(id);
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Opening the day…"
	}) });
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
	const dateLabel = now.toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
	const timeLabel = now.toLocaleTimeString(void 0, {
		hour: "numeric",
		minute: "2-digit"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "rise",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Daily command" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-4xl text-ink sm:text-5xl",
							children: greeting(s.displayName)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted",
							children: [dateLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "num",
								children: [" · ", timeLabel]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Level",
							v: String(lvl.level),
							sub: `${lvl.into} / ${lvl.per} XP`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Today",
							v: formatCs(today),
							sub: `of ${s.dailyGoal} CS goal`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Open quests",
							v: String(open.length),
							sub: `${done.length} finished`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: s.streaksEnabled ? "Streak" : "Streak paused",
							v: s.streaksEnabled ? `${streak}d` : "—",
							sub: records.best ? `Best day ${records.best} CS` : "No record yet"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl",
							children: "Four rooms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-faint",
							children: "Today’s Creative Silver by life area"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: CATEGORIES.map((c) => {
							const value = cats[c.id] ?? 0;
							const cap = Math.max(20, ...economy.activities.filter((a) => a.category === c.id).map((a) => a.maxDaily));
							const pct = Math.min(100, Math.round(value / (cap * 2) * 100));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-faint",
										children: c.short
									}),
									" ",
									c.label
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-muted",
									children: value
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 overflow-hidden rounded-full bg-bg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-accent",
									style: { width: `${pct}%` }
								})
							})] }, c.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-faint",
						children: "Empty bars are information, not a grade. A quiet category is allowed."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl",
							children: "Quest board"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							onClick: () => setComposing(true),
							children: "New quest"
						})]
					}),
					open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nothing open. Add a quest, or log the formula instead."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: open.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestRow, {
							quest: q,
							multiplier: economy.settings.powerMultiplier,
							onDone: () => {
								const res = actions.complete(q.id);
								if (economy.settings.effects && res.gained) flash(`+${res.gained} CS · ${q.name}`);
							},
							onEdit: () => setEditing(q)
						}, q.id))
					}),
					done.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "cursor-pointer text-sm text-muted",
							children: [
								"Finished today (",
								done.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 flex flex-col gap-1 text-sm text-faint",
							children: done.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: q.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-accent",
									onClick: () => actions.patchQuest(q.id, { status: "open" }, "Reopened"),
									children: "Reopen"
								})]
							}, q.id))
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Seven days"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex h-28 items-end gap-2",
						children: week.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-20 w-full items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded-[var(--radius-xs)] bg-accent/80",
									style: { height: `${Math.max(4, d.points / maxWeek * 100)}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-faint",
								children: d.label
							})]
						}, d.key))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Marks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: `rounded-[var(--radius-md)] border px-3 py-2 ${b.earned ? "border-accent/50 bg-surface-2" : "border-line opacity-60"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: b.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-faint",
								children: b.detail
							})]
						}, b.id))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Formula, today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/formula",
						className: "text-sm text-accent",
						children: "Full sheet"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: economy.activities.filter((a) => a.enabled).slice(0, 6).map((a) => {
						const logged = logFor(economy, a.id, todayKey());
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-[var(--radius-md)] bg-bg px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-faint",
										children: a.code
									}),
									" ",
									a.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-faint",
								children: logged ? `${logged.points} CS logged` : "Not logged"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/formula",
								className: "text-sm text-accent",
								children: "Log"
							})]
						}, a.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Stress"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Noted, not scored. 1 is calm, 10 is a lot."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num font-[family-name:var(--font-display)] text-3xl",
						children: economy.stress
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 1,
					max: 10,
					value: economy.stress,
					onChange: (ev) => actions.setStress(Number(ev.target.value)),
					className: "mt-3 w-full accent-[var(--color-accent)]",
					"aria-label": "Stress, 1 to 10"
				})] })
			]
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestDialog, {
			quest: editing,
			onClose: () => setEditing(null),
			powerCost: economy.settings.powerCost,
			powerDays: economy.settings.powerDays,
			onPower: () => {
				const res = actions.power(editing.id);
				flash(res.ok ? "Power priority is on." : res.reason ?? "Could not activate.");
				if (res.ok) setEditing(null);
			}
		}),
		composing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compose, { onClose: () => setComposing(false) })
	] });
}
function Stat({ k, v, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-line bg-surface px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.14em] text-faint",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num mt-1 font-[family-name:var(--font-display)] text-3xl",
				children: v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: sub
			})
		]
	});
}
function QuestRow({ quest, onDone, onEdit, multiplier }) {
	const powered = quest.powerUntil && new Date(quest.powerUntil).getTime() > Date.now();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-[var(--radius-lg)] border border-line bg-bg p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base text-ink",
						children: quest.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: quest.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-faint",
						children: [
							quest.category,
							" · ",
							quest.minutes,
							" min · ",
							quest.priority,
							quest.due ? ` · due ${quest.due}` : "",
							" · ",
							quest.points,
							" CS",
							powered ? ` · ${multiplier}× until ${relativeUntil(quest.powerUntil)}` : ""
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "ghost",
					onClick: onEdit,
					children: "Edit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: onDone,
					children: "Done"
				})]
			})]
		}), quest.subtasks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 flex flex-col gap-1",
			children: quest.subtasks.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: st.done,
					onChange: () => actions.toggleSub(quest.id, st.id)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: st.done ? "line-through" : "",
					children: st.label
				})]
			}) }, st.id))
		})]
	});
}
function QuestDialog({ quest, onClose, onPower, powerCost, powerDays }) {
	const [name, setName] = (0, import_react.useState)(quest.name);
	const [description, setDescription] = (0, import_react.useState)(quest.description);
	const [points, setPoints] = (0, import_react.useState)(String(quest.points));
	const [minutes, setMinutes] = (0, import_react.useState)(String(quest.minutes));
	const [due, setDue] = (0, import_react.useState)(quest.due ?? "");
	const [priority, setPriority] = (0, import_react.useState)(quest.priority);
	const [recurring, setRecurring] = (0, import_react.useState)(quest.recurring);
	const [category, setCategory] = (0, import_react.useState)(quest.category);
	const [split, setSplit] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Edit quest",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
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
						label: "Category",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputClass,
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.label
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Points",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							inputMode: "numeric",
							value: points,
							onChange: (e) => setPoints(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Minutes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							inputMode: "numeric",
							value: minutes,
							onChange: (e) => setMinutes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Due time",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: due,
							placeholder: "4:30 pm",
							onChange: (e) => setDue(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Priority",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: inputClass,
							value: priority,
							onChange: (e) => setPriority(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "low",
									children: "Low"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "normal",
									children: "Normal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "High"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Repeats",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: inputClass,
							value: recurring,
							onChange: (e) => setRecurring(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "none",
									children: "Once"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "daily",
									children: "Daily"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "weekdays",
									children: "Weekdays"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "weekend",
									children: "Weekend"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: `${inputClass} h-20 py-2`,
								value: description,
								onChange: (e) => setDescription(e.target.value)
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => {
							actions.patchQuest(quest.id, {
								name: name.trim() || quest.name,
								description,
								points: Math.max(0, Number(points) || 0),
								minutes: Math.max(0, Number(minutes) || 0),
								due: due || void 0,
								priority,
								recurring,
								category
							}, "Edited");
							onClose();
						},
						children: "Save"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "ghost",
						onClick: () => {
							actions.patchQuest(quest.id, { status: "postponed" }, "Postponed");
							onClose();
						},
						children: "Postpone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						kind: "ghost",
						onClick: onPower,
						children: [
							"Power · ",
							powerCost,
							" CS / ",
							powerDays,
							"d"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-line pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Split into smaller quests (one per line)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inputClass} h-20 py-2`,
						value: split,
						onChange: (e) => setSplit(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-2",
					kind: "ghost",
					onClick: () => {
						actions.split(quest.id, split.split("\n"));
						onClose();
					},
					children: "Split"
				})]
			}),
			quest.history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 text-xs text-faint",
				children: quest.history.slice(0, 5).map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					h.action,
					" · ",
					new Date(h.at).toLocaleString()
				] }, i))
			})
		]
	});
}
function Compose({ onClose }) {
	const [name, setName] = (0, import_react.useState)("");
	const [points, setPoints] = (0, import_react.useState)("10");
	const [category, setCategory] = (0, import_react.useState)("intellectual");
	const [description, setDescription] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: "New quest",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: name,
						onChange: (e) => setName(e.target.value),
						autoFocus: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Why it matters",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: description,
						onChange: (e) => setDescription(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "CS",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: points,
							onChange: (e) => setPoints(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Category",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputClass,
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.label
							}, c.id))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (!name.trim()) return;
						actions.addQuest({
							name: name.trim(),
							description,
							category,
							points: Math.max(1, Number(points) || 1),
							minutes: 25,
							priority: "normal",
							recurring: "none"
						});
						onClose();
					},
					children: "Add to today"
				})
			]
		})
	});
}
function Modal({ title, children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-3 sm:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-in max-h-[88vh] w-full max-w-lg overflow-auto rounded-[var(--radius-xl)] border border-line bg-surface p-5",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "text-sm text-muted",
					onClick: onClose,
					children: "Close"
				})]
			}), children]
		})
	});
}
//#endregion
export { Modal, Home as component };
