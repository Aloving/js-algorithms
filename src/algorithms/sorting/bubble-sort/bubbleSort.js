/**
 * Сортировка пузырьком (Bubble Sort).
 * Проходы по массиву, обмен соседних элементов при неверном порядке.
 * Оптимизация: выход, если за проход не было обменов.
 *
 * Сложность: O(n²), лучший случай O(n) при уже отсортированном массиве.
 * Память: O(1). Устойчивая.
 *
 * @param {*[]} array — массив для сортировки (не мутируется)
 * @param {function(a, b): number} [comparatorCallback] — (a, b) => a - b или 0/±1
 * @returns {*[]} — новый отсортированный массив
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/bubble-sort
 */
function bubbleSort(array, comparatorCallback) {
  const compare = comparatorCallback || defaultCompare;
  const result = [...array];

  for (let i = 1; i < result.length; i += 1) {
    let swapped = false;

    for (let j = 0; j < result.length - i; j += 1) {
      if (compare(result[j + 1], result[j]) < 0) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return result;
}

function defaultCompare(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

module.exports = bubbleSort;
