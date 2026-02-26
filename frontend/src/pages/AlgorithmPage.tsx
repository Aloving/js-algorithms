import { useParams, Navigate } from 'react-router-dom';
import { getAlgorithmByPath } from '@/config/algorithms';
import { BinarySearchVisualization } from '@/components/visualizations/BinarySearchVisualization';

const VISUALIZATIONS: Record<string, React.ComponentType> = {
  'binary-search': BinarySearchVisualization,
};

export function AlgorithmPage() {
  const { '*': pathSplat } = useParams<{ '*': string }>();
  const path = pathSplat ? `/${pathSplat}` : '/';
  const algorithm = getAlgorithmByPath(path);
  const Viz = algorithm ? VISUALIZATIONS[algorithm.id] : null;

  if (!algorithm) {
    return <Navigate to="/" replace />;
  }

  if (!Viz) {
    return (
      <div className="rounded-lg border border-sidebar-border bg-card p-6">
        <h2 className="text-xl font-semibold">{algorithm.label}</h2>
        <p className="mt-2 text-muted-foreground">Визуализация для этого алгоритма пока не добавлена.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{algorithm.label}</h2>
      <Viz />
    </div>
  );
}
