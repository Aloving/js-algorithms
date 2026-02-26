/**
 * Вершина графа: значение и список рёбер (массив).
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph
 */
class GraphVertex {
  /**
   * @param {*} value — ключ/значение вершины (строка, число и т.д.)
   */
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }
    this.value = value;
    this.edges = [];
  }

  /**
   * @param {import('./GraphEdge')} edge
   * @returns {GraphVertex}
   */
  addEdge(edge) {
    this.edges.push(edge);
    return this;
  }

  /**
   * @param {import('./GraphEdge')} edge
   */
  deleteEdge(edge) {
    const idx = this.edges.indexOf(edge);
    if (idx !== -1) this.edges.splice(idx, 1);
  }

  /** @returns {import('./GraphVertex').GraphVertex[]} */
  getNeighbors() {
    return this.edges.map((edge) =>
      edge.startVertex === this ? edge.endVertex : edge.startVertex
    );
  }

  /** @returns {import('./GraphEdge')[]} */
  getEdges() {
    return [...this.edges];
  }

  getDegree() {
    return this.edges.length;
  }

  /**
   * @param {import('./GraphVertex').GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor(vertex) {
    return this.edges.some(
      (e) => e.startVertex === vertex || e.endVertex === vertex
    );
  }

  /**
   * @param {import('./GraphVertex').GraphVertex} vertex
   * @returns {import('./GraphEdge')|null}
   */
  findEdge(vertex) {
    return this.edges.find(
      (e) => e.startVertex === vertex || e.endVertex === vertex
    ) || null;
  }

  getKey() {
    return this.value;
  }

  deleteAllEdges() {
    this.getEdges().forEach((edge) => this.deleteEdge(edge));
    return this;
  }
}

module.exports = GraphVertex;
