import { pubSub } from "../../pubsub";

const getProjectId = () => {
	return +document.querySelector(".selected").dataset.projectId;
};
const getMainProjectId = () => {
	return +document.querySelector(".selected").dataset.mainProjectId;
};
const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => {
	unselectPreviousProject();
	selectCurrentProject(e);
	updateMainTitle();

	pubSub.publish("main-project-switched");
});

const unselectPreviousProject = () => {
	const previousProject = document.querySelector(".selected");
	previousProject.classList.remove("selected");
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

export { mainProjects, getProjectId, getMainProjectId };
