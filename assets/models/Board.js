//// Imports
import { Cell } from "./Cell.js";

//// Model
class Board {
  constructor(cols, rows, players, matches = 4) {
    this._cols = cols;
    this._rows = rows;
    this._players = players;
    this._matches = matches;
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
        const path = e.path || (e.composedPath && e.composedPath());

        this.handleClick(+path[1].dataset.column);
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
    Board.updateTurn(this.currentPlayer);
  }

  handleClick(column) {
    let row = this.map.findIndex((row) => row[column]);

    if (row === -1) {
      row = this._rows;
    }

    this.map[row - 1][column] = this.currentPlayer;

    const cell = new Cell(column, row, this.currentPlayer.className);

    cell.render();

    if (this.winnerMove(column, row - 1)) {
      Board.gameOver(`${this.currentPlayer.name} won!`);
      return;
    }

    this.switchPlayer();
  }

  checkVertical(column, row) {
    let end = row + (this._matches - 1);

    if (end >= this.rows) {
      end = this.rows - 1;
    }

    let counter = 0;
    for (let i = row; i <= end; i++) {
      if (this.map[i][column] === this.currentPlayer) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter === this._matches) {
        return true;
      }
    }
    return false;
  }

  checkHorizontal(column, row) {
    let end = column + (this._matches - 1);

    if (end >= this.columns) {
      end = this.columns - 1;
    }

    let counter = 0;
    for (let i = 0; i <= end; i++) {
      if (this.map[row][i] === this.currentPlayer) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter === this._matches) {
        return true;
      }
    }
    return false;
  }

  checkDownRight(column, row) {
    let limitY = this._matches - 1;
    let limitX = this._matches;
    if (row < limitY) {
      let end = row + (this._matches - 1);
      if (end >= this.rows) {
        end = this.rows - 1;
      }

      let counter = 0;
      for (let i = row; i <= end; i++) {
        if (this.map[i][column] === this.currentPlayer) {
          counter++;
        } else {
          counter = 0;
        }
        if (counter === this._matches) {
          return true;
        }
        column++;
      }
      return false;
    } else {
      let end = 0;

      let counter = 0;
      for (let i = row; i >= end; i--) {
        if (this.map[i][column] === this.currentPlayer) {
          counter++;
        } else {
          counter = 0;
        }
        if (counter === this._matches) {
          return true;
        }
        column--;
      }
      return false;
    }
  }

  checkDownLeft(column, row) {
    let limitY = this._matches - 1;
    if (row < limitY) {
      let end = row + (this._matches - 1);
      if (end >= this.rows) {
        end = this.rows - 1;
      }

      let counter = 0;
      for (let i = row; i <= end; i++) {
        if (this.map[i][column] === this.currentPlayer) {
          counter++;
        } else {
          counter = 0;
        }
        if (counter === this._matches) {
          return true;
        }
        column--;
      }
      return false;
    } else {
      let end = 0;

      let counter = 0;
      for (let i = row; i >= end; i--) {
        if (this.map[i][column] === this.currentPlayer) {
          counter++;
        } else {
          counter = 0;
        }
        if (counter === this._matches) {
          return true;
        }
        column++;
      }
      return false;
    }
  }

  winnerMove(column, row) {
    return (
      this.checkVertical(column, row) ||
      this.checkHorizontal(column, row) ||
      this.checkDownRight(column, row) ||
      this.checkDownLeft(column, row)
    );
  }

  static gameOver(str) {
    const modal = document.querySelector(".game-over");
    const message = document.querySelector(".game-over__box--message");
    const turn = document.querySelector(".ui__div--turn").childNodes[0];

    turn.classList.remove(...turn.classList);
    turn.classList.add("turn");
    turn.innerText = "Press Start";

    message.innerText = str;
    modal.classList.toggle("show");
  }

  static closeAlert() {
    const modal = document.querySelector(".game-over");

    modal.classList.toggle("show");
  }

  static updateTurn(obj) {
    const turn = document.querySelector(".ui__div--turn").childNodes[0];

    const color = obj.className.split("");

    turn.classList.remove(...turn.classList);
    turn.classList.add("turn", `${color[0] + color[color.length - 1]}`);
    turn.innerText = `${obj.name}\`s turn`;
  }
}

//// Export
export { Board };
