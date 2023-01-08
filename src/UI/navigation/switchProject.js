import pubSub from "../../pubsub";
import { projectList } from "../../AppLogic/project";
import {
	getSelectedProjectIdStored,
	getSelectedProjectAttributeStored,
} from "../../AppLogic/storage";

const getSelectedProject = () => document.querySelector(".selected");
const getSelectedProjectId = () => +getSelectedProject().dataset.projectId;
const isMainProjectSelected = () =>
	getSelectedProject().classList.toString().includes("main-project");
const getMainTitle = () => document.querySelector("#main-title");
const getDataset = () =>
	isMainProjectSelected() ? "mainProjectId" : "projectId";

const getSelectedMainProjectId = () =>
	+getSelectedProject().dataset.mainProjectId;

function updateMainTitle() {
	const currentSelectedTitle = document.querySelector(
		".selected .projects-item-name"
	);
	getMainTitle().textContent = currentSelectedTitle.textContent;
}

function defaultToInboxProject() {
	const inbox = document.querySelector("[data-main-project-id='0']");

	inbox.classList.add("selected");
	updateMainTitle();
}

function styleSelectedProject(e) {
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
}

function switchProject(e) {
	styleSelectedProject(e);
	updateMainTitle();

	pubSub.publish(
		isMainProjectSelected() ? "main-project-switched" : "project-switched"
	);
}

function changeEditedTitle(id) {
	const projectTitle = document.querySelector(
		`[data-project-id='${id}'] .projects-item-name`
	);
	projectTitle.textContent = projectList[id].title;
	if (getSelectedProjectId() === id) {
		getMainTitle().textContent = projectList[id].title;
	}
}

pubSub.subscribe("project-edited", changeEditedTitle);
pubSub.subscribe("project-clicked", switchProject);
pubSub.subscribe("project-delete-confirmed", defaultToInboxProject);

const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => switchProject(e));

window.addEventListener("load", () => {
	const selectedProjectStored = document.querySelector(
		`[${getSelectedProjectAttributeStored()}='${getSelectedProjectIdStored()}']`
	);
	if (!selectedProjectStored) return;
	getSelectedProject().classList.remove("selected");
	selectedProjectStored.classList.add("selected");
	getMainTitle().textContent = selectedProjectStored.textContent;
});

export {
	mainProjects,
	getSelectedProjectId,
	getSelectedMainProjectId,
	isMainProjectSelected,
	getSelectedProject,
};
