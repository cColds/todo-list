import { isToday } from "date-fns";
import { pubSub } from "./pubSub";
import {
	tasks,
	formatDate,
	completedTask,
	getTaskNameIndex,
	filterTodayTasks,
	filterUpcomingTasks,
	isFuture,
} from "./task";

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
				pubSub.publish("task-selected");
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

	const deleteAllTasks = document.querySelector(".delete-all-tasks");
	const deleteAllTasksModal = document.querySelector(
		".delete-all-tasks-modal-container"
	);
	const deleteAllTasksCancel = document.querySelector(
		".delete-all-tasks-cancel"
	);
	const deleteAllTasksConfirm = document.querySelector(
		".delete-all-tasks-confirm"
	);

	const render = () => {
		const taskCancelBtn = document.querySelector(".cancel-task");
		const taskAddBtn = document.querySelector(".add-task");
		const showTaskModal = document.querySelector(".show-task-modal");

		deleteAllTasks.addEventListener("click", toggleDeleteAllTasksModal);
		deleteAllTasksCancel.addEventListener("click", () => {
			toggleDeleteAllTasksModal;
		});

		deleteAllTasksConfirm.addEventListener("click", () => {
			toggleDeleteAllTasksModal();
			pubSub.publish("delete-all-tasks");
		});

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", () => {
			if (!isValidTitle()) displayErrorTitle();
			if (checkDateValidity() === "error") return;
			if (isValidTitle()) {
				taskModal.toggleTaskModal();
				pubSub.publish("task-submitted");
			}
		});

		showTaskModal.addEventListener("click", () => {
			taskModal.clearValues();
			taskModal.toggleTaskModal();
		});

		title.addEventListener("keyup", () => {
			if (isValidTitle()) taskModal.displayCorrectTitle();
			else taskModal.displayErrorTitle();
		});

		dueDate.addEventListener("change", checkDateValidity);
	};

	const toggleDeleteAllTasksModal = () => {
		deleteAllTasksModal.classList.toggle("hide");
	};

	const titleError = document.querySelector(".title-error");
	const titleInput = document.querySelector("#title");
	const checkmark = document.querySelector(".title-checkmark-svg > svg");
	const error = document.querySelector(".title-error-svg > svg");

	const displayErrorTitle = () => {
		titleError.textContent = "Title cannot be empty.";
		error.style.opacity = 1;
		titleInput.style.outline = "2px solid #ef4444";
		checkmark.style.opacity = 0;
	};

	const displayCorrectTitle = () => {
		titleError.textContent = "";
		titleInput.style.outline = "2px solid #22c55e";
		error.style.opacity = 0;
		checkmark.style.opacity = 1;
	};

	const dueDateError = document.querySelector(".date-container > div");

	const checkDateValidity = () => {
		const date = new Date(dueDate.value);

		if (getTaskNameIndex() === 1 && !isToday(date)) {
			displayDueDateValidity(false, "Date must be today");
			return "error";
		} else if (getTaskNameIndex() === 1) {
			displayDueDateValidity(true, "");
		}

		if (getTaskNameIndex() === 2 && !isFuture(date)) {
			displayDueDateValidity(false, "Must be upcoming");
			return "error";
		} else if (getTaskNameIndex() === 2) {
			displayDueDateValidity(true, "");
		}
	};

	const displayDueDateValidity = (bool, dueDateText) => {
		if (bool) {
			dueDateError.classList.remove("required-due-date");
			dueDate.classList.remove("date-error");
			dueDateError.textContent = dueDateText;
			dueDate.style.outline = "rgb(34, 197, 94) solid 2px";
		} else {
			dueDateError.classList.add("required-due-date");
			dueDateError.textContent = dueDateText;
			dueDate.classList.add("date-error");
			dueDate.style.outline = "rgb(239, 68, 68) solid 2px";
		}
	};

	const clearValues = () => {
		titleError.textContent = "";
		titleInput.style.outline = "";
		checkmark.style.opacity = 0;
		error.style.opacity = 0;
		title.value = "";
		description.value = "";
		dueDate.value = "";
		priority.value = "Low";
		projects.value = "Project idk";
		dueDateError.classList.remove("required-due-date");
		dueDate.classList.remove("date-error");
		dueDateError.textContent = "";
		dueDate.style.outline = "";
	};

	const toggleTaskModal = () => {
		const taskModalVisibility = document.querySelector(".task-modal");
		taskModalVisibility.classList.toggle("hide");
		toggleOptionalDueDateText();
	};

	const toggleOptionalDueDateText = () => {
		const optionalDueDateText = document.querySelector("label .optional");
		const taskNameIndex = getTaskNameIndex();
		optionalDueDateText.textContent = taskNameIndex === 1 ? "" : "optional";
	};

	return {
		render,
		clearValues,
		displayErrorTitle,
		displayCorrectTitle,
		toggleTaskModal,
	};
})();

export const taskCard = (function () {
	const render = () => {
		pubSub.subscribe("task-created", createTaskCard);
		pubSub.subscribe("task-completed", completedTaskCard);
		pubSub.subscribe("task-selected", taskToDisplay);
		pubSub.subscribe("delete-all-tasks", deleteAllTasks);
	};

	const deleteAllTasks = () => {
		tasks.length = 0;
		deleteAllDomTasks();
		updateTaskCounter();
	};

	const taskToDisplay = () => {
		if (getTaskNameIndex() === 0) {
			deleteAllDomTasks();
			tasks.forEach((task) => createTaskCard(task));
		} else if (getTaskNameIndex() === 1) {
			todayTask();
		} else {
			upcomingTask();
		}
	};

	const upcomingTask = () => {
		deleteAllDomTasks();
		const upcomingTasks = filterUpcomingTasks();
		if (upcomingTasks.length) {
			upcomingTasks.forEach((task) => createTaskCard(task));
		}
		updateTaskCounter();
	};

	const todayTask = () => {
		deleteAllDomTasks();
		const todayTasks = filterTodayTasks();
		if (todayTasks.length) {
			todayTasks.forEach((task) => createTaskCard(task));
		}
		updateTaskCounter();
	};

	const updateTaskCounter = () => {
		const taskCounter = document.querySelector(".tasks-counter");
		taskCounter.textContent = `Tasks: ${getTaskArray().length}`;
	};

	const getTaskArray = () => {
		const taskNameIndex = getTaskNameIndex();
		if (taskNameIndex === 0) return tasks;
		if (taskNameIndex === 1) return filterTodayTasks();
		if (taskNameIndex === 2) return filterUpcomingTasks();
	};

	const completedTaskCard = (index) => {
		const completedTask = document.querySelector(
			`[data-task-id=task${index}]`
		);
		completedTask.innerHTML = "";
		completedTask.remove();
		updateNewIndexValues();
		updateTaskCounter();
	};

	const taskCard = document.getElementsByClassName("task");

	const deleteAllDomTasks = () => {
		for (let i = taskCard.length - 1; i >= 0; i--) taskCard[i].remove();
	};
	const updateNewIndexValues = () => {
		let taskObjectId = -1;

		tasks.forEach((task) => {
			taskObjectId += 1;
			task.id = taskObjectId;
		});

		let taskDataSet = -1;

		if (getTaskNameIndex() === 0) {
			for (const task of taskCard) {
				task.dataset.taskId = `task${(taskDataSet += 1)}`;
			}
		} else {
			let selectedTask = null;

			if (getTaskNameIndex() === 1) selectedTask = filterTodayTasks();
			else selectedTask = filterUpcomingTasks();

			taskCard.forEach((taskCard) => {
				for (const task of selectedTask)
					taskCard.dataset.taskId = `task${task.id}`;
			});
		}
	};

	const createSvg = (taskCardContainer) => {
		const taskChecked = document.createElement("div");
		const taskCheckedContainer = document.createElement("div");
		const taskCheckmarkSVG = `
		<svg viewBox="0 0 24 24" class="task-checkmark-svg" width="18" height="18">
			<path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
		</svg>
		`;

		taskChecked.classList.add("task-checked");
		taskCheckedContainer.classList.add("checkmark-container");

		taskCheckedContainer.innerHTML += taskCheckmarkSVG;

		taskChecked.appendChild(taskCheckedContainer);
		taskCardContainer.appendChild(taskChecked);

		taskChecked.addEventListener("click", completedTask);
	};

	const createTaskCard = (task) => {
		const taskContainer = document.querySelector(".task-container");
		console.log(tasks);
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
		taskCardContainer.classList.add(task.priority);
		taskCardContainer.dataset.taskId = `task${task.id}`;

		taskCardContainer.append(taskTitle, taskDate, taskDescription);
		taskContainer.appendChild(taskCardContainer);

		updateTaskCounter();
	};

	return { render, deleteAllDomTasks, updateNewIndexValues };
})();
