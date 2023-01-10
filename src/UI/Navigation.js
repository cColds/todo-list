import pubSub from "../PubSub";
// import Project from "../AppLogic/Projects";
import TaskUI from "./TaskUI";
// import Storage from "../AppLogic/storage";
const navigation = (() => {
	const getSelectedProject = () => document.querySelector(".selected");

	const getMainTitle = () => document.querySelector("#main-title");

	// function getProjectDataType() {
	// 	const { mainProjectId } = getSelectedProject();
	// 	return mainProjectId != null ? "mainProjectId" : "projectId";
	// }
	function updateMainTitle() {
		const currentSelectedTitle = document.querySelector(
			".selected .projects-item-name"
		);
		const mainTitle = getMainTitle();
		mainTitle.textContent = currentSelectedTitle.textContent;
	}

	// function defaultToInboxProject() {
	// 	const inbox = document.querySelector("[data-main-project-id='0']");

	// 	inbox.classList.add("selected");
	// 	updateMainTitle();
	// }

	function styleSelectedProject(e) {
		const selectedProject = getSelectedProject();
		if (selectedProject) {
			selectedProject.classList.remove("selected");
		}
		const projectItem = e.target.closest(".projects-item");
		projectItem.classList.add("selected");
		// localStorage.setItem(
		// 	"project-id",
		// 	JSON.stringify(projectItem.dataset[getProjectDataType()])
		// );
		// localStorage.setItem(
		// 	"project-attribute",
		// 	projectItem.getAttributeNames()[1]
		// );
	}

	function switchProject(e) {
		styleSelectedProject(e);
		updateMainTitle();
		TaskUI.checkProjectToFilterTasks();
	}

	// function updateProjectTitle(id) {
	// 	const projectTitle = document.querySelector(
	// 		`[data-project-id='${id}'] .projects-item-name`
	// 	);
	// 	const { projectId } = getSelectedProject().dataset;
	// 	projectTitle.textContent = Project.projectList[id].title;
	// 	if (projectId === id) {
	// 		const mainTitle = getMainTitle();
	// 		mainTitle.textContent = Project.projectList[id].title;
	// 	}
	// }

	// function handleDeleteProject(projectId) {
	// 	defaultToInboxProject();
	// 	pubSub.publish("remove-deleted-project-tasks", projectId);
	// 	pubSub.publish("update-task-id");
	// 	pubSub.publish("update-project-id", projectId);
	// 	pubSub.publish("inbox-selected");
	// }

	// function handleSelectedProjectStored() {
	// 	const selectedProjectStored = document.querySelector(
	// 		`[${Storage.getSelectedProjectId()}='${Storage.getSelectedProjectId()}']`
	// 	);
	// 	if (!selectedProjectStored) return;
	// 	getSelectedProject().classList.remove("selected");
	// 	selectedProjectStored.classList.add("selected");
	// 	getMainTitle().textContent = selectedProjectStored.textContent;
	// }

	function toggleNavigation() {
		const taskSection = document.querySelector("#task-section");
		const nav = document.querySelector("nav");

		function setNavValue() {
			let { navOpened } = taskSection.dataset;
			navOpened = navOpened === "true" ? "false" : "true";
			taskSection.dataset.navOpened = navOpened;
		}

		function toggleNavigationBar() {
			nav.classList.toggle("hide");
			setNavValue();
		}

		const navHamburgerMenu = document.querySelector("#nav-hamburger-menu");
		const headerHamburgerMenu = document.querySelector(
			"#header-hamburger-menu"
		);

		navHamburgerMenu.addEventListener("click", toggleNavigationBar);
		headerHamburgerMenu.addEventListener("click", toggleNavigationBar);
	}
	function render() {
		toggleNavigation();

		const mainProjects = document.querySelector("#main-projects-list");
		mainProjects.addEventListener("click", (e) => switchProject(e));
		pubSub.subscribe("project-selected", switchProject);
		// window.addEventListener("load", handleSelectedProjectStored);

		// pubSub.subscribe("edit-project", updateProjectTitle);
		// pubSub.subscribe("delete-project", handleDeleteProject);
	}
	return { render };
})();

export default navigation;
