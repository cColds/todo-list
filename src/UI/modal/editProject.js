// import { pubSub } from "../../pubsub";
// import { toggleModal, toggleError } from "./modalFunctionality";
// import { projectList } from "../../AppLogic/project";

// const modal = document.querySelector("#edit-project-modal");
// const overlayModal = document.querySelector("#edit-project-modal-overlay");
// const cancelBtn = document.querySelector("#edit-project-cancel");
// const closeBtn = document.querySelector("#edit-project-modal-header-cancel");
// const saveBtn = document.querySelector("#edit-project-save");

// const title = document.querySelector("#edit-project-title");
// const titleError = document.querySelector("#edit-project-title-error");

// title.addEventListener("keyup", () => toggleError(title, titleError));
// cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
// closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));

// saveBtn.addEventListener("click", () => {
// 	if (!title.value) {
// 		toggleError(title, titleError);
// 		return;
// 	}
// 	toggleModal(modal, overlayModal);
// 	pubSub.publish("project-edit-submitted", {
// 		title: title.value,
// 		id: currentProjectId,
// 	});
// });

// let currentProjectId = null;
// pubSub.subscribe("project-edit-clicked", (projectId) => {
// 	currentProjectId = projectId;
// 	toggleModal(modal, overlayModal);
// 	setEditInputValues(projectList[projectId]);
// });

// const setEditInputValues = (task) => {
// 	title.value = task.title;
// 	toggleError(title, titleError);
// };
