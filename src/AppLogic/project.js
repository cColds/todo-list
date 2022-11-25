const projectProperties = (title, id) => {
	return { title, id };
};

const projectList = [];

const addProject = (title, id) => {
	projectList.push(projectProperties(title, id));
	console.log(projectList);
};

export { addProject };
