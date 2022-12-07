import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import {
	clearModalValues,
	toggleModal,
	toggleError,
} from "./modalFunctionality";

const modal = document.querySelector("#add-task-modal");
const overlayModal = document.querySelector("#add-task-modal-overlay");
const openModal = document.querySelector("#add-task");
const cancelBtn = document.querySelector("#add-task-cancel");
const closeBtn = document.querySelector("#add-task-modal-header-cancel");
const add = document.querySelector("#add-task-add");

const title = document.querySelector("#add-task-title");
const titleError = document.querySelector("#add-task-title-error");
const dueDate = document.querySelector("#add-task-due-date");
const dueDateError = document.querySelector("#add-task-due-date-error");
const description = document.querySelector("#add-task-description");
const priority = document.querySelector("#add-task-priority");

title.addEventListener("keyup", () => toggleError(title, titleError));
cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));

openModal.addEventListener("click", () => {
	const taskProperties = {
		title,
		dueDate,
		description,
		priority,
		titleError,
		dueDateError,
	};
	clearModalValues(taskProperties);
	toggleModal(modal, overlayModal);
});

add.addEventListener("click", () => {
	if (!title.value) {
		toggleError(title, titleError);
		return;
	}

	toggleModal(modal, overlayModal);
	const taskValues = {
		title: title.value,
		dueDate: new Date(dueDate.value),
		description: description.value,
		priority: priority.value,
		id: taskList.length,
	};

	pubSub.publish("task-submitted", taskValues);
});

let egg = 1;
export { egg };
