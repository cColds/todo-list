const taskProperties = (title, description, dueDate, priority, id) => {
	return { title, description, dueDate, priority, id };
};

const taskList = [];

const addTask = (title, description, dueDate, priority, id) => {
	taskList.push(taskProperties(title, description, dueDate, priority, id));
	console.log(taskList);
};

export { addTask };
