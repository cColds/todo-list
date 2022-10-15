import { pubSub } from "./pubSub";
import { format, isToday } from "date-fns";

function Task(title, description, dueDate, priority, project) {
	return { title, description, dueDate, priority, project };
}

const tasks = [];

function pushTaskArrayForAllTaskNames() {
	const taskListItems = document.querySelector(".task-items");

	Array.from(taskListItems.children).forEach(() => tasks.push([]));
}
pushTaskArrayForAllTaskNames();

pubSub.subscribe("task-submitted", createTask);

function createTask() {
	const title = document.querySelector("#title").value;
	const description = document.querySelector("#description").value;
	const dueDate = document.querySelector("#date").value;
	const priority = document.querySelector("#priority-selected").value;
	const project = document.querySelector("#project-selected").value;

	tasks[getTaskNameIndex()].push(
		Task(title, description, dueDate, priority, project)
	);
	// inbox should store all the tasks so push as well if it hasn't already
	if (getTaskNameIndex() !== 0) {
		tasks[0].push(Task(title, description, dueDate, priority, project));
	}
	pubSub.publish(
		"task-created",
		Task(title, description, dueDate, priority, project)
	);
	console.log(tasks);
}

function getTaskNameIndex() {
	const taskSelected = document.querySelector(".task-selected");
	return +taskSelected.classList[0].replace(/\D+/g, "");
}

function formatDate(dueDate) {
	if (dueDate) return format(new Date(dueDate), "MMMM d, EEEE, y, h:mm a");
}

function completedTask(e) {
	const task = e.target.closest(".task");
	const getTaskIndex = +task.dataset.task.replace(/\D+/g, "");
	console.log(tasks);
	tasks[getTaskNameIndex()].splice(getTaskIndex, 1);
	pubSub.publish("task-completed", getTaskIndex);
	console.log(tasks);
}

pubSub.subscribe("today-task-selected", todayTask);

function todayTask() {
	const tasksInToday = [];
	filterTodayTasks(tasksInToday);
}

function filterTodayTasks(tasksInToday) {
	// loop through inbox array (index[0])
	tasks[0].forEach((task) => {
		if (isToday(new Date(task.dueDate))) {
			tasksInToday.push(task);
		}
	});
	return tasks;
}

export { formatDate, completedTask, todayTask, tasks };
