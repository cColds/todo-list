import pubSub from "../PubSub";
// import Task from "./Task";

const Project = (() => {
	const projectList = [];

	function updateId() {
		let updatedId = 0;
		projectList.forEach((item) => {
			item.id = updatedId;
			updatedId += 1;
		});
	}

	function addProject(title) {
		projectList.push({ title, id: projectList.length, task: [] });
		localStorage.setItem("project", JSON.stringify(projectList));
		pubSub.publish(
			"add-project-array",
			projectList[projectList.length - 1]
		);
	}

	function deleteProject(id) {
		projectList.splice(id, 1);
		updateId();
		localStorage.setItem("project", JSON.stringify(projectList));
		pubSub.publish("delete-project-array", projectList);
	}

	function editProjectTitle(project) {
		projectList[project.id].title = project.title;
		localStorage.setItem("project", JSON.stringify(projectList));
		pubSub.publish("edit-project-array", project.id);
	}

	function render() {
		pubSub.subscribe("add-project", addProject);
		pubSub.subscribe("delete-project", deleteProject);
		pubSub.subscribe("edit-project", editProjectTitle);
	}
	return { render, projectList };
})();

export default Project;

// export { addProject, deleteProject, editProjectTitle, projectList };
