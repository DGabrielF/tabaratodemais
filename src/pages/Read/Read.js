import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js";

export const Read = {
  create: () => {},
  data: [
    {
      name: "iogurt vigor morango 90g",
      over: "05/11/2024",
      quantity: 10,
      createData: "18/10/2024",
    },
    {
      name: "iogurt vigor chocolate 90g",
      over: "06/11/2024",
      quantity: 72,
      createData: "18/10/2024",
    },
    {
      name: "danone itambé 900ml",
      over: "07/11/2024",
      quantity: 41,
      createData: "18/10/2024",
    },
    {
      name: "danette 360g",
      over: "08/11/2024",
      quantity: 12,
      createData: "18/10/2024",
    },
    {
      name: "danette branco 360g",
      over: "08/11/2024",
      quantity: 4,
      createData: "18/10/2024",
    },
  ]
};

Read.create = () => {
  const today = new Date().setHours(0, 0, 0, 0);

  const section = ToolsHTML.createElementWithClass("section");
  section.id = "read";

  const title = ToolsHTML.createElementWithClass("h2", "title");
  title.textContent = "Lista de Produtos";  
  section.appendChild(title);

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

  const tableBody = ToolsHTML.createElementWithClass("thead", "table_body");
  itemTable.appendChild(tableBody);
  Read.data = sortByFormatedDate(Read.data, 'over');
  for (let i = 0; i < Read.data.length; i++) {
    const item = createItem(Read.data[i]);
    const overDate = new Date(Read.data[i].over.split('/').reverse().join('-')).setHours(24, 0, 0, 0);
    const difference = daysBetween(today, overDate);

    let bgColor = "transparent";
    if (difference < 0) {
      bgColor = "#770077"
    } else if (difference === 0) {
      bgColor = "#ff0000";
    } else if (difference < 2) {
      bgColor = "#ff7700";
    } else if (difference < 4) {
      bgColor = "#cdab00";
    }

    item.style.backgroundColor = bgColor;
 
    tableBody.appendChild(item);
  }

  return section;
};

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