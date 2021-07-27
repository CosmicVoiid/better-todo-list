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

	function modalFlow() {
		const todoName = document.querySelector("#todo-name");
		const todoDescription = document.querySelector("#todo-description");
		const todoDate = document.querySelector("#todo-date");
		const todoPriority = document.querySelector("#priority");
		formSubmit();
		todoName.value = "";
		todoDescription.value = "";
		todoDate.value = "";
		todoPriority.value = "Low";
		toggleModal();
	}

	const modalForm = document.querySelector("#modal-form");
	modalForm.addEventListener("submit", (e) => {
		e.preventDefault();
	});
	modalForm.addEventListener("submit", modalFlow);

	function formSubmit() {
		const todoName = document.querySelector("#todo-name");
		const todoDescription = document.querySelector("#todo-description");
		const todoDate = document.querySelector("#todo-date").value;
		const todoPriority = document.querySelector("#priority");

		let todo = todoLogic.makeTodo(
			todoName.value,
			todoDescription.value,
			todoDate,
			todoPriority.value
		);

		let index = todoLogic.isSelected();
		projectLogic.projectList[index].todo_list.push(todo);
		projectLogic.projectList[index].todo_list = todoLogic.sortList(
			projectLogic.projectList[index].todo_list
		);
		projectLogic.saveProject(projectLogic.projectList);
		console.log(projectLogic.projectList[index]);
		displayTodo();
	}

	function displayTodo() {
		let index = todoLogic.isSelected();
		let list = projectLogic.projectList[index];
		const content = document.querySelector("#content");
		const projectName = document.createElement("h1");
		projectName.setAttribute("id", "content-title");
		content.appendChild(projectName);
		clearTodo();
		const projectTitle =
			projectLogic.projectList[todoLogic.isSelected()].projectName;
		projectName.textContent = projectTitle;
		content.appendChild(projectName);
		console.log(list.todo_list);
		for (let i = 0; i < list.todo_list.length; i++) {
			makeTodoTag(list.todo_list[i], i);
			console.log("test2");
		}
	}

	function clearTodo() {
		const content = document.querySelector("#content");
		const projectTitle = document.querySelector("#content-title");
		const todoContainer = document.querySelectorAll(".todo-container");
		for (let i = 0; i < todoContainer.length; i++) {
			content.removeChild(todoContainer[i]);
		}
		content.removeChild(projectTitle);

		// while (content.firstChild) {
		// 	content.removeChild(content.firstChild);
		// }
	}

	function makeTodoTag(obj, i) {
		const content = document.querySelector("#content");
		const projectName = document.createElement("h1");
		const todoContainer = document.createElement("div");
		const check = document.createElement("input");
		const checkLabel = document.createElement("label");
		const checkSpan = document.createElement("span");
		const leftContainer = document.createElement("div");
		const todoText = document.createElement("div");
		const todoName = document.createElement("h3");
		const todoDescription = document.createElement("div");
		const todoDate = document.createElement("input");
		const rightContainer = document.createElement("div");
		const edit = document.createElement("button");
		const del = document.createElement("button");

		const projectTitle =
			projectLogic.projectList[todoLogic.isSelected()].projectName;
		projectName.textContent = projectTitle;

		todoName.textContent = obj.todoName;
		todoDescription.textContent = obj.description;
		todoDate.setAttribute("type", "date");
		todoDate.value = obj.date;
		todoDate.classList.add("todo-date-div");
		check.setAttribute("type", "checkbox");
		edit.textContent = "E";
		del.textContent = "X";

		todoText.classList.add("todo-text");
		todoContainer.classList.add("todo-container");
		check.classList.add("custom-checkbox");
		edit.classList.add("btn");
		del.classList.add("btn");
		leftContainer.classList.add("left-container");

		edit.addEventListener("click", () => {
			editTodo(i);
		});

		del.addEventListener("click", () => {
			console.log(i);
			deleteTodo(i);
		});

		todoDate.addEventListener("change", () => {
			obj.date = todoDate.value;
			projectLogic.saveProject(projectLogic.projectList);
		});

		check.addEventListener("click", () => {
			obj.completed = check.checked;
			projectLogic.saveProject(projectLogic.projectList);
		});

		check.checked = obj.completed;

		if (obj.priority === "High")
			checkSpan.style.cssText = "border-color: red; --checkColor: red";
		if (obj.priority === "Medium")
			checkSpan.style.cssText = "border-color: orange; --checkColor: orange";
		if (obj.priority === "Low")
			checkSpan.style.cssText = "border-color: green; --checkColor: green";

		checkLabel.appendChild(check);
		checkLabel.appendChild(checkSpan);
		checkSpan.classList.add("custom-checkbox");
		todoText.appendChild(todoName);
		todoText.appendChild(todoDescription);
		leftContainer.appendChild(checkLabel);
		leftContainer.appendChild(todoText);
		rightContainer.appendChild(todoDate);
		rightContainer.appendChild(edit);
		rightContainer.appendChild(del);
		// todoContainer.appendChild(check);
		todoContainer.appendChild(leftContainer);
		// todoContainer.appendChild(todoText);
		todoContainer.appendChild(rightContainer);

		content.appendChild(todoContainer);
	}

	function editTodo(i) {
		let list = projectLogic.projectList[todoLogic.isSelected()].todo_list;
		const todoName = document.querySelector("#todo-name");
		const todoDescription = document.querySelector("#todo-description");
		const todoDate = document.querySelector("#todo-date");
		const todoPriority = document.querySelector("#priority");

		todoName.value = list[i].todoName;
		todoDescription.value = list[i].description;
		todoDate.value = list[i].date;
		todoPriority.value = list[i].priority;
		toggleModal();

		modalForm.removeEventListener("submit", modalFlow);

		modalForm.addEventListener("submit", function todoEditForm() {
			list[i].todoName = todoName.value;
			list[i].description = todoDescription.value;
			list[i].date = todoDate.value;
			list[i].priority = todoPriority.value;
			let index = todoLogic.isSelected();
			projectLogic.projectList[index].todo_list = todoLogic.sortList(
				projectLogic.projectList[index].todo_list
			);
			clearTodo();
			displayTodo();
			toggleModal();
			todoName.value = "";
			todoDescription.value = "";
			todoDate.value = "";
			todoPriority.value = "Low";
			projectLogic.saveProject(projectLogic.projectList);
			this.removeEventListener("submit", todoEditForm);
			modalForm.addEventListener("submit", modalFlow);
		});
	}

	function deleteTodo(i) {
		let list = projectLogic.projectList[todoLogic.isSelected()].todo_list;
		list.splice(i, 1);
		projectLogic.saveProject(projectLogic.projectList);
		displayTodo();
	}

	return { addTodoButton, removeTodoButton, displayTodo };
})();

export default todoDOM;
