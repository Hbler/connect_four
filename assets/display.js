//// Global Variables
const body = document.getElementsByTagName("body")[0];
const Header = document.createElement("header");
const Main = document.createElement("main");
const Modal = createModal();

//// Functions
/// Layout
function createModal() {
  const container = document.createElement("div");
  const modal = document.createElement("section");
  const message = document.createElement("h3");
  const btn = document.createElement("button");

  message.innerText = "Styling";
  message.classList.add("game-over__box--message");

  btn.innerText = "OK";
  btn.classList.add("game-over__box--btn");

  modal.classList.add("game-over__box");
  modal.append(message, btn);

  container.classList.add("game-over");
  container.appendChild(modal);

  return container;
}

function prepareLayout() {
  const title = document.createElement("h1");
  const link = document.createElement("a");
  const subT = document.createElement("h2");
  const table = document.createElement("section");
  const ui = createUI();

  title.innerText = "OOP Study: Connect Four Game";
  link.href = "https://linkedin.com/in/hbler/";
  link.target = "_blank";
  subT.innerText = "Hugo Bler";
  table.id = "table";
  table.classList.add("seven_six");

  link.appendChild(subT);
  Header.append(title, link);
  Main.append(ui, table);
  body.append(Header, Main, Modal);
}

function createUI() {
  const container = document.createElement("section");
  const info = infoDiv();
  const boardSize = setBoardDiv();
  const connections = setConnectionsDiv();
  const playerOne = newPlayer("1");
  const playerTwo = newPlayer("2");
  const btn = document.createElement("button");
  const who = turn();

  btn.innerText = "Start";
  // btn.addEventListener('click', startGame)
  btn.id = "start";

  container.append(
    info,
    boardSize,
    connections,
    playerOne,
    playerTwo,
    btn,
    who
  );
  container.id = "ui";

  return container;
}

function infoDiv() {
  const container = document.createElement("div");
  const title = document.createElement("h3");
  const info = document.createElement("p");

  title.innerText = "Instructions";
  info.innerText =
    "Select below: the size of the board, the necessary amount of connections to win. Define the name of the players and press “Start”";

  container.append(title, info);
  container.classList.add("ui__div");
  container.classList.add("ui__div--info");

  return container;
}

function setBoardDiv() {
  const container = document.createElement("div");
  const title = document.createElement("h3");
  const options = document.createElement("fieldset");
  const formats = ["07 x 06", "08 x 07", "10 x 07"];

  title.innerText = "Choose the board size:";

  formats.forEach((x, i) => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.innerText = x;
    label.setAttribute("for", `board-${i}`);

    input.type = "radio";
    input.value = i;
    input.name = `board-option`;
    input.id = `board-${i}`;

    if (i === 0) input.setAttribute("checked", "");

    container.append(input, label);
    options.appendChild(container);
  });

  container.append(title, options);
  container.classList.add("ui__div");
  container.classList.add("ui__div--board");

  return container;
}

function setConnectionsDiv() {
  const container = document.createElement("div");
  const title = document.createElement("h3");
  const options = document.createElement("input");
  const label = document.createElement("div");
  const connections = ["4", "5", "6"];

  title.innerText = "Connections to win:";

  options.type = "range";
  options.id = "connections";
  options.min = "4";
  options.max = "6";
  options.step = "1";
  options.value = "4";

  connections.forEach((x) => {
    const num = document.createElement("p");
    num.innerText = x;
    label.appendChild(num);
  });

  container.append(title, options, label);
  container.classList.add("ui__div");
  container.classList.add("ui__div--connections");

  return container;
}

function newPlayer(str) {
  const container = document.createElement("div");
  const title = document.createElement("h3");
  const input = document.createElement("input");

  title.innerText = `Player ${str}`;

  input.type = "text";
  input.name = "player-name";
  input.id = `player${str}-name`;

  container.append(title, input);
  container.classList.add("ui__div");
  container.classList.add(`ui__div--player${str}`);

  return container;
}

function turn() {
  const container = document.createElement("div");
  const title = document.createElement("h3");

  title.innerText = "Press Start";
  title.classList.add("turn");

  container.append(title);
  container.classList.add("ui__div");
  container.classList.add("ui__div--turn");

  return container;
}

//// Export
export { prepareLayout, newPlayer };
