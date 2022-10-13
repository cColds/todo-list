import { pubSub } from "./pubSub";
import { taskCard } from "./domManipulation";
import { compareAsc, format } from "date-fns";

function Task(title, description, dueDate, priority, project) {
	return { title, description, dueDate, priority, project };
}

pubSub.subscribe("task-submitted", createTask);

function createTask() {
	const title = document.querySelector("#title").value;
	const description = document.querySelector("#description").value;
	const dueDate = document.querySelector("#date").value;
	const priority = document.querySelector("#priority-selected").value;
	const project = document.querySelector("#project-selected").value;

	let formattedDueDate = null;
	if (dueDate)
		formattedDueDate = format(new Date(dueDate), "MMMM d, EEEE, y, h:mm a");

	pubSub.publish(
		"task-created",
		Task(title, description, formattedDueDate, priority, project)
	);
}

export function completedTask(e) {
	const task = e.target.closest(".task");
	const getTaskIndex = +task.dataset.task.replace(/\D+/g, "");

	taskCard.getTask().splice(getTaskIndex, 1);

	pubSub.publish("task-completed", getTaskIndex);
}

export function todayTask() {
	// const currentDate = format(new Date());
	// console.log(taskCard.getTask());
	// const todayTask = taskCard.getTask().forEach((task) => {
	// });
}
