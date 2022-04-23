//// Model
class Player {
  constructor(name, className) {
    this._name = name;
    this._className = className;
  }

  // getters
  get name() {
    return this._name;
  }
  get className() {
    return this._className;
  }
  get score() {
    return this._score;
  }

  // setters
  set name(value) {
    this._name = value;
  }
  set className(value) {
    this._className = value;
  }
  set score(value) {
    this._className = value;
  }
}

//// Export
export { Player };
