let NODE_COUNT = 15;
let EDGE_COUNT = 5;

let tree;
let paused = false;

(window.regen = function() {
  tree = new Tree(window.innerWidth, window.innerHeight, NODE_COUNT, EDGE_COUNT);
  tree.generateTree();
}());

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

function main() {
  // clear the tree
  cy.$('').remove();

  // update each node's position based on velocity
  // and return dijkstra's path
  const path = tree.updatePositions();
  
  // display the tree
  cy.add(tree.format());

  for (let i = 0; i < path.length - 1; i++) {
    // select edge connecting two nodes,
    // edge id is made up as: [node 1 id][node 2 id],
    // select both `[node 1 id][node 2 id]` and `[node 2 id][node 1 id]`
    // due to the way edges are added
    cy.$(`#${path[i]}${path[i + 1]}`).select();
    cy.$(`#${path[i + 1]}${path[i]}`).select();

    // select the node
    cy.$(`#${path[i + 1]}`).select();
  }
}

let interval = setInterval(main, 50);

$('#interval').change(function() {
  $('#i').text($(this).val());
  clearInterval(interval);
  interval = setInterval(main, $(this).val());
});

$('#nodes').change(function() {
  $('#n').text($(this).val());
  NODE_COUNT = $(this).val();
  regen()
});

$('#edges').change(function() {
  $('#e').text($(this).val());
  EDGE_COUNT = $(this).val();
  regen()
});

$('#pause').click(function() {
  paused = !paused;

  if (paused) {
    clearInterval(interval);
  } else  {
    interval = setInterval(main, $('#interval').val());
  }
});