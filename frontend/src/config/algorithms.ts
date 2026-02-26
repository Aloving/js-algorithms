/**
 * Список алгоритмов по группам для сайдбара.
 * Пополняется по мере добавления визуализаций.
 */
export interface AlgorithmItem {
  id: string;
  label: string;
  path: string;
}

export interface AlgorithmGroup {
  id: string;
  label: string;
  items: AlgorithmItem[];
}

export const ALGORITHM_GROUPS: AlgorithmGroup[] = [
  {
    id: 'search',
    label: 'Поиск',
    items: [
      { id: 'binary-search', label: 'Binary Search', path: '/search/binary-search' },
    ],
  },
  {
    id: 'sorting',
    label: 'Сортировка',
    items: [
      // { id: 'bubble-sort', label: 'Bubble Sort', path: '/sorting/bubble-sort' },
    ],
  },
  {
    id: 'graphs',
    label: 'Графы',
    items: [
      // { id: 'dfs', label: 'DFS', path: '/graphs/dfs' },
    ],
  },
];

export function getAlgorithmByPath(path: string): AlgorithmItem | undefined {
  for (const group of ALGORITHM_GROUPS) {
    const found = group.items.find((item) => item.path === path);
    if (found) return found;
  }
  return undefined;
}
