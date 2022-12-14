import "./UI/navigation/toggleNavigation";
import "./AppLogic/task";
import "./AppLogic/project";
import "./UI/modal/addTask";
import "./UI/navigation/switchProject";
import "./UI/task/populateTasks";
import "./UI/modal/editTask";
import "./UI/modal/addProject";
import "./UI/projects/populateProjects";
import "./UI/modal/editProject";
import "./UI/modal/deleteProject";
import {
	checkProjectsStored,
	checkTasksStored,
	populateStoredProjects,
	populateStoredTasks,
} from "./AppLogic/storage";
import { defaultProjects } from "./AppLogic/defaultProjects";
import { defaultTasks } from "./AppLogic/defaultTasks";
import { projectTypeToFilter } from "./AppLogic/task";
import { pubSub } from "./pubsub.js";

addEventListener("load", displayDefaultProjectsAndTasks);

function displayDefaultProjectsAndTasks() {
	if (!checkTasksStored() && !checkProjectsStored()) {
		localStorage.setItem("project", JSON.stringify(defaultProjects));
		localStorage.setItem("task", JSON.stringify(defaultTasks));
	}

	populateStoredProjects();
	pubSub.publish("project-updated");
	populateStoredTasks();
	projectTypeToFilter();
}
