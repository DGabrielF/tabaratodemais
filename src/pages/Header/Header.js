import { Menu } from "../../components/Base/Menu/Menu.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js";

export const Header = {
  create: () => {},
}

Header.create = () => {
  const header = ToolsHTML.createElementWithClass("div", "menu");

  const menuParameters = {
    items: [
      {
        text: "vencimento",
        key: "over",
        options: [          
          {
            text: "lista",
            key: "read"
          },
          {
            text: "adicionar",
            key: "add"
          },
          {
            text: "editar",
            key: "edit"
          }
        ]
      },
      {
        text: "procedimentos",
        key: "process"
      }
    ],
    clickFunction: switchPage
  }
  const menu = new Menu(menuParameters)
  header.appendChild(menu.create());

  return header;
};

function switchPage (key) {
  const sections = document.querySelectorAll("section");

  for (const section of sections) {
    if (section.id === key) {
      section.classList.remove("hide")
    } else {
      section.classList.add("hide")
    }
  }
}