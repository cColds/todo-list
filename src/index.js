import TodoListApp from "./TodoList";

// function displayDefaultProjectsAndTasks() {
// 	if (!checkTasksStored() && !checkProjectsStored()) {
// 		localStorage.setItem("project", JSON.stringify(defaultProjects));
// 		localStorage.setItem("task", JSON.stringify(defaultTasks));
// 	}

// 	populateStoredProjects();
// 	pubSub.publish("project-updated");
// 	populateStoredTasks();
// 	projectTypeToFilter();
// }
window.addEventListener("load", () => TodoListApp.render());
