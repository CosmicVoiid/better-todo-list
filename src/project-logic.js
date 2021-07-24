class Project {
	constructor(projectName, todo_list) {
		this.projectName = projectName;
		this.todo_list = todo_list;
	}
}

const projectLogic = (() => {
	let projectList = [];

	function saveProject(project) {
		localStorage.setItem("projects", JSON.stringify(project));
	}

	function getProject() {
		return JSON.parse(localStorage.getItem("projects"));
	}

	function makeProject(projectName, todo_list) {
		let obj = new Project(projectName, todo_list);
		projectList.push(obj);
		console.log({ projectList });
		saveProject(obj);
	}

	function removeProject(index) {
		projectList.splice(index, i);
	}

	function changeName(newName, index) {
		projectList[index].projectName = newName;
	}

	return { makeProject, changeName, removeProject, getProject };
})();

export default projectLogic;
