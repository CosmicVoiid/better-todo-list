import projectLogic from "./project-logic.js";
import todoLogic from "./todo-logic.js";
import todoDOM from "./todo-dom.js";

const projectDOM = (() => {
	const projectContainer = document.querySelector("#projects-container");
	const projectForm = document.querySelector("#add-project");

	projectForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const projectText = document.querySelector(".project-name");
		addProjectToArray(projectText.value);
		render();
		projectText.value = "";
	});

	function addProject(inputName, i) {
		const project = document.createElement("div");
		const projectName = document.createElement("div");
		// const edit = document.createElement("button");
		const edit = document.createElement("span");
		// const del = document.createElement("button");
		const del = document.createElement("span");

		project.classList.add("project");
		projectName.classList.add("project-title");
		edit.classList.add("btn");
		edit.classList.add("material-icons");
		del.classList.add("material-icons");
		del.classList.add("btn");
		// edit.textContent = "E";
		edit.textContent = "edit";
		del.textContent = "delete";

		projectName.addEventListener("click", (e) => {
			e.stopPropagation();
			deselectProject();
			projectLogic.select(i, true);
			render();
		});

		edit.addEventListener("click", (e) => {
			e.stopPropagation();
			editProject(i);
		});

		del.addEventListener("click", (e) => {
			e.stopPropagation();
			deleteProject(i);
		});

		projectName.textContent = inputName;

		project.appendChild(projectName);
		project.appendChild(edit);
		project.appendChild(del);

		projectContainer.appendChild(project);
	}

	function render() {
		clearProject();
		let i = 0;
		let list = projectLogic.projectList;
		console.log(list);
		for (i; i < list.length; i++) {
			addProject(list[i].projectName, i);
			if (list[i].selected === true) {
				selectProject(i);
				todoDOM.addTodoButton();
				todoDOM.displayTodo();
			}
		}
	}

	function clearProject() {
		while (projectContainer.firstChild) {
			projectContainer.removeChild(projectContainer.firstChild);
		}
	}

	function addProjectToArray(projectName) {
		projectLogic.makeProject(projectName, []);
	}

	function deleteProject(i) {
		const project = document.querySelectorAll(".project");
		projectContainer.removeChild(project[i]);
		projectLogic.removeProject(i);
		render();
		console.log(todoLogic.isSelected());
		todoDOM.clearTodo();
		if (todoLogic.isSelected() === undefined) {
			todoDOM.removeTodoButton();
		}
	}

	function editProject(i) {
		const project = document.querySelectorAll(".project");
		const projectTitle = document.querySelectorAll(".project-title");
		const editText = document.createElement("input");
		editText.classList.add("edit-text");
		editText.classList.add("project-name");
		editText.setAttribute("type", "text");
		editText.setAttribute("maxlength", "10");
		editText.value = projectLogic.projectList[i].projectName;
		project[i].removeChild(projectTitle[i]);
		project[i].appendChild(editText);
		editText.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				console.log("yes");
				projectLogic.changeName(editText.value, i);
				render();
			}
		});
	}

	function selectProject(i) {
		deselectProject();
		projectLogic.select(i, true);
		const projectTitle = document.querySelectorAll(".project-title");
		projectTitle[i].style.cssText = "font-weight: bold";
	}

	function deselectProject() {
		for (let i = 0; i < projectLogic.projectList.length; i++) {
			projectLogic.select(i, false);
		}
	}

	return { addProject, render };
})();

export default projectDOM;
