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

function getProjectId() {
	const projectSelected = document.querySelector(".task-selected");
	const projectDataSetId = projectSelected.dataset.projectId;
	return projectDataSetId;
}

function createProjectTask(task) {
	console.log(task);
	const isProjectSelected = document.querySelector(".task-selected");
	if (!isProjectSelected.classList.contains("project-item")) return;

	const projectSelectedName = document.querySelector(
		".task-selected .project-name"
	);

	const projectTask = tasks[task.id];
	// console.log(task);
	// const
	// .dataset.projectTask = `project${task.projectName}`;

	// const projectTaskDataset = document.querySelector(`[data-project-task='${}']`)

	projectTask.projectName = projectSelectedName.textContent + getProjectId();
}

pubSub.subscribe("edited-project", updateProject);

function updateProject(newName) {
	projectList[getProjectId()].name = newName;
	pubSub.publish("updated-project-name", getProjectId());
}

const filterProjectTasks = (projectSelectedName) =>
	tasks.filter((item) => item.projectName === projectSelectedName);

export { projectList, createProjectTask, filterProjectTasks, getProjectId };
