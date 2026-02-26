const Graph = require('../../../../data-structures/graph/Graph');
const GraphVertex = require('../../../../data-structures/graph/GraphVertex');
const GraphEdge = require('../../../../data-structures/graph/GraphEdge');
const depthFirstSearch = require('../depthFirstSearch');

describe('depthFirstSearch', () => {
  it('traverses in DFS order and calls enterVertex', () => {
    const graph = new Graph(false);
    const a = new GraphVertex('A');
    const b = new GraphVertex('B');
    const c = new GraphVertex('C');
    const d = new GraphVertex('D');
    graph.addVertex(a).addVertex(b).addVertex(c).addVertex(d);
    graph.addEdge(new GraphEdge(a, b));
    graph.addEdge(new GraphEdge(a, c));
    graph.addEdge(new GraphEdge(b, d));

    const order = [];
    depthFirstSearch(graph, a, {
      enterVertex: ({ currentVertex }) => order.push(currentVertex.getKey()),
    });
    expect(order).toEqual(['A', 'B', 'D', 'C']);
  });
});
