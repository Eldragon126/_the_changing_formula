import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, CalendarDays, LayoutDashboard, Settings, Store, Vault } from "lucide-react";
import type { ReactNode } from "react";
import { useEconomy } from "@/lib/lifequest/store";
import { formatCs } from "@/lib/lifequest/engine";

const NAV = [
  { to: "/", label: "Today", icon: LayoutDashboard },
  { to: "/formula", label: "Formula", icon: BookOpen },
  { to: "/ledger", label: "Ledger", icon: CalendarDays },
  { to: "/shop", label: "Shop", icon: Store },
  { to: "/vault", label: "Vault", icon: Vault },
  { to: "/settings", label: "Rules", icon: Settings },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const { economy, ready } = useEconomy();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const name = economy.settings.appName || "LifeQuest";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-28 pt-5 sm:px-6 lg:pb-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-faint">{name}</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-ink">
            {ready ? `${formatCs(economy.cs)} CS` : "—"}
            <span className="ml-3 text-base text-muted">{ready ? `${economy.cg} CG` : ""}</span>
          </p>
        </div>
        <p className="hidden text-right text-sm text-muted sm:block">
          Silver stays on this device.
          <br />
          Nothing is sent anywhere.
        </p>
      </header>
      <div className="flex flex-1 flex-col gap-5 lg:flex-row">
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-2 py-2 backdrop-blur lg:static lg:z-auto lg:w-44 lg:shrink-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <ul className="grid grid-cols-6 gap-1 lg:grid-cols-1">
            {NAV.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`press flex h-12 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-md)] text-[11px] lg:h-11 lg:flex-row lg:justify-start lg:gap-2 lg:px-3 lg:text-sm ${
                      active ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
