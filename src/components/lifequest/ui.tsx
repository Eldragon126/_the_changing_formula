import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`rounded-[var(--radius-xl)] border border-line bg-surface p-4 sm:p-5 ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-faint">{children}</p>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-muted">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "h-11 w-full rounded-[var(--radius-sm)] border border-line bg-bg px-3 text-sm text-ink outline-none focus:border-accent";

export function Btn({
  children,
  onClick,
  kind = "solid",
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: "solid" | "ghost" | "quiet";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const look =
    kind === "solid"
      ? "bg-accent text-accent-ink hover:brightness-110"
      : kind === "ghost"
        ? "border border-line bg-surface-2 text-ink hover:border-accent"
        : "text-muted hover:text-ink";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`press inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-4 text-sm font-medium disabled:opacity-40 ${look} ${className}`}
    >
      {children}
    </button>
  );
}
