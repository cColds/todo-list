import { taskModal } from "./taskModal";
import { taskNavigation } from "./selectedTask";
import { task } from "./task";
export default function dom() {
	taskModal.checkFormValidity();
	taskNavigation.selectedTask();
	task.taskProps();
}
