import pubSub from "../../pubsub";
import { toggleModal } from "./modalFunctionality";

const modal = document.querySelector("#delete-project-modal");
const overlayModal = document.querySelector("#delete-project-modal-overlay");

const cancelBtn = document.querySelector("#delete-project-cancel");
const closeBtn = document.querySelector("#delete-project-modal-header-cancel");
const deleteBtn = document.querySelector("#delete-project-confirm");

let currentProjectId = null;

pubSub.subscribe("project-delete-clicked", (id) => {
	currentProjectId = id;
	toggleModal(modal, overlayModal);
});

cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));

deleteBtn.addEventListener("click", () => {
	pubSub.publish("project-delete-confirmed", currentProjectId);
	toggleModal(modal, overlayModal);
});
