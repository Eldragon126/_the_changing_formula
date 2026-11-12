import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/toast-g-kKkg4B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var pushExternal = null;
function flash(text) {
	pushExternal?.(text);
}
function Toaster() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		pushExternal = (text) => {
			const id = Date.now();
			setItems((prev) => [...prev.slice(-2), {
				id,
				text
			}]);
			window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2400);
		};
		return () => {
			pushExternal = null;
		};
	}, []);
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-2",
		children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sheet-in rounded-[var(--radius-md)] border border-line bg-surface-2 px-4 py-3 text-sm text-ink shadow-none",
			children: t.text
		}, t.id))
	});
}
//#endregion
export { flash as n, Toaster as t };
