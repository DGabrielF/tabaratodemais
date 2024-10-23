import { Entry } from "../../components/Base/Entry/Entry.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js"
export const Add = {
  create: () => {},
};

Add.create = () => {
  const section = ToolsHTML.createElementWithClass("section", "hide");
  section.id = "add";

  const title = ToolsHTML.createElementWithClass("h2", "title");
  title.textContent = "Adicionar Produto";
  section.appendChild(title);

  const nameParameters = {
    placeholder: "nome do produto",
    mandatory: true
  };
  const name = new Entry(nameParameters);
  section.appendChild(name.create());


  const overParameters = {
    placeholder: "validade do produto",
    mandatory: true
  };
  const over = new Entry(overParameters);
  section.appendChild(over.create());

  const locationParameters = {
    placeholder: "localização do produto",
    mandatory: true
  };
  const location = new Entry(locationParameters);
  section.appendChild(location.create());

  const buttonArea = ToolsHTML.createElementWithClass("div", "button_area");
  section.appendChild(buttonArea);

  const saveButton = ToolsHTML.createElementWithClass("button", "confirm");
  saveButton.textContent = "salvar"
  buttonArea.appendChild(saveButton);

  const cleanButton = ToolsHTML.createElementWithClass("button", "deny");
  cleanButton.textContent = "limpar"
  buttonArea.appendChild(cleanButton);

  return section;
};