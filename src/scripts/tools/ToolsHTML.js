export const ToolsHTML = {
  createElementWithClass: (tag, className) => {},
}

ToolsHTML.createElementWithClass = (tag, className = "") => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
}