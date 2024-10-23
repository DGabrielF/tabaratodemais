import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js";

export const Read = {
  create: () => {},
  data: [
    {
      name: "iogurt vigor morango 90g",
      over: "19/10/2024",
      location: "geladeira 1",
      createData: "18/10/2024",
    },
    {
      name: "iogurt vigor chocolate 90g",
      over: "19/10/2024",
      location: "geladeira 1",
      createData: "18/10/2024",
    },
    {
      name: "danone itambé 900ml",
      over: "29/10/2024",
      location: "geladeira 2",
      createData: "18/10/2024",
    },
    {
      name: "danette 360g",
      over: "27/10/2024",
      location: "geladeira 2",
      createData: "18/10/2024",
    },
    {
      name: "danette branco 360g",
      over: "27/10/2024",
      location: "geladeira 2",
      createData: "18/10/2024",
    },
  ]
};

Read.create = () => {
  const section = ToolsHTML.createElementWithClass("section");
  section.id = "read";

  const title = ToolsHTML.createElementWithClass("h2", "title");
  title.textContent = "Lista de Produtos";  
  section.appendChild(title);

  const itemArea = ToolsHTML.createElementWithClass("div", "item_area");
  section.appendChild(itemArea)

  for (let i = 0; i < Read.data.length; i++) {
    const item = createItem(Read.data[i]);
    itemArea.appendChild(item);
  }

  return section;
};

function createItem({name , over, location}) {
  const item = ToolsHTML.createElementWithClass("div", "item");

  const itemName = ToolsHTML.createElementWithClass("span", "name");
  itemName.textContent = name;
  item.appendChild(itemName);
  
  const itemOver = ToolsHTML.createElementWithClass("span", "over");
  itemOver.textContent = over;
  item.appendChild(itemOver);
  
  const itemLocation = ToolsHTML.createElementWithClass("span", "location");
  itemLocation.textContent = location;
  item.appendChild(itemLocation);
  
  return item;
}