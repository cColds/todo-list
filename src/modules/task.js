import { pubSub } from "./pubSub";
import { format, isToday, isFuture } from "date-fns";

function Task(title, description, dueDate, priority, project, id, projectName) {
	return { title, description, dueDate, priority, project, id, projectName };
}

const tasks = [];

pubSub.subscribe("task-submitted", createTask);

function createTask() {
	const title = document.querySelector("#title").value;
	const description = document.querySelector("#description").value;
	const dueDate = document.querySelector("#date").value;
	const priority = document.querySelector("#priority-selected").value;
	const project = document.querySelector("#project-selected").value;

	const id = tasks.length;
	const projectName = "";

	tasks.push(
		Task(title, description, dueDate, priority, project, id, projectName)
	);

	pubSub.publish(
		"task-created",
		Task(title, description, dueDate, priority, project, id, projectName)
	);
	console.log(tasks);
}

function getTaskNameIndex() {
	const taskSelected = document.querySelector(".task-selected");
	return +taskSelected.classList[0].replace(/\D+/g, "");
}

function getTaskIndex(e) {
	const task = e.target.closest(".task");
	return +task.dataset.taskId.replace(/\D+/g, "");
}

function formatDate(dueDate) {
	if (dueDate) return format(new Date(dueDate), "MMMM d, EEEE, y, h:mm a");
}

function completedTask(e) {
	tasks.splice(getTaskIndex(e), 1);
	pubSub.publish("task-completed", getTaskIndex(e));
}

pubSub.subscribe("task-edit-saved", editTaskObjectValues);

function editTaskObjectValues(index) {
	const editTitle = document.querySelector("#edit-title").value;
	const editDescription = document.querySelector("#edit-description").value;
	const editDueDate = document.querySelector("#edit-date").value;
	const editPriority = document.querySelector(
		"#edit-priority-selected"
	).value;
	const editProject = document.querySelector("#edit-project-selected").value;
	const projectName = tasks[index].projectName;

	tasks[index] = {
		title: editTitle,
		description: editDescription,
		dueDate: editDueDate,
		priority: editPriority,
		project: editProject,
		projectName: projectName,
	};
	pubSub.publish("task-edit-object", tasks[index]);
}

const filterTodayTasks = () =>
	tasks.filter((task) => isToday(new Date(task.dueDate)));

const filterUpcomingTasks = () =>
	tasks.filter((task) => isFuture(new Date(task.dueDate)));

export {
	formatDate,
	completedTask,
	filterTodayTasks,
	tasks,
	getTaskNameIndex,
	getTaskIndex,
	filterUpcomingTasks,
	isFuture,
};
