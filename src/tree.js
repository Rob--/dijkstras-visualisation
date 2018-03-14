class Tree {
  
  constructor(width, height, NODE_COUNT = 15, EDGE_COUNT = 5, dx = 0.00075, dy = 0.00075) {
    this.width = width;
    this.height = height;

    this.dx = dx * width;
    this.dy = dy * height;

    Node.init(width, height, dx, dy);

    this.NODE_COUNT = NODE_COUNT;
    this.EDGE_COUNT = EDGE_COUNT;

    this.nodes = [];

    this.distanceThreshold = 0.2;
    this.id = 0;
  }

  updatePositions() {
    this.nodes.forEach(node => node.updatePosition());
    this.generateEdges();

    const dijkstras = new Dijkstras(this.nodes);
    const values = dijkstras.getValues();
    
    this.nodes.forEach(node => {
      node.value = values[node.id].value;
    });

    return dijkstras.getPath();
  }

  generateTree() {
    this.generateNodes();
    this.generateEdges();
  }

  generateNodes() {
    for (let i = 0; i < this.NODE_COUNT; i++) {
      let id = `node-${i}`;

      if (i == 0) {
        id = 'start';
      }

      if (i == this.NODE_COUNT - 1) {
        id = 'finish';
      }

      const node = new Node(id);
      this.nodes.push(node);
    }
  }

  generateEdges() {
    for (let i = 0; i < this.nodes.length; i++) {
      const source = this.nodes[i];

      source.edges = [];

      const distances = [];
      for (let j = 0; j < this.nodes.length; j++) {
        if (i == j) {
          continue;
        }
        
        distances.push({
          index: j,
          distance: source.distance(this.nodes[j]),
        });
      }

      // sort nodes by closest to current node, slice to get only the closest EDGE_COUNT number of edges
      distances.sort((a, b) => a.distance - b.distance).slice(0, this.EDGE_COUNT).forEach(({ index, distance }) => {
        source.addEdge(new Edge(this.nodes[index], Math.round(distance)));
      });
    }
  }

  format() {
    return this.nodes
      .map(e => e.format())
      .reduce((result, current) => [...result, ...current], []);
  }

}