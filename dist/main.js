/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/domManipulation.js":
/*!****************************************!*\
  !*** ./src/modules/domManipulation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderPage)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/modules/pubSub.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");



function renderPage() {
	taskModal.render();
	taskNavigation.render();
	taskCard.render();
}

const taskNavigation = (function () {
	const render = function () {
		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				unstylePreviousTask();
				showCurrentTask(e);
			}
		});
	};
	const unstylePreviousTask = function () {
		const unstyleTask = document.querySelector(".task-selected");
		unstyleTask.classList.remove("task-selected");
	};
	const showCurrentTask = function (e) {
		const taskHeader = document.querySelector(".task-selected-header");

		e.target.classList.add("task-selected");
		taskHeader.textContent = e.target.textContent;
	};

	return { render };
})();

const taskModal = (function () {
	const title = document.querySelector("#title");
	const description = document.querySelector("#description");
	const dueDate = document.querySelector("#date");
	const priority = document.querySelector("#priority-selected");
	const projects = document.querySelector("#project-selected");

	const isValidTitle = () => title.checkValidity();

	const render = () => {
		const taskCancelBtn = document.querySelector(".cancel-task");
		const taskAddBtn = document.querySelector(".add-task");
		const showTaskModal = document.querySelector(".show-task-modal");

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", () => {
			if (isValidTitle()) {
				taskModal.toggleTaskModal();
				_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish("task-submitted");
			} else taskModal.displayError();
		});

		showTaskModal.addEventListener("click", () => {
			taskModal.clearValues();
			taskModal.toggleTaskModal();
		});

		title.addEventListener("keyup", () => {
			if (isValidTitle()) taskModal.displayCorrect();
			else taskModal.displayError();
		});
	};

	const titleError = document.querySelector(".title-error");
	const titleInput = document.querySelector("#title");
	const checkmark = document.querySelector(".title-checkmark-svg > svg");
	const error = document.querySelector(".title-error-svg > svg");

	const displayError = () => {
		titleError.textContent = "Title cannot be empty.";
		error.style.opacity = 1;
		titleInput.style.outline = "2px solid #ef4444";
		checkmark.style.opacity = 0;
	};

	const displayCorrect = () => {
		titleError.textContent = "";
		titleInput.style.outline = "2px solid #22c55e";
		error.style.opacity = 0;
		checkmark.style.opacity = 1;
	};

	const clearValues = () => {
		title.textContent = "";
		titleInput.style.outline = "";
		checkmark.style.opacity = 0;
		error.style.opacity = 0;

		title.value = "";
		description.value = "";
		dueDate.value = "";
		priority.value = "Low";
		projects.value = "Project idk";
	};

	const toggleTaskModal = () => {
		const taskModalVisibility = document.querySelector(".task-modal");
		taskModalVisibility.classList.toggle("hide");
	};

	return {
		render,
		clearValues,
		toggleTaskModal,
		displayError,
		displayCorrect,
	};
})();

const taskCard = (function () {
	const render = () => {
		_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("task-created", (taskProperties) => {
			createTaskCard(taskProperties);
		});
	};

	const createTaskCard = (task) => {
		const taskContainer = document.querySelector(".task-container");

		const taskCardContainer = document.createElement("div");

		const taskChecked = document.createElement("div");
		const taskCheckedContainer = document.createElement("div");
		const taskCheckmarkSVG = `
		<svg viewBox="0 0 24 24" class="task-checkmark-svg" width="18" height="18">
			<path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
		</svg>`;

		taskCardContainer.classList.add("task");

		taskChecked.classList.add("task-checked");
		taskCheckedContainer.classList.add("checkmark-container");

		taskCheckedContainer.innerHTML += taskCheckmarkSVG;
		taskChecked.appendChild(taskCheckedContainer);

		const taskTitle = document.createElement("div");
		const taskDate = document.createElement("div");
		const taskDescription = document.createElement("div");
		const taskPriority = document.createElement("div");

		taskTitle.textContent = `Title: ${task.title}`;
		taskDate.textContent = `Due Date: ${task.date ? task.date : "None"}`;
		taskDescription.textContent = `Description: ${
			task.description ? task.description : "None"
		}`;
		taskPriority.textContent = `Priority: ${task.priority}`;

		taskCardContainer.append(
			taskChecked,
			taskTitle,
			taskDate,
			taskDescription,
			taskPriority
		);

		taskContainer.appendChild(taskCardContainer);
	};

	return { render };
})();


/***/ }),

/***/ "./src/modules/pubSub.js":
/*!*******************************!*\
  !*** ./src/modules/pubSub.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pubSub": () => (/* binding */ pubSub)
/* harmony export */ });
const pubSub = {
	events: {},
	subscribe: function (eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},
	unsubscribe: function (eventName, unsubscribedFn) {
		if (this.events[eventName]) {
			this.events[eventName] = this.events[eventName].filter(
				(fn) => fn !== unsubscribedFn
			);
		}
	},
	publish: function (eventName, data) {
		if (this.events[eventName]) {
			this.events[eventName].forEach((fn) => {
				fn(data);
			});
		}
	},
};


/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/modules/pubSub.js");


function Task(title, description, dueDate, priority, project) {
	return { title, description, dueDate, priority, project };
}

function onAddTask() {
	_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("task-submitted", createTask);
}
onAddTask();

function createTask() {
	const title = document.querySelector("#title").value;
	const description = document.querySelector("#description").value;
	const dueDate = document.querySelector("#date").value;
	const priority = document.querySelector("#priority-selected").value;
	const project = document.querySelector("#project-selected").value;

	_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish(
		"task-created",
		Task(title, description, dueDate, priority, project)
	);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_domManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/domManipulation */ "./src/modules/domManipulation.js");


(0,_modules_domManipulation__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ0o7O0FBRWY7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQWM7QUFDbEIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUUscURBQWdCO0FBQ2xCO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsV0FBVztBQUMvQyxzQ0FBc0MsK0JBQStCO0FBQ3JFO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMENBQTBDLGNBQWM7O0FBRXhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3JLTTtBQUNQLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7O0FDcEJrQzs7QUFFbEM7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQSxDQUFDLHFEQUFnQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLG1EQUFjO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tRDs7QUFFbkQsb0VBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHViU3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YlN1YiB9IGZyb20gXCIuL3B1YlN1YlwiO1xuaW1wb3J0IHsgdGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyUGFnZSgpIHtcblx0dGFza01vZGFsLnJlbmRlcigpO1xuXHR0YXNrTmF2aWdhdGlvbi5yZW5kZXIoKTtcblx0dGFza0NhcmQucmVuZGVyKCk7XG59XG5cbmNvbnN0IHRhc2tOYXZpZ2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHRhc2tJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2staXRlbXNcIik7XG5cblx0XHR0YXNrSXRlbXNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0aWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09IFwiTElcIikge1xuXHRcdFx0XHR1bnN0eWxlUHJldmlvdXNUYXNrKCk7XG5cdFx0XHRcdHNob3dDdXJyZW50VGFzayhlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0Y29uc3QgdW5zdHlsZVByZXZpb3VzVGFzayA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB1bnN0eWxlVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1zZWxlY3RlZFwiKTtcblx0XHR1bnN0eWxlVGFzay5jbGFzc0xpc3QucmVtb3ZlKFwidGFzay1zZWxlY3RlZFwiKTtcblx0fTtcblx0Y29uc3Qgc2hvd0N1cnJlbnRUYXNrID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zdCB0YXNrSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlbGVjdGVkLWhlYWRlclwiKTtcblxuXHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXNlbGVjdGVkXCIpO1xuXHRcdHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcblx0fTtcblxuXHRyZXR1cm4geyByZW5kZXIgfTtcbn0pKCk7XG5cbmNvbnN0IHRhc2tNb2RhbCA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpO1xuXHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuXHRjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHktc2VsZWN0ZWRcIik7XG5cdGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXNlbGVjdGVkXCIpO1xuXG5cdGNvbnN0IGlzVmFsaWRUaXRsZSA9ICgpID0+IHRpdGxlLmNoZWNrVmFsaWRpdHkoKTtcblxuXHRjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cdFx0Y29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLXRhc2tcIik7XG5cdFx0Y29uc3QgdGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XG5cdFx0Y29uc3Qgc2hvd1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvdy10YXNrLW1vZGFsXCIpO1xuXG5cdFx0dGFza0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCk7XG5cblx0XHR0YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRpZiAoaXNWYWxpZFRpdGxlKCkpIHtcblx0XHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdFx0XHRwdWJTdWIucHVibGlzaChcInRhc2stc3VibWl0dGVkXCIpO1xuXHRcdFx0fSBlbHNlIHRhc2tNb2RhbC5kaXNwbGF5RXJyb3IoKTtcblx0XHR9KTtcblxuXHRcdHNob3dUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRhc2tNb2RhbC5jbGVhclZhbHVlcygpO1xuXHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0dGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcblx0XHRcdGlmIChpc1ZhbGlkVGl0bGUoKSkgdGFza01vZGFsLmRpc3BsYXlDb3JyZWN0KCk7XG5cdFx0XHRlbHNlIHRhc2tNb2RhbC5kaXNwbGF5RXJyb3IoKTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCB0aXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1lcnJvclwiKTtcblx0Y29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdGNvbnN0IGNoZWNrbWFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtY2hlY2ttYXJrLXN2ZyA+IHN2Z1wiKTtcblx0Y29uc3QgZXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWVycm9yLXN2ZyA+IHN2Z1wiKTtcblxuXHRjb25zdCBkaXNwbGF5RXJyb3IgPSAoKSA9PiB7XG5cdFx0dGl0bGVFcnJvci50ZXh0Q29udGVudCA9IFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5LlwiO1xuXHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICNlZjQ0NDRcIjtcblx0XHRjaGVja21hcmsuc3R5bGUub3BhY2l0eSA9IDA7XG5cdH07XG5cblx0Y29uc3QgZGlzcGxheUNvcnJlY3QgPSAoKSA9PiB7XG5cdFx0dGl0bGVFcnJvci50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0dGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgIzIyYzU1ZVwiO1xuXHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMTtcblx0fTtcblxuXHRjb25zdCBjbGVhclZhbHVlcyA9ICgpID0+IHtcblx0XHR0aXRsZS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0dGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCJcIjtcblx0XHRjaGVja21hcmsuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0ZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDA7XG5cblx0XHR0aXRsZS52YWx1ZSA9IFwiXCI7XG5cdFx0ZGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuXHRcdGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuXHRcdHByaW9yaXR5LnZhbHVlID0gXCJMb3dcIjtcblx0XHRwcm9qZWN0cy52YWx1ZSA9IFwiUHJvamVjdCBpZGtcIjtcblx0fTtcblxuXHRjb25zdCB0b2dnbGVUYXNrTW9kYWwgPSAoKSA9PiB7XG5cdFx0Y29uc3QgdGFza01vZGFsVmlzaWJpbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcblx0XHR0YXNrTW9kYWxWaXNpYmlsaXR5LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0cmVuZGVyLFxuXHRcdGNsZWFyVmFsdWVzLFxuXHRcdHRvZ2dsZVRhc2tNb2RhbCxcblx0XHRkaXNwbGF5RXJyb3IsXG5cdFx0ZGlzcGxheUNvcnJlY3QsXG5cdH07XG59KSgpO1xuXG5jb25zdCB0YXNrQ2FyZCA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHRwdWJTdWIuc3Vic2NyaWJlKFwidGFzay1jcmVhdGVkXCIsICh0YXNrUHJvcGVydGllcykgPT4ge1xuXHRcdFx0Y3JlYXRlVGFza0NhcmQodGFza1Byb3BlcnRpZXMpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IGNyZWF0ZVRhc2tDYXJkID0gKHRhc2spID0+IHtcblx0XHRjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcblxuXHRcdGNvbnN0IHRhc2tDYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHRcdGNvbnN0IHRhc2tDaGVja2VkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrQ2hlY2tlZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y29uc3QgdGFza0NoZWNrbWFya1NWRyA9IGBcblx0XHQ8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzcz1cInRhc2stY2hlY2ttYXJrLXN2Z1wiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiPlxuXHRcdFx0PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNOSwyMC40MkwyLjc5LDE0LjIxTDUuNjIsMTEuMzhMOSwxNC43N0wxOC44OCw0Ljg4TDIxLjcxLDcuNzFMOSwyMC40MlpcIiAvPlxuXHRcdDwvc3ZnPmA7XG5cblx0XHR0YXNrQ2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcblxuXHRcdHRhc2tDaGVja2VkLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNoZWNrZWRcIik7XG5cdFx0dGFza0NoZWNrZWRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNoZWNrbWFyay1jb250YWluZXJcIik7XG5cblx0XHR0YXNrQ2hlY2tlZENvbnRhaW5lci5pbm5lckhUTUwgKz0gdGFza0NoZWNrbWFya1NWRztcblx0XHR0YXNrQ2hlY2tlZC5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tlZENvbnRhaW5lcik7XG5cblx0XHRjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHR0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBgVGl0bGU6ICR7dGFzay50aXRsZX1gO1xuXHRcdHRhc2tEYXRlLnRleHRDb250ZW50ID0gYER1ZSBEYXRlOiAke3Rhc2suZGF0ZSA/IHRhc2suZGF0ZSA6IFwiTm9uZVwifWA7XG5cdFx0dGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYERlc2NyaXB0aW9uOiAke1xuXHRcdFx0dGFzay5kZXNjcmlwdGlvbiA/IHRhc2suZGVzY3JpcHRpb24gOiBcIk5vbmVcIlxuXHRcdH1gO1xuXHRcdHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IGBQcmlvcml0eTogJHt0YXNrLnByaW9yaXR5fWA7XG5cblx0XHR0YXNrQ2FyZENvbnRhaW5lci5hcHBlbmQoXG5cdFx0XHR0YXNrQ2hlY2tlZCxcblx0XHRcdHRhc2tUaXRsZSxcblx0XHRcdHRhc2tEYXRlLFxuXHRcdFx0dGFza0Rlc2NyaXB0aW9uLFxuXHRcdFx0dGFza1ByaW9yaXR5XG5cdFx0KTtcblxuXHRcdHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NhcmRDb250YWluZXIpO1xuXHR9O1xuXG5cdHJldHVybiB7IHJlbmRlciB9O1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG5cdGV2ZW50czoge30sXG5cdHN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXHR9LFxuXHR1bnN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdW5zdWJzY3JpYmVkRm4pIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKFxuXHRcdFx0XHQoZm4pID0+IGZuICE9PSB1bnN1YnNjcmliZWRGblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdHB1Ymxpc2g6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRmbihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcbn07XG4iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcblxuZnVuY3Rpb24gVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG5cdHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QgfTtcbn1cblxuZnVuY3Rpb24gb25BZGRUYXNrKCkge1xuXHRwdWJTdWIuc3Vic2NyaWJlKFwidGFzay1zdWJtaXR0ZWRcIiwgY3JlYXRlVGFzayk7XG59XG5vbkFkZFRhc2soKTtcblxuZnVuY3Rpb24gY3JlYXRlVGFzaygpIHtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnZhbHVlO1xuXHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG5cdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIikudmFsdWU7XG5cdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eS1zZWxlY3RlZFwiKS52YWx1ZTtcblx0Y29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKS52YWx1ZTtcblxuXHRwdWJTdWIucHVibGlzaChcblx0XHRcInRhc2stY3JlYXRlZFwiLFxuXHRcdFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblx0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHJlbmRlclBhZ2UgZnJvbSBcIi4vbW9kdWxlcy9kb21NYW5pcHVsYXRpb25cIjtcblxucmVuZGVyUGFnZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9