import { taskList } from "./task";

const populateStoredTasks = () => {
	const storedTasks = JSON.parse(localStorage.getItem("task", taskList));

	storedTasks.forEach((task) => {
		taskList.push(task);
	});
};

export { populateStoredTasks };
