import { pubSub } from "../../pubsub";

const getProjectId = () => {
	return +document.querySelector(".selected").dataset.projectId;
};
const getMainProjectId = () => {
	return +document.querySelector(".selected").dataset.mainProjectId;
};
const mainProjects = document.querySelector("#main-projects-list");

mainProjects.addEventListener("click", (e) => {
	const mainTitle = document.querySelector("#main-title");
	const previousSelected = mainProjects.querySelector(".selected");

	previousSelected.classList.remove("selected");
	e.target.closest(".projects-item").classList.add("selected");

	const currentSelectedTitle = document.querySelector(
		".selected .projects-item-name"
	);

	mainTitle.textContent = currentSelectedTitle.textContent;
	pubSub.publish("switch-main-project");
});

export { mainProjects, getProjectId, getMainProjectId };
