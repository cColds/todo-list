import { pubSub } from "../../pubsub";

const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => switchProject(e));

const getProjectId = () => {
	return +getSelected().dataset.projectId;
};

const getMainProjectId = () => {
	return +getSelected().dataset.mainProjectId;
};

pubSub.subscribe("project-clicked", switchProject);

const getSelected = () => document.querySelector(".selected");

function switchProject(e) {
	console.log(e.target);
	unselectPreviousProject();
	selectCurrentProject(e);

	updateMainTitle();

	pubSub.publish(
		getProjectType() ? "main-project-switched" : "project-switched"
	);
}

const getProjectType = () => {
	return getSelected().classList.toString().includes("main-project");
};

const unselectPreviousProject = () => {
	if (getSelected()) getSelected().classList.remove("selected");
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

export { mainProjects, getProjectId, getMainProjectId, getProjectType };
