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

  const button = document.createElement("button");
  button.textContent = "teste";
  button.style.position = "absolute";
  button.style.width = "50px";
  button.style.top = "50px";
  button.style.left = "10px";
  button.style.backgroundColor = "blue";
  button.style.color = "white";
  
  body.appendChild(button)

  const toast = new Toast({ignoreFade: false, durationMS: 1000});
  body.appendChild(toast.create());

  button.addEventListener("click", () => toast.show({}))
};

init();