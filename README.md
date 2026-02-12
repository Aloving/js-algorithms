# JS Algorithms

Практика алгоритмов и структур данных на JavaScript. Структура проекта повторяет [**trekhleb/javascript-algorithms**](https://github.com/trekhleb/javascript-algorithms) — этот репозиторий считается **основным образцом**: при создании новых файлов опирайся на него (см. также [AGENTS.md](./AGENTS.md) и правила в `.cursor/rules/`).

Задачи реализуем **поочерёдно**.

---

## Структура репозитория

```
src/
├── algorithms/     # алгоритмы по темам
│   ├── cryptography
│   ├── graph
│   ├── image-processing
│   ├── linked-list
│   ├── math
│   ├── ml
│   ├── search
│   ├── sets
│   ├── sorting
│   ├── stack
│   ├── statistics
│   ├── string
│   ├── tree
│   └── uncategorized
├── data-structures/
├── playground/
└── utils/
```

---

## Ключевые паттерны и алгоритмы

Вместо разбора сотен разрозненных задач полезно выучить **10–15 паттернов**, покрывающих большинство случаев. Ниже — шесть базовых паттернов с задачами и соответствиями разделам в [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms).

---

### 1. Two Pointers (Два указателя)

**Суть:** два индекса (часто `left` и `right`) двигаются по массиву; подходит для **отсортированных** массивов и задач «найти пару / тройку с условием».

**В репо:** явного раздела «Two Pointers» нет; идея используется в задачах на массивы и в разборе «Best Time to Buy Sell Stocks» (подход с двумя точками по времени). Классика — **Two Sum** на отсортированном массиве (два указателя с краёв).

**Задачи для практики:**
- Даны отсортированный массив и `target`. Найти два числа, сумма которых равна `target` (индексы или значения).  
  *Аналог в репо: идея как в задачах на пары; структура — `uncategorized` или отдельная папка под two-pointers.*
- Проверить, является ли строка палиндромом (игнорируя регистр и не-буквы).  
  *В репо: [string/palindrome](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/string/palindrome) — можно дополнить решением с двумя указателями.*
- Удалить дубликаты из отсортированного массива in-place (возвращать длину «уникальной» части).  
  *Идея: один указатель — «куда записываем», второй — «что просматриваем».*

---

### 2. Sliding Window (Скользящее окно)

**Суть:** подмассив или подстрока фиксированной или переменной длины; окно «едет» по данным, пересчитываем метрику (сумма, количество символов и т.д.) за O(1) при сдвиге.

**В репо:** отдельного раздела «Sliding Window» нет; логика окна встречается в задачах на подстроки и подмассивы (например, поиск подстрок, максимум в окне).

**Задачи для практики:**
- Найти максимальную сумму подмассива длины `k`.  
  *Классика sliding window по массиву.*
- Найти длину самой длинной подстроки без повторяющихся символов.  
  *Окно переменной длины + набор/счётчик символов.*
- Найти минимальную по длине подстроку, содержащую все символы строки `t` (если такая есть).  
  *Окно + счётчики символов; аналог идей — в string (substring search).*

---

### 3. Recursion & Backtracking

**Суть:** перебор вариантов с возвратом (откат выбора); обход «дерева решений»; задачи типа «найти все комбинации» или «разместить N ферзей».

**В репо:**
- [uncategorized/n-queens](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/n-queens) — N ферзей, типичный backtracking.
- [uncategorized/knight-tour](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/knight-tour) — тур коня.
- [sets/permutations](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/permutations), [sets/combinations](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/combinations), [sets/power-set](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/power-set) — перебор комбинаций и подмножеств.
- [uncategorized/hanoi-tower](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/hanoi-tower) — рекурсия.

**Задачи для практики:**
- Реализовать генерацию всех перестановок массива (без повторов).  
  *Прямая аналогия: `sets/permutations`.*
- Решить задачу N ферзей (вывести все расстановки или количество).  
  *Прямая аналогия: `uncategorized/n-queens`.*
- Все подмножества массива (power set).  
  *Прямая аналогия: `sets/power-set`.*

---

### 4. Sorting

**Суть:** понимать, как работают QuickSort и MergeSort (хотя бы в теории): деление, рекурсия, слияние / разбиение по опорному элементу.

**В репо:**
- [sorting/quick-sort](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/quick-sort) — in-place и не in-place.
- [sorting/merge-sort](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/merge-sort).

**Задачи для практики:**
- Реализовать MergeSort (разделяй-и-властвуй: делить пополам, сортировать половинки, сливать).  
  *Прямая аналогия: `sorting/merge-sort`.*
- Реализовать QuickSort (опорный элемент, разбиение, рекурсия по частям).  
  *Прямая аналогия: `sorting/quick-sort`.*
- Объяснить разницу по памяти и устойчивости между MergeSort и QuickSort (по материалам репо — в README по каждому алгоритму есть таблицы сложности).  

---

### 5. Binary Search

**Суть:** не только «найти число в отсортированном массиве», но и **поиск границы**: первый элемент ≥ X, последний < X, минимальное значение, при котором условие выполняется, и т.д.

**В репо:**
- [search/binary-search](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/search/binary-search) — классический бинарный поиск.

**Задачи для практики:**
- Классика: найти индекс элемента `target` в отсортированном массиве (или -1).  
  *Прямая аналогия: `search/binary-search`.*
- Найти индекс **первого** вхождения `target` (массив может содержать дубликаты).  
  *Тот же бинарный поиск, но условие «оставляем левую границу» при равенстве.*
- «Граничное условие»: дан отсортированный массив и число `x`; найти индекс первого элемента ≥ `x` (lower bound).  
  *Расширение идеи binary search в репо.*

---

### 6. Dynamic Programming (DP)

**Суть:** разбивать задачу на подзадачи; хранить уже посчитанные результаты (таблица или массив); часто переход от «рекурсия с повторениями» к «цикл + память».

**В репо:**
- [uncategorized/recursive-staircase](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/recursive-staircase) — количество способов подняться по лестнице (несколько решений, в т.ч. DP).
- [sets/knapsack-problem](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/knapsack-problem) — рюкзак 0/1 и unbound.
- [uncategorized/unique-paths](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/unique-paths) — число путей в сетке.
- [uncategorized/jump-game](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/uncategorized/jump-game) — есть DP-варианты.
- [sets/maximum-subarray](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/maximum-subarray) — в т.ч. Kadane (DP).

**Задачи для практики:**
- Лестница: за один шаг можно подняться на 1 или 2 ступеньки. Сколькими способами подняться на `n`-ю ступеньку?  
  *Прямая аналогия: `uncategorized/recursive-staircase`.*
- Рюкзак 0/1: веса и стоимости предметов, лимит по весу — максимизировать стоимость.  
  *Прямая аналогия: `sets/knapsack-problem`.*
- Уникальные пути: из левого верхнего в правый нижний угол сетки `m×n`, шаги только вправо/вниз.  
  *Прямая аналогия: `uncategorized/unique-paths`.*

---

## Как пользоваться репозиторием

- **Запуск тестов:** `npm test`  
- **Тесты по имени:** `npm test -- 'LinkedList'` (или другой паттерн имени).  
- **Песочница:** код в `src/playground/`, тесты — в `src/playground/__test__/`.

Рекомендуется проходить паттерны по порядку и сверять решения со структурой и описаниями в [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms).
