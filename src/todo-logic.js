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

	function sortList(list) {
		let newList = [];
		for (let i = 0; i < list.length; i++) {
			if (list[i].priority === "High") {
				newList.push(list[i]);
			}
		}
		for (let i = 0; i < list.length; i++) {
			if (list[i].priority === "Medium") {
				newList.push(list[i]);
			}
		}
		for (let i = 0; i < list.length; i++) {
			if (list[i].priority === "Low") {
				newList.push(list[i]);
			}
		}

		return newList;
	}

	function isSelected() {
		let list = projectLogic.projectList;
		for (let i = 0; i < list.length; i++) {
			if (list[i].selected === true) return i;
		}
	}

	return { isSelected, makeTodo, sortList };
})();

export default todoLogic;
