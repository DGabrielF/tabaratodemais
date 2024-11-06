import { Entry } from "../../components/Base/Entry/Entry.js"
import { Menu } from "../../components/Base/Menu/Menu.js"
import { Search } from "../../components/Base/Search/Search.js"
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js"
import { ToolsString } from "../../scripts/tools/ToolsString.js"

export const Process = {
  create: async () => {},
  basePath: "src/assets/pop/",
  data: null,
  waiting: false,
}

Process.data = [
  {
    text: "Pão Francês",
    options: [
      {
        text: "Tirar Pão"
      },
      {
        text: "Assar Pão"
      }
    ]
  },
  {
    text: "Caixa",
    options: [
      {
        text: "Passar Compras",
      },
      {
        text: "Aplicar Descontos",
      },
      {
        text: "Cadastrar Produto",
      },
      {
        text: "Editar Produto",
      },
      {
        text: "Realizar Sangria",
      }   
    ]
  }
]

Process.create = async () => {
  const section = ToolsHTML.createElementWithClass("section", "hide");
  section.id = "process";
  
  for (const item of Process.data) {
    item.key = ToolsString.slugfy(item.text);
    if (item.options) {
      for (const option of item.options) {
        option.key = ToolsString.slugfy(option.text);
      }
    }
  }

  Process.sideMenu = ToolsHTML.createElementWithClass("div", "side_menu");
  section.appendChild(Process.sideMenu);
  const searchParameters = {
    baseArray: Process.data,
    styledInput: new Entry(
      {
        placeholder: "Processo", 
        mandatory: false,
      }
    ).create(),
    updateTipFunction: updateMenuItems,
    showTipArea: false,
  }
  const search = new Search(searchParameters);
  Process.sideMenu.appendChild(search.create());

  const menuParameters = {
    items: search.showArray,
    clickFunction: switchContent,
  }
  const menu = new Menu(menuParameters);
  Process.sideMenu.appendChild(menu.create());

  const content = ToolsHTML.createElementWithClass("div", "content");
  section.appendChild(content);

  function updateMenuItems() {
    const menuButtons = Process.sideMenu.querySelectorAll(".droppable button");
    console.log("array", search.showArray)
    if (!search.showArray) {
      menuButtons.forEach(element => {
        element.classList.remove("hide");
      });
    } else {
      menuButtons.forEach(element => {
        element.classList.add("hide");
      });
      for (const item of search.showArray) {
        const buttonMatch = Array.from(menuButtons).find(button => button.innerText.includes(item.text))
        buttonMatch.classList.remove("hide");
        const children = buttonMatch.querySelectorAll("*");
        children.forEach(child => child.classList.remove("hide"));
      }
    }
  }
  
  return section
}

function switchContent (key) {
  const url = `${Process.basePath}${key}.md`
  readMarkDownFile(url)
}

async function readMarkDownFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }
    const text = await response.text();
    const markdownContent = marked.parse(text);
    const content = document.querySelector('div.content');
    content.innerHTML = markdownContent;
  } catch (error) {
    console.error('Erro ao processar o markdown:', error);
    document.querySelector('div.content').innerHTML = '<p>Não foi possível carregar o conteúdo.</p>';
  }
}