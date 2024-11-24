import { Toast } from "../components/Base/Toast/Toast.js";
import { Header } from "../pages/Header/Header.js";
import { Process } from "../pages/Process/Process.js";
import { Read } from "../pages/Read/Read.js";

async function init () {
  const body = document.querySelector("body");

  const header = Header.create();
  body.appendChild(header)

  const readSection = await Read.create();
  body.appendChild(readSection);

  const processSection = await Process.create();
  body.appendChild(processSection);
};

init();