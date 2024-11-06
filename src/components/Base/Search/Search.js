export class Search {
  constructor({
    baseArray,
    showArray,
    clickFunction = console.log,
    updateTipFunction = console.log,
    styledInput,
    showTipArea,
  }) {
    this.baseArray = baseArray;
    this.showArray = showArray;
    this.clickFunction = clickFunction;
    this.updateTipFunction = updateTipFunction;
    this.styledInput = styledInput;
    this.showTipArea = showTipArea;
  }

  create() {
    this.search = this.#createElementWithClass("div", "search");

    this.input = (this.styledInput) ? this.styledInput : this.#createElementWithClass("input");
    this.input.addEventListener("input", (event) => this.updateTip(event));
    this.search.appendChild(this.input);

    if (!this.showArray) this.showArray = this.baseArray;

    if (this.showTipArea) {
      this.#createTipArea();
      document.addEventListener("click", (event) => {
        if (!event.target.closest("div.search")) {
          this.tipArea.classList.add("hide");
        }
      })
    }

    return this.search;
  }

  updateTip(event) {
    const filtered = this.#filterItems(event.target.value, this.baseArray, ["text"])
    this.showArray = filtered.length > 0 ? filtered : false;
    
    if (this.showTipArea) {
      this.#updateTipArea();
      this.tipArea.classList.remove("hide");
    } else {
      this.updateTipFunction();
    }
  }

  #filterItems(text, array, attribute = 'text') {
    return array.filter(item => {
        const matchText = typeof item[attribute] === 'string' && this.#slugfy(item[attribute]).includes(this.#slugfy(text));
        
        const matchAtributosAninhados = Object.values(item).some(value => {
            if (typeof value === 'object' && value !== null) {
                return Array.isArray(value)
                    ? this.#filterItems(text, value, attribute).length > 0
                    : this.#filterItems(text, [value], attribute).length > 0;
            }
            return false;
        });
        
        return matchText || matchAtributosAninhados;
    });
  }

  #createTipArea() {
    this.tipArea = this.#createElementWithClass("ul", "tip_area");
    this.tipArea.classList.add("hide")
    this.search.appendChild(this.tipArea);
    this.#updateTipArea();
  }

  #updateTipArea(attribute = 'text') {
    this.tipArea.innerHTML = "";
    for (const item of !this.showArray ? this.baseArray : this.showArray) {
      const listItem = this.#createElementWithClass("li");
      listItem.addEventListener("click", () => {
        this.clickFunction(item);
        this.tipArea.classList.add("hide");
      })
      listItem.textContent = item[attribute];
      this.tipArea.appendChild(listItem)
    }
  }

  #createElementWithClass(tag, className = "") {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  #slugfy = (text) => {
    const slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    
    return slug
  }
}