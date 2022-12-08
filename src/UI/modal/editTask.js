import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import { toggleModal, toggleError } from "./modalFunctionality";
import { getCurrentTaskId } from "../task/populateTasks";
import { format, formatISO9075 } from "date-fns";
const modal = document.querySelector("#edit-task-modal");
const overlayModal = document.querySelector("#edit-task-modal-overlay");
const cancelBtn = document.querySelector("#edit-task-cancel");
const closeBtn = document.querySelector("#edit-task-modal-header-cancel");
const saveBtn = document.querySelector("#edit-task-save");

const title = document.querySelector("#edit-task-title");
const titleError = document.querySelector("#edit-task-title-error");
const dueDate = document.querySelector("#edit-task-due-date");
const dueDateError = document.querySelector("#edit-task-due-date-error");
const description = document.querySelector("#edit-task-description");
const priority = document.querySelector("#edit-task-priority");

title.addEventListener("keyup", () => toggleError(title, titleError));
cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
saveBtn.addEventListener("click", () => {
	if (!title.value) {
		toggleError(title, titleError);
		return;
	}
	toggleModal(modal, overlayModal);
	const newTaskProperties = {
		title,
		dueDate,
		description,
		priority,
	};
	updateTaskValues(newTaskProperties);

	pubSub.publish("task-edited");
});

// const formatDateTimeLocal = (date) => format(date,'yyyy-II-MM')

// // '2018-06-07T00:00'
const setEditTaskValues = (task) => {
	// if (task.dueDate)
	title.value = task.title;
	dueDate.value =
		task.dueDate !== "Invalid Date"
			? formatISO9075(new Date(task.dueDate))
			: "Invalid Date";
	description.value = task.description;
	priority.value = task.priority;
};

const updateTaskValues = (newTask) => {
	const currentTask = taskList[currentTaskId];
	const newDueDate = new Date(newTask.dueDate.value).toString();

	currentTask.title = newTask.title.value;
	currentTask.dueDate =
		newDueDate !== "Invalid Date" ? newDueDate : "Invalid Date";

	currentTask.description = newTask.description.value;
	currentTask.priority = newTask.priority.value;
	console.log("new", currentTask);
};

pubSub.subscribe("get-task-values", setEditTaskValues);

let currentTaskId = null;
pubSub.subscribe("edit-task-clicked", (getCurrentTaskId) => {
	toggleModal(modal, overlayModal);
	currentTaskId = getCurrentTaskId();
});

let john;

export { john };
