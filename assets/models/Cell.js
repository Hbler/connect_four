//// Model
class Cell {
  constructor(col, row, player) {
    this._col = col;
    this._row = row;
    this._player = player;
  }

  // getters
  get column() {
    return this._col;
  }

  get row() {
    return this._row;
  }
  get player() {
    return this._player;
  }

  // setters
  set column(_) {
    throw "Can't change this value";
  }

  set row(_) {
    throw "Can't change this value";
  }

  set player(_) {
    throw "Can't change this value";
  }

  render() {
    const div = document.querySelector(
      `.column[data-column="${this._col}"] > .cell[data-row="${this._row - 1}"]`
    );

    div.innerText = "";

    const playerDiv = document.createElement("div");
    playerDiv.classList.add(this._player);
    div.appendChild(playerDiv);
  }
}

//// Export
export { Cell };
