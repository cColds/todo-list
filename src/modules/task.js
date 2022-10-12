import { pubSub } from "./pubSub";
import { taskCard } from "./domManipulation";

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

	pubSub.publish(
		"task-created",
		Task(title, description, dueDate, priority, project)
	);
}

export function completedTask(e) {
	const task = e.target.closest(".task");
	const getTaskIndex = +task.dataset.task.replace(/\D+/g, "");
	const completedTask = taskCard.getTask().splice(getTaskIndex, 1);

	pubSub.publish("task-completed", getTaskIndex);
}
