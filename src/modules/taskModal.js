import { pubSub } from "./pubSub";

const title = document.querySelector("#title");

export const taskModal = {
	checkFormValidity: () => {
		const isValidTitle = () => title.checkValidity();
		const isValidForm = () => {
			if (isValidTitle()) taskModal.toggleTaskModal();
			else taskModal.displayValidity().displayError();
		};

		const taskCancelBtn = document.querySelector(".cancel-task");
		const taskAddBtn = document.querySelector(".add-task");
		const showTaskModal = document.querySelector(".show-task-modal");

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", isValidForm);

		showTaskModal.addEventListener("click", () => {
			taskModal.clearValues();
			taskModal.toggleTaskModal();
		});

		title.addEventListener("keyup", () => {
			if (isValidTitle()) taskModal.displayValidity().displayCorrect();
			else taskModal.displayValidity().displayError();
		});
	},
	displayValidity: () => {
		const titleError = document.querySelector(".title-error");
		const titleInput = document.querySelector("#title");
		const checkmark = document.querySelector(".title-checkmark-svg > svg");
		const error = document.querySelector(".title-error-svg > svg");

		const displayError = () => {
			titleError.textContent = "Title cannot be empty.";
			error.style.opacity = 1;
			titleInput.style.outline = "2px solid #ef4444";
			checkmark.style.opacity = 0;
		};

		const displayCorrect = () => {
			titleError.textContent = "";
			titleInput.style.outline = "2px solid #22c55e";
			error.style.opacity = 0;
			checkmark.style.opacity = 1;
		};
		return {
			displayError,
			displayCorrect,
			titleError,
			titleInput,
			checkmark,
			error,
		};
	},

	clearValues: () => {
		const description = document.querySelector("#description");
		const dueDate = document.querySelector("#date");
		const priority = document.querySelector("#priority-selected");
		const projects = document.querySelector("#project-selected");

		taskModal.displayValidity().textContent = "";
		taskModal.displayValidity().titleInput.style.outline = "";
		taskModal.displayValidity().checkmark.style.opacity = 0;
		taskModal.displayValidity().error.style.opacity = 0;

		title.value = "";
		description.value = "";
		dueDate.value = "";
		priority.value = "Low";
		projects.value = "Project idk";
	},

	toggleTaskModal: () => {
		const taskModalVisibility = document.querySelector(".task-modal");
		taskModalVisibility.classList.toggle("hide");
	},
};
