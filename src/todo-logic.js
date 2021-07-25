import projectLogic from "./project-logic.js";

class Todo {
	constructor(todoName, description, date, priority, completed) {
		this.todoName = todoName;
		this.description = description;
		this.date = date;
		this.priority = priority;
		this.completed = false;
	}
}

const todoLogic = (() => {
	let todoList = [];

	function makeTodo(todoName, description, date, priority) {
		let obj = new Todo(todoName, description, date, priority);
		todoList.push(obj);
		return obj;
	}

	function removeTodo(index) {
		todoList.splice(index, 1);
		saveProject(projectList);
	}

	function changeTodo(newName, index) {
		todoList[index].projectName = newName;
		saveProject(projectList);
	}

	function isSelected() {
		let list = projectLogic.projectList;
		for (let i = 0; i < list.length; i++) {
			if (list[i].selected === true) return i;
		}
	}

	return { isSelected, makeTodo };
})();

export default todoLogic;
