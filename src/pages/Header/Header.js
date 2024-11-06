import { Menu } from "../../components/Base/Menu/Menu.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js";

export const Header = {
  create: () => {},
}

Header.create = () => {
  const header = ToolsHTML.createElementWithClass("div", "header");

  const logo = ToolsHTML.createElementWithClass("img", "logo");
  logo.src = "src/assets/images/logo.png";
  logo.alt = "logo";
  header.appendChild(logo)

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
        text: "folgas",
        key: "retired"
      },
      {
        text: "procedimentos",
        key: "process"
      }
    ],
    clickFunction: switchPage,
    openIconSrc: "src/assets/icons/menu.svg",
    closeIconSrc: "src/assets/icons/close.svg",
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