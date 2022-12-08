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
const addBtn = document.querySelector("#add-task-add");

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

addBtn.addEventListener("click", () => {
	if (!title.value) {
		toggleError(title, titleError);
		return;
	}

	toggleModal(modal, overlayModal);
	const taskValues = {
		title: title.value,
		dueDate: new Date(dueDate.value).toString(),
		description: description.value,
		priority: priority.value,
		id: taskList.length,
	};

	pubSub.publish("task-submitted", taskValues);
});

let egg = 1;
export { egg };

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
