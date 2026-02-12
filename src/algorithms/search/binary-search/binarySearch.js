/**
 * Бинарный поиск в отсортированном массиве.
 * Сложность: O(log n).
 *
 * @param {*[]} sortedArray — отсортированный массив
 * @param {*} seekElement — искомый элемент
 * @param {function(a, b): number} [comparatorCallback] — опционально: (a, b) => a - b или 0/±1 для объектов
 * @returns {number} — индекс элемента или -1
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/search/binary-search
 */
function binarySearch(sortedArray, seekElement, comparatorCallback) {
  const compare = comparatorCallback || defaultCompare;

  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    const cmp = compare(sortedArray[middleIndex], seekElement);

    if (cmp === 0) {
      return middleIndex;
    }
    if (cmp < 0) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
}

function defaultCompare(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

module.exports = binarySearch;
