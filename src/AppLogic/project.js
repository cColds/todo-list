import { pubSub } from "../pubsub.js";
import { updateId } from "./task.js";

const projectList = [];
// i.e. [{projectName: "The Incredibles", projectId: 0, projectTasks: [{title:'cool'},{title:'epic'}]}]

pubSub.subscribe("project-submitted", addProject);

function addProject(title, id) {
	projectList.push({ title, id, task: [] });
}

pubSub.subscribe("project-deleted", deleteProject);

function deleteProject(id) {
	projectList.splice(id(), 1);
	updateId(projectList);
}

pubSub.subscribe("project-edited", editProjectName);

function editProjectName(project) {
	projectList[project.id].title = project.title;
}

export { addProject, deleteProject, editProjectName };
