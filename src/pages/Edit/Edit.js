import { Entry } from "../../components/Base/Entry/Entry.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js"
export const Edit = {
  create: () => {},
};

Edit.create = () => {
  const section = ToolsHTML.createElementWithClass("section", "hide");
  section.id = "edit";

  const title = ToolsHTML.createElementWithClass("h2", "title");
  title.textContent = "Editar Produto";
  section.appendChild(title);

  const name = ToolsHTML.createElementWithClass("span", "name");
  section.appendChild(name);

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
  cleanButton.textContent = "excluir"
  buttonArea.appendChild(cleanButton);

  return section;
};