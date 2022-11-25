const projectProperties = (title, id) => {
	return { title, id };
};

const projectList = [];

const addProject = (title, id) => {
	projectList.push(projectProperties(title, id));
	console.log(projectList);
};

const deleteProject = (id) => {
	projectList.splice(id, 1);
	console.log({ projectList });

	console.log({ projectList });
};

export { addProject, deleteProject };
