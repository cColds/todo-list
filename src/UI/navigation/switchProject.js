import { pubSub } from "../../pubsub";

const getProjectId = () => {
	return +document.querySelector(".selected").dataset.projectId;
};

const getMainProjectId = () => {
	return +document.querySelector(".selected").dataset.mainProjectId;
};

const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => switchProject(e));

const switchProject = (e) => {
	console.log(e.target);
	unselectPreviousProject();
	selectCurrentProject(e);

	updateMainTitle();
	pubSub.publish(getProjectType());
};

const getProjectType = () => {
	const selectedProject = document.querySelector(".selected");
	const isMain = selectedProject.classList
		.toString()
		.includes("main-project");
	return isMain ? "main-project-switched" : "project-switched";
};

const unselectPreviousProject = () => {
	const previousProject = document.querySelector(".selected");
	previousProject.classList.remove("selected");
};

const selectCurrentProject = (e) => {
	e.target.closest(".projects-item").classList.add("selected");
	console.log(e.target.closest(".projects-item"));
};

const updateMainTitle = () => {
	const currentSelectedTitle = document.querySelector(
		".selected .projects-item-name"
	);
	const mainTitle = document.querySelector("#main-title");
	mainTitle.textContent = currentSelectedTitle.textContent;
};

export { mainProjects, getProjectId, getMainProjectId };

// make project nav work
