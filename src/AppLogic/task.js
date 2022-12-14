import { isToday, isThisWeek } from "date-fns";
import { pubSub } from "../pubsub";
import {
	getSelectedProjectId,
	getSelectedMainProjectId,
	isMainProjectSelected,
} from "../UI/navigation/switchProject.js";
import { projectList } from "./project";

const taskList = [];

const addTask = (title, description, dueDate, priority, id) => {
	taskList.push({ title, description, dueDate, priority, id });
};

const projectTypeToFilter = () => {
	isMainProjectSelected() ? filterMainProjectTasks() : filterProjectTasks();
};

pubSub.subscribe("complete-task-clicked", completeTask);

function completeTask(id) {
	taskList.splice(id, 1);
	updateId(taskList);
	projectTypeToFilter();
	localStorage.setItem("task", taskList);
}

pubSub.subscribe("project-delete-confirmed", (projectId) => {
	removeDeletedProjectTasks(projectId);
	updateId(taskList);
	updateProjectId(projectId);
	filterMainProjectTasks();
});

const removeDeletedProjectTasks = (projectId) => {
	for (let i = taskList.length - 1; i >= 0; i--) {
		if (taskList[i].projectId === projectId) {
			taskList.splice(i, 1);
		}
	}
};

// look for index/id spliced and re-adjust the id greater than it

const updateProjectId = (projectId) => {
	taskList.forEach((task) => {
		if (task.projectId > projectId) {
			task.projectId = task.projectId - 1;
		}
	});
};

pubSub.subscribe("task-edited", editTask);

function editTask({ id, title, description, dueDate, priority }) {
	taskList[id].title = title;
	taskList[id].description = description;
	taskList[id].dueDate = dueDate;
	taskList[id].priority = priority;
	projectTypeToFilter();
}

pubSub.subscribe("task-submitted", (task) => {
	taskList.push(task);
	projectTypeToFilter();
});

pubSub.subscribe("main-project-switched", filterMainProjectTasks);

function filterMainProjectTasks() {
	localStorage.setItem("task", JSON.stringify(taskList));
	const mainProjectId = getSelectedMainProjectId();
	if (mainProjectId === 0) filterInbox();
	else if (mainProjectId === 1) filterToday();
	else filterWeek();
	console.log(taskList);
}

pubSub.subscribe("project-switched", filterProjectTasks);

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

const filterInbox = () => {
	pubSub.publish("filter-task", taskList);
};

const filterToday = () => {
	const todayTaskList = [];
	taskList.forEach((task) => {
		if (isToday(new Date(task.dueDate))) todayTaskList.push(task);
	});
	pubSub.publish("filter-task", todayTaskList);
};

const updateId = (arr) => {
	let updatedId = 0;
	arr.forEach((item) => {
		item.id = updatedId;
		updatedId++;
	});
};

const filterWeek = () => {
	const weekTaskList = [];
	taskList.forEach((task) => {
		if (isThisWeek(new Date(task.dueDate))) weekTaskList.push(task);
	});
	pubSub.publish("filter-task", weekTaskList);
};

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
