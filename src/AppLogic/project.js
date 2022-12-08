import { pubSub } from "../pubsub.js";
import { updateId } from "./task.js";

const projectList = [];
// i.e. [{projectName: "The Incredibles", projectId: 0, projectTasks: [{title:'cool'},{title:'epic'}]}]

pubSub.subscribe("project-submitted", addProject);

function addProject(title, id) {
	projectList.push(projectProperties({ title, id, task: [] }));
}

function deleteProject(id) {
	projectList.splice(id(), 1);
	updateId(projectList);
}

function editProject(title, id) {
	projectList[id] = projectProperties(title, id);
}

export { addProject, deleteProject, editProject };
