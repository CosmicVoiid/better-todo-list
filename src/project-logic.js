class Project {
	constructor(projectName, todo_list) {
		this.projectName = projectName;
		this.todo_list = todo_list;
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
		projectList.splice(index, i);
	}

	function changeName(newName, index) {
		projectList[index].projectName = newName;
	}

	return { makeProject, changeName, removeProject, projectList };
})();

export default projectLogic;
