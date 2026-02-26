const Graph = require('../Graph');
const GraphVertex = require('../GraphVertex');
const GraphEdge = require('../GraphEdge');

describe('Graph', () => {
  it('adds vertices and edges', () => {
    const graph = new Graph(false);
    const a = new GraphVertex('A');
    const b = new GraphVertex('B');
    const c = new GraphVertex('C');

    graph.addVertex(a).addVertex(b).addVertex(c);
    expect(graph.getAllVertices()).toHaveLength(3);

    graph.addEdge(new GraphEdge(a, b, 1));
    graph.addEdge(new GraphEdge(b, c, 2));

    expect(graph.getNeighbors(a).map((v) => v.getKey())).toEqual(['B']);
    expect(graph.getNeighbors(b).map((v) => v.getKey())).toEqual(['A', 'C']);
    expect(graph.getWeight()).toBe(3);
  });

  it('adds edge and creates vertices if not present', () => {
    const graph = new Graph(false);
    const a = new GraphVertex('A');
    const b = new GraphVertex('B');
    graph.addEdge(new GraphEdge(a, b));
    expect(graph.getVertexByKey('A')).toBe(a);
    expect(graph.getVertexByKey('B')).toBe(b);
    expect(graph.getNeighbors(a)).toContain(b);
  });

  it('directed graph adds edge only to start vertex', () => {
    const graph = new Graph(true);
    const a = new GraphVertex('A');
    const b = new GraphVertex('B');
    graph.addVertex(a).addVertex(b);
    graph.addEdge(new GraphEdge(a, b));
    expect(graph.getNeighbors(a).map((v) => v.getKey())).toEqual(['B']);
    expect(graph.getNeighbors(b)).toEqual([]);
  });
});
