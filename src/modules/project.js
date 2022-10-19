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
	if (!projectSelected.classList.contains("project-item")) return;

	const projectSelectedName = document.querySelector(".task-selected div");
	const projectTask = tasks[tasks.length - 1];

	console.log(tasks);
	projectTask.projectName = projectSelectedName.textContent;

	console.log(filterProjectTasks(projectTask.projectName));
}

function filterProjectTasks(projectSelectedName) {
	return tasks.filter((item) => item.projectName === projectSelectedName);
}

export { projectList, createProjectTask };
