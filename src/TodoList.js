import Project from "./AppLogic/Projects";
// import Storage from "./AppLogic/storage";
import Task from "./AppLogic/Tasks";
import handleModal from "./UI/Modal";
import navigation from "./UI/Navigation";
import displayProjects from "./UI/ProjectsUI";
import displayTasks from "./UI/TasksUI";
// import pubSub from "./pubsub";

const TodoListApp = (function () {
	// function checkTasksAndProjectsStored() {
	// 	return Storage.checkTasksStored() && Storage.checkProjectsStored();
	// }

	// function renderTasksAndProjects() {
	// 	pubSub.publish("populate-saved-projects");
	// 	pubSub.publish("populate-saved-tasks"); // param needs to know which task
	// }

	function render() {
		Project.render();
		Task.render();
		handleModal.render();
		navigation.render();
		displayProjects.render();
		displayTasks.render();
		// if (checkTasksAndProjectsStored()) {
		// 	localStorage.setItem(
		// 		"project",
		// 		JSON.stringify(Project.defaultProjects)
		// 	);
		// 	localStorage.setItem("task", JSON.stringify(Project.defaultTasks));
		// }
		// renderTasksAndProjects();
	}

	return { render };
})();
export default TodoListApp;
