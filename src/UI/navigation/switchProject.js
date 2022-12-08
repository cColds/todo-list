import { pubSub } from "../../pubsub";

const getProjectId = () => {
	return +document.querySelector(".selected").dataset.projectId;
};
const getMainProjectId = () => {
	return +document.querySelector(".selected").dataset.mainProjectId;
};
const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => {
	const previousSelected = document.querySelector(".selected");
	previousSelected.classList.remove("selected");

	e.target.closest(".projects-item").classList.add("selected");

	const currentSelectedTitle = document.querySelector(
		".selected .projects-item-name"
	);
	const mainTitle = document.querySelector("#main-title");
	mainTitle.textContent = currentSelectedTitle.textContent;
	pubSub.publish("main-project-switched");
});

export { mainProjects, getProjectId, getMainProjectId };
