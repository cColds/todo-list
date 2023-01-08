import { isToday, isThisWeek } from "date-fns";
import pubSub from "../pubsub";
import {
	getSelectedProjectId,
	getSelectedMainProjectId,
	isMainProjectSelected,
} from "../UI/navigation/switchProject.js";
import { projectList } from "./project";
// is using ui logic in task
const taskList = [];

function addTask(title, description, dueDate, priority, id) {
	taskList.push({ title, description, dueDate, priority, id });
}

function updateId(arr) {
	let updatedId = 0;
	arr.forEach((item) => {
		item.id = updatedId;
		updatedId += 1;
	});
}

function filterInbox() {
	pubSub.publish("filter-task", taskList);
}

function filterToday() {
	const todayTaskList = [];
	taskList.forEach((task) => {
		if (isToday(new Date(task.dueDate))) todayTaskList.push(task);
	});
	pubSub.publish("filter-task", todayTaskList);
}

function filterWeek() {
	const weekTaskList = [];
	taskList.forEach((task) => {
		if (isThisWeek(new Date(task.dueDate))) weekTaskList.push(task);
	});
	pubSub.publish("filter-task", weekTaskList);
}

function filterMainProjectTasks() {
	localStorage.setItem("task", JSON.stringify(taskList));
	const mainProjectId = getSelectedMainProjectId();
	if (mainProjectId === 0) filterInbox();
	else if (mainProjectId === 1) filterToday();
	else filterWeek();
}

function filterProjectTasks() {
	localStorage.setItem("task", JSON.stringify(taskList));
	const projectId = getSelectedProjectId();
	const projectTask = projectList[projectId].task;
	projectTask.length = 0;
	taskList.forEach((task) => {
		if (task.projectId === projectId) projectTask.push(task);
	});
	pubSub.publish("filter-task", projectTask);
}

function projectTypeToFilter() {
	if (isMainProjectSelected()) filterMainProjectTasks();
	else filterProjectTasks();
}

function completeTask(id) {
	taskList.splice(id, 1);
	updateId(taskList);
	projectTypeToFilter();
	localStorage.setItem("task", JSON.stringify(taskList));
}

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
	projectTypeToFilter();
}

pubSub.subscribe("project-switched", filterProjectTasks);
pubSub.subscribe("task-edited", editTask);
pubSub.subscribe("complete-task-clicked", completeTask);
pubSub.subscribe("main-project-switched", filterMainProjectTasks);
pubSub.subscribe("task-submitted", (task) => {
	taskList.push(task);
	projectTypeToFilter();
});
pubSub.subscribe("project-delete-confirmed", (projectId) => {
	removeDeletedProjectTasks(projectId);
	updateId(taskList);
	updateProjectId(projectId);
	filterMainProjectTasks();
});

export {
	addTask,
	completeTask,
	editTask,
	taskList,
	updateId,
	filterMainProjectTasks,
	removeDeletedProjectTasks,
	projectTypeToFilter,
};
