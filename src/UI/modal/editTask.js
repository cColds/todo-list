import { taskList } from "../../AppLogic/task";
import { pubSub } from "../../pubsub";

const modal = document.querySelector("#edit-task-modal");
const overlayModal = document.querySelector("#edit-task-modal-overlay");
// const openModal = document.querySelector("#edit-task");
const cancelBtn = document.querySelector("#edit-task-cancel");
const closeBtn = document.querySelector("#edit-task-modal-header-cancel");
const save = document.querySelector("#edit-task-edit");

const title = document.querySelector("#edit-task-title");
const titleError = document.querySelector("#edit-task-title-error");
const dueDate = document.querySelector("#edit-task-due-date");
const dueDateError = document.querySelector("#edit-task-due-date-error");
const description = document.querySelector("#edit-task-description");
const priority = document.querySelector("#edit-task-priority");

/* <div class="modal active" id="edit-task-modal">

<div class="modal-header-container">
    <div class="modal-header-title">Edit Task</div>
    <div class="modal-header-cancel" id="edit-task-modal-header-cancel">&times;</div>
</div>
<div class="modal-content">
    <form class="modal-form" id="edit-task-form" action="">
        <div class="input-container-1">
            <div class="title-container">
                <label for="edit-task-title" class="label-title">Title</label>
                <input type="text" id="edit-task-title" class="modal-title" placeholder="Title">
                <div class="title-error">Title can't be empty.</div>
            </div>
            <div class="due-date-container">
                <label for="edit-task-due-date" class="label-due-date">Due Date</label>
                <input type="datetime-local" id="edit-task-due-date">
                <div class="due-date-error">Date Format is incorrect.</div>
            </div>
        </div>
        <div class="input-container-2">
            <div class="description-container">
                <label for="edit-task-description">Description</label>
                <input type="text" id="edit-task-description" class="modal-description"
                    placeholder="Description">
            </div>
            <div class="priority-container">
                <label for="edit-task-priority">Priority</label>
                <select id="edit-task-priority" class="modal-priority">
                    <option value="Low" selected>Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>
    </form>

    <div class="modal-button-container">
        <button id="edit-task-cancel" class="cancel-modal">Cancel</button>
        <button id="edit-task-save" class="save-modal">Save</button>
    </div>
</div>
</div>
<div class="modal-overlay active" id="edit-task-modal-overlay"></div> */
