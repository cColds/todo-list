import { pubSub } from "./pubSub";
import { task } from "./task";

export default function renderPage() {
	taskModal.render();
	taskNavigation.render();
	taskCard.render();
}

const taskNavigation = (function () {
	const render = function () {
		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				unstylePreviousTask();
				showCurrentTask(e);
			}
		});
	};
	const unstylePreviousTask = function () {
		const unstyleTask = document.querySelector(".task-selected");
		unstyleTask.classList.remove("task-selected");
	};
	const showCurrentTask = function (e) {
		const taskHeader = document.querySelector(".task-selected-header");

		e.target.classList.add("task-selected");
		taskHeader.textContent = e.target.textContent;
	};

	return { render };
})();

const taskModal = (function () {
	const title = document.querySelector("#title");
	const description = document.querySelector("#description");
	const dueDate = document.querySelector("#date");
	const priority = document.querySelector("#priority-selected");
	const projects = document.querySelector("#project-selected");

	const isValidTitle = () => title.checkValidity();

	const render = () => {
		const taskCancelBtn = document.querySelector(".cancel-task");
		const taskAddBtn = document.querySelector(".add-task");
		const showTaskModal = document.querySelector(".show-task-modal");

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", () => {
			if (isValidTitle()) {
				taskModal.toggleTaskModal();
				pubSub.publish("task-submitted");
			} else taskModal.displayError();
		});

		showTaskModal.addEventListener("click", () => {
			taskModal.clearValues();
			taskModal.toggleTaskModal();
		});

		title.addEventListener("keyup", () => {
			if (isValidTitle()) taskModal.displayCorrect();
			else taskModal.displayError();
		});
	};

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

	const clearValues = () => {
		title.textContent = "";
		titleInput.style.outline = "";
		checkmark.style.opacity = 0;
		error.style.opacity = 0;

		title.value = "";
		description.value = "";
		dueDate.value = "";
		priority.value = "Low";
		projects.value = "Project idk";
	};

	const toggleTaskModal = () => {
		const taskModalVisibility = document.querySelector(".task-modal");
		taskModalVisibility.classList.toggle("hide");
	};

	return {
		render,
		clearValues,
		toggleTaskModal,
		displayError,
		displayCorrect,
	};
})();

const taskCard = (function () {
	const render = () => {
		pubSub.subscribe("task-created", (taskProperties) => {
			createTaskCard(taskProperties);
		});
	};

	const createTaskCard = (task) => {
		const taskContainer = document.querySelector(".task-container");

		const taskCardContainer = document.createElement("div");

		const taskChecked = document.createElement("div");
		const taskCheckedContainer = document.createElement("div");
		const taskCheckmarkSVG = `
		<svg viewBox="0 0 24 24" class="task-checkmark-svg" width="18" height="18">
			<path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
		</svg>`;

		taskCardContainer.classList.add("task");

		taskChecked.classList.add("task-checked");
		taskCheckedContainer.classList.add("checkmark-container");

		taskCheckedContainer.innerHTML += taskCheckmarkSVG;
		taskChecked.appendChild(taskCheckedContainer);

		const taskTitle = document.createElement("div");
		const taskDate = document.createElement("div");
		const taskDescription = document.createElement("div");
		const taskPriority = document.createElement("div");

		taskTitle.textContent = `Title: ${task.title}`;
		taskDate.textContent = `Due Date: ${task.date ? task.date : "None"}`;
		taskDescription.textContent = `Description: ${
			task.description ? task.description : "None"
		}`;
		taskPriority.textContent = `Priority: ${task.priority}`;

		taskCardContainer.append(
			taskChecked,
			taskTitle,
			taskDate,
			taskDescription,
			taskPriority
		);

		taskContainer.appendChild(taskCardContainer);
	};

	return { render };
})();