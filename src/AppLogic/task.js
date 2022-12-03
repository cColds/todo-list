import { pubSub } from "../pubsub";
import { updateId } from "./helperFunction";

const taskList = [];

const taskProperties = (title, description, dueDate, priority, id) => {
	return { title, description, dueDate, priority, id };
};

const addTask = (title, description, dueDate, priority, id) => {
	taskList.push(taskProperties(title, description, dueDate, priority, id));
};

const completeTask = (id) => {
	taskList.splice(id, 1);
	updateId(taskList);
};

pubSub.subscribe("task-submitted", (task) => {
	const taskId = taskList.length;
	taskList.push(task);
	console.log(taskList);
	pubSub.publish("task-pushed");
});

const editTask = (title, description, dueDate, priority, id) => {
	taskList[id] = taskProperties(title, description, dueDate, priority, id);
};

export { addTask, completeTask, editTask, taskList };
