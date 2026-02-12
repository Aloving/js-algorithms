# Binary Search (Бинарный поиск)

Поиск позиции элемента в **отсортированном** массиве: сравнение с серединой, отбрасывание половины, повтор. Сложность **O(log n)**.

- [Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- Референс: [trekhleb/javascript-algorithms — binary-search](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/search/binary-search)

## Использование

```js
const binarySearch = require('./binarySearch');

binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 17); // 5
binarySearch([1, 5, 10, 12], 7);                   // -1
```

С кастомным компаратором (например, для объектов):

```js
const byKey = (a, b) => (a.key === b.key ? 0 : a.key < b.key ? -1 : 1);
binarySearch(sortedArrayOfObjects, { key: 2 }, byKey);
```
