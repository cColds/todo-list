import Project from "./AppLogic/Projects";
// import Storage from "./AppLogic/storage";
import Task from "./AppLogic/Task";
import navigation from "./UI/Navigation";
import handleModal from "./UI/Modal";
import displayProjects from "./UI/ProjectUI";
import displayTasks from "./UI/TaskUI";
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
		Task.render();
		Project.render();
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
