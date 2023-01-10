import { isToday, isThisWeek, add } from "date-fns";
import pubSub from "../PubSub";

const Task = (function () {
	const taskList = [];

	function addTask(task) {
		taskList.push(task);
	}

	function updateId() {
		let updatedId = 0;
		taskList.forEach((item) => {
			item.id = updatedId;
			updatedId += 1;
		});
	}

	function filterInbox() {
		pubSub.publish("filter-tasks", taskList);
	}

	function filterToday() {
		const todayTaskList = taskList.filter((task) =>
			isToday(new Date(task.dueDate))
		);
		pubSub.publish("filter-tasks", todayTaskList);
	}

	function filterWeek() {
		const weekTaskList = taskList.filter((task) =>
			isThisWeek(new Date(task.dueDate))
		);
		pubSub.publish("filter-tasks", weekTaskList);
	}

	function completeTask(id) {
		taskList.splice(id, 1);
		updateId(taskList);
		localStorage.setItem("task", JSON.stringify(taskList));
	}
	// helperfunction can be used for project and task function

	function removeDeletedProjectTasks(projectId) {
		for (let i = taskList.length - 1; i >= 0; i -= 1) {
			if (taskList[i].projectId === projectId) {
				taskList.splice(i, 1);
			}
		}
	}

	function updateProjectId(projectId) {
		taskList.forEach((task) => {
			if (task.projectId > projectId) {
				task.projectId -= 1;
			}
		});
	}

	function editTask({ id, title, description, dueDate, priority }) {
		taskList[id].title = title;
		taskList[id].description = description;
		taskList[id].dueDate = dueDate;
		taskList[id].priority = priority;
		pubSub.publish("check-project-to-filter-tasks");
	}

	function render() {
		pubSub.subscribe("filter-inbox", filterInbox);
		pubSub.subscribe("filter-today", filterToday);
		pubSub.subscribe("filter-week", filterWeek);
		pubSub.subscribe("edit-task", editTask);
		pubSub.subscribe("deleted-project-tasks", removeDeletedProjectTasks);
		pubSub.subscribe("update-project-id", updateProjectId);
		pubSub.subscribe("add-task-to-task-list", addTask);
		pubSub.subscribe("complete-task-in-task-list", completeTask);
	}

	return { render, taskList };
})();

export default Task;
