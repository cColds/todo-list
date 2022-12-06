import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";

const modal = document.querySelector(".modal");
const overlayModal = document.querySelector(".modal-overlay");
const openModal = document.querySelector("#add-task");
const cancelBtn = document.querySelector("#add-task-cancel");
const closeBtn = document.querySelector(".modal-header-cancel");
const add = document.querySelector("#add-task-add");

const title = document.querySelector("#add-task-title");
const titleError = document.querySelector(".title-error");
const dueDate = document.querySelector("#add-task-due-date");
const dueDateError = document.querySelector(".due-date-error");
const description = document.querySelector("#add-task-description");
const priority = document.querySelector("#add-task-priority");

const clearModalValues = () => {
	title.value = "";
	dueDate.value = "";
	description.value = "";
	priority.value = "Low";

	title.classList.remove("active");
	titleError.classList.remove("active");
	dueDate.classList.remove("active");
	dueDateError.classList.remove("active");
};

const toggleError = () => {
	if (title.value) {
		title.classList.remove("active");
		titleError.classList.remove("active");
	} else {
		title.classList.add("active");
		titleError.classList.add("active");
	}
};

title.addEventListener("keyup", () => {
	toggleError();
});

const toggleModal = () => {
	modal.classList.toggle("active");
	overlayModal.classList.toggle("active");
};

openModal.addEventListener("click", () => {
	clearModalValues();
	toggleModal();
});

cancelBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);

add.addEventListener("click", () => {
	if (!title.value) {
		toggleError();
		return;
	}
	toggleModal();

	const dueDateFormatted = dueDate.value.replaceAll("-", "/");

	const taskValues = {
		title: title.value,
		dueDate: new Date(dueDateFormatted),
		description: description.value,
		priority: priority.value,
		id: taskList.length,
	};

	pubSub.publish("task-submitted", taskValues);
});

let egg = 1;
export { egg };
