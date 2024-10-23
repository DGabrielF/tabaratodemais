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
  const section = ToolsHTML.createElementWithClass("section");
  section.id = "process"
  
  for (const item of Process.data) {
    item.key = ToolsString.slugfy(item.text);
    if (item.options) {
      for (const option of item.options)
        option.key = ToolsString.slugfy(option.text);
    }
  }

  const sideMenu = ToolsHTML.createElementWithClass("div", "side_menu");
  section.appendChild(sideMenu);
  const searchParameters = {
    baseArray: Process.data,
    styledInput: new Entry({placeholder: "Nome do produto", mandatory: false}).create(),
  }
  const search = new Search(searchParameters);
  sideMenu.appendChild(search.create());

  const menuParameters = {
    items: Process.data,
    clickFunction: switchContent,
  }
  const menu = new Menu(menuParameters);
  sideMenu.appendChild(menu.create());

  const content = ToolsHTML.createElementWithClass("div", "content");
  section.appendChild(content);

  
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