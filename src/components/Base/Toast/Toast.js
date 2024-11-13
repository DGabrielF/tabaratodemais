export class Toast {
  constructor({
    ignoreFade,
    template,
    templateUpdate,
    durationMS,
  }) {
    this.ignoreFade = ignoreFade;
    this.template = template;
    this.templateUpdate = templateUpdate;
    this.durationMS = durationMS;
  }

  create() {
    if (!this.ignoreFade) {
      this.createFade();
    };

    this.toast = this.#createElementWithClass("div", "toast");
    this.toast.classList.add("hide");

    if (!this.template) {
      this.createContent();
    } else {
      this.toast.appendChild(this.template);
    };

    return this.toast;
  };

  createContent() {
    this.title = this.#createElementWithClass("h2", "title");
    this.toast.appendChild(this.title);

    this.text = this.#createElementWithClass("h2", "title");
    this.toast.appendChild(this.text);
  }

  show({ title, text, type }) {
    console.log(this.ignoreFade)
    if (!this.ignoreFade) {
      this.fade.classList.remove("hide");
    }
    this.update({ title, text, type });
    this.toast.classList.remove("hide");
    this.toast.classList.add("start-input-animation");
    this.toast.addEventListener("animationend", (event) => {
      if (event.animationName === "inputAnimation") {
        this.toast.classList.remove("start-input-animation");
        if (this.durationMS) {
          setTimeout(() => {this.hide()}, this.durationMS);
        }
      } else if (event.animationName === "outputAnimation") {
        if (!this.ignoreFade) {
          this.fade.classList.add("hide");
        }
        this.toast.id = ""
        this.toast.classList.add("hide");
        this.toast.classList.remove("start-output-animation")
      }
    });
  };
  
  hide() {
    this.toast.classList.add("start-output-animation");
  };

  update({ title, text, type }) {
    if (!this.templateUpdate) {
      this.toast.id = `toast-${type}`;
      this.title.textContent = title;  
      this.text.textContent = text;
    } else {
      this.templateUpdate();
    }
  };

  createFade() {
    const body = document.querySelector("body");

    this.fade = this.#createElementWithClass("div", "fade");
    this.fade.classList.add("hide");
    this.fade.addEventListener("click", () => {
      this.hide();
    })
    body.appendChild(this.fade);
  };

  #createElementWithClass(tag, className = "") {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
}