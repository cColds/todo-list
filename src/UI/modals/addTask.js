const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const openModal = document.querySelector("#add-task");
const cancelModal = document.querySelector("#add-task-cancel");
const addModal = document.querySelector("#add-task-add");

openModal.addEventListener("click", () => {
	modal.classList.toggle("active");
	modalOverlay.classList.toggle("active");
});

let egg = 1;
export { egg };
