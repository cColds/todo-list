import Project from "./AppLogic/Projects";
// import Storage from "./AppLogic/storage";
import Task from "./AppLogic/Task";
import navigation from "./UI/Navigation";
import handleModal from "./UI/Modal";
import ProjectUI from "./UI/ProjectUI";
import TaskUI from "./UI/TaskUI";
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
		ProjectUI.render();
		TaskUI.render();
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
