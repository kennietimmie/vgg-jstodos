/**
 * Helps in building the DOM Elements
 */
class TodoDOMBuilder {
  constructor(targetElement, name, timestamp, content) {
    this.targetElement = targetElement;
    this.element = null;
    this.li = TodoDOMBuilder.createElement("li", {
      id: ""
    });
    this.toast = TodoDOMBuilder.createElement("div", {
      classList: "toast"
    });
    this.toastHeader = TodoDOMBuilder.createElement("div", {
      classList: "toast-header"
    });
    this.toastInput = TodoDOMBuilder.createElement("input", {
      classList: "toast-bar",
      type: "checkbox"
    });
    this.toastTitle = TodoDOMBuilder.createElement("strong", {
      classList: "toast-title",
      textContent: `${name}`
    });
    this.toastTimestamp = TodoDOMBuilder.createElement("small", {
      classList: "toast-time",
      textContent: `${timestamp}`
    });
    this.toastCancel = TodoDOMBuilder.createElement("button", {
      type: "button",
      classList: "close",
      textContent: "×"
    });
    this.toastBody = TodoDOMBuilder.createElement("div", {
      classList: "toast-body",
      textContent: `${content}`
    });

    this.header = TodoDOMBuilder.appendChild(
      TodoDOMBuilder.appendChild(
        TodoDOMBuilder.appendChild(this.toastHeader, this.toastTitle),
        this.toastTimestamp
      ),
      this.toastCancel
    );
    this.container = TodoDOMBuilder.appendChild(
      TodoDOMBuilder.appendChild(this.toast, this.header),
      this.toastBody
    );
    this.element = TodoDOMBuilder.appendChild(
      TodoDOMBuilder.appendChild(this.li, this.toastInput),
      this.container
    );
    TodoDOMBuilder.appendChild(this.targetElement, this.element);
  }
  /**
   * Create DOM elements, with specific attribute on the fly
   * @param string tagName name fo the element to create
   * @return object of the newly created element
   */
  static createElement(tagName, props) {
    return Object.assign(document.createElement(tagName), props || {});
  }

  /**
   * append two DOM elements together
   * @param HTMLNode parent name for containing element
   * @param HTMLNode child name for appending element
   * @return object of the newly append element
   */
  static appendChild(parent, child) {
    if (child) parent.appendChild(child);
    return parent;
  }

  get getTodoDOM() {
    return this.element;
  }
}

/**
 * Makes the todo
 */
class Todo extends TodoDOMBuilder {
  constructor(targetElement, name, timestamp, content) {
    super(targetElement, name, timestamp, content);
    this.todo = {
      targetElement: targetElement,
      element: super.getTodoDOM,
      options: {
        name: name,
        timestamp: timestamp,
        content: content
      }
    };
    this.todo.element.querySelector(".close").addEventListener("click", () => {
      this.todo.element.remove();
    });
  }
  /**
   * Get a todo
   */
  get getTodo() {
    return this.todo;
  }
}

let formElement = document.querySelector("form#todos");
let todoName = formElement.querySelector("#todoName");
let todoTimestamp = formElement.querySelector("#todoTimestamp");
let todoDescription = formElement.querySelector("#todoDescription");

try {
  formElement.onsubmit = e => {
    e.preventDefault();
    let targetElement = document.querySelector("#todoLists");
    let todo = new Todo(
      targetElement,
      todoName.value.trim(),
      `${new Date(todoTimestamp.value).toDateString()} 
      ${new Date(todoTimestamp.value).toLocaleTimeString()} `,
      todoDescription.value.trim()
    );
    console.log(todo.getTodo);
  };
} catch (e) {}
