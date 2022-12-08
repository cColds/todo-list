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
	const isAddProject = true;
	clearModalValues({ title, titleError, isAddProject });
	toggleModal(modal, overlayModal);
});

addBtn.addEventListener("click", () => {
	if (!title.value) {
		toggleError(title, titleError);
		return;
	}

	toggleModal(modal, overlayModal);
	// const project = {
	// 	title: title.value,
	// 	dueDate: new Date(dueDate.value).toString(),
	// 	description: description.value,
	// 	priority: priority.value,
	// 	id: taskList.length,
	// };
});

let egg2 = 1;
export { egg2 };

//  <div class="modal active" id="add-project-modal">
//  <div class="modal-header-container">
//      <div class="modal-header-title">Add Project</div>
//      <div class="modal-header-cancel" id="add-project-modal-header-cancel">&times;</div>
//  </div>
//  <div class="modal-content">
//      <form class="modal-form" id="add-project-form" action="">
//          <div class="input-container-1">
//              <div class="title-container">
//                  <label for="add-project-title" class="label-title">Title</label>
//                  <input type="text" id="add-project-title" class="modal-title" placeholder="Title">
//                  <div class="title-error" id="add-project-title-error">Title can't be empty.</div>
//              </div>
//          </div>
//      </form>

//      <div class="modal-button-container">
//          <button id="add-project-cancel" class="cancel-modal">Cancel</button>
//          <button id="add-project-add" class="save-modal">Add</button>
//      </div>
//  </div>
// </div>
// <div class="modal-overlay active" id="add-project-modal-overlay"></div>
