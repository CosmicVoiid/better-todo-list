import projectLogic from "./project-logic.js";
import todoLogic from "./todo-logic.js";

const todoDOM = (() => {
	function addTodoButton() {
		if (todoLogic.isSelected() !== undefined) {
			const todoButton = document.querySelector("#todo-btn");
			todoButton.classList.remove("closed");

			const modalExit = document.querySelector("#modal-exit");

			modalExit.addEventListener("click", toggleModal);
			todoButton.addEventListener("click", toggleModal);
		} else removeTodoButton();
	}

	function toggleModal() {
		const modal = document.querySelector(".modal");
		const modalOverlay = document.querySelector(".modal-overlay");

		modal.classList.toggle("closed");
		modalOverlay.classList.toggle("closed");
	}

	function removeTodoButton() {
		const todoButton = document.querySelector("#todo-btn");
		todoButton.classList.add("closed");
	}

	const modalForm = document.querySelector("#modal-form");
	modalForm.addEventListener("submit", (e) => {
		e.preventDefault();
		formSubmit();
		toggleModal();
	});

	function formSubmit() {
		const todoName = document.querySelector("#todo-name");
		const todoDescription = document.querySelector("#todo-description");
		const todoDate = document.querySelector("#todo-date");
		const todoPriority = document.querySelector("#priority");

		let todo = todoLogic.makeTodo(
			todoName.value,
			todoDescription.value,
			todoDate.value,
			todoPriority.value
		);

		let index = todoLogic.isSelected();
		projectLogic.projectList[index].todo_list.push(todo);
		console.log(projectLogic.projectList[index]);
		displayTodo();
	}

	function displayTodo() {
		let index = todoLogic.isSelected();
		let list = projectLogic.projectList[index];
		clearTodo();
		console.log(list.todo_list);
		for (let i = 0; i < list.todo_list.length; i++) {
			makeTodoTag(list.todo_list[i]);
			console.log("test2");
		}
	}

	function clearTodo() {
		const content = document.querySelector("#content");
		const todoContainer = document.querySelectorAll(".todo-container");
		for (let i = 0; i < todoContainer.length; i++) {
			content.removeChild(todoContainer[i]);
		}
	}

	function makeTodoTag(obj) {
		const content = document.querySelector("#content");
		const todoContainer = document.createElement("div");
		const todoName = document.createElement("div");
		const todoDescription = document.createElement("div");
		const todoDate = document.createElement("input");

		todoName.textContent = obj.todoName;
		todoDescription.textContent = obj.description;
		todoDate.setAttribute("type", "date");
		todoDate.value = obj.date;

		todoContainer.classList.add("todo-container");

		todoContainer.appendChild(todoName);
		todoContainer.appendChild(todoDescription);
		todoContainer.appendChild(todoDate);
		content.append(todoContainer);
	}

	return { addTodoButton, removeTodoButton, displayTodo };
})();

export default todoDOM;
