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
	}

	function displayTodo() {}

	return { addTodoButton, removeTodoButton };
})();

export default todoDOM;
