import { isToday, isThisWeek } from "date-fns";
import pubSub from "../PubSub";

const Task = (function () {
	const taskList = [];

	// function addTask(title, description, dueDate, priority, id) {
	// 	taskList.push({ title, description, dueDate, priority, id });
	// }

	function updateId() {
		let updatedId = 0;
		taskList.forEach((item) => {
			item.id = updatedId;
			updatedId += 1;
		});
	}

	function filterInbox() {
		pubSub.publish("filter-task", taskList);
	}

	function filterToday() {
		const todayTaskList = taskList.filter((task) =>
			isToday(new Date(task.dueDate))
		);
		pubSub.publish("filter-task", todayTaskList);
	}

	function filterWeek() {
		const weekTaskList = taskList.filter((task) =>
			isThisWeek(new Date(task.dueDate))
		);
		pubSub.publish("filter-task", weekTaskList);
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
		pubSub.publish("check-project-type-to-filter");
	}

	function render() {
		pubSub.subscribe("inbox-selected", filterInbox);
		pubSub.subscribe("today-selected", filterToday);
		pubSub.subscribe("week-selected", filterWeek);
		// pubSub.subscribe('custom-project-selected',)
		pubSub.subscribe("edit-task", editTask);
		pubSub.subscribe("complete-task", completeTask);
		pubSub.subscribe("task-submitted");
		pubSub.subscribe("deleted-project-tasks", removeDeletedProjectTasks);
		pubSub.subscribe("update-project-id", updateProjectId);
	}

	return { render, taskList };
})();

export default Task;

// pubSub.subscribe("project-switched", filterProjectTasks);
// pubSub.subscribe("main-project-switched", filterMainProjectTasks);
// pubSub.subscribe("project-edited", changeEditedTitle);
// 		pubSub.subscribe("project-clicked", switchProject);
// 		pubSub.subscribe("project-delete-confirmed", defaultToInboxProject);

// pubSub.subscribe("project-switched", filterProjectTasks);
// pubSub.subscribe("task-edited", editTask);
// pubSub.subscribe("complete-task-clicked", completeTask);
// pubSub.subscribe("main-project-switched", filterMainProjectTasks);
// pubSub.subscribe("task-submitted", (task) => {
// 	taskList.push(task);
// 	projectTypeToFilter();
// });
// pubSub.subscribe("project-delete-confirmed", (projectId) => {
// 	removeDeletedProjectTasks(projectId);
// 	updateId(taskList);
// 	updateProjectId(projectId);
// 	filterMainProjectTasks();
// });

// export {
// 	addTask,
// 	completeTask,
// 	editTask,
// 	taskList,
// 	updateId,
// 	filterMainProjectTasks,
// 	removeDeletedProjectTasks,
// 	projectTypeToFilter,
// };
