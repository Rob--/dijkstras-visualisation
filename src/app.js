const tree = new Tree(window.innerWidth, window.innerHeight);
tree.generateTree();

const cy = cytoscape({
  container: document.getElementById('canvas'),

  style: cytoscape.stylesheet()
    .selector('node').css({ 'content': 'data(value)' })
    .selector('edge').css({ 'content': 'data(weight)' })
    .selector('#start').css({ 'background-color': '#00C853' })
    .selector('#finish').css({ 'background-color': '#DD2C00' }),

  elements: tree.format(),

  layout: {
    name: 'preset',
  }
});

setInterval(() => {
  // clear the tree
  cy.$('').remove();

  // update each node's position based on velocity
  // and return dijkstra's path
  const path = tree.updatePositions();
  
  // display the tree
  cy.add(tree.format());

  for (let i = 0; i < path.length - 1; i++) {
    // select edge connecting two nodes
    cy.$(`#${path[i]}${path[i + 1]}`).select();

    // select the node
    cy.$(`#${path[i + 1]}`).select();
  }
}, 40);