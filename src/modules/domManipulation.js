import { pubSub } from "./pubSub";
import { task, tasks, formatDate, todayTask, completedTask } from "./task";

export default function renderPage() {
	taskModal.render();
	taskCard.render();
	taskNavigation.render();
}

const taskNavigation = (function () {
	const render = function () {
		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				unstylePreviousTask();
				showCurrentTask(e);
				publishTaskListName(e.target.classList[0]);
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

	const publishTaskListName = (taskListName) => {
		if (taskListName.includes("inbox")) {
			pubSub.publish("inbox-task-selected");
		} else if (taskListName.includes("today")) {
			pubSub.publish("today-task-selected");
		} else if (taskListName.includes("upcoming")) {
			pubSub.publish("upcoming-task-selected");
		}
	};

	return { render };
})();

const taskModal = (function () {
	const title = document.querySelector("#title");
	const description = document.querySelector("#description");
	const dueDate = document.querySelector("#date");
	const priority = document.querySelector("#priority-selected");
	const projects = document.querySelector("#project-selected");

	const _isValidTitle = () => title.checkValidity();

	const render = () => {
		const taskCancelBtn = document.querySelector(".cancel-task");
		const taskAddBtn = document.querySelector(".add-task");
		const showTaskModal = document.querySelector(".show-task-modal");

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", () => {
			if (_isValidTitle()) {
				taskModal.toggleTaskModal();
				pubSub.publish("task-submitted");
			} else taskModal.displayError();
		});

		showTaskModal.addEventListener("click", () => {
			taskModal.clearValues();
			taskModal.toggleTaskModal();
		});

		title.addEventListener("keyup", () => {
			if (_isValidTitle()) taskModal.displayCorrect();
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
		displayError,
		displayCorrect,
		toggleTaskModal,
	};
})();

export const taskCard = (function () {
	const render = () => {
		pubSub.subscribe("task-created", (taskProperties) => {
			_createTaskCard(taskProperties);
		});
		pubSub.subscribe("task-completed", _completedTaskCard);
	};

	const updateTaskCounter = () => {
		const taskCounter = document.querySelector(".tasks-counter");
		taskCounter.textContent = `Tasks: ${tasks[0].length}`;
	};

	const deleteAllDomTasks = () => {
		document.querySelectorAll(".task").forEach((el) => el.remove());
	};

	const _completedTaskCard = (index) => {
		const completedTask = document.querySelector(
			`[data-task=task${index}]`
		);

		completedTask.innerHTML = "";
		completedTask.remove();
		renderNewDataSet();
		updateTaskCounter();
	};

	const renderNewDataSet = () => {
		const taskClass = document.querySelectorAll(".task");
		let i = -1;

		taskClass.forEach((task) => {
			task.dataset.task = `task${(i += 1)}`;
		});
	};

	const checkPriority = (priority) => {
		if (priority === "Low") {
			return "priority-low";
		} else if (priority === "Medium") {
			return "priority-medium";
		}
		return "priority-high";
	};

	const createSvg = (taskCardContainer) => {
		const taskChecked = document.createElement("div");
		const taskCheckedContainer = document.createElement("div");
		const taskCheckmarkSVG = `
		<svg viewBox="0 0 24 24" class="task-checkmark-svg" width="18" height="18">
			<path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
		</svg>`;

		taskChecked.classList.add("task-checked");
		taskCheckedContainer.classList.add("checkmark-container");

		taskCheckedContainer.innerHTML += taskCheckmarkSVG;

		taskChecked.appendChild(taskCheckedContainer);
		taskCardContainer.appendChild(taskChecked);

		taskChecked.addEventListener("click", (e) => completedTask(e));
	};

	const taskContainer = document.querySelector(".task-container");

	const _createTaskCard = (task) => {
		const taskCardContainer = document.createElement("div");
		const taskTitle = document.createElement("div");
		const taskDate = document.createElement("div");
		const taskDescription = document.createElement("div");

		createSvg(taskCardContainer);

		taskTitle.textContent = task.title;
		taskDate.textContent = formatDate(task.dueDate);
		taskDescription.textContent = task.description;

		taskTitle.classList.add("task-title");
		taskDate.classList.add("task-date");
		taskDescription.classList.add("task-description");

		taskCardContainer.classList.add("task");
		taskCardContainer.classList.add(checkPriority(task.priority));
		taskCardContainer.dataset.task = `task${tasks[0].length - 1}`;

		taskCardContainer.append(taskTitle, taskDate, taskDescription);

		taskContainer.appendChild(taskCardContainer);

		updateTaskCounter();
	};

	return { render, deleteAllDomTasks, renderNewDataSet };
})();
