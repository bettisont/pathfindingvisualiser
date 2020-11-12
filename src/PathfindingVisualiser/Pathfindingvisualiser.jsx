import React, { Component } from "react";
import Node from "./Node/Node";
import "./Pathfindingvisualiser.css";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../algorithms/dijkstra.js";
import "bootstrap/dist/css/bootstrap.min.css"


import { aStar } from "../algorithms/a*.js";

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 25;
const ROW_COUNT = 20;
const COL_COUNT = 30;
const REFRESH_RATE = 15;

export default class PathfindingVisualiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown = (row, col) => {
    const newGrid = this.state.grid.slice();
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    this.setState({ grid: newGrid });
    this.setState({ mouseIsPressed: true });
  };

  handleMouseEnter = (row, col) => {
    if (this.state.mouseIsPressed) {
      const newGrid = this.state.grid.slice();
      newGrid[row][col].isWall = true;
      this.setState({ grid: newGrid });
    }
  };

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
                <button className="btn btn-outline-secondary" type="button" onClick={() => this.generateRandomWalls()}>Generate Random Walls</button>
                <button className="btn btn-outline-success" type="button" onClick={() => this.visualiseDijkstra()}>Visualise Dijkstra's Algorithm</button>
            </form>
        </nav>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    isStart,
                    isFinish,
                    isVisited,
                    row,
                    col,
                    isWall,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  generateRandomWalls() {
    console.log("random wall method called!");
    const newGrid = this.state.grid.slice();
    for (let row = 0; row < newGrid.length; row++) {
      const thisRow = newGrid[row];
      for (let col = 0; col < thisRow.length; col++) {
        const thisNode = newGrid[row][col];
        if (Math.random() > 0.8 && !thisNode.isStart && !thisNode.isFinish)
          thisNode.isWall = true;
      }
    }
    this.setState({ grid: newGrid });
  }

  recursiveDivisionMazeGeneration(grid) {
    const newGrid = this.state.grid.slice();
    const verticalSplit = Math.random() > 0.5 ? true : false;
  }


  animateDijkstra(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, REFRESH_RATE * i);
    }
  }

  animateShortestPath(nodesInShortestPath) {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 30 * i);
    }
  }

  visualiseDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPath = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder);
    setTimeout(() => {
      this.animateShortestPath(nodesInShortestPath);
    }, visitedNodesInOrder.length * REFRESH_RATE + 2);
  }

  animateAstar(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, REFRESH_RATE * i);
    }
  }

  visualiseAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    this.animateAstar(visitedNodesInOrder);
    console.log(visitedNodesInOrder);
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    const currentRow = [];
    for (let col = 0; col < COL_COUNT; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,

    heuristic: null,
  };
};
