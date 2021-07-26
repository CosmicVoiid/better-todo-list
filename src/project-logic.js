class Project {
	constructor(projectName, todo_list, selected) {
		this.projectName = projectName;
		this.todo_list = todo_list;
		this.selected = false;
	}
}

const projectLogic = (() => {
	let projectList = JSON.parse(localStorage.getItem("task.projects")) || [];

	function saveProject(project) {
		localStorage.setItem("task.projects", JSON.stringify(project));
	}

	function makeProject(projectName, todo_list) {
		let obj = new Project(projectName, todo_list);
		projectList.push(obj);
		console.log({ projectList });
		saveProject(projectList);
	}

	function removeProject(index) {
		projectList.splice(index, 1);
		saveProject(projectList);
	}

	function changeName(newName, index) {
		projectList[index].projectName = newName;
		saveProject(projectList);
	}

	function select(index, bool) {
		projectList[index].selected = bool;
		saveProject(projectList);
	}

	return {
		makeProject,
		changeName,
		removeProject,
		select,
		saveProject,
		projectList,
	};
})();

export default projectLogic;
