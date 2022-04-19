class Board {
  _cols;
  _rows;
  _players;
  constructor(cols, rows, players) {
    this._cols = cols;
    this._rows = rows;
    this._players = players;
    this._currentPlayer = this._players[0];
    this._map = createEmptyMap();
    this._buildBoard();
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

  buildBoard() {}
}
