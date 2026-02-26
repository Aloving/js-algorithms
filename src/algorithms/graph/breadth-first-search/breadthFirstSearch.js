/**
 * Поиск в ширину (BFS) по графу. Обход от startVertex с использованием очереди.
 *
 * @param {import('../../../data-structures/graph/Graph')} graph
 * @param {import('../../../data-structures/graph/GraphVertex')} startVertex
 * @param {Object} [callbacks]
 * @param {function(Object): boolean} [callbacks.allowTraversal]
 * @param {function(Object): void} [callbacks.enterVertex]
 * @param {function(Object): void} [callbacks.leaveVertex]
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/breadth-first-search
 */
const Queue = require('../../../data-structures/queue/Queue');

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

function breadthFirstSearch(graph, startVertex, originalCallbacks = {}) {
  const callbacks = initCallbacks(startVertex, originalCallbacks);
  const vertexQueue = new Queue();
  vertexQueue.enqueue(startVertex);
  let previousVertex = null;

  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();
    callbacks.enterVertex({ currentVertex, previousVertex });

    graph.getNeighbors(currentVertex).forEach((nextVertex) => {
      if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
        vertexQueue.enqueue(nextVertex);
      }
    });

    callbacks.leaveVertex({ currentVertex, previousVertex });
    previousVertex = currentVertex;
  }
}

module.exports = breadthFirstSearch;
