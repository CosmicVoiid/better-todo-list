import projectLogic from "./project-logic.js";

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
		const edit = document.createElement("button");
		const del = document.createElement("button");

		project.classList.add("project");
		projectName.classList.add("project-title");
		edit.classList.add("btn");
		del.classList.add("btn");
		edit.textContent = "E";
		del.textContent = "X";

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
	}

	function editProject(i) {
		const project = document.querySelectorAll(".project");
		const projectTitle = document.querySelectorAll(".project-title");
		const editText = document.createElement("input");
		editText.classList.add("edit-text");
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
		const project = document.querySelectorAll(".project");
		project[i].style.cssText = "background-color: lightblue";
	}

	function deselectProject() {
		for (let i = 0; i < projectLogic.projectList.length; i++) {
			projectLogic.select(i, false);
		}
	}

	return { addProject, render };
})();

export default projectDOM;
