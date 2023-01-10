// import pubSub from "../PubSub";
// import Task from "./Task";

const Project = (function () {
	const projectList = [];

	// function addProject(title) {
	// 	projectList.push({ title, id: projectList.length, task: [] });
	// 	localStorage.setItem("project", JSON.stringify(projectList));
	// 	pubSub.publish("project-updated", projectList);
	// }

	// function deleteProject(id) {
	// 	projectList.splice(id, 1);
	// 	Task.updateId(projectList);
	// 	localStorage.setItem("project", JSON.stringify(projectList));
	// 	pubSub.publish("project-updated", projectList);
	// }

	// function editProjectTitle(project) {
	// 	projectList[project.id].title = project.title;
	// 	localStorage.setItem("project", JSON.stringify(projectList));
	// 	pubSub.publish("edit-project-title", project.id);
	// }

	function render() {
		// pubSub.subscribe("project-submitted", addProject);
		// pubSub.subscribe("project-edit-submitted", editProjectTitle);
		// pubSub.subscribe("project-delete-confirmed", deleteProject);
	}
	return { render, projectList };
})();

export default Project;

// export { addProject, deleteProject, editProjectTitle, projectList };
