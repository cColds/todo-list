import pubSub from "../pubsub";
import { updateId } from "./task.js";

const projectList = [];

function addProject(title) {
	projectList.push({ title, id: projectList.length, task: [] });
	localStorage.setItem("project", JSON.stringify(projectList));
	pubSub.publish("project-updated");
}

function deleteProject(id) {
	projectList.splice(id, 1);
	updateId(projectList);
	localStorage.setItem("project", JSON.stringify(projectList));
	pubSub.publish("project-updated");
}

function editProjectTitle(project) {
	projectList[project.id].title = project.title;
	localStorage.setItem("project", JSON.stringify(projectList));
	pubSub.publish("project-edited", project.id);
}

pubSub.subscribe("project-submitted", addProject);
pubSub.subscribe("project-edit-submitted", editProjectTitle);
pubSub.subscribe("project-delete-confirmed", deleteProject);

export { addProject, deleteProject, editProjectTitle, projectList };
