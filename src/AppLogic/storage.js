import { projectList } from "./project";
import { taskList } from "./task";

const populateStoredTasks = () => {
	const storedTasks = JSON.parse(localStorage.getItem("task", taskList));

	storedTasks.forEach((task) => taskList.push(task));
};

const storedTaskCount = () => {
	return JSON.parse(localStorage.getItem("task", taskList)).length;
};

// populateStoredProjects

const populateStoredProjects = () => {
	const storedProjects = JSON.parse(
		localStorage.getItem("project", projectList)
	);

	storedProjects.forEach((project) => projectList.push(project));
};

const storedProjectCount = () => {
	return JSON.parse(localStorage.getItem("project", projectList)).length;
};

// saveSelectedProject

export {
	populateStoredTasks,
	populateStoredProjects,
	storedTaskCount,
	storedProjectCount,
};
