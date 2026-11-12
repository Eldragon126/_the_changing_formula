import { useEffect, useState } from "react";

type Toast = { id: number; text: string };
let pushExternal: ((text: string) => void) | null = null;

export function flash(text: string) {
  pushExternal?.(text);
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    pushExternal = (text) => {
      const id = Date.now();
      setItems((prev) => [...prev.slice(-2), { id, text }]);
      window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2400);
    };
    return () => {
      pushExternal = null;
    };
  }, []);
  if (!items.length) return null;
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="sheet-in rounded-[var(--radius-md)] border border-line bg-surface-2 px-4 py-3 text-sm text-ink shadow-none"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
