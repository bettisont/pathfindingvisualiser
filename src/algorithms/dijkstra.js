export function dijkstra(grid, startNode, endNode) {
  startNode.distance = 0;

  // array of distances from source node s to all nodes in the graph
  const nodes = getNotVisitedNodes(grid);

  const visitedNodes = [];
  while (nodes.length > 0) {
    const nodes = getNotVisitedNodes(grid);
    const sortedNodes = sortNodes(nodes);

    const currentNode = sortedNodes[0];

    if (currentNode.distance === Infinity) {
      return visitedNodes;
    }

    if (currentNode === endNode) {
      endNode.isVisited = true;
      visitedNodes.push(currentNode);
      return visitedNodes;
    }

    currentNode.isVisited = true;

    visitedNodes.push(currentNode);

    const neighbours = getNeighbours(grid, currentNode);

    updateNeighbours(neighbours, currentNode);
  }
}

// RETURN array of visited nodes in the order that we visited them (when we reach the finish node)

const getNotVisitedNodes = (grid) => {
  const nodesToReturn = [];
  for (let x = 0; x < grid.length; x++) {
    const row = grid[x];
    for (let y = 0; y < row.length; y++) {
      const element = row[y];
      if (!element.isVisited && !element.isWall) {
        nodesToReturn.push(element);
      }
    }
  }
  return nodesToReturn;
};

const sortNodes = (nodes) => {
  nodes.sort(function (a, b) {
    return a.distance - b.distance;
  });
  return nodes;
};

function getNeighbours(grid, currentNode) {
  const neighbours = [];
  const { row, col } = currentNode;
  if (row > 0) neighbours.push(grid[row - 1][col]); //top
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]); //below
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
}

function updateNeighbours(neighbours, currentNode) {
  neighbours.forEach((element) => {
    element.distance = currentNode.distance + 1;
    element.previousNode = currentNode;
  });
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPath = [];
  let currentNode = finishNode;
  console.log(finishNode);
  while (currentNode !== null) {
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPath;
}
