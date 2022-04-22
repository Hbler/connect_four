//// Imports
import { prepareLayout } from "./assets/display.js";
import { Board } from "./assets/models/Board.js";

//// Flow
prepareLayout();

let board = new Board(7, 6, []);
const container = document.getElementById("table");
board.buildBoard(container);
