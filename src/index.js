import { toggleNavigationBar } from "./UI/navigation/toggleNavigation";
import { addTask, completeTask, editTask } from "./AppLogic/task";
import { addProject, deleteProject, editProject } from "./AppLogic/project";
import { egg } from "./UI/modal/addTask";
import { mainProjects } from "./UI/navigation/switchProject";

addProject("oe", 0);
addProject("ji", 1);
deleteProject(0);
