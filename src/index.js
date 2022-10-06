import { toggleTaskModal } from "./task-modal/toggleTaskModal";
import { clearValues } from "./task-modal/clearValues";
import { isValidTitle } from "./task-modal/validateTitle";
import { displayError } from "./task-modal/displayError";

const priority = document.querySelectorAll("#priority-selected");

priority.forEach((element) => {
	element.addEventListener("click", () => console.log(element.value));
});

const taskCancelBtn = document.querySelector(".cancel-task");
const taskAddBtn = document.querySelector(".add-task");
const showTaskModal = document.querySelector(".show-task-modal");

taskCancelBtn.addEventListener("click", toggleTaskModal);

taskAddBtn.addEventListener("click", () => {
	if (isValidTitle()) toggleTaskModal();
	else displayError();
});

showTaskModal.addEventListener("click", () => {
	clearValues();
	toggleTaskModal();
});
