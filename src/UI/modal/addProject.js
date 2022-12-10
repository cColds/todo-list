import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import {
	clearModalValues,
	toggleModal,
	toggleError,
} from "./modalFunctionality";

const modal = document.querySelector("#add-project-modal");
const overlayModal = document.querySelector("#add-project-modal-overlay");
const openModal = document.querySelector("#nav-add-project");
const cancelBtn = document.querySelector("#add-project-cancel");
const closeBtn = document.querySelector("#add-project-modal-header-cancel");
const addBtn = document.querySelector("#add-project-add");

const title = document.querySelector("#add-project-title");
const titleError = document.querySelector("#add-project-title-error");

title.addEventListener("keyup", () => toggleError(title, titleError));
cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));

openModal.addEventListener("click", () => {
	clearModalValues({ title, titleError, isAddProject: true });
	toggleModal(modal, overlayModal);
});

addBtn.addEventListener("click", () => {
	if (!title.value) {
		toggleError(title, titleError);
		return;
	}

	toggleModal(modal, overlayModal);
	pubSub.publish("project-submitted", title.value);
});

let egg2 = 1;
export { egg2 };
