/**
 * Граф: набор вершин и рёбер. Поддержка ориентированного и неориентированного варианта.
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph
 */
class Graph {
  /**
   * @param {boolean} [isDirected=false]
   */
  constructor(isDirected = false) {
    this.vertices = Object.create(null);
    this.edges = Object.create(null);
    this.isDirected = isDirected;
  }

  /**
   * @param {import('./GraphVertex')} newVertex
   * @returns {Graph}
   */
  addVertex(newVertex) {
    const key = newVertex.getKey();
    if (this.vertices[key] != null) {
      throw new Error('Vertex has already been added before');
    }
    this.vertices[key] = newVertex;
    return this;
  }

  /**
   * @param {*} vertexKey
   * @returns {import('./GraphVertex')|undefined}
   */
  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey];
  }

  /**
   * @param {import('./GraphVertex')} vertex
   * @returns {import('./GraphVertex')[]}
   */
  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  /** @returns {import('./GraphVertex')[]} */
  getAllVertices() {
    return Object.values(this.vertices);
  }

  /** @returns {import('./GraphEdge')[]} */
  getAllEdges() {
    return Object.values(this.edges);
  }

  /**
   * @param {import('./GraphEdge')} edge
   * @returns {Graph}
   */
  addEdge(edge) {
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    const edgeKey = edge.getKey();
    if (this.edges[edgeKey]) {
      throw new Error('Edge has already been added before');
    }
    this.edges[edgeKey] = edge;

    if (this.isDirected) {
      startVertex.addEdge(edge);
    } else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }
    return this;
  }

  /**
   * @param {import('./GraphEdge')} edge
   */
  deleteEdge(edge) {
    const key = edge.getKey();
    if (!this.edges[key]) {
      throw new Error('Edge not found in graph');
    }
    delete this.edges[key];
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());
    if (startVertex) startVertex.deleteEdge(edge);
    if (endVertex) endVertex.deleteEdge(edge);
  }

  /**
   * @param {import('./GraphVertex')} startVertex
   * @param {import('./GraphVertex')} endVertex
   * @returns {import('./GraphEdge')|null}
   */
  findEdge(startVertex, endVertex) {
    const v = this.getVertexByKey(startVertex.getKey());
    return v ? v.findEdge(endVertex) : null;
  }

  getWeight() {
    return this.getAllEdges().reduce((sum, e) => sum + e.weight, 0);
  }
}

module.exports = Graph;
