export function clearValues() {
	const title = document.querySelector("#title");
	const titleError = document.querySelector(".titleError");
	const description = document.querySelector("#description");
	const dueDate = document.querySelector("#date");
	const priority = document.querySelector("#priority-selected");
	const projects = document.querySelector("#project-selected");

	title.value = "";
	titleError.textContent = "ㅤ";
	description.value = "";
	dueDate.value = "";
	priority.value = "Low";
	projects.value = "Project idk";
}
