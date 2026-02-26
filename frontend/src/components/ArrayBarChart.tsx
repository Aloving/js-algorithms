import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WIDTH = 600;
const HEIGHT = 220;
const BAR_PADDING = 4;
const COLOR = '#3b82f6';

interface ArrayBarChartProps {
  data: number[];
}

export function ArrayBarChart({ data }: ArrayBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const max = Math.max(...data, 1);
    const barWidth = (WIDTH - (data.length - 1) * BAR_PADDING) / data.length;

    const scaleY = d3.scaleLinear().domain([0, max]).range([HEIGHT - 20, 20]);

    const g = svg.append('g').attr('transform', 'translate(0, 0)');

    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (_, i) => i * (barWidth + BAR_PADDING))
      .attr('y', (d) => scaleY(d))
      .attr('width', barWidth)
      .attr('height', (d) => HEIGHT - 20 - scaleY(d))
      .attr('fill', COLOR)
      .attr('rx', 2);

    g.selectAll('text')
      .data(data)
      .join('text')
      .attr('x', (_, i) => i * (barWidth + BAR_PADDING) + barWidth / 2)
      .attr('y', HEIGHT - 4)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('fill', '#374151')
      .text((d) => d);
  }, [data]);

  if (data.length === 0) {
    return <p className="chart-empty">Нет данных</p>;
  }

  return (
    <svg
      ref={svgRef}
      width={WIDTH}
      height={HEIGHT}
      className="array-bar-chart"
      aria-label="Визуализация массива"
    />
  );
}
