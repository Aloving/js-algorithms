/**
 * Поиск в глубину (DFS) по графу. Обход от startVertex с вызовом callbacks.
 *
 * @param {import('../../../data-structures/graph/Graph')} graph
 * @param {import('../../../data-structures/graph/GraphVertex')} startVertex
 * @param {Object} [callbacks]
 * @param {function(Object): boolean} [callbacks.allowTraversal] — разрешить переход к nextVertex
 * @param {function(Object): void} [callbacks.enterVertex] — вход в вершину
 * @param {function(Object): void} [callbacks.leaveVertex] — выход из вершины
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/depth-first-search
 */
function initCallbacks(startVertex, callbacks = {}) {
  const seen = Object.create(null);
  seen[startVertex.getKey()] = true;
  return {
    allowTraversal: callbacks.allowTraversal || (({ nextVertex }) => {
      const key = nextVertex.getKey();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    }),
    enterVertex: callbacks.enterVertex || (() => {}),
    leaveVertex: callbacks.leaveVertex || (() => {}),
  };
}

function depthFirstSearchRecursive(graph, currentVertex, previousVertex, callbacks) {
  callbacks.enterVertex({ currentVertex, previousVertex });

  graph.getNeighbors(currentVertex).forEach((nextVertex) => {
    if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertex({ currentVertex, previousVertex });
}

function depthFirstSearch(graph, startVertex, callbacks = {}) {
  const cbs = initCallbacks(startVertex, callbacks);
  depthFirstSearchRecursive(graph, startVertex, null, cbs);
}

module.exports = depthFirstSearch;
