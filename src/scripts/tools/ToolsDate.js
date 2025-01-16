export const ToolsDate = {
  getTodayDate: () => {},
  getTodayDateStrEn: () => {},
  getTodayDateStrPt: () => {},
  turnEnToPt: (date) => {},
  turnPtToEn: (date) => {},
}

ToolsDate.getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  return [year, month, day];
}

ToolsDate.getTodayDateStrEn = () => {
  const [year, month, day] = ToolsDate.getTodayDate();
  return `${year}-${month}-${day}`;
}

ToolsDate.getTodayDateStrPt = () => {
  const [year, month, day] = ToolsDate.getTodayDate();
  return `${day}/${month}/${year}`;
}

ToolsDate.turnEnToPt = (date) => {
  if (date.includes("-")) {
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  } else {
    console.error("Não foram identificados hífens na data apresentada");
    return date
  }
}

ToolsDate.turnPtToEn = (date) => {
  if (date.includes("/")) {
    const [day, month,  year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  } else {
    console.error("Não foram identificadas barras na data apresentada");
    return date
  }
}