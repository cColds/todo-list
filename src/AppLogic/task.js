import { isToday, isThisWeek } from "date-fns";
import { pubSub } from "../pubsub";
import {
	getSelectedProjectId,
	getSelectedMainProjectId,
	isMainProjectSelected,
	getSelectedProject,
} from "../UI/navigation/switchProject.js";
import { projectList } from "./project";
import { populateStoredTasks, checkTasksStored } from "./storage";

addEventListener("load", () => {
	if (!checkTasksStored()) return;

	populateStoredTasks();
	projectToFilter();
});

const taskList = [];

const addTask = (title, description, dueDate, priority, id) => {
	taskList.push({ title, description, dueDate, priority, id });
};

const projectToFilter = () => {
	isMainProjectSelected() ? filterMainProjectTasks() : filterProjectTasks();
};

pubSub.subscribe("complete-task-clicked", completeTask);

function completeTask(id) {
	taskList.splice(id, 1);
	updateId(taskList);
	projectToFilter();
}

pubSub.subscribe("project-deleted", (projectId) => {
	removeDeletedProjectTasks(projectId);
	if (getSelectedProject()) {
		projectToFilter();
	}
});

const removeDeletedProjectTasks = (projectId) => {
	for (let i = taskList.length - 1; i >= 0; i--) {
		if (taskList[i].projectId === projectId) {
			taskList.splice(i, 1);
		}
	}
};

pubSub.subscribe("task-edited", editTask);

function editTask(updatedProps) {
	taskList[updatedProps.id].title = updatedProps.title;
	taskList[updatedProps.id].description = updatedProps.description;
	taskList[updatedProps.id].dueDate = updatedProps.dueDate;
	taskList[updatedProps.id].priority = updatedProps.priority;
	projectToFilter();
}

pubSub.subscribe("task-submitted", (task) => {
	taskList.push(task);
	projectToFilter();
});

pubSub.subscribe("main-project-switched", filterMainProjectTasks);

function filterMainProjectTasks() {
	localStorage.setItem("task", JSON.stringify(taskList));
	const mainProjectId = getSelectedMainProjectId();
	if (mainProjectId === 0) filterInbox();
	else if (mainProjectId === 1) filterToday();
	else filterWeek();
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
};
