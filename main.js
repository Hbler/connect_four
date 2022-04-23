//// Imports
import { prepareLayout, newPlayer } from "./assets/display.js";
prepareLayout();

import { Player } from "./assets/models/Player.js";
import { Board } from "./assets/models/Board.js";

//// Global Variables
const startBtn = document.getElementById("start");
const boardOptions = document.getElementsByName("board-option");
const modal = document.querySelector(".game-over");

//// Listeners
startBtn.addEventListener("click", play);
modal.addEventListener("click", Board.closeAlert);

//// Functions
function play() {
  const players = getPlayers();
  const connections = document.getElementById("connections").value;
  const { boardNode, cols, rows } = getBoard();
  const newBoard = new Board(cols, rows, players, +connections);

  boardNode.innerHTML = "";
  newBoard.buildBoard(boardNode);
  Board.updateTurn(players[0]);
}

function getBoard() {
  const board = document.getElementById("table");
  let format;
  for (let opt of boardOptions) {
    if (opt.checked) format = opt.value;
  }

  let c, r;
  switch (+format) {
    case 1:
      board.classList.remove(...board.classList);
      board.classList.add("eigth_seven");
      c = 8;
      r = 7;
      break;
    case 2:
      board.classList.remove(...board.classList);
      board.classList.add("ten_seven");
      c = 10;
      r = 7;
      break;
    default:
      board.classList.remove(...board.classList);
      board.classList.add("seven_six");
      c = 7;
      r = 6;
      break;
  }

  return { boardNode: board, cols: c, rows: r };
}

function getPlayers() {
  const p1 = document.querySelector(".ui__div--player1");
  const p2 = document.querySelector(".ui__div--player2");

  const p1Input = document.getElementById("player1-name");
  const p2Input = document.getElementById("player2-name");

  const nameP1 = p1Input.value || "Player 1";
  const nameP2 = p2Input.value || "Player 2";

  const player1 = new Player(nameP1, "player1");
  const player2 = new Player(nameP2, "player2");

  return [player1, player2];
}

//// Flow

let pOne = new Player("Player One", "player1");
let pTwo = new Player("Player Two", "player2");

let board = new Board(7, 6, [pOne, pTwo]);
const container = document.getElementById("table");
board.buildBoard(container);
