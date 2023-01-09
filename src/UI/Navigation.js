import pubSub from "../PubSub";
import Project from "../AppLogic/Projects";
// import Storage from "../AppLogic/storage";

const navigation = (function () {
	const getSelectedProject = () => document.querySelector(".selected");

	const getSelectedProjectId = () => +getSelectedProject().dataset.projectId;

	const getMainTitle = () => document.querySelector("#main-title");

	const isMainProjectName = () =>
		getSelectedProject().classList.toString().includes("main-project");

	const getDataset = () =>
		isMainProjectName() ? "mainProjectId" : "projectId";

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
		console.log("joe");
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

	function checkProjectTypeToFilter() {
		const mainProjectId = getSelectedMainProjectId();
		if (mainProjectId) {
			const mainProjectNames = ["inbox", "today", "week"];

			pubSub.publish(`${mainProjectNames[mainProjectId]}`);
		} else {
			const projectId = getSelectedProjectId();
			pubSub.publish("custom-project", projectId);
		}
	}

	function switchProject(e) {
		styleSelectedProject(e);
		updateMainTitle();
		checkProjectTypeToFilter();
	}

	function updateProjectTitle(id) {
		const projectTitle = document.querySelector(
			`[data-project-id='${id}'] .projects-item-name`
		);
		projectTitle.textContent = Project.projectList[id].title;
		if (getSelectedProjectId() === id) {
			getMainTitle().textContent = Project.projectList[id].title;
		}
	}

	function handleDeleteProject(projectId) {
		defaultToInboxProject();
		pubSub.publish("remove-deleted-project-tasks", projectId);
		pubSub.publish("update-task-id");
		pubSub.publish("update-project-id", projectId);
		pubSub.publish("inbox-selected");
	}

	function handleSelectedProjectStored() {
		// const selectedProjectStored = document.querySelector(
		// 	`[${Storage.getSelectedProjectId()}='${Storage.getSelectedProjectId()}']`
		// );
		// if (!selectedProjectStored) return;
		// getSelectedProject().classList.remove("selected");
		// selectedProjectStored.classList.add("selected");
		// getMainTitle().textContent = selectedProjectStored.textContent;
	}

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
		const mainProjects = document.querySelector("#main-projects-list");
		mainProjects.addEventListener("click", (e) => switchProject(e));
		window.addEventListener("load", handleSelectedProjectStored);
		pubSub.subscribe("filter-project-type", checkProjectTypeToFilter);
		pubSub.subscribe("edit-project-title", updateProjectTitle);
		pubSub.subscribe("delete-project", handleDeleteProject);
		pubSub.subscribe("project-selected", switchProject);
		toggleNavigation();
	}
	return { render, getSelectedProjectId };
})();

export default navigation;
