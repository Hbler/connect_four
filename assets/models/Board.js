//// Imports
import { Cell } from "./Cell.js";

//// Model
class Board {
  constructor(cols, rows, players) {
    this._cols = cols;
    this._rows = rows;
    this._players = players;
    this._currentPlayer = this._players[0];
    this._map = this.createEmptyMap();
  }

  // getters
  get columns() {
    return this._cols;
  }
  get rows() {
    return this._rows;
  }
  get players() {
    return this._players;
  }
  get map() {
    return this._map;
  }
  get currentPlayer() {
    return this._currentPlayer;
  }

  // setters
  set columns(_) {
    throw "Can't change this value";
  }
  set rows(_) {
    throw "Can't change this value";
  }
  set players(_) {
    throw "Can't change this value";
  }
  set map(_) {
    throw "Can't change this value";
  }
  set currentPlayer(player) {
    if (player) this._currentPlayer = player;
  }
  //methods
  createEmptyMap() {
    const map = [];
    for (let i = 0; i < this.rows; i++) {
      map.push(new Array(this.columns));
    }
    return map;
  }

  buildBoard(node) {
    node.innerHTML = "";

    for (let c = 0; c < this.columns; c++) {
      const column = document.createElement("div");
      column.classList.add("column");
      column.style.width = `${100 / this._cols - 0.7}%`;
      column.dataset.column = c;
      column.addEventListener("click", (e) => {
        console.log(e.target);
        this.handleClick();
      });

      for (let r = 0; r < this.rows; r++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.height = `${100 / this._rows - 0.7}%`;
        cell.dataset.row = r;
        column.appendChild(cell);
      }

      node.appendChild(column);
    }
  }

  switchPlayer() {
    const player = this.players.indexOf(this.currentPlayer);
    const nextPlayer = (player + 1) % this.players.length;
    this.currentPlayer = this.players[nextPlayer];
  }

  handleClick(column) {
    let row = this.map.findIndex((row) => row[column]);

    if (row === -1) {
      row = this._rows;
    }

    this.map[row - 1][column] = this.currentPlayer;

    const cell = new Cell(column, row, this.currentPlayer.className);

    cell.render();

    this.switchPlayer();
  }
}

//// Export
export { Board };
