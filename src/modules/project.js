import { pubSub } from "./pubSub";
import { tasks } from "./task";

function Project(name, id) {
	return { name, id };
}

const projectList = [];

pubSub.subscribe("project-name-submitted", createProject);

function createProject() {
	const projectName = document.querySelector("#project-input").value.trim();
	console.log(projectName);
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
	// if (!getProjectId().classList.contains("project-item")) return;
	// if (!getProjectId()) return;
	const projectSelected = document.querySelector(".task-selected");
	const projectDataSetId = projectSelected.dataset.projectId;

	if (!projectSelected.classList.contains("project-item")) return;

	const projectSelectedName = document.querySelector(".task-selected div");
	const projectTask = tasks[task.id];

	projectTask.projectName =
		projectSelectedName.textContent.trim() + projectDataSetId;
	console.log(projectList, tasks);
}

pubSub.subscribe("edited-project", updateProject);

function updateProject(newName) {
	projectList[getProjectId()].name = newName.trim();
	console.log(projectList);
	pubSub.publish("updated-project-name", getProjectId());
}

function deleteProjectObject(e) {
	const projectDeleted = e.target.closest(".project-item");
	const objectProjectId = projectDeleted.dataset.projectId;

	projectList[objectProjectId] = "";
	projectList.splice(objectProjectId, 1);

	recorrectObjectId();
	recorrectProjectDataSetId();
}

function recorrectObjectId() {
	let i = -1;
	Object.keys(projectList).forEach((key) => (projectList[key].id = i += 1));
}

function recorrectProjectDataSetId() {
	const projectItem = document.querySelectorAll(".project-item");
	let i = -1;
	projectItem.forEach((project) => {
		project.dataset.projectId = i += 1;
	});
}
const filterProjectTasks = (projectSelectedName) =>
	tasks.filter((item) => item.projectName === projectSelectedName);

export {
	projectList,
	createProjectTask,
	filterProjectTasks,
	getProjectId,
	deleteProjectObject,
};
