import { updateId } from "./helperFunction";

const projectList = [];

const projectProperties = (title, id) => {
	return { title, id };
};

const addProject = (title, id) => {
	projectList.push(projectProperties(title, id));
	console.log(projectList);
};

const deleteProject = (id) => {
	projectList.splice(id, 1);
	updateId(projectList);
	console.log(projectList);
};

const editProject = (title, id) => {
	projectList[id] = projectProperties(title, id);
};

export { addProject, deleteProject, editProject };
