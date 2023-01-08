import { projectList } from "./project";
import { taskList } from "./task";

const getLocalStorageItem = (item) => JSON.parse(localStorage.getItem(item));

function populateStoredTasks() {
	const storedTasks = getLocalStorageItem("task");
	storedTasks.forEach((task) => taskList.push(task));
}

function checkTasksStored() {
	const storedTasks = getLocalStorageItem("task");
	if (storedTasks == null) return;

	return storedTasks.length ? true : false;
}

function checkProjectsStored() {
	const storedProjects = getLocalStorageItem("project");
	if (storedProjects == null) return;

	return storedProjects.length ? true : false;
}

function populateStoredProjects() {
	const storedProjects = getLocalStorageItem("project");

	storedProjects.forEach((project) => {
		projectList.push(project);
	});
}

function getSelectedProjectIdStored() {
	return +getLocalStorageItem("project-id");
}

function getSelectedProjectAttributeStored() {
	return localStorage.getItem("project-attribute");
}

export {
	populateStoredTasks,
	populateStoredProjects,
	checkTasksStored,
	checkProjectsStored,
	getSelectedProjectIdStored,
	getSelectedProjectAttributeStored,
};
