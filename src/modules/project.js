import { pubSub } from "./pubSub";
import { tasks } from "./task";

function Project(name, id) {
	return { name, id };
}

const projectList = [];

pubSub.subscribe("project-name-submitted", createProject);

function createProject() {
	const projectName = document.querySelector("#project-input").value;

	projectList.push(Project(projectName, projectList.length));
	pubSub.publish("project-created", Project(projectName, projectList.length));
	console.log(projectList);
}

pubSub.subscribe("task-created", createProjectTask);

function createProjectTask(task) {
	const projectSelected = document.querySelector(".task-selected");
	const projectSelectedName = document.querySelector(".task-selected div");

	if (projectSelected.classList[0] !== "project-item") return;
	task.projectName = projectSelectedName.textContent;
	console.log(task);
}

export { projectList };
