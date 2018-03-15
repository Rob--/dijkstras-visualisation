class Dijkstras {

  constructor(nodes) {
    this.nodes = {};

    nodes.forEach(({ id }, index) => {
      nodes[index].value = Number.MAX_SAFE_INTEGER;
      nodes[index].checked = false;
      this.nodes[id] = nodes[index];
    });

    this.nodes['start'].value = 0;
    
    while(!this.allChecked()) {
      let currentNode = this.getLowestValueNode();

      currentNode.edges.filter(({ node }) => !node.checked).forEach(({ node, weight }) => {
        const sum = currentNode.value + weight;

        if (sum < node.value) {
          node.value = sum;
        }
      });

      currentNode.checked = true;
    }
  }

  getPath() {
    let currentNode = this.nodes['finish'];
    const path = ['finish'];

    do {
      const lowestNode = currentNode.edges.sort((a, b) => {
        return this.nodes[a.node.id].value - this.nodes[b.node.id].value;
      })[0];

      path.push(lowestNode.node.id);

      currentNode = this.nodes[lowestNode.node.id];
    } while (currentNode.id != 'start')
  
    return path;
  }

  getValues() {
    return this.nodes;
  }

  allChecked() {
    return Object.values(this.nodes).filter(({ checked }) => !checked).length == 0;
  }

  getLowestValueNode() {
    return Object.values(this.nodes)
      .filter(({ checked }) => !checked)
      .sort((a, b) => a.value - b.value)[0];
  }
}

export default Dijkstras;
