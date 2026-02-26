# Graph (Граф)

Структура данных: вершины (vertices) и рёбра (edges) между ними. Поддерживаются ориентированный и неориентированный графы, взвешенные рёбра.

- **GraphVertex** — вершина с значением и списком рёбер.
- **GraphEdge** — ребро (startVertex, endVertex, weight).
- **Graph** — контейнер вершин и рёбер, методы addVertex, addEdge, getNeighbors и др.

[trekhleb/javascript-algorithms — graph](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph)

## Использование

```js
const Graph = require('./Graph');
const GraphVertex = require('./GraphVertex');
const GraphEdge = require('./GraphEdge');

const graph = new Graph(false); // неориентированный
const a = new GraphVertex('A');
const b = new GraphVertex('B');
const c = new GraphVertex('C');
graph.addVertex(a).addVertex(b).addVertex(c);
graph.addEdge(new GraphEdge(a, b, 1));
graph.addEdge(new GraphEdge(b, c, 2));
graph.getNeighbors(a); // [b]
```
