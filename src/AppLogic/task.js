import { format, isToday } from "date-fns";
import { pubSub } from "../pubsub";
import { selectedProjectName } from "../UI/switchProject";
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
	const selectedProject = selectedProjectName();
	console.log(selectedProject);
	if (selectedProject === "Inbox") filterInbox();
	else if (selectedProject === "Today") filterTodayTask();
	else if (selectedProject === "Week") console.log("week");
	else console.log("filter regular projects");
}

const filterInbox = () => {
	console.log("populate with dom");
};

const filterTodayTask = () => {
	const todayTaskList = [];

	taskList.forEach((task) => {
		if (isToday(task.dueDate)) todayTaskList.push(task);
		console.log(todayTaskList);
	});

	console.log("populate with dom");
};

export { addTask, completeTask, editTask, taskList };
