import { pubSub } from "../../pubsub";
import {
	clearModalValues,
	toggleModal,
	toggleError,
} from "./modalFunctionality";
import { projectList } from "../../AppLogic/project";

const modal = document.querySelector("#edit-project-modal");
const overlayModal = document.querySelector("#edit-project-modal-overlay");
const cancelBtn = document.querySelector("#edit-project-cancel");
const closeBtn = document.querySelector("#edit-project-modal-header-cancel");
const saveBtn = document.querySelector("#edit-project-save");

const title = document.querySelector("#edit-project-title");
const titleError = document.querySelector("#edit-project-title-error");

title.addEventListener("keyup", () => toggleError(title, titleError));
cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));

saveBtn.addEventListener("click", () => {
	if (!title.value) {
		toggleError(title, titleError);
		return;
	}

	toggleModal(modal, overlayModal);
	pubSub.publish("project-submitted", title.value);
});

let currentProjectId = null;
pubSub.subscribe("project-edit-clicked", (projectId) => {
	currentProjectId = projectId;
	toggleModal(modal, overlayModal);
	setEditInputValues(projectList[projectId]);
});

const setEditInputValues = (task) => {
	title.value = task.title;
	toggleError(title, titleError);
};

/*	pubSub.publish("task-edited", {
		title: title.value,
		dueDate: new Date(dueDate.value).toString(),
		description: description.value,
		priority: priority.value,
		id: currentTaskId,
	});
});

const setEditInputValues = (task) => {
	title.classList.remove("active");
	titleError.classList.remove("active");
	title.value = task.title;
	console.log(task.dueDate);
	if (task.dueDate !== "Invalid Date") formatISO9075(new Date(task.dueDate));

	description.value = task.description;
	priority.value = task.priority;
};

let currentTaskId = null;
pubSub.subscribe("edit-task-clicked", (getCurrentTaskId) => {
	toggleModal(modal, overlayModal);
	currentTaskId = getCurrentTaskId;
	setEditInputValues(taskList[currentTaskId]); */

let testtt;
export { testtt };
