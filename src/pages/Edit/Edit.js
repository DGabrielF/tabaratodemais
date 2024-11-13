import { Entry } from "../../components/Base/Entry/Entry.js";
import { Toast } from "../../components/Base/Toast/Toast.js";
import { Firestore } from "../../scripts/services/firebase/firestore.js";
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
  const name = new Entry(nameParameters).create();
  Edit.name = name.querySelector("input");
  Edit.section.appendChild(name);

  const overParameters = {
    placeholder: "validade do produto",
    mandatory: true
  };
  const over = new Entry(overParameters).create();
  Edit.over = over.querySelector("input");
  Edit.section.appendChild(over);

  const quantityParameters = {
    placeholder: "quantidade do produto",
    mandatory: true,
    types: "number"
  };
  const quantity = new Entry(quantityParameters).create()
  Edit.quantity = quantity.querySelector("input");
  Edit.section.appendChild(quantity);

  const buttonArea = ToolsHTML.createElementWithClass("div", "button_area");
  Edit.section.appendChild(buttonArea);

  const saveButton = ToolsHTML.createElementWithClass("button", "confirm");
  saveButton.textContent = "salvar";
  saveButton.addEventListener("click", async () => await Edit.save());
  buttonArea.appendChild(saveButton);

  const cancelButton = ToolsHTML.createElementWithClass("button", "deny");
  cancelButton.textContent = "cancelar";
  cancelButton.addEventListener("click", Edit.close);
  buttonArea.appendChild(cancelButton);

  Edit.deleteButton = ToolsHTML.createElementWithClass("button", "danger");
  Edit.deleteButton.textContent = "excluir";
  Edit.deleteButton.addEventListener("click", Edit.remove);
  buttonArea.appendChild(Edit.deleteButton);

  Edit.toast = new Toast({ignoreFade: true, durationMS: 1000});
  const body = document.querySelector("body");
  body.appendChild(Edit.toast.create());

  return Edit.fade;
};

Edit.open = (object) => {
  Edit.newData = (!object);
  Edit.section.classList.remove("hide");
  Edit.fade.classList.remove("hide");
  if (Edit.newData) {
    Edit.title.textContent = "Adicionar Produto";
    Edit.name.value = "";
    Edit.name.disabled = (object);
    Edit.over.value = "";
    Edit.quantity.value = "";
    Edit.deleteButton.disabled = true;
  } else {
    Edit.data = object;
    Edit.title.textContent = "Editar Produto";
    Edit.name.value = object.name;
    Edit.name.disabled = (object);
    Edit.over.value = object.over;
    Edit.quantity.value = object.quantity;
    Edit.deleteButton.disabled = false;
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

Edit.save = async () => {
  const entryValues = {
    history: [],
  };

  for (const key in Edit) {
    if (Edit[key] instanceof HTMLElement && Edit[key].classList.contains("styled_field")){
      entryValues[key] = (Edit[key].type === "number") ? Number(Edit[key].value): Edit[key].value;
    }
  }
  const today = new Date();
  const date = {
    weekDay: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"][today.getDay()],
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    hour: today.getHours(),
    minute: today.getMinutes(),
  }
  
  if (Edit.newData) {
    entryValues.date = date;
    const response = await Firestore.createData("tabaratodemais", entryValues);
    if (response === "string") {
      console.log("Erro", response);
      Edit.toast.show({title: "Erro", text: response, type: "error"});
      return;
    } else {
      Edit.toast.show({title: "Sucesso", text: "Produto Adicionado", type: "success"});
    };
    Edit.close();
  } else {
    entryValues.history = [...Edit.data.history];
    const historyItem = {
      ...Edit.data.date
    }
    historyItem.quantity = Number(Edit.data.quantity);
    entryValues.history.push(historyItem);

    entryValues.date = date;

    const response = await Firestore.update("tabaratodemais", Edit.data.id, entryValues);
    if (response) {
      console.log("Erro", response);
      Edit.toast.show({title: "Erro", text: response, type: "error"});
      return;
    } else {
      Edit.toast.show({title: "Sucesso", text: "Produto Modificado", type: "success"});
    };
    Edit.close();
  }
}

Edit.remove = async () => {
  const response = await Firestore.delete("tabaratodemais", Edit.data.id);
    if (response) {
      console.log("Erro", response);
      Edit.toast.show({title: "Erro", text: response, type: "error"});
      return;
    } else {
      Edit.toast.show({title: "Sucesso", text: "Produto Removido", type: "success"});
    };
    Edit.close();
}