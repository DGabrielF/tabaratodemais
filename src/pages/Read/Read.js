import { Firestore } from "../../scripts/services/firebase/firestore.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js";
import { Edit } from "../Edit/Edit.js";

export const Read = {
  create: async () => {},
  data: []
};

Read.create = async () => {
  Read.data = await Firestore.fetchDataFromFirebase("tabaratodemais");

  Firestore.realTimeListener("tabaratodemais", realTimeUpdate)

  const body = document.querySelector("body");

  Read.editSection = Edit;
  body.appendChild(Read.editSection.create());

  const section = ToolsHTML.createElementWithClass("section");
  section.id = "read";

  const title = ToolsHTML.createElementWithClass("h2", "title");
  title.textContent = "Lista de Produtos";  
  section.appendChild(title);
  
  const addProductButton = ToolsHTML.createElementWithClass("button", "add_fixed");
  addProductButton.addEventListener("click", () => {
    Read.editSection.open();
  })
  section.appendChild(addProductButton);

  const addProductButtonSpan = ToolsHTML.createElementWithClass("span");
  addProductButtonSpan.textContent = "Adicionar Produto";
  addProductButton.appendChild(addProductButtonSpan);

  const addProductButtonIcon = ToolsHTML.createElementWithClass("img");
  addProductButtonIcon.src = "src/assets/icons/plus.svg";
  addProductButton.appendChild(addProductButtonIcon);

  const itemTable = ToolsHTML.createElementWithClass("table", "item_area");
  section.appendChild(itemTable);

  const tableHeader = ToolsHTML.createElementWithClass("thead", "table_header");
  itemTable.appendChild(tableHeader);

  const headerLine = ToolsHTML.createElementWithClass("tr");
  tableHeader.appendChild(headerLine);

  const headerTitles = ["Produto", "Validade", "Quantidade"];
  headerTitles.forEach( item => {
    const th = ToolsHTML.createElementWithClass("th");
    th.textContent = item;
    headerLine.appendChild(th);
  })

  Read.tableBody = ToolsHTML.createElementWithClass("thead", "table_body");
  itemTable.appendChild(Read.tableBody);
  updateList();

  return section;
};

function updateList() {
  const today = new Date().setHours(0, 0, 0, 0);
  Read.data = sortByFormatedDate(Read.data, 'over');
  Read.tableBody.innerHTML = "";

  for (let i = 0; i < Read.data.length; i++) {
    const item = createItem(Read.data[i]);
    item.setAttribute("data-key", Read.data[i].id);
    item.addEventListener("click", () => {
      Read.editSection.open(Read.data[i]);
    });
    const overDate = new Date(Read.data[i].over.split('/').reverse().join('-')).setHours(24, 0, 0, 0);
    const difference = daysBetween(today, overDate);

    let bgColor = "transparent";
    if (difference < 0) {
      bgColor = "#770077";
    } else if (difference === 0) {
      bgColor = "#ff0000";
    } else if (difference < 2) {
      bgColor = "#ff7700";
    } else if (difference < 4) {
      bgColor = "#cdab00";
    }

    item.style.backgroundColor = bgColor;

    Read.tableBody.appendChild(item);
  }
}

function realTimeUpdate(content) {
  const uniqueData = [];

  const ids = new Set();

  content.forEach((item) => {
    if (!ids.has(item.id)) {
      ids.add(item.id);
      uniqueData.push(item);
    }
  })

  Read.data = uniqueData;
  updateList();
}

function sortByFormatedDate(array, dataKey) {
  return array.sort((a, b) => {
    const dateA = new Date(a[dataKey].split('/').reverse().join('-'));
    const dateB = new Date(b[dataKey].split('/').reverse().join('-'));

    return dateA - dateB;
  })
}

function daysBetween(date1, date2) {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor((date2 - date1) / oneDay)
}

function createItem({name , over, quantity}) {
  const item = ToolsHTML.createElementWithClass("tr", "item");

  const itemName = ToolsHTML.createElementWithClass("td", "name");
  itemName.textContent = name;
  item.appendChild(itemName);
  
  const itemOver = ToolsHTML.createElementWithClass("td", "over");
  itemOver.textContent = over;
  item.appendChild(itemOver);
  
  const itemQuantity = ToolsHTML.createElementWithClass("td", "quantity");
  itemQuantity.textContent = quantity;
  item.appendChild(itemQuantity);
  
  return item;
}