import { updateId } from "./task.js";

const projectList = [];

const projectProperties = (title, id) => {
	return { title, id };
};

const addProject = (title, id) => {
	projectList.push(projectProperties(title, id));
};

const deleteProject = (id) => {
	projectList.splice(id, 1);
	updateId(projectList);
};

const editProject = (title, id) => {
	projectList[id] = projectProperties(title, id);
};

export { addProject, deleteProject, editProject };
