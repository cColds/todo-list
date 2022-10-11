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
		const taskCheckmarkSVG = document.createElement("div");

		taskCardContainer.classList.add("task");

		taskChecked.classList.add("task-checked");
		taskCheckedContainer.classList.add("checkmark-container");
		taskCheckmarkSVG.classList.add("task-checkmark-svg");

		taskCheckedContainer.appendChild(taskCheckmarkSVG);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ0o7O0FBRWY7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQWM7QUFDbEIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUUscURBQWdCO0FBQ2xCO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQyxXQUFXO0FBQy9DLHNDQUFzQywrQkFBK0I7QUFDckU7QUFDQTtBQUNBLEdBQUc7QUFDSCwwQ0FBMEMsY0FBYzs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbktNO0FBQ1AsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7QUNwQmtDOztBQUVsQztBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBLENBQUMscURBQWdCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsbURBQWM7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3RCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1EOztBQUVuRCxvRUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbU1hbmlwdWxhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSBcIi4vcHViU3ViXCI7XG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4vdGFza1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJQYWdlKCkge1xuXHR0YXNrTW9kYWwucmVuZGVyKCk7XG5cdHRhc2tOYXZpZ2F0aW9uLnJlbmRlcigpO1xuXHR0YXNrQ2FyZC5yZW5kZXIoKTtcbn1cblxuY29uc3QgdGFza05hdmlnYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgdGFza0l0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1pdGVtc1wiKTtcblxuXHRcdHRhc2tJdGVtc0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gXCJMSVwiKSB7XG5cdFx0XHRcdHVuc3R5bGVQcmV2aW91c1Rhc2soKTtcblx0XHRcdFx0c2hvd0N1cnJlbnRUYXNrKGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRjb25zdCB1bnN0eWxlUHJldmlvdXNUYXNrID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHVuc3R5bGVUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlbGVjdGVkXCIpO1xuXHRcdHVuc3R5bGVUYXNrLmNsYXNzTGlzdC5yZW1vdmUoXCJ0YXNrLXNlbGVjdGVkXCIpO1xuXHR9O1xuXHRjb25zdCBzaG93Q3VycmVudFRhc2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnN0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VsZWN0ZWQtaGVhZGVyXCIpO1xuXG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInRhc2stc2VsZWN0ZWRcIik7XG5cdFx0dGFza0hlYWRlci50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuXHR9O1xuXG5cdHJldHVybiB7IHJlbmRlciB9O1xufSkoKTtcblxuY29uc3QgdGFza01vZGFsID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuXHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIik7XG5cdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIik7XG5cdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eS1zZWxlY3RlZFwiKTtcblx0Y29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0ZWRcIik7XG5cblx0Y29uc3QgaXNWYWxpZFRpdGxlID0gKCkgPT4gdGl0bGUuY2hlY2tWYWxpZGl0eSgpO1xuXG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHRjb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdGFza1wiKTtcblx0XHRjb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblx0XHRjb25zdCBzaG93VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaG93LXRhc2stbW9kYWxcIik7XG5cblx0XHR0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKTtcblxuXHRcdHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGlmIChpc1ZhbGlkVGl0bGUoKSkge1xuXHRcdFx0XHR0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKCk7XG5cdFx0XHRcdHB1YlN1Yi5wdWJsaXNoKFwidGFzay1zdWJtaXR0ZWRcIik7XG5cdFx0XHR9IGVsc2UgdGFza01vZGFsLmRpc3BsYXlFcnJvcigpO1xuXHRcdH0pO1xuXG5cdFx0c2hvd1Rhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0dGFza01vZGFsLmNsZWFyVmFsdWVzKCk7XG5cdFx0XHR0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKCk7XG5cdFx0fSk7XG5cblx0XHR0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuXHRcdFx0aWYgKGlzVmFsaWRUaXRsZSgpKSB0YXNrTW9kYWwuZGlzcGxheUNvcnJlY3QoKTtcblx0XHRcdGVsc2UgdGFza01vZGFsLmRpc3BsYXlFcnJvcigpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IHRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWVycm9yXCIpO1xuXHRjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0Y29uc3QgY2hlY2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1jaGVja21hcmstc3ZnID4gc3ZnXCIpO1xuXHRjb25zdCBlcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3Itc3ZnID4gc3ZnXCIpO1xuXG5cdGNvbnN0IGRpc3BsYXlFcnJvciA9ICgpID0+IHtcblx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHkuXCI7XG5cdFx0ZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0dGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgI2VmNDQ0NFwiO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0fTtcblxuXHRjb25zdCBkaXNwbGF5Q29ycmVjdCA9ICgpID0+IHtcblx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjMjJjNTVlXCI7XG5cdFx0ZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHR9O1xuXG5cdGNvbnN0IGNsZWFyVmFsdWVzID0gKCkgPT4ge1xuXHRcdHRpdGxlLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMDtcblxuXHRcdHRpdGxlLnZhbHVlID0gXCJcIjtcblx0XHRkZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG5cdFx0ZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG5cdFx0cHJpb3JpdHkudmFsdWUgPSBcIkxvd1wiO1xuXHRcdHByb2plY3RzLnZhbHVlID0gXCJQcm9qZWN0IGlka1wiO1xuXHR9O1xuXG5cdGNvbnN0IHRvZ2dsZVRhc2tNb2RhbCA9ICgpID0+IHtcblx0XHRjb25zdCB0YXNrTW9kYWxWaXNpYmlsaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuXHRcdHRhc2tNb2RhbFZpc2liaWxpdHkuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRyZW5kZXIsXG5cdFx0Y2xlYXJWYWx1ZXMsXG5cdFx0dG9nZ2xlVGFza01vZGFsLFxuXHRcdGRpc3BsYXlFcnJvcixcblx0XHRkaXNwbGF5Q29ycmVjdCxcblx0fTtcbn0pKCk7XG5cbmNvbnN0IHRhc2tDYXJkID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRcdHB1YlN1Yi5zdWJzY3JpYmUoXCJ0YXNrLWNyZWF0ZWRcIiwgKHRhc2tQcm9wZXJ0aWVzKSA9PiB7XG5cdFx0XHRjcmVhdGVUYXNrQ2FyZCh0YXNrUHJvcGVydGllcyk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgY3JlYXRlVGFza0NhcmQgPSAodGFzaykgPT4ge1xuXHRcdGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuXG5cdFx0Y29uc3QgdGFza0NhcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0Y29uc3QgdGFza0NoZWNrZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tDaGVja2VkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrQ2hlY2ttYXJrU1ZHID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHRcdHRhc2tDYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuXG5cdFx0dGFza0NoZWNrZWQuY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tlZFwiKTtcblx0XHR0YXNrQ2hlY2tlZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY2hlY2ttYXJrLWNvbnRhaW5lclwiKTtcblx0XHR0YXNrQ2hlY2ttYXJrU1ZHLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNoZWNrbWFyay1zdmdcIik7XG5cblx0XHR0YXNrQ2hlY2tlZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrQ2hlY2ttYXJrU1ZHKTtcblx0XHR0YXNrQ2hlY2tlZC5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tlZENvbnRhaW5lcik7XG5cblx0XHRjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHR0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBgVGl0bGU6ICR7dGFzay50aXRsZX1gO1xuXHRcdHRhc2tEYXRlLnRleHRDb250ZW50ID0gYER1ZSBEYXRlOiAke3Rhc2suZGF0ZSA/IHRhc2suZGF0ZSA6IFwiTm9uZVwifWA7XG5cdFx0dGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYERlc2NyaXB0aW9uOiAke1xuXHRcdFx0dGFzay5kZXNjcmlwdGlvbiA/IHRhc2suZGVzY3JpcHRpb24gOiBcIk5vbmVcIlxuXHRcdH1gO1xuXHRcdHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IGBQcmlvcml0eTogJHt0YXNrLnByaW9yaXR5fWA7XG5cblx0XHR0YXNrQ2FyZENvbnRhaW5lci5hcHBlbmQoXG5cdFx0XHR0YXNrQ2hlY2tlZCxcblx0XHRcdHRhc2tUaXRsZSxcblx0XHRcdHRhc2tEYXRlLFxuXHRcdFx0dGFza0Rlc2NyaXB0aW9uLFxuXHRcdFx0dGFza1ByaW9yaXR5XG5cdFx0KTtcblxuXHRcdHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NhcmRDb250YWluZXIpO1xuXHR9O1xuXG5cdHJldHVybiB7IHJlbmRlciB9O1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG5cdGV2ZW50czoge30sXG5cdHN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXHR9LFxuXHR1bnN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdW5zdWJzY3JpYmVkRm4pIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKFxuXHRcdFx0XHQoZm4pID0+IGZuICE9PSB1bnN1YnNjcmliZWRGblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdHB1Ymxpc2g6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRmbihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcbn07XG4iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcblxuZnVuY3Rpb24gVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG5cdHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QgfTtcbn1cblxuZnVuY3Rpb24gb25BZGRUYXNrKCkge1xuXHRwdWJTdWIuc3Vic2NyaWJlKFwidGFzay1zdWJtaXR0ZWRcIiwgY3JlYXRlVGFzayk7XG59XG5vbkFkZFRhc2soKTtcblxuZnVuY3Rpb24gY3JlYXRlVGFzaygpIHtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnZhbHVlO1xuXHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG5cdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIikudmFsdWU7XG5cdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eS1zZWxlY3RlZFwiKS52YWx1ZTtcblx0Y29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKS52YWx1ZTtcblxuXHRwdWJTdWIucHVibGlzaChcblx0XHRcInRhc2stY3JlYXRlZFwiLFxuXHRcdFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblx0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHJlbmRlclBhZ2UgZnJvbSBcIi4vbW9kdWxlcy9kb21NYW5pcHVsYXRpb25cIjtcblxucmVuZGVyUGFnZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9