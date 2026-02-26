import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALGORITHM_GROUPS } from '@/config/algorithms';

const SIDEBAR_WIDTH = '16rem';

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full" style={{ ['--sidebar-width' as string]: SIDEBAR_WIDTH }}>
      {children}
    </div>
  );
}

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 h-svh w-[var(--sidebar-width)] border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-200 md:translate-x-0',
        className
      )}
      data-sidebar="sidebar"
    >
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4 shrink-0">
        <PanelLeft className="size-5 text-sidebar-primary" />
        <span className="font-semibold text-sidebar-foreground">Алгоритмы</span>
      </div>
      <nav className="flex-1 overflow-auto py-2">
        {ALGORITHM_GROUPS.map((group) => (
          <div key={group.id} className="px-2 pb-2">
            <div className="mb-1 px-2 py-1 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        isActive && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                      )
                    }
                  >
                    <Search className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function SidebarInset({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={cn('flex-1 flex flex-col min-h-screen md:pl-[var(--sidebar-width)]', className)}>
      {children}
    </main>
  );
}

export function SidebarTrigger({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-md hover:bg-sidebar-accent md:hidden"
      aria-label="Открыть меню"
    >
      <PanelLeft className="size-4" />
    </button>
  );
}
