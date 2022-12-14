import {
	filterMainProjectTasks,
	removeDeletedProjectTasks,
} from "../../AppLogic/task";
import { pubSub } from "../../pubsub";
import { projectList } from "../../AppLogic/project";
import {
	getSelectedProjectIdStored,
	getSelectedProjectAttributeStored,
} from "../../AppLogic/storage";

addEventListener("load", () => {
	const selectedProjectStored = document.querySelector(
		`[${getSelectedProjectAttributeStored()}='${getSelectedProjectIdStored()}']`
	);
	if (!selectedProjectStored) return;
	getSelectedProject().classList.remove("selected");
	selectedProjectStored.classList.add("selected");
	getMainTitle().textContent = selectedProjectStored.textContent;
});

const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => switchProject(e));

const getSelectedProjectId = () => {
	return +getSelectedProject().dataset.projectId;
};

const getSelectedMainProjectId = () => {
	return +getSelectedProject().dataset.mainProjectId;
};

pubSub.subscribe("project-clicked", switchProject);

const getSelectedProject = () => document.querySelector(".selected");

function switchProject(e) {
	styleSelectedProject(e);
	updateMainTitle();

	pubSub.publish(
		isMainProjectSelected() ? "main-project-switched" : "project-switched"
	);
}

pubSub.subscribe("project-delete-confirmed", defaultToInboxProject);

function defaultToInboxProject() {
	const inbox = document.querySelector("[data-main-project-id='0']");

	inbox.classList.add("selected");
	updateMainTitle();
}

const isMainProjectSelected = () => {
	return getSelectedProject().classList.toString().includes("main-project");
};

const styleSelectedProject = (e) => {
	if (getSelectedProject()) {
		getSelectedProject().classList.remove("selected");
	}
	const projectItem = e.target.closest(".projects-item");
	projectItem.classList.add("selected");
	localStorage.setItem(
		"project-id",
		JSON.stringify(projectItem.dataset[getDataset()])
	);
	localStorage.setItem(
		"project-attribute",
		projectItem.getAttributeNames()[1]
	);
};

const getDataset = () => {
	return isMainProjectSelected() ? "mainProjectId" : "projectId";
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
	if (getSelectedProjectId() === id) {
		getMainTitle().textContent = projectList[id].title;
	}
}

export {
	mainProjects,
	getSelectedProjectId,
	getSelectedMainProjectId,
	isMainProjectSelected,
	getSelectedProject,
};
