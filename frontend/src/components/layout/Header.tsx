import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-sidebar-border bg-background px-4">
      <SidebarTrigger onClick={onMenuClick} />
      <h1 className="text-lg font-semibold text-foreground">JS Algorithms</h1>
    </header>
  );
}
