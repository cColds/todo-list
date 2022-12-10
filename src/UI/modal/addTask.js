import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import {
	clearModalValues,
	toggleModal,
	toggleError,
} from "./modalFunctionality";

import { getSelectedProjectId } from "../navigation/switchProject";

const modal = document.querySelector("#add-task-modal");
const overlayModal = document.querySelector("#add-task-modal-overlay");
const openModal = document.querySelector("#add-task");
const cancelBtn = document.querySelector("#add-task-cancel");
const closeBtn = document.querySelector("#add-task-modal-header-cancel");
const addBtn = document.querySelector("#add-task-add");

const title = document.querySelector("#add-task-title");
const titleError = document.querySelector("#add-task-title-error");
const dueDate = document.querySelector("#add-task-due-date");
const description = document.querySelector("#add-task-description");
const priority = document.querySelector("#add-task-priority");

title.addEventListener("keyup", () => toggleError(title, titleError));
cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));

openModal.addEventListener("click", () => {
	clearModalValues({
		title,
		dueDate,
		description,
		priority,
		titleError,
	});
	toggleModal(modal, overlayModal);
});

addBtn.addEventListener("click", () => {
	if (!title.value) {
		toggleError(title, titleError);
		return;
	}

	toggleModal(modal, overlayModal);

	pubSub.publish("task-submitted", {
		title: title.value,
		dueDate: new Date(dueDate.value).toString(),
		description: description.value,
		priority: priority.value,
		id: taskList.length,
		projectId: !isNaN(getSelectedProjectId()) ? getSelectedProjectId() : "",
	});
});

let egg = 1;
export { egg };
