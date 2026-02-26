/**
 * Очередь (FIFO). Используется, в частности, в BFS.
 *
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/queue
 */
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    return this.items[0];
  }
}

module.exports = Queue;
