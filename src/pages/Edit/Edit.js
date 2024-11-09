import { Entry } from "../../components/Base/Entry/Entry.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js"
export const Edit = {
  create: () => {},
  open: () => {},
};

Edit.create = () => {
  Edit.createFade();
  
  Edit.section = ToolsHTML.createElementWithClass("section", "hide");
  Edit.section.id = "edit";
  Edit.fade.appendChild(Edit.section);


  Edit.title = ToolsHTML.createElementWithClass("h2", "title");
  Edit.section.appendChild(Edit.title);

  const nameParameters = {
    placeholder: "nome do produto",
    mandatory: true,
  };
  Edit.name = new Entry(nameParameters).create();
  Edit.section.appendChild(Edit.name);

  const overParameters = {
    placeholder: "validade do produto",
    mandatory: true
  };
  Edit.over = new Entry(overParameters).create();
  Edit.section.appendChild(Edit.over);

  const quantityParameters = {
    placeholder: "quantidade do produto",
    mandatory: true
  };
  Edit.quantity = new Entry(quantityParameters).create();
  Edit.section.appendChild(Edit.quantity);

  const buttonArea = ToolsHTML.createElementWithClass("div", "button_area");
  Edit.section.appendChild(buttonArea);

  const saveButton = ToolsHTML.createElementWithClass("button", "confirm");
  saveButton.textContent = "salvar"
  buttonArea.appendChild(saveButton);

  const cancelButton = ToolsHTML.createElementWithClass("button", "deny");
  cancelButton.textContent = "cancelar";
  cancelButton.addEventListener("click", Edit.close);
  buttonArea.appendChild(cancelButton);

  const deleteButton = ToolsHTML.createElementWithClass("button", "danger");
  deleteButton.textContent = "excluir"
  buttonArea.appendChild(deleteButton);


  return Edit.fade;
};

Edit.open = (object) => {
  Edit.section.classList.remove("hide");
  Edit.fade.classList.remove("hide");
  const nameInputArea = Edit.name.querySelector("input");
  const overInputArea = Edit.over.querySelector("input");
  const quantityInputArea = Edit.quantity.querySelector("input");
  if (!object) {
    Edit.title.textContent = "Adicionar Produto";
    nameInputArea.value = "";
    nameInputArea.disabled = (object);
    overInputArea.value = "";
    quantityInputArea.value = "";
  } else {
    Edit.title.textContent = "Editar Produto";
    nameInputArea.value = object.name;
    nameInputArea.disabled = (object);
    overInputArea.value = object.over;
    quantityInputArea.value = object.quantity;
  }
};

Edit.close = () => {
  Edit.section.classList.add("hide");
  Edit.fade.classList.add("hide");
}

Edit.createFade = () => {
  Edit.fade = ToolsHTML.createElementWithClass("div", "fade");
  Edit.fade.classList.add("hide");
  Edit.fade.addEventListener("click", (event) => {
    if (event.target.classList.contains("fade")) {
      Edit.close();
    }
  })
}