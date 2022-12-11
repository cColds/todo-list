import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import { toggleModal, toggleError } from "./modalFunctionality";
import { formatISO9075 } from "date-fns";
const modal = document.querySelector("#edit-task-modal");
const overlayModal = document.querySelector("#edit-task-modal-overlay");
const cancelBtn = document.querySelector("#edit-task-cancel");
const closeBtn = document.querySelector("#edit-task-modal-header-cancel");
const saveBtn = document.querySelector("#edit-task-save");

const title = document.querySelector("#edit-task-title");
const titleError = document.querySelector("#edit-task-title-error");
const dueDate = document.querySelector("#edit-task-due-date");
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

	pubSub.publish("task-edited", {
		title: title.value,
		dueDate: new Date(dueDate.value).toString(),
		description: description.value,
		priority: priority.value,
		id: currentTaskId,
	});
});

const setEditInputValues = (task) => {
	title.value = task.title;
	if (task.dueDate !== "Invalid Date") {
		dueDate.value = formatISO9075(new Date(task.dueDate));
	}
	description.value = task.description;
	priority.value = task.priority;
	toggleError(title, titleError);
};

let currentTaskId = null;
pubSub.subscribe("edit-task-clicked", (getCurrentTaskId) => {
	currentTaskId = getCurrentTaskId;
	toggleModal(modal, overlayModal);
	setEditInputValues(taskList[currentTaskId]);
});
