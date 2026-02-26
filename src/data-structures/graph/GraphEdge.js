/**
 * Ребро графа: связь между двумя вершинами, опциональный вес.
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph
 */
class GraphEdge {
/**
 * @param {GraphVertex} startVertex
 * @param {GraphVertex} endVertex
   * @param {number} [weight=0]
   * @param {string|null} [key=null]
   */
  constructor(startVertex, endVertex, weight = 0, key = null) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
    this.key = key;
  }

  getKey() {
    if (this.key) return this.key;
    const startKey = this.startVertex.getKey();
    const endKey = this.endVertex.getKey();
    this.key = `${startKey}_${endKey}`;
    return this.key;
  }

  reverse() {
    [this.startVertex, this.endVertex] = [this.endVertex, this.startVertex];
    return this;
  }
}

module.exports = GraphEdge;
