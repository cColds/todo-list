import { pubSub } from "../../pubsub";
import { removeAllTasks } from "./removeAllTasks";

pubSub.subscribe("filter-task", (arr) => {
	removeAllTasks();
	arr.forEach((task) => populateTask(task));
});

const populateTask = (task) => {
	console.log(task);
	const allTasks = document.querySelector(".all-tasks");

	const taskContainer = document.createElement("div");
	const taskContentLeft = document.createElement("div");
	const taskContentRight = document.createElement("div");
	const titleDescriptionContainer = document.createElement("div");
	const editTaskContainer = document.createElement("div");

	const completeTask = document.createElement("div");
	const titleTask = document.createElement("div");
	const descriptionTask = document.createElement("div");
	const dueDateTask = document.createElement("div");

	taskContentLeft.classList.add("task-content-left");
	taskContentRight.classList.add("task-content-right");
	completeTask.classList.add("complete-task");
	editTaskContainer.classList.add("edit-task-container");
	titleDescriptionContainer.classList.add("text-task");
	dueDateTask.classList.add("due-date-task");

	helperFunction(taskContainer, ["task", task.priority]);
	helperFunction(titleTask, ["title-task"], task.title);
	helperFunction(descriptionTask, ["description-task"], task.description);

	dueDateTask.textContent =
		task.dueDate.toString() !== "Invalid Date"
			? task.dueDate
			: "No Due Date";

	editTaskContainer.innerHTML += editTaskIcon();

	titleDescriptionContainer.append(titleTask, descriptionTask);
	taskContentLeft.append(completeTask, titleDescriptionContainer);
	taskContentRight.append(dueDateTask, editTaskContainer);
	taskContainer.append(taskContentLeft, taskContentRight);

	allTasks.appendChild(taskContainer);
};

const editTaskIcon = () => {
	return `<svg class="edit edit-task" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.85 11.14 20.19 11.13 20.42 11.35L21.7 12.63C21.89 12.83 21.89 13.15 21.7 13.35M12 18.94V21H14.06L20.12 14.88L18.07 12.88L12 18.94M5 19H10V21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5V9H5V19M5 5V7H19V5H5Z" />
</svg>`;
};

{
	/* <div class="task">

<!-- <div class="complete-task"></div> -->

<div class="task-content-left">
    <div class="complete-task"></div>
    <div class="text-task">
        <div class="title-task">Title test</div>
        <div class="description-task">Apples are red</div>
    </div>
</div>
<div class="task-content-right">
    <div class="due-date-task">December 1st, 2022</div>
    <div class="edit-task-container">
        <svg class="edit-task" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
                d="M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.85 11.14 20.19 11.13 20.42 11.35L21.7 12.63C21.89 12.83 21.89 13.15 21.7 13.35M12 18.94V21H14.06L20.12 14.88L18.07 12.88L12 18.94M5 19H10V21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5V9H5V19M5 5V7H19V5H5Z" />
        </svg>
    </div>
</div>
</div> */
}

const helperFunction = (element, classAttribute, text) => {
	classAttribute.forEach((attr) => element.classList.add(attr));
	element.textContent = text;
};

let joe;
export { joe };
