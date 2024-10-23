import { Add } from "../pages/Add/Add.js";
import { Edit } from "../pages/Edit/Edit.js";
import { Header } from "../pages/Header/Header.js";
import { Process } from "../pages/Process/Process.js";
import { Read } from "../pages/Read/Read.js";

async function init () {
  const body = document.querySelector("body");

  const header = Header.create();
  body.appendChild(header)

  const addSection = Add.create();
  body.appendChild(addSection);

  const editSection = Edit.create();
  body.appendChild(editSection);

  const readSection = Read.create();
  body.appendChild(readSection);

  const processSection = await Process.create();
  body.appendChild(processSection);

};

init();