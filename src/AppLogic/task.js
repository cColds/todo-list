import {
	format,
	isToday,
	differenceInDays,
	formatISO,
	formatISO9075,
} from "date-fns";
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
	taskList.splice(id(), 1);
	updateId(taskList);
	console.log(taskList);
	filterTasks();
};

pubSub.subscribe("complete-task-clicked", completeTask);

const editTask = (updatedProps) => {
	taskList[updatedProps.id].title = updatedProps.title;
	taskList[updatedProps.id].description = updatedProps.description;
	taskList[updatedProps.id].dueDate = updatedProps.dueDate;
	taskList[updatedProps.id].priority = updatedProps.priority;
	filterTasks();
};
pubSub.subscribe("task-edited", editTask);

pubSub.subscribe("task-submitted", (task) => {
	taskList.push(task);
	pubSub.publish("task-pushed", task);
});

pubSub.subscribe("switch-main-project", filterTasks);
pubSub.subscribe("task-pushed", filterTasks);

function filterTasks() {
	const selectedProjectName = getProjectName();
	if (selectedProjectName === "Inbox") filterInbox();
	else if (selectedProjectName === "Today") filterToday();
	else if (selectedProjectName === "Week") filterWeek();
	else console.log("filter regular projects");
}

const filterInbox = () => {
	pubSub.publish("filter-task", taskList);
};

const filterToday = () => {
	const todayTaskList = [];
	taskList.forEach((task) => {
		if (isToday(new Date(task.dueDate))) todayTaskList.push(task);
	});
	pubSub.publish("filter-task", todayTaskList);
};

const updateId = (arr) => {
	let updatedId = 0;
	arr.forEach((item) => {
		item.id = updatedId;
		updatedId++;
	});
};

const filterWeek = () => {
	const weekTaskList = [];
	taskList.forEach((task) => {
		const currentTime = new Date();
		const week = differenceInDays(new Date(task.dueDate), currentTime);
		if (week <= 7 && week >= 0) weekTaskList.push(task);
	});
	pubSub.publish("filter-task", weekTaskList);
};

export { addTask, completeTask, editTask, taskList, updateId };
