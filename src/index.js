import { toggleNavigationBar } from "./UI/toggleNavigation";
import { addTask, completeTask, editTask } from "./AppLogic/task";
import { addProject, deleteProject, editProject } from "./AppLogic/project";
import { egg } from "./UI/modals/addTask.js";
import { mainProjects } from "./UI/switchProject";

addProject("oe", 0);
addProject("ji", 1);
deleteProject(0);
