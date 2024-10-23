export class Menu {
  constructor({
    items,
    clickFunction = console.log,
    showMenuFunction,
    closeMenuFunction,
    openIconSrc = "menu",
    closeIconSrc = "X"
  }) {
    this.items = items;
    this.clickFunction = clickFunction;
    this.showMenuFunction = showMenuFunction;
    this.closeMenuFunction = closeMenuFunction;
    this.openIconSrc = openIconSrc;
    this.closeIconSrc = closeIconSrc;
  }

  create() {
    this.menu = this.#createElementWithClass("div", "menu");

    this.#createToggleIcons();

    this.#createOptionArea();

    return this.menu;
  }

  #createToggleIcons() {
    this.#createMenuIcon();
    this.#createCloseMenuIcon();
  }

  #createMenuIcon() {
    this.menuIcon = this.#createElementWithClass("button");
    this.menuIcon.addEventListener("click", () => {
      this.#showOptionArea();
    });
    if (this.openIconSrc !== "menu") {
      const image = this.#createElementWithClass("img");
      image.src = this.openIconSrc;
      this.menuIcon.appendChild(image);
    } else {
      this.menuIcon.textContent = "menu";
    }
    this.menu.appendChild(this.menuIcon);
  }

  #showOptionArea() {
    this.menuIcon.classList.add("hide");
    this.closeIcon.classList.remove("hide");
    this.optionsArea.classList.add("show");
    if (this.showMenuFunction) {
      () => this.showMenuFunction();
    }
  }

  #createCloseMenuIcon() {
    this.closeIcon = this.#createElementWithClass("button", "hide");
    this.closeIcon.addEventListener("click", () => {
      this.#hideOptionArea();
    });
    if (this.closeIconSrc !== "X") {
      const image = this.#createElementWithClass("img");
      image.src = this.closeIconSrc;
      this.closeIcon.appendChild(image);
    } else {
      this.closeIcon.textContent = "X";
    }
    this.menu.appendChild(this.closeIcon);
  }

  #hideOptionArea() {
    this.closeIcon.classList.add("hide");
    this.menuIcon.classList.remove("hide");
    this.optionsArea.classList.remove("show");
    if (this.closeMenuFunction) {
      this.closeMenuFunction();
    }
  }

  #createOptionArea() {
    this.optionsArea = this.#createElementWithClass("nav", "droppable");
    for (let i = 0; i < this.items.length; i++) {
      this.#createOption(this.items[i])
    }
    this.menu.appendChild(this.optionsArea);
  }

  #createOption(item) {
    const option = this.#createElementWithClass("button");
    option.textContent = item.text;

    if (Array.isArray(item.options) && item.options.length > 0) {
      const suboptions = this.#createElementWithClass("div", "submenu");
      suboptions.classList.add("hide");
      option.appendChild(suboptions);

      option.addEventListener("click", () => {
        if (suboptions.classList.contains("hide")) {
          this.#closeAllSubmenus();
          suboptions.classList.remove("hide");
        } else {
          this.#closeAllSubmenus();
        }
      })

      item.options.forEach((suboption) => {
        const button = this.#createElementWithClass("button");
        button.textContent = suboption.text;
        button.addEventListener("click", () =>{
          this.clickFunction(suboption.key);
          this.#closeAllSubmenus();
          this.#hideOptionArea();
        })
        suboptions.appendChild(button)
      })
    } else {
      option.addEventListener("click", () => {
        this.clickFunction(item.key);
        this.#hideOptionArea();
      })
    }
    this.optionsArea.appendChild(option)
  }

  #closeAllSubmenus() {
    const submenus = this.menu.querySelectorAll(".submenu");
    submenus.forEach(element => {
      if (!element.classList.contains("hide")) {
        element.classList.add("hide");
      }
    });
  }

  #createElementWithClass(tag, className = "") {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
}