import { pubSub } from "../../pubsub";
import { removeAllTasks } from "./removeAllTasks";

pubSub.subscribe("today-task-selected", (todayTaskArray) => {
	console.log(todayTaskArray);
	removeAllTasks();
	populateTask();
});

const populateTask = () => {
	const allTasks = document.querySelector(".all-tasks");

	const task = document.createElement("div");
	const completeTask = document.createElement("div");
	const titleDescriptionContainer = document.createElement("div");
	const titleTask = document.createElement("div");
	const descriptionTask = document.createElement("div");
	const editTaskContainer = document.createElement("div");

	task.classList.add("task");
	completeTask.classList.add("complete-task");
	editTaskContainer.classList.add("edit-task-container");
	titleDescriptionContainer.classList.add("text-task");
	helperFunction(titleTask, "title-task", "title");
	helperFunction(descriptionTask, "description-task", "description");
	editTaskContainer.innerHTML += editTaskIcon();

	titleDescriptionContainer.append(titleTask, descriptionTask);
	task.append(completeTask, titleDescriptionContainer, editTaskContainer);

	allTasks.appendChild(task);
};

const editTaskIcon = () => {
	return `<svg class="edit edit-task" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
        d="M11 20.1L19.2 11.9C19.7 11.4 20.3 11.1 21 11.1C21.7 11.1 22.3 11.4 22.8 11.9L23 12.1V4C23 2.9 22.1 2 21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H11V20.1M3 4H21V7H3V4M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9Z" />
</svg>`;
};

const helperFunction = (element, classAttribute, text) => {
	element.classList.add(classAttribute);
	element.textContent = text;
};

/* <div class="all-tasks">
<div class="task">

    <div class="complete-task"></div>

    <div class="text-task">
        <div class="title-task">Title test</div>
        <div class="description-task">Apples are red</div>
    </div>

    <svg class="edit edit-task" style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M11 20.1L19.2 11.9C19.7 11.4 20.3 11.1 21 11.1C21.7 11.1 22.3 11.4 22.8 11.9L23 12.1V4C23 2.9 22.1 2 21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H11V20.1M3 4H21V7H3V4M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9Z" />
    </svg>

</div> */

let joe;
export { joe };
