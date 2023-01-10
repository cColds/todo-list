import { isToday, isThisWeek } from "date-fns";
import pubSub from "../PubSub";
import Project from "./Project";

const Task = (() => {
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

	function filterInboxTasks() {
		pubSub.publish("filter-tasks", taskList);
	}

	function filterTodayTasks() {
		const todayTaskList = taskList.filter((task) =>
			isToday(new Date(task.dueDate))
		);
		pubSub.publish("filter-tasks", todayTaskList);
	}

	function filterWeekTasks() {
		const weekTaskList = taskList.filter((task) =>
			isThisWeek(new Date(task.dueDate))
		);
		pubSub.publish("filter-tasks", weekTaskList);
	}

	function filterCustomProjectTasks(projectId) {
		const selectedProject = Project.projectList[projectId];
		console.log(selectedProject);
	}

	function completeTask(id) {
		taskList.splice(id, 1);
		updateId(taskList);
		localStorage.setItem("task", JSON.stringify(taskList));
	}

	// function removeDeletedProjectTasks(projectId) {
	// 	for (let i = taskList.length - 1; i >= 0; i -= 1) {
	// 		if (taskList[i].projectId === projectId) {
	// 			taskList.splice(i, 1);
	// 		}
	// 	}
	// }

	// function updateProjectId(projectId) {
	// 	taskList.forEach((task) => {
	// 		if (task.projectId > projectId) {
	// 			task.projectId -= 1;
	// 		}
	// 	});
	// }

	function editTask({ id, title, description, dueDate, priority }) {
		taskList[id].title = title;
		taskList[id].description = description;
		taskList[id].dueDate = dueDate;
		taskList[id].priority = priority;
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

		// pubSub.subscribe("deleted-project-tasks", removeDeletedProjectTasks);
		// pubSub.subscribe("update-project-id", updateProjectId);
	}
	return { render, taskList };
})();

export default Task;
