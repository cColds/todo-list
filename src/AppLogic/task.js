import { format, isToday, differenceInDays } from "date-fns";
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
	console.log(taskList);
	filterTasks();
};

pubSub.subscribe("complete-task-clicked", completeTask);

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
		if (isToday(task.dueDate)) todayTaskList.push(task);
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

		if (differenceInDays(task.dueDate, currentTime) <= 7)
			weekTaskList.push(task);
	});
	pubSub.publish("filter-task", weekTaskList);
};

//Wed Dec 07 2022 00:22:58 GMT-0600 (Central Standard Time)
// let defaultDate = new Date();

// console.log(format(defaultDate, "EEE, LLLL do, y"));

//2022-12-07T03:28

// let defaultDate = new Date("2022-12-06T03:28");
// console.log(isToday(defaultDate));
// console.log(defaultDate);
// console.log(addDays(defaultDate, 1));
// console.log(differenceInDays(addDays(defaultDate, 7), defaultDate));

// console.log(differenceInDays(defaultDate));
// console.log(isToday(defaultDate));
// console.log(isToday(format(defaultDate, "EEE, LLLL do, y p")));
// console.log(isToday(format(defaultDate, "MM/dd/yyyy")));

export { addTask, completeTask, editTask, taskList, updateId };
