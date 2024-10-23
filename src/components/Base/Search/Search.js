export class Search {
  constructor({
    baseArray,
    styledInput,
  }) {
    this.baseArray = baseArray;
    this.styledInput = styledInput;
  }

  create() {
    this.search = this.#createElementWithClass("div", "search");

    this.input = (this.styledInput) ? this.styledInput : this.#createInput();
    this.input.addEventListener("input", (event) => this.updateTip(event))
    this.search.appendChild(this.input)

    return this.search;
  }

  updateTip(event) {
    console.log(event.target.value)
    console.log(this.baseArray)
    const filtered = this.#filterItems(event.target.value, this.baseArray, ["text"])
    console.log(filtered)
  }

  #filterItems(text, array, attribute = 'text') {
    return array.filter(item => {
        const matchText = typeof item[attribute] === 'string' && this.#slugfy(item[attribute]).includes(this.#slugfy(text));
        
        // Percorre os atributos do objeto recursivamente, caso o item seja um objeto
        const matchAtributosAninhados = Object.values(item).some(value => {
            if (typeof value === 'object' && value !== null) {
                // Se o valor for um objeto ou array, chama a função recursivamente
                return Array.isArray(value)
                    ? this.#filterItems(text, value, attribute).length > 0
                    : this.#filterItems(text, [value], attribute).length > 0;
            }
            return false;
        });
        
        // Retorna verdadeiro se o texto ou qualquer atributo aninhado corresponder
        return matchText || matchAtributosAninhados;
    });
}

  #createInput() {
    const input = this.#createElementWithClass("input");
    return input
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