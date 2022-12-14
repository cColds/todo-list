import { pubSub } from "../../pubsub";
import { toggleModal } from "./modalFunctionality";

const modal = document.querySelector("#delete-project-modal");
const overlayModal = document.querySelector("#delete-project-modal-overlay");

const cancelBtn = document.querySelector("#delete-project-cancel");
const closeBtn = document.querySelector("#delete-project-modal-header-cancel");
const deleteBtn = document.querySelector("#delete-project-confirm");

cancelBtn.addEventListener("click", () => toggleModal(modal, overlayModal));
closeBtn.addEventListener("click", () => toggleModal(modal, overlayModal));

deleteBtn.addEventListener("click", () => {
	toggleModal(modal, overlayModal);
});

pubSub.subscribe("project-delete-clicked", () => {
	console.log("jim");
	toggleModal(modal, overlayModal);
});
