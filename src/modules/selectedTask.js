import { pubSub } from "./pubSub";

export const task = {
	selectedTask: function () {
		pubSub.subscribe("styledTask", task.styleCurrentTask);
		pubSub.subscribe("unstyledTask", task.unstylePreviousTask);

		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				pubSub.publish("unstyledTask");
				pubSub.publish("styledTask", e);
			}
		});
	},
	unstylePreviousTask: function () {
		document
			.querySelector(".task-selected")
			.classList.remove("task-selected");
	},
	styleCurrentTask: function (e) {
		const taskHeader = document.querySelector(".task-selected-header");

		e.target.classList.add("task-selected");
		taskHeader.textContent = e.target.textContent;
	},
};
