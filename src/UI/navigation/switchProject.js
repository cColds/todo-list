import {
	filterMainProjectTasks,
	removeDeletedProjectTasks,
} from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import { taskList } from "../../AppLogic/task";
import { projectList } from "../../AppLogic/project";
const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => switchProject(e));

const getProjectId = () => {
	return +getSelectedProject().dataset.projectId;
};

const getMainProjectId = () => {
	return +getSelectedProject().dataset.mainProjectId;
};

pubSub.subscribe("project-clicked", switchProject);

const getSelectedProject = () => document.querySelector(".selected");

function switchProject(e) {
	unselectPreviousProject();
	selectCurrentProject(e);
	updateMainTitle();

	pubSub.publish(
		isMainProjectSelected() ? "main-project-switched" : "project-switched"
	);
}

pubSub.subscribe("no-projects-selected", defaultToInboxProject);

function defaultToInboxProject(projectId) {
	const inbox = document.querySelector("[data-main-project-id='0'");
	inbox.classList.add("selected");
	updateMainTitle();
	removeDeletedProjectTasks(projectId);
	filterMainProjectTasks();
}

pubSub.subscribe("store-project-selected-id", storeProjectSelectedId);

let projectIdStored = null;
function storeProjectSelectedId() {
	projectIdStored = getProjectId();
}

const isMainProjectSelected = () => {
	return getSelectedProject().classList.toString().includes("main-project");
};

const unselectPreviousProject = () => {
	if (getSelectedProject()) getSelectedProject().classList.remove("selected");
};

// maybe toggle more efficient

const selectCurrentProject = (e) => {
	e.target.closest(".projects-item").classList.add("selected");
};

const updateMainTitle = () => {
	const currentSelectedTitle = document.querySelector(
		".selected .projects-item-name"
	);
	getMainTitle().textContent = currentSelectedTitle.textContent;
};

const getMainTitle = () => document.querySelector("#main-title");

pubSub.subscribe("project-edited", changeEditedTitle);

function changeEditedTitle(id) {
	const projectTitle = document.querySelector(
		`[data-project-id='${id}'] .projects-item-name`
	);
	projectTitle.textContent = projectList[id].title;
	if (getProjectId() === id) {
		getMainTitle().textContent = projectList[id].title;
	}
}

export {
	mainProjects,
	getProjectId,
	getMainProjectId,
	isMainProjectSelected,
	projectIdStored,
	getSelectedProject,
};
