export const taskModal = () => {
	const title = document.querySelector("#title");
	const titleError = document.querySelector(".title-error");
	const taskCancelBtn = document.querySelector(".cancel-task");
	const taskAddBtn = document.querySelector(".add-task");
	const showTaskModal = document.querySelector(".show-task-modal");

	const isValidTitle = () => title.checkValidity();
	const displayError = () => {
		titleError.textContent = "Title cannot be empty.";
		error.style.opacity = 1;
		titleInput.style.outline = "2px solid #ef4444";
	};
	taskCancelBtn.addEventListener("click", toggleTaskModal);

	taskAddBtn.addEventListener("click", () => {
		if (isValidTitle()) toggleTaskModal();
		else displayError();
	});

	showTaskModal.addEventListener("click", () => {
		clearValues();
		toggleTaskModal();
	});
	const titleInput = document.querySelector("#title");
	const checkmark = document.querySelector(".title-checkmark-svg > svg");
	const error = document.querySelector(".title-error-svg > svg");

	title.addEventListener("keyup", () => {
		if (isValidTitle()) {
			titleError.textContent = "";
			titleInput.style.outline = "2px solid #22c55e";
			error.style.opacity = 0;
			checkmark.style.opacity = 1;
		} else {
			displayError();
			checkmark.style.opacity = 0;
		}
	});

	const priorities = document.querySelectorAll("#priority-selected");

	priorities.forEach((priority) =>
		priority.addEventListener("click", () => console.log(priority.value))
	);

	function clearValues() {
		const description = document.querySelector("#description");
		const dueDate = document.querySelector("#date");
		const priority = document.querySelector("#priority-selected");
		const projects = document.querySelector("#project-selected");

		title.value = "";
		titleError.textContent = "";
		description.value = "";
		dueDate.value = "";
		priority.value = "Low";
		projects.value = "Project idk";
		titleInput.style.outline = "";
		checkmark.style.opacity = 0;
		error.style.opacity = 0;
	}

	function toggleTaskModal() {
		const taskModal = document.querySelector(".task-modal");
		taskModal.classList.toggle("hide");
	}
};
