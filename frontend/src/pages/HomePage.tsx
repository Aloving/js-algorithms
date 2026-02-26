import { Link } from 'react-router-dom';
import { ALGORITHM_GROUPS } from '@/config/algorithms';
import { Search } from 'lucide-react';

export function HomePage() {
  const firstPath = ALGORITHM_GROUPS[0]?.items[0]?.path;

  return (
    <div className="rounded-lg border border-sidebar-border bg-card p-6">
      <h2 className="text-xl font-semibold">Визуализация алгоритмов</h2>
      <p className="mt-2 text-muted-foreground">
        Выберите алгоритм в боковой панели или перейдите к первому доступному.
      </p>
      {firstPath && (
        <Link
          to={firstPath}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-sidebar-accent px-4 py-2 text-sm font-medium text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
        >
          <Search className="size-4" />
          Binary Search
        </Link>
      )}
    </div>
  );
}
