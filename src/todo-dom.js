import todoLogic from "./todo-logic.js";

const todoDOM = (() => {
	function addTodoButton() {
		if (todoLogic.isSelected() !== null) {
			const content = document.querySelector("#content");
			const todoButton = document.createElement("button");
			todoButton.classList.add("btn");
			todoButton.setAttribute("id", "todo-btn");
			todoButton.textContent = "+";
			content.appendChild(todoButton);
		}
	}
	return { addTodoButton };
})();

export default todoDOM;
