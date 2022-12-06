import { format, isToday } from "date-fns";
import { pubSub } from "../pubsub";
import { getProjectName } from "../UI/navigation/switchProject.js";

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

const editTask = (title, description, dueDate, priority, id) => {
	taskList[id] = taskProperties(title, description, dueDate, priority, id);
};

pubSub.subscribe("task-submitted", (task) => {
	taskList.push(task);
	pubSub.publish("task-pushed", task);
});

pubSub.subscribe("switch-main-project", filterTasks);
pubSub.subscribe("task-pushed", filterTasks);

function filterTasks() {
	const selectedProjectName = getProjectName();
	if (selectedProjectName === "Inbox") filterInbox();
	else if (selectedProjectName === "Today") filterTodayTask();
	else if (selectedProjectName === "Week") console.log("week");
	else console.log("filter regular projects");
}

const filterInbox = () => {
	pubSub.publish("filter-task", taskList);
	console.log("inbox");
};

const filterTodayTask = () => {
	const todayTaskList = [];
	taskList.forEach((task) => {
		if (isToday(task.dueDate)) todayTaskList.push(task);
		console.log(todayTaskList);
	});
	console.log("today");
	pubSub.publish("filter-task", todayTaskList);
};

const updateId = (arr) => {
	let updatedId = 0;
	arr.forEach((item) => {
		item.id = updatedId;
		updatedId++;
	});
};

export { addTask, completeTask, editTask, taskList, updateId };
