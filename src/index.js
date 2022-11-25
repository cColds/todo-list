import { toggleNavigationBar } from "./UI/toggleNavigation";
import { addTask, completeTask, editTask } from "./AppLogic/task";
import { addProject, deleteProject, editProject } from "./AppLogic/project";

addProject("oe", 0);
addProject("ji", 1);
deleteProject(0);
