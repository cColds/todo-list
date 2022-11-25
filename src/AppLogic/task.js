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
	updateTaskId();
	console.log({ taskList });
};

const updateTaskId = () => {
	let updatedId = 0;
	taskList.forEach((task) => {
		task.id = updatedId;
		updatedId++;
	});
};

const editTask = (title, description, dueDate, priority, id) => {
	taskList[id] = taskProperties(title, description, dueDate, priority, id);
};

export { addTask, completeTask, editTask };
