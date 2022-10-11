import { pubSub } from "./pubSub";

function Task(title, description, dueDate, priority, project) {
	return { title, description, dueDate, priority, project };
}

function onAddTask() {
	pubSub.subscribe("task-submitted", createTask);
}
onAddTask();

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
