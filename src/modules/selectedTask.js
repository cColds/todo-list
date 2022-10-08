const taskItems = document.querySelectorAll(".tasks > ul > li");

export function selectedTask() {
	taskItems.forEach((task) => {
		task.addEventListener("click", () => {
			unstylePreviousSelectedTask();
			styleTask(task);
		});
	});
}

function styleTask(task) {
	const taskHeader = document.querySelector(".task-selected-header");
	task.classList.add("task-selected");
	taskHeader.textContent = task.textContent;
}

function unstylePreviousSelectedTask() {
	taskItems.forEach((item) => {
		if (item.classList.contains("task-selected")) {
			item.classList.toggle("task-selected");
			return;
		}
	});
}
