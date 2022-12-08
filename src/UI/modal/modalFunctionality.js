const clearModalValues = (task) => {
	task.title.value = "";
	task.title.classList.remove("active");
	task.titleError.classList.remove("active");
	if (task.isAddProject) return;

	task.dueDate.value = "";
	task.description.value = "";
	task.priority.value = "Low";
	task.dueDate.classList.remove("active");
	task.dueDateError.classList.remove("active");
};

const toggleModal = (modal, overlayModal) => {
	modal.classList.toggle("active");
	overlayModal.classList.toggle("active");
};

const toggleError = (title, titleError) => {
	if (title.value) {
		title.classList.remove("active");
		titleError.classList.remove("active");
	} else {
		title.classList.add("active");
		titleError.classList.add("active");
	}
};

export { clearModalValues, toggleModal, toggleError };
