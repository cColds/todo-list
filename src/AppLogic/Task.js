import { isToday, isThisWeek } from "date-fns";
import pubSub from "../PubSub";
// import Project from "./Project";

const Task = (() => {
	const taskList = [];

	function addTask(task) {
		taskList.push(task);
		console.log(taskList);
	}

	function updateId() {
		let updatedId = 0;
		taskList.forEach((item) => {
			item.id = updatedId;
			updatedId += 1;
		});
	}

	function filterInboxTasks() {
		pubSub.publish("filter-tasks", taskList);
	}

	function filterTodayTasks() {
		const todayTasks = taskList.filter((task) =>
			isToday(new Date(task.dueDate))
		);
		pubSub.publish("filter-tasks", todayTasks);
	}

	function filterWeekTasks() {
		const weekTasks = taskList.filter((task) =>
			isThisWeek(new Date(task.dueDate))
		);
		pubSub.publish("filter-tasks", weekTasks);
	}

	function filterCustomProjectTasks(selectedProjectId) {
		const customProjectTasks = taskList.filter(
			(task) => task.projectId === selectedProjectId
		);
		pubSub.publish("filter-tasks", customProjectTasks);
	}

	function completeTask(id) {
		taskList.splice(id, 1);
		updateId(taskList);
		localStorage.setItem("task", JSON.stringify(taskList));
	}

	function updateTaskId() {
		for (let i = 0; i < taskList.length - 1; i += 1) {
			taskList[i].id = i;
		}
	}

	function updateTaskProjectId(projectId) {
		taskList.forEach((task) => {
			if (task.projectId > projectId) {
				task.projectId -= 1;
			}
		});
	}

	// need to remove project's tasks after deleting a project
	function deleteProjectTasks(projectId) {
		for (let i = taskList.length - 1; i >= 0; i -= 1) {
			console.log(projectId, taskList);
			if (taskList[i].projectId === projectId) {
				taskList.splice(i, 1);
			}
		}
	}

	function editTask(newTaskValue) {
		console.log("old", taskList);

		const index = newTaskValue.id;

		taskList[index].title = newTaskValue.title;
		taskList[index].dueDate = newTaskValue.dueDate;
		taskList[index].description = newTaskValue.description;
		taskList[index].priority = newTaskValue.priority;
		console.log("new", taskList);
	}

	function render() {
		pubSub.subscribe("filter-inbox-tasks", filterInboxTasks);
		pubSub.subscribe("filter-today-tasks", filterTodayTasks);
		pubSub.subscribe("filter-week-tasks", filterWeekTasks);
		pubSub.subscribe(
			"filter-custom-project-tasks",
			filterCustomProjectTasks
		);

		pubSub.subscribe("add-task", addTask);
		pubSub.subscribe("complete-task", completeTask);
		pubSub.subscribe("edit-task", editTask);
		pubSub.subscribe("delete-project-tasks", deleteProjectTasks);
		pubSub.subscribe("update-task-id", updateTaskId);
		pubSub.subscribe("update-task-project-id", updateTaskProjectId);

		// pubSub.subscribe("deleted-project-tasks", removeDeletedProjectTasks);
		// pubSub.subscribe("update-task-id", updateTaskId);
	}
	return { render, taskList };
})();

export default Task;
