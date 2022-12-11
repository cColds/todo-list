import { projectList } from "./project";
import { taskList } from "./task";

const populateStoredTasks = () => {
	const storedTasks = JSON.parse(localStorage.getItem("task", taskList));

	storedTasks.forEach((task) => taskList.push(task));
};

const checkTasksStored = () => {
	return !!JSON.parse(localStorage.getItem("task", taskList));
};

const populateStoredProjects = () => {
	const storedProjects = JSON.parse(
		localStorage.getItem("project", projectList)
	);

	storedProjects.forEach((project) => projectList.push(project));
};

const checkProjectsStored = () => {
	return !!JSON.parse(localStorage.getItem("project", projectList));
};

const getSelectedProjectIdStored = () => {
	return +JSON.parse(localStorage.getItem("project-id"));
};

const getSelectedProjectAttributeStored = () => {
	return localStorage.getItem("project-attribute");
};

export {
	populateStoredTasks,
	populateStoredProjects,
	checkTasksStored,
	checkProjectsStored,
	getSelectedProjectIdStored,
	getSelectedProjectAttributeStored,
};
