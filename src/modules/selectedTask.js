import { pubSub } from "./pubSub";
// pubSub.subscribe("unstyledTask", task.unstylePreviousTask);
// pubSub.subscribe("styledTask", task.styleCurrentTask);
// pubSub.publish("unstyledTask");
// pubSub.publish("styledTask", e);

export const taskNavigation = (function () {
	const selectedTask = function () {
		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				taskNavigation.unstylePreviousTask();
				taskNavigation.styleCurrentTask(e);
			}
		});
	};
	const unstylePreviousTask = function () {
		document
			.querySelector(".task-selected")
			.classList.remove("task-selected");
	};
	const styleCurrentTask = function (e) {
		const taskHeader = document.querySelector(".task-selected-header");

		e.target.classList.add("task-selected");
		taskHeader.textContent = e.target.textContent;
	};

	return { selectedTask, unstylePreviousTask, styleCurrentTask };
})();
