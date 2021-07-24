import projectLogic from "./project-logic.js";

const projectDOM = (() => {
	const projectContainer = document.querySelector("#projects-container");
	const projectForm = document.querySelector("#add-project");
	// let index = -1;

	projectForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const projectText = document.querySelector(".project-name");
		addProjectToArray(projectText.value);
		render();
		projectText.value = "";
	});

	// function saves() {
	// 	let savedList = projectLogic.projectList;
	// 	for (let i = 0; i < savedList.length; i++) {
	// 		addProject(savedList[i].projectName, i);
	// 	}
	// }

	function addProject(inputName, i) {
		const project = document.createElement("div");
		const projectName = document.createElement("div");
		const edit = document.createElement("button");
		const del = document.createElement("button");

		project.classList.add("project");
		edit.classList.add("btn");
		del.classList.add("btn");
		edit.textContent = "E";
		del.textContent = "X";

		del.addEventListener("click", () => {
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
		let savedList = projectLogic.projectList;
		let list = projectLogic.projectList;
		console.log(list);
		for (i; i < savedList.length; i++) {
			addProject(savedList[i].projectName, i);
		}
		for (i; i < list.length; i++) {
			addProject(list[i].projectName, i);
		}
	}

	function clearProject() {
		// index = -1;
		while (projectContainer.firstChild) {
			projectContainer.removeChild(projectContainer.firstChild);
		}
	}

	function addProjectToArray(projectName) {
		projectLogic.makeProject(projectName, []);
	}

	function deleteProject(i) {
		console.log(i);
		const project = document.querySelectorAll(".project");
		projectContainer.removeChild(project[i]);
		projectLogic.removeProject(i);
		render();
	}

	return { addProject, render };
})();

export default projectDOM;
