import { format, isToday } from "date-fns";
import { pubSub } from "../pubsub";
import { getProjectName } from "../UI/navigation/switchProject.js";
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

const editTask = (title, description, dueDate, priority, id) => {
	taskList[id] = taskProperties(title, description, dueDate, priority, id);
};

pubSub.subscribe("task-submitted", (task) => {
	taskList.push(task);
	pubSub.publish("task-pushed", task);
});

pubSub.subscribe("switch-main-project", checkProjectToFilter);
pubSub.subscribe("task-pushed", checkProjectToFilter);

function checkProjectToFilter() {
	const selectedProjectName = getProjectName();
	if (selectedProjectName === "Inbox") filterInbox();
	else if (selectedProjectName === "Today") filterTodayTask();
	else if (selectedProjectName === "Week") console.log("week");
	else console.log("filter regular projects");
}

const filterInbox = () => {
	console.log("inbox");
};

const filterTodayTask = () => {
	const todayTaskList = [];

	taskList.forEach((task) => {
		if (isToday(task.dueDate)) todayTaskList.push(task);
		console.log(todayTaskList);
	});

	console.log("today");
};

export { addTask, completeTask, editTask, taskList };
