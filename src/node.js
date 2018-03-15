class Node {

  static init(width, height, dx, dy) {
    Node.width = width;
    Node.height = height;

    Node.dx = dx;
    Node.dy = dy;
  }

  constructor(id) {
    this.x = Math.floor(Math.random() * Node.width);
    this.y = Math.floor(Math.random() * Node.height);

    this.dx = Node.dx * (Math.round(Math.random()) == 0 ? -1 : 1);
    this.dy = Node.dy * (Math.round(Math.random()) == 0 ? -1 : 1);

    this.dx *= 1 + Math.random() * 0.2;
    this.dx *= 1 + Math.random() * 0.2;

    this.id = id;

    this.edges = [];
    this.value = Number.MAX_SAFE_INTEGER;
    this.checked = false;
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  updatePosition() {
    this.x += this.dx * Node.width;
    this.y += this.dy * Node.height;

    if (this.x > Node.width || this.x < 0) {
      this.dx = -this.dx;
    }

    if (this.y > Node.height || this.y < 0) {
      this.dy = -this.dy;
    }
  }

  distance(node) {
    const dx = this.x - node.x;
    const dy = this.y - node.y;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  format() {
    const node = {
      group: 'nodes',
      data: {
        id: this.id,
        value: this.value,
      },
      renderedPosition: {
        x: this.x,
        y: this.y,
      },
    };

    const edges = this.edges.map(({ node, weight }) => ({
      group: 'edges',
      data: {
        source: this.id,
        target: node.id,
        weight: weight,
        id: `${this.id}${node.id}`,
      },
    }));

    return [node, ...edges];
  }

}

export default Node;
