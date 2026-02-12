# Bubble Sort (Сортировка пузырьком)

Простой алгоритм: многократные проходы по массиву, сравнение соседних элементов и обмен при неверном порядке. Проходы повторяются, пока за проход не будет ни одного обмена (массив отсортирован).

| Сложность | Лучший | Средний | Худший | Память | Устойчивость |
|-----------|--------|---------|--------|--------|--------------|
| **Bubble sort** | O(n) | O(n²) | O(n²) | O(1) | Да |

- [Wikipedia](https://en.wikipedia.org/wiki/Bubble_sort)
- Референс: [trekhleb/javascript-algorithms — bubble-sort](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/bubble-sort)

## Использование

```js
const bubbleSort = require('./bubbleSort');

bubbleSort([3, 1, 4, 1, 5]);        // [1, 1, 3, 4, 5]
bubbleSort([5, 4, 3, 2, 1]);        // [1, 2, 3, 4, 5]
bubbleSort([1]);                     // [1]
bubbleSort([]);                      // []
```

Исходный массив не изменяется — возвращается новый.
