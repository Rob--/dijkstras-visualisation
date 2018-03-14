class Dijkstras {

  constructor(nodes) {
    this.nodes = {};

    nodes.forEach(({ id, edges }) => {
      this.nodes[id] = {
        value: Number.MAX_SAFE_INTEGER,
        done: false,
        edges,
        id,
      };
    });

    this.nodes['start'].value = 0;
    
    while(!this.allDone()) {
      let currentNode = this.getLowestValueNode();

      currentNode.edges.filter(({ node }) => !node.done).forEach(({ node, weight }) => {
        const sum = this.nodes[currentNode.id].value + weight;

        if (sum < this.nodes[node.id].value) {
          this.nodes[node.id].value = sum;
        }
      });

      this.nodes[currentNode.id].done = true;
    }
  }

  getPath() {
    let currentNode = this.nodes['finish'];
    const path = ['finish'];

    while (currentNode.id != 'start') {
      const lowestNode = currentNode.edges.sort((a, b) => {
        return this.nodes[a.node.id].value - this.nodes[b.node.id].value;
      })[0];

      path.push(lowestNode.node.id);

      // debug stuff, something is broken
      // when it crashes, the nodes' `lowest value` is Number.MAX_SAFE_INTEGER
      // so maybe the algorithm itself has a bug
      if (path.length > Object.keys(this.nodes).length) {
        console.log('Broken!');
        console.log(path);
        console.log(this.nodes);
        console.log(currentNode);
        break;
      }

      currentNode = lowestNode.node;
    }
  
    return path;
  }

  getValues() {
    return this.nodes;
  }

  allDone() {
    return Object.values(this.nodes).filter(({ done }) => !done).length == 0;
  }

  getLowestValueNode() {
    return Object.values(this.nodes)
      .filter(({ done }) => !done)
      .sort((a, b) => a.value - b.value)[0];
  }
}