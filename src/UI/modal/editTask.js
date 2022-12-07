import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import { toggleModal, toggleError } from "./modalFunctionality";
import { getCurrentTaskId } from "../task/populateTasks";
const modal = document.querySelector("#edit-task-modal");
const overlayModal = document.querySelector("#edit-task-modal-overlay");
const cancelBtn = document.querySelector("#edit-task-cancel");
const closeBtn = document.querySelector("#edit-task-modal-header-cancel");
const saveBtn = document.querySelector("#edit-task-edit");

const title = document.querySelector("#edit-task-title");
const titleError = document.querySelector("#edit-task-title-error");
const dueDate = document.querySelector("#edit-task-due-date");
const dueDateError = document.querySelector("#edit-task-due-date-error");
const description = document.querySelector("#edit-task-description");
const priority = document.querySelector("#edit-task-priority");

title.addEventListener("keyup", () => toggleError(title, titleError));
cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
// saveBtn.addEventListener("click", () => {
// 	if (!title.value) {
// 		toggleError(title, titleError);
// 		return;
// 	}

// 	toggleModal(modal, overlayModal);
// 	const taskValues = {
// 		title: title.value,
// 		dueDate: new Date(dueDate.value),
// 		description: description.value,
// 		priority: priority.value,
// 		id: taskList.length,
// 	};
// });

let currentTaskId = [];
getCurrentTaskId;

const setEditTaskValues = (task) => {
	title.value = task.title;
	dueDate.value = task.dueDate;
	description.value = task.description;
	priority.value = task.priority;
};
pubSub.subscribe("get-task-values", setEditTaskValues);
pubSub.subscribe("edit-task-clicked", (e) => {
	toggleModal(modal, overlayModal);
	console.log(e);
});

let john;

export { john };
