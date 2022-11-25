const taskProperties = (title, description, dueDate, priority, id) => {
	return { title, description, dueDate, priority, id };
};

const taskList = [];

const addTask = (title, description, dueDate, priority, id) => {
	taskList.push(taskProperties(title, description, dueDate, priority, id));
	console.log(taskList);
};

const completeTask = (id) => {
	taskList.splice(id, 1);
	console.log({ taskList });
};

export { addTask, completeTask };
