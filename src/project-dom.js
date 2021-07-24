import projectLogic from "./project-logic.js";

const projectDOM = (() => {
	const projectContainer = document.querySelector("#projects-container");
	const projectForm = document.querySelector("#add-project");

	projectForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const projectText = document.querySelector(".project-name");
		addProject(projectText.value);
		addProjectToArray(projectText.value);
		projectText.value = "";
	});

	function saves() {
		let savedList = projectLogic.getProject();
		for (let i = 0; i < savedList.length; i++) {
			addProject(savedList[i].projectName);
			console.log(savedList[i].projectName);
		}
	}

	function addProject(inputName) {
		const project = document.createElement("div");
		const projectName = document.createElement("div");
		const edit = document.createElement("button");
		const del = document.createElement("button");

		project.classList.add("project");
		edit.classList.add("btn");
		del.classList.add("btn");
		edit.textContent = "E";
		del.textContent = "X";

		projectName.textContent = inputName;

		project.appendChild(projectName);
		project.appendChild(edit);
		project.appendChild(del);

		projectContainer.appendChild(project);
	}

	function addProjectToArray(projectName) {
		projectLogic.makeProject(projectName, []);
	}

	return { addProject, saves };
})();

export default projectDOM;
