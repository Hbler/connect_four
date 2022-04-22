//// Global Variables
const body = document.getElementsByTagName("body")[0];
const Header = document.createElement("header");
const Main = document.createElement("main");

//// Functions
/// Layout
function prepareLayout() {
  const title = document.createElement("h1");
  const subT = document.createElement("h2");
  const table = document.createElement("div");

  title.innerText = "OOP Study: Connect Four Game";
  subT.innerText = "Hugo Bler";
  table.id = "table";
  table.classList.add("seven_six");

  Header.append(title, subT);
  Main.append(table);
  body.append(Header, Main);
}

//// Export
export { prepareLayout };
