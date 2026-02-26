import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';

const DEFAULT_ARRAY = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const WIDTH = 640;
const CELL_HEIGHT = 44;
const PADDING = 24;
const SVG_HEIGHT = CELL_HEIGHT * 2 + PADDING * 2 + 20;

type CellRole = 'default' | 'left' | 'mid' | 'right' | 'found';

function binarySearchSteps(arr: number[], target: number): { index: number; left: number; mid: number; right: number }[] {
  const steps: { index: number; left: number; mid: number; right: number }[] = [];
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const value = arr[mid];
    steps.push({ index: mid, left, mid, right });
    if (value !== undefined && value === target) return steps;
    if (value !== undefined && value < target) left = mid + 1;
    else right = mid - 1;
  }
  return steps;
}

export function BinarySearchVisualization() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [array] = useState<number[]>(() => [...DEFAULT_ARRAY]);
  const [target, setTarget] = useState<number>(9);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const steps = binarySearchSteps(array, target);
  const currentStep = steps[stepIndex] ?? null;
  const found = currentStep && array[currentStep.mid] === target;

  const getRole = useCallback(
    (i: number): CellRole => {
      if (!currentStep) return 'default';
      if (array[currentStep.mid] === target && currentStep.mid === i) return 'found';
      if (i === currentStep.left) return 'left';
      if (i === currentStep.mid) return 'mid';
      if (i === currentStep.right) return 'right';
      return 'default';
    },
    [currentStep, array, target]
  );

  useEffect(() => {
    if (steps.length === 0) {
      setResult(`Элемент ${target} не найден`);
      return;
    }
    if (found && currentStep) {
      setResult(`Найден на индексе ${currentStep.mid}`);
      return;
    }
    setResult(null);
  }, [steps.length, found, currentStep, target]);

  useEffect(() => {
    if (!svgRef.current || array.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const cellWidth = (WIDTH - PADDING * 2) / array.length;

    const colors: Record<CellRole, string> = {
      default: 'hsl(var(--sidebar-border))',
      left: '#3b82f6',
      mid: '#eab308',
      right: '#22c55e',
      found: '#22c55e',
    };

    const g = svg.append('g').attr('transform', `translate(${PADDING}, ${PADDING})`);

    array.forEach((value, i) => {
      const role = getRole(i);
      const x = i * cellWidth;
      const y = 0;

      g.append('rect')
        .attr('x', x + 2)
        .attr('y', y)
        .attr('width', cellWidth - 4)
        .attr('height', CELL_HEIGHT - 4)
        .attr('rx', 6)
        .attr('fill', colors[role])
        .attr('stroke', role !== 'default' ? 'hsl(var(--foreground))' : 'none')
        .attr('stroke-width', 2);

      g.append('text')
        .attr('x', x + cellWidth / 2)
        .attr('y', y + CELL_HEIGHT / 2 - 6)
        .attr('text-anchor', 'middle')
        .attr('font-size', 14)
        .attr('font-weight', '600')
        .attr('fill', role === 'default' ? 'hsl(var(--foreground))' : 'white')
        .text(value);

      g.append('text')
        .attr('x', x + cellWidth / 2)
        .attr('y', y + CELL_HEIGHT / 2 + 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
        .attr('fill', role === 'default' ? 'hsl(var(--foreground))' : 'white')
        .attr('opacity', 0.9)
        .text(`i=${i}`);
    });

    const legendY = CELL_HEIGHT + 16;
    const legend = [
      { label: 'left', color: colors.left },
      { label: 'mid', color: colors.mid },
      { label: 'right', color: colors.right },
    ];
    legend.forEach((item, i) => {
      g.append('rect')
        .attr('x', i * 100)
        .attr('y', legendY)
        .attr('width', 12)
        .attr('height', 12)
        .attr('rx', 2)
        .attr('fill', item.color);
      g.append('text')
        .attr('x', i * 100 + 18)
        .attr('y', legendY + 10)
        .attr('font-size', 12)
        .attr('fill', 'hsl(var(--foreground))')
        .text(item.label);
    });
  }, [array, getRole, currentStep]);

  const goNext = useCallback(() => {
    const last = steps[steps.length - 1];
    if (stepIndex < steps.length - 1) setStepIndex((s) => s + 1);
    else if (steps.length > 0 && last && array[last.mid] === target) setPlaying(false);
  }, [stepIndex, steps, array, target]);

  const goPrev = useCallback(() => {
    if (stepIndex > 0) setStepIndex((s) => s - 1);
  }, [stepIndex]);

  const reset = useCallback(() => {
    setStepIndex(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(goNext, 800);
    return () => clearInterval(id);
  }, [playing, goNext]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-sidebar-border bg-card p-4 shadow-sm">
        <p className="mb-3 text-sm text-muted-foreground">
          Отсортированный массив. Введите целевое значение и пошагово проследите за бинарным поиском (left, mid, right).
        </p>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            Цель:
            <input
              type="number"
              value={target}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v)) setTarget(v);
              }}
              onKeyDown={(e) => e.key === 'Enter' && reset()}
              className="w-20 rounded-md border border-sidebar-border bg-background px-2 py-1.5 text-sm"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={stepIndex === 0}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                stepIndex === 0
                  ? 'cursor-not-allowed bg-sidebar-accent text-sidebar-foreground/50'
                  : 'bg-sidebar-accent hover:bg-sidebar-accent/80'
              )}
            >
              ← Назад
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={stepIndex >= steps.length - 1 && result != null}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                stepIndex >= steps.length - 1 && result != null
                  ? 'cursor-not-allowed bg-sidebar-accent text-sidebar-foreground/50'
                  : 'bg-sidebar-accent hover:bg-sidebar-accent/80'
              )}
            >
              Вперёд →
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              disabled={stepIndex >= steps.length - 1 && result != null}
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {playing ? 'Стоп' : 'Старт'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-md border border-sidebar-border px-3 py-1.5 text-sm font-medium hover:bg-sidebar-accent"
            >
              Сброс
            </button>
          </div>
        </div>
        {result && (
          <p className="mb-3 text-sm font-medium text-green-600 dark:text-green-400">{result}</p>
        )}
        <svg ref={svgRef} width={WIDTH} height={SVG_HEIGHT} className="overflow-visible" />
      </div>
    </div>
  );
}
