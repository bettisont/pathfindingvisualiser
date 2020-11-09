export function aStar(grid, startNode, finishNode) {
  //let nodes = getNotVisitedNodes(grid);
  let openList = [];
  let closedList = [];
  startNode.distance = 0;
  // put starting node in openList
  openList.push(startNode);
  // while openList is not empty

  while (openList.length > 0) {
    // get node with the least f (distance + euclidian distance) in the openList
    console.log(openList);
    const sortedOpenList = sortByHeuristic(openList);
    const currentNode = sortedOpenList[0];
    console.log(currentNode);
    openList.shift();
    // console.log(currentNode);
    // FOREACH neighbour of currentnNode //
    const neighbours = getNeighbours(grid, currentNode);

    for (let index = 0; index < neighbours.length; index++) {
      const neighbour = neighbours[index];
      // IF neighbour is goal: Stop search
      if (neighbour === finishNode) {
        closedList.push(currentNode, finishNode);
        return closedList;
      }
      // update neighbour.previousNode to be the currentNode
      neighbour.previousNode = currentNode;
      // neighbour.distance = currentNode.distance + 1
      neighbour.distance = currentNode.distance + 1;
      // neighbour.heuristic = neigbour.distance + neighbour.euclidianDistanceToGoal
      neighbour.heuristic =
        Math.abs(neighbour.col - finishNode.col) +
        Math.abs(neighbour.row - finishNode.col);
      let a = false;
      let b = false;
      openList.forEach((element) => {
        if (
          element.row === neighbour.row &&
          element.col === element.col &&
          element.heuristic < neighbour.heuristic
        ) {
          a = true;
        }
      });
      closedList.forEach((element) => {
        if (
          element.row === neighbour.row &&
          element.col === element.col &&
          element.heuristic < neighbour.heuristic
        ) {
          b = true;
        }
      });
      // IF neighbour is already in openList with a LOWER heuristic: SKIP this neighbour
      if (a) {
        continue;
      }
      // ELIF neighbour is in closedList with a LOWER heuristic: SKIP this neighbour
      else if (b) {
        continue;
      }
      // ELSE add this neighbour to the openList
      else {
        openList.push(neighbour);
      }
      // END FOREACH
    }
    // add currentNode to the closedList
    closedList.push(currentNode);
  }
}

const sortByHeuristic = (openList) => {
  openList.sort(function (a, b) {
    return a.heuristic - b.heuristic;
  });
  return openList;
};

function getNeighbours(grid, currentNode) {
  const neighbours = [];
  const { row, col } = currentNode;
  if (row > 0) neighbours.push(grid[row - 1][col]); //top
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]); //below
  if (col > 0) neighbours.push(grid[row][col - 1]); //left
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]); // right

  if (row > 0 && col > 0) neighbours.push(grid[row - 1][col - 1]); // top left
  if (col > 0 && row < grid.length - 1) neighbours.push(grid[row + 1][col - 1]); // bottom left
  if (col < grid[0].length - 1 && row < grid.length - 1)
    neighbours.push(grid[row + 1][col + 1]); // bottom right
  if (col < grid[0].length - 1 && row > 0)
    neighbours.push(grid[row - 1][col + 1]); // top right

  return neighbours.filter((neighbour) => !neighbour.isWall);
}
