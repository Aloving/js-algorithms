import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from './Header';

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarProvider>
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      {/* Sidebar: on mobile slides in/out */}
      <Sidebar
        className={cn(
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
        onNavigate={() => setMobileOpen(false)}
      />
      <SidebarInset>
        <Header onMenuClick={() => setMobileOpen(true)} />
        <div className="flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
