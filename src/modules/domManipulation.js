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
	getTaskIndex,
} from "./task";
import { projectList, filterProjectTasks } from "./project";

export default function renderPage() {
	taskModal.render();
	taskCard.render();
	taskNavigation.render();
	projectModal.render();
	createDomProject.render();
	projectNavigation.render();
	updateProjects.render();
	displayProjectTasks.render();
}

const taskNavigation = (function () {
	const selectedItem = () => document.querySelector(".task-selected");
	const taskHeader = () => document.querySelector(".task-selected-header");

	const render = function () {
		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				styledTaskUpdated(e);
				pubSub.publish("task-selected");
			}
		});
	};

	const styledTaskUpdated = function (e) {
		selectedItem().classList.remove("task-selected");
		e.target.classList.add("task-selected");
		taskHeader().textContent = e.target.textContent;
	};

	return { render, selectedItem, taskHeader };
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
			toggleDeleteAllTasksModal();
		});

		deleteAllTasksConfirm.addEventListener("click", () => {
			toggleDeleteAllTasksModal();
			pubSub.publish("delete-all-tasks");
		});

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", () => {
			if (!isValidTitle()) displayErrorTitle();
			if (checkDateValidity(dueDate, dueDateError) === "error") return;
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
			if (isValidTitle())
				taskModal.displayCorrectTitle(
					titleError,
					titleInput,
					checkmark,
					error
				);
			else
				taskModal.displayErrorTitle(
					titleError,
					titleInput,
					checkmark,
					error
				);
		});

		dueDate.addEventListener("change", () =>
			checkDateValidity(dueDate, dueDateError)
		);
		editDueDateInput.addEventListener("change", () =>
			checkDateValidity(editDueDateInput, editDueDateError)
		);

		pubSub.subscribe("toggle-edit-modal", (taskIndex) => {
			toggleClassOnEditModal(taskIndex);
			toggleEditModal();
			resetEditTaskStyling();
			setFormValues();
		});

		const editTaskCancelBtn = document.querySelector(".edit-cancel-task");
		editTaskCancelBtn.addEventListener("click", () => {
			toggleEditModal();
			toggleClassOnEditModal();
		});

		const editTaskSaveBtn = document.querySelector(".edit-save-task");

		editTaskSaveBtn.addEventListener("click", () => {
			if (!checkEditTitleValidity()) return;
			if (
				checkDateValidity(editDueDateInput, editDueDateError) ===
				"error"
			)
				return;

			if (checkEditTitleValidity()) {
				toggleEditModal();
				pubSub.publish("task-edit-saved", getEditTaskIndex());

				console.log(tasks);
			}
		});
		editTitleInput.addEventListener("keyup", checkEditTitleValidity);

		pubSub.subscribe("task-edit-object", displayEditedTask);
	};

	const displayEditedTask = (taskProp) => {
		const dataset = `[data-task-id=task${getEditTaskIndex()}]`;

		const taskTitle = document.querySelector(`${dataset} .task-title`);
		const taskDescription = document.querySelector(
			`${dataset} .task-description`
		);
		const taskDueDate = document.querySelector(`${dataset} .task-date`);
		const taskPriority = document.querySelector(dataset);

		taskTitle.textContent = taskProp.title;
		taskDescription.textContent = taskProp.description;
		taskDueDate.textContent = taskProp.dueDate;

		taskPriority.classList.remove(taskPriority.value);
		taskPriority.classList.add(taskProp.priority);
	};

	const setFormValues = () => {
		const taskObj = tasks[getEditTaskIndex()];

		editTitleInput.value = taskObj.title;
		editDescriptionInput.value = taskObj.description;
		editDueDateInput.value = taskObj.dueDate;
		editPriorityInput.value = taskObj.priority;
		editProjectInput.value = taskObj.project;
	};

	const checkEditTitleValidity = () => {
		if (isValidEditTitle()) {
			taskModal.displayCorrectTitle(
				editTitleError,
				editTitleInput,
				editCheckMarkSvg,
				editErrorMarkSvg
			);
			return true;
		} else
			taskModal.displayErrorTitle(
				editTitleError,
				editTitleInput,
				editCheckMarkSvg,
				editErrorMarkSvg
			);
	};

	const resetEditTaskStyling = () => {
		editTitleError.textContent = "";
		editDueDateError.textContent = "";
		editErrorMarkSvg.style.opacity = 0;
		editCheckMarkSvg.style.opacity = 0;
		editTitleInput.style.outline = "none";
		editDueDateInput.style.outline = "none";
	};

	const editTitleInput = document.querySelector("#edit-title");
	const editDescriptionInput = document.querySelector("#edit-description");
	const editDueDateInput = document.querySelector("#edit-date");
	const editPriorityInput = document.querySelector("#edit-priority-selected");
	const editProjectInput = document.querySelector("#edit-project-selected");

	const editTitleError = document.querySelector(".edit-title-error");
	const editErrorMarkSvg = document.querySelector(
		".edit-title-error-svg > svg"
	);
	const editCheckMarkSvg = document.querySelector(
		".edit-title-checkmark-svg > svg"
	);
	const editTaskModal = document.querySelector(".edit-task-modal");
	const toggleEditModal = () => {
		editTaskModal.classList.toggle("hide");
	};

	const toggleClassOnEditModal = (taskIndex) => {
		resetEditClass();
		editTaskModal.classList.toggle(taskIndex);
	};

	const resetEditClass = () => {
		editTaskModal.classList.forEach((classItem) => {
			if (classItem !== "edit-task-modal" && classItem !== "hide") {
				editTaskModal.classList.remove(classItem);
			}
		});
	};

	const getEditTaskIndex = () => {
		const index = Array.from(editTaskModal.classList).filter(
			(index) => !isNaN(index)
		);
		return +index.toString();
	};

	const isValidEditTitle = () => editTitleInput.checkValidity();

	const toggleDeleteAllTasksModal = () => {
		deleteAllTasksModal.classList.toggle("hide");
	};

	const titleError = document.querySelector(".title-error");
	const titleInput = document.querySelector("#title");
	const checkmark = document.querySelector(".title-checkmark-svg > svg");
	const error = document.querySelector(".title-error-svg > svg");

	const displayErrorTitle = (titleError, titleInput, checkmark, error) => {
		titleError.textContent = "Title cannot be empty.";
		error.style.opacity = 1;
		titleInput.style.outline = "2px solid #ef4444";
		checkmark.style.opacity = 0;
	};

	const displayCorrectTitle = (titleError, titleInput, checkmark, error) => {
		titleError.textContent = "";
		titleInput.style.outline = "2px solid #22c55e";
		error.style.opacity = 0;
		checkmark.style.opacity = 1;
	};

	const dueDateError = document.querySelector(".date-container > div");
	const editDueDateError = document.querySelector(".edit-due-date-error");

	const checkDateValidity = (dueDate, dueDateError) => {
		const date = new Date(checkEditOrAddTaskDate());

		if (getTaskNameIndex() === 1 && !isToday(date)) {
			displayDueDateValidity(
				false,
				"Date must be today",
				dueDate,
				dueDateError
			);
			return "error";
		} else if (getTaskNameIndex() === 1) {
			displayDueDateValidity(true, "", dueDate, dueDateError);
		}

		if (getTaskNameIndex() === 2 && !isFuture(date)) {
			displayDueDateValidity(
				false,
				"Must be upcoming",
				dueDate,
				dueDateError
			);
			return "error";
		} else if (getTaskNameIndex() === 2) {
			displayDueDateValidity(true, "", dueDate, dueDateError);
		}
	};

	const checkEditOrAddTaskDate = () => {
		if (!editTaskModal.classList.contains("hide")) {
			return editDueDateInput.value;
		}
		return dueDate.value;
	};

	const displayDueDateValidity = (
		bool,
		dueDateText,
		dueDate,
		dueDateError
	) => {
		console.log(dueDateError.classList);
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
		const optionalDueDateText = document.querySelector(
			".date-container label .optional"
		);
		const taskNameIndex = getTaskNameIndex();
		if (taskNameIndex === 1 || taskNameIndex === 2) {
			optionalDueDateText.textContent = "";
		} else optionalDueDateText.textContent = "optional";
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
		pubSub.subscribe("project-task-display", createTaskCard);
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
		const taskIndex = getTaskNameIndex();
		const selectedTask = document.querySelector(".task-selected");
		const projectSelected = selectedTask.classList.contains("project-item");

		if (taskIndex === 0 && !projectSelected) return tasks;
		if (taskIndex === 1 && !projectSelected) return filterTodayTasks();
		if (taskIndex === 2 && !projectSelected) return filterUpcomingTasks();

		const projectDataSetId = selectedTask.dataset.projectId;
		const projectTask =
			selectedTask.children[1].textContent + projectDataSetId;

		return filterProjectTasks(projectTask);
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

	const taskCards = document.getElementsByClassName("task");

	const deleteAllDomTasks = () => {
		for (let i = taskCards.length - 1; i >= 0; i--) taskCards[i].remove();
	};
	const updateNewIndexValues = () => {
		let taskObjectId = -1;

		tasks.forEach((task) => {
			taskObjectId += 1;
			task.id = taskObjectId;
		});

		let taskDataSet = -1;

		if (getTaskNameIndex() === 0) {
			for (const task of taskCards) {
				task.dataset.taskId = `task${(taskDataSet += 1)}`;
			}
		} else {
			let selectedTask = null;

			if (getTaskNameIndex() === 1) selectedTask = filterTodayTasks();
			else selectedTask = filterUpcomingTasks();

			for (let i = taskCards.length; i >= 0; i--) {
				for (const task of selectedTask)
					task.dataset.taskId = `task${task.id}`;
			}
		}
	};
	const taskContainer = document.querySelector(".task-container");

	const createSvgComplete = (taskInfo) => {
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
		taskInfo.appendChild(taskChecked);

		taskChecked.addEventListener("click", completedTask);
	};

	const createSvgEdit = (taskCardContainer) => {
		const taskEditContainer = document.createElement("div");
		const editSettingSVG = `<svg id="task-edit" style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="currentColor"
				d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
		</svg>`;

		taskEditContainer.innerHTML += editSettingSVG;
		taskEditContainer.classList.add("task-edit-container");
		taskCardContainer.appendChild(taskEditContainer);

		taskEditContainer.addEventListener("click", (e) => {
			pubSub.publish("toggle-edit-modal", getTaskIndex(e));
		});
	};

	const createTaskCard = (task) => {
		const taskCardContainer = document.createElement("div");
		const taskInfo = document.createElement("div");
		const taskTitle = document.createElement("div");
		const taskDate = document.createElement("div");
		const taskDescription = document.createElement("div");

		createSvgComplete(taskInfo);

		taskTitle.textContent = task.title;
		taskDate.textContent = formatDate(task.dueDate);
		taskDescription.textContent = task.description;

		taskTitle.classList.add("task-title");
		taskDate.classList.add("task-date");
		taskDescription.classList.add("task-description");
		taskInfo.classList.add("task-info");

		taskCardContainer.classList.add("task", task.priority);
		taskCardContainer.dataset.taskId = `task${task.id}`;

		taskInfo.append(taskTitle, taskDate, taskDescription);
		taskCardContainer.appendChild(taskInfo);
		createSvgEdit(taskCardContainer);

		taskContainer.appendChild(taskCardContainer);

		updateTaskCounter();
	};

	return {
		render,
		deleteAllDomTasks,
		updateNewIndexValues,
		updateTaskCounter,
	};
})();

const projectModal = (function () {
	const projectModal = document.querySelector(".project-modal-container");
	const projectTitleError = document.querySelector(".project-title-error");
	const projectInput = document.querySelector("#project-input");
	const errorSvg = document.querySelector(".project-error-svg");
	const correctSvg = document.querySelector(".project-correct-svg");

	const render = () => {
		const createProjectBtn = document.querySelector(".create-project");
		const projectForm = document.querySelector("#project-form");

		const projectModalCancelBtn = document.querySelector(".project-cancel");
		const projectModalCreateBtn = document.querySelector(".project-create");

		createProjectBtn.addEventListener("click", () => {
			toggleProjectModal();
			clearProjectForm();
		});

		projectModalCancelBtn.addEventListener("click", toggleProjectModal);
		projectModalCreateBtn.addEventListener("click", () => {
			if (validateProjectName(projectInput.value)) {
				toggleProjectModal();
				pubSub.publish("project-name-submitted");
			}
		});

		projectForm.addEventListener("submit", (e) => e.preventDefault());

		projectInput.addEventListener("keyup", () =>
			validateProjectName(projectInput.value)
		);
	};

	const toggleProjectModal = () => projectModal.classList.toggle("hide");

	const validateProjectName = (projectInput) => {
		if (projectInput) {
			styleProjectCorrect();
			return true;
		} else styleProjectError();
	};

	const styleProjectCorrect = () => {
		projectTitleError.textContent = "";
		projectInput.style.outline = "rgb(34, 197, 94) solid 2px";
		errorSvg.classList.remove("show");
		correctSvg.classList.add("show");
	};

	const styleProjectError = () => {
		projectTitleError.textContent = "Project title cannot be empty.";
		projectInput.style.outline = "rgb(239, 68, 68) solid 2px";
		errorSvg.classList.add("show");
		correctSvg.classList.remove("show");
	};

	const clearProjectForm = () => {
		projectInput.value = "";
		errorSvg.classList.remove("show");
		correctSvg.classList.remove("show");
		projectInput.style.outline = "1px solid rgba(0, 0, 0, 0.3)";
		projectTitleError.textContent = "";
	};

	return { render };
})();

const projectNavigation = (function () {
	const render = () => {
		pubSub.subscribe("project-item-clicked", selectedProject);
	};

	const selectedProject = (e) => {
		taskNavigation.selectedItem().classList.remove("task-selected");
		e.target.closest("li").classList.add("task-selected");
		taskNavigation.taskHeader().textContent = e.target.textContent;
	};

	return { render };
})();

const displayProjectTasks = (function () {
	const render = () => {
		pubSub.subscribe("project-item-clicked", projectTasks);
	};

	const projectTasks = () => {
		taskCard.deleteAllDomTasks();
		const projectSelected = document.querySelector(".task-selected");
		const projectDataSetId = projectSelected.dataset.projectId;
		const projectName = document.querySelector(".task-selected div");

		const projectNameAndId = projectName.textContent + projectDataSetId;

		filterProjectTasks(projectNameAndId).forEach((task) =>
			pubSub.publish("project-task-display", task)
		);

		taskCard.updateTaskCounter();
	};

	return { render };
})();

const createDomProject = (function () {
	const render = () => {
		pubSub.subscribe("project-created", createProject);
	};

	const createProject = (project) => {
		const projectItemsContainer = document.querySelector(".project-items");

		const projectItem = document.createElement("li");
		const projectItemName = document.createElement("div");

		projectItem.innerHTML = projectItemListSvg();
		projectItem.classList.add("project-item");
		projectItem.dataset.projectId = project.id - 1;

		projectItemName.textContent = project.name;

		projectItem.appendChild(projectItemName);
		projectItemsContainer.appendChild(projectItem);

		projectItem.addEventListener("click", (e) =>
			pubSub.publish("project-item-clicked", e)
		);
	};

	const projectItemListSvg = () => `
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="currentColor"
				d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
		</svg>
	`;

	return { render };
})();

const updateProjects = (function () {
	const render = () => {
		pubSub.subscribe("project-created", updateProjectCounter);
	};

	const updateProjectCounter = () => {
		const projectCounter = document.querySelector(".projects-counter");
		projectCounter.textContent = projectList.length;
	};

	return { render };
})();
