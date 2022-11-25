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
	updateProjectId();
	console.log({ projectList });
};

const updateProjectId = () => {
	let updatedId = 0;
	projectList.forEach((project) => {
		project.id = updatedId;
		updatedId++;
	});
};

const editProject = (title, id) => {
	projectList[id] = projectProperties(title, id);
	console.log(projectList);
};

export { addProject, deleteProject, editProject };
