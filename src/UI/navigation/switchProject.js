import { pubSub } from "../../pubsub";

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

function defaultToInboxProject() {
	const inbox = document.querySelector("[data-main-project-id='0'");
	inbox.classList.add("selected");
	updateMainTitle();
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

const selectCurrentProject = (e) => {
	e.target.closest(".projects-item").classList.add("selected");
};

const updateMainTitle = () => {
	const currentSelectedTitle = document.querySelector(
		".selected .projects-item-name"
	);
	const mainTitle = document.querySelector("#main-title");
	mainTitle.textContent = currentSelectedTitle.textContent;
};

export {
	mainProjects,
	getProjectId,
	getMainProjectId,
	isMainProjectSelected,
	projectIdStored,
};
