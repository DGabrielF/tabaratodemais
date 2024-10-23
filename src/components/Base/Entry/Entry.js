export class Entry {
  constructor({
    placeholder = "", 
    mandatory = false, 
    types = "text", 
    toggleIcons
  }) {
    this.placeholder = placeholder;
    this.mandatory = mandatory;
    this.types = types;
    this.toggleIcons = toggleIcons;
  }

  create() {
    const inputArea = this.#createElementWithClass("div", "styled_input");
    
    this.label = this.#createElementWithClass("label", "styled_label");
    this.label.classList.add("hide");
    this.label.textContent = this.placeholder;
    inputArea.appendChild(this.label)
    
    this.field = this.#createElementWithClass("input", "styled_field");
    if (Array.isArray(this.types)) {
      this.typeIndex = 0;
      this.field.type = this.types[this.typeIndex];      
      this.button = document.createElement("button");
      this.button.addEventListener("click", () => {
        this.#toggleType();
      });
      inputArea.appendChild(this.button);
      if (this.toggleIcons) {  
        this.buttonImage = document.createElement("img");
        this.buttonImage.src = this.toggleIcons[this.typeIndex + 1];
      } else {
        this.button.textContent = this.types[this.typeIndex + 1];
      }
    } else if (typeof this.types === "string") {
      this.field.type = this.types;
    }

    this.field.placeholder = this.placeholder;
    this.field.addEventListener("focus", () => this.#showLabel());
    this.field.addEventListener("blur", () => {
      this.#hideLabel();
      if (this.mandatory && !this.field.value) {
        this.field.classList.add("error");
      } else {
        this.field.classList.remove("error");
      }
    });
    inputArea.appendChild(this.field);

    return inputArea
  }

  #toggleType() {
    this.typeIndex = this.#handleCurrentIndex(this.typeIndex + 1, this.types);
    this.field.type = this.types[this.typeIndex];
    if (this.toggleIcons) {
      this.buttonImage.src = this.toggleIcons[this.#handleCurrentIndex(this.typeIndex + 1, this.toggleIcons)];
    } else {
      this.button.textContent = this.types[this.#handleCurrentIndex(this.typeIndex + 1, this.types)];
    }
  }

  #showLabel() {
    this.label.classList.remove("hide");
    this.field.placeholder = "";
  }

  #hideLabel() {
    this.label.classList.add("hide");
    this.field.placeholder = this.placeholder;
  }

  #createElementWithClass(tag, className = "") {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  #handleCurrentIndex(newIndex, array) {
    return (newIndex + array.length) % array.length;
  }
}