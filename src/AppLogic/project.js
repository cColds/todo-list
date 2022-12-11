import { pubSub } from "../pubsub.js";
import { populateStoredProjects, storedProjectCount } from "./storage.js";
import { updateId } from "./task.js";

addEventListener("load", () => {
	if (!storedProjectCount()) return;
	console.log(JSON.parse(localStorage.getItem("project", projectList)));
	populateStoredProjects();
	pubSub.publish("project-updated");
});

const projectList = [];

pubSub.subscribe("project-submitted", addProject);

function addProject(title) {
	projectList.push({ title, id: projectList.length, task: [] });
	localStorage.setItem("project", JSON.stringify(projectList));
	pubSub.publish("project-updated");
}

pubSub.subscribe("project-deleted", deleteProject);

function deleteProject(id) {
	projectList.splice(id, 1);
	updateId(projectList);
	localStorage.setItem("project", JSON.stringify(projectList));
	pubSub.publish("project-updated");
}

pubSub.subscribe("project-edit-submitted", editProjectTitle);

function editProjectTitle(project) {
	projectList[project.id].title = project.title;
	localStorage.setItem("project", JSON.stringify(projectList));
	pubSub.publish("project-edited", project.id);
}

export { addProject, deleteProject, editProjectTitle, projectList };
