import {
	format,
	isToday,
	differenceInDays,
	formatISO,
	formatISO9075,
} from "date-fns";
import { pubSub } from "../pubsub";
import {
	getProjectId,
	getMainProjectId,
	isMainProjectSelected,
} from "../UI/navigation/switchProject.js";
import { projectList } from "./project";

const taskList = [];

const addTask = (title, description, dueDate, priority, id) => {
	taskList.push({ title, description, dueDate, priority, id });
};

pubSub.subscribe("complete-task-clicked", completeTask);

function completeTask(id) {
	taskList.splice(id, 1);
	updateId(taskList);
	console.log(taskList);
	isMainProjectSelected() ? filterMainProjectTasks() : filterProjectTasks();
}
// Get id of project that was just deleted
// for each task list delete each one that matches then rerender
// pubSub.subscribe("project-deleted", removeDeletedProjectTasks);

// function removeDeletedProjectTasks(id) {
// 	console.log(taskList);
// 	taskList.forEach((task) => {
// 		task.projectId === id;
// 		taskList.splice(task.id, 1);
// 	});
// 	console.log(taskList);
// }

pubSub.subscribe("task-edited", editTask);

function editTask(updatedProps) {
	taskList[updatedProps.id].title = updatedProps.title;
	taskList[updatedProps.id].description = updatedProps.description;
	taskList[updatedProps.id].dueDate = updatedProps.dueDate;
	taskList[updatedProps.id].priority = updatedProps.priority;
	filterMainProjectTasks();
}

pubSub.subscribe("task-submitted", (task) => {
	taskList.push(task);
	console.log(taskList);
	isMainProjectSelected() ? filterMainProjectTasks() : filterProjectTasks();
});

pubSub.subscribe("main-project-switched", filterMainProjectTasks);

function filterMainProjectTasks() {
	const mainProjectId = getMainProjectId();
	if (mainProjectId === 0) filterInbox();
	else if (mainProjectId === 1) filterToday();
	else filterWeek();
}

pubSub.subscribe("project-switched", filterProjectTasks);

function filterProjectTasks() {
	const projectId = getProjectId();
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
		const currentTime = new Date();
		const week = differenceInDays(new Date(task.dueDate), currentTime);
		if (week <= 7 && week >= 0) weekTaskList.push(task);
	});
	pubSub.publish("filter-task", weekTaskList);
};

export { addTask, completeTask, editTask, taskList, updateId };
