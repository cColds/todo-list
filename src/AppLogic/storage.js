import { projectList } from "./project";
import { taskList } from "./task";

const getLocalStorageItem = (item) =>
	JSON.parse(localStorage.getItem(item) || "[]");

const getSelectedProjectIdStored = () => +getLocalStorageItem("project-id");

const getSelectedProjectAttributeStored = () =>
	localStorage.getItem("project-attribute");

function populateStoredTasks() {
	const storedTasks = getLocalStorageItem("task");
	storedTasks.forEach((task) => taskList.push(task));
}

function checkTasksStored() {
	const storedTasks = getLocalStorageItem("task");
	return storedTasks.length !== 0;
}

function checkProjectsStored() {
	const storedProjects = getLocalStorageItem("project");
	return storedProjects.length !== 0;
}

function populateStoredProjects() {
	const storedProjects = getLocalStorageItem("project");

	storedProjects.forEach((project) => {
		projectList.push(project);
	});
}

export {
	populateStoredTasks,
	populateStoredProjects,
	checkTasksStored,
	checkProjectsStored,
	getSelectedProjectIdStored,
	getSelectedProjectAttributeStored,
};
