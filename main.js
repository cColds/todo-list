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
/* harmony export */   "default": () => (/* binding */ renderPage),
/* harmony export */   "taskCard": () => (/* binding */ taskCard)
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

	const _isValidTitle = () => title.checkValidity();

	const render = () => {
		const taskCancelBtn = document.querySelector(".cancel-task");
		const taskAddBtn = document.querySelector(".add-task");
		const showTaskModal = document.querySelector(".show-task-modal");

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", () => {
			if (_isValidTitle()) {
				taskModal.toggleTaskModal();
				_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish("task-submitted");
			} else taskModal.displayError();
		});

		showTaskModal.addEventListener("click", () => {
			taskModal.clearValues();
			taskModal.toggleTaskModal();
		});

		title.addEventListener("keyup", () => {
			if (_isValidTitle()) taskModal.displayCorrect();
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
		displayError,
		displayCorrect,
		toggleTaskModal,
	};
})();

const taskCard = (function () {
	const tasks = [];
	const getTask = () => tasks;

	const render = () => {
		_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("task-created", (taskProperties) => {
			_createTaskCard(taskProperties);
		});

		_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("task-completed", _completedTaskCard);
	};

	const _completedTaskCard = () => {
		// console.log("test");
	};

	const _createTaskCard = (task) => {
		tasks.push(task);

		const taskContainer = document.querySelector(".task-container");

		const taskCardContainer = document.createElement("div");

		const taskChecked = document.createElement("div");
		const taskCheckedContainer = document.createElement("div");
		const taskCheckmarkSVG = `
		<svg viewBox="0 0 24 24" class="task-checkmark-svg" width="18" height="18">
			<path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
		</svg>`;

		taskCardContainer.classList.add("task");

		taskCardContainer.dataset.task = `task${getTask().length - 1}`;

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

	return { render, getTask };
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
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManipulation */ "./src/modules/domManipulation.js");



function Task(title, description, dueDate, priority, project) {
	return { title, description, dueDate, priority, project };
}

_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("task-submitted", createTask);

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

_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("task-submitted", completedTask);

function completedTask() {
	const checkmarks = document.querySelectorAll(".task-checked");

	checkmarks.forEach((checkmark) => {
		checkmark.addEventListener("click", (e) => {
			// const checked = e.target.closest(".task");
			// const getTaskIndex = +checked.dataset.task.replace(/\D+/g, "");

			// taskCard.getTask().splice(getTaskIndex, 1);
			console.log("logged");

			_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish("task-completed");
		});
	});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNKOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFjO0FBQ2xCLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEVBQUUscURBQWdCO0FBQ2xCO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLHFEQUFnQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMENBQTBDLHFCQUFxQjs7QUFFL0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQyxXQUFXO0FBQy9DLHNDQUFzQywrQkFBK0I7QUFDckU7QUFDQTtBQUNBLEdBQUc7QUFDSCwwQ0FBMEMsY0FBYzs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbExNO0FBQ1AsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7O0FDcEJrQztBQUNXOztBQUU3QztBQUNBLFVBQVU7QUFDVjs7QUFFQSxxREFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLG1EQUFjO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscURBQWdCOztBQUVoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRyxtREFBYztBQUNqQixHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7O1VDdENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNObUQ7O0FBRW5ELG9FQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlclBhZ2UoKSB7XG5cdHRhc2tNb2RhbC5yZW5kZXIoKTtcblx0dGFza05hdmlnYXRpb24ucmVuZGVyKCk7XG5cdHRhc2tDYXJkLnJlbmRlcigpO1xufVxuXG5jb25zdCB0YXNrTmF2aWdhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB0YXNrSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWl0ZW1zXCIpO1xuXG5cdFx0dGFza0l0ZW1zTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGlmIChlLnRhcmdldC50YWdOYW1lID09PSBcIkxJXCIpIHtcblx0XHRcdFx0dW5zdHlsZVByZXZpb3VzVGFzaygpO1xuXHRcdFx0XHRzaG93Q3VycmVudFRhc2soZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdGNvbnN0IHVuc3R5bGVQcmV2aW91c1Rhc2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgdW5zdHlsZVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VsZWN0ZWRcIik7XG5cdFx0dW5zdHlsZVRhc2suY2xhc3NMaXN0LnJlbW92ZShcInRhc2stc2VsZWN0ZWRcIik7XG5cdH07XG5cdGNvbnN0IHNob3dDdXJyZW50VGFzayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc3QgdGFza0hlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1zZWxlY3RlZC1oZWFkZXJcIik7XG5cblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwidGFzay1zZWxlY3RlZFwiKTtcblx0XHR0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG5cdH07XG5cblx0cmV0dXJuIHsgcmVuZGVyIH07XG59KSgpO1xuXG5jb25zdCB0YXNrTW9kYWwgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcblx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcblx0Y29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5LXNlbGVjdGVkXCIpO1xuXHRjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKTtcblxuXHRjb25zdCBfaXNWYWxpZFRpdGxlID0gKCkgPT4gdGl0bGUuY2hlY2tWYWxpZGl0eSgpO1xuXG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHRjb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdGFza1wiKTtcblx0XHRjb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblx0XHRjb25zdCBzaG93VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaG93LXRhc2stbW9kYWxcIik7XG5cblx0XHR0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKTtcblxuXHRcdHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGlmIChfaXNWYWxpZFRpdGxlKCkpIHtcblx0XHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdFx0XHRwdWJTdWIucHVibGlzaChcInRhc2stc3VibWl0dGVkXCIpO1xuXHRcdFx0fSBlbHNlIHRhc2tNb2RhbC5kaXNwbGF5RXJyb3IoKTtcblx0XHR9KTtcblxuXHRcdHNob3dUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRhc2tNb2RhbC5jbGVhclZhbHVlcygpO1xuXHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0dGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcblx0XHRcdGlmIChfaXNWYWxpZFRpdGxlKCkpIHRhc2tNb2RhbC5kaXNwbGF5Q29ycmVjdCgpO1xuXHRcdFx0ZWxzZSB0YXNrTW9kYWwuZGlzcGxheUVycm9yKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgdGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3JcIik7XG5cdGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuXHRjb25zdCBjaGVja21hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWNoZWNrbWFyay1zdmcgPiBzdmdcIik7XG5cdGNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1lcnJvci1zdmcgPiBzdmdcIik7XG5cblx0Y29uc3QgZGlzcGxheUVycm9yID0gKCkgPT4ge1xuXHRcdHRpdGxlRXJyb3IudGV4dENvbnRlbnQgPSBcIlRpdGxlIGNhbm5vdCBiZSBlbXB0eS5cIjtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjZWY0NDQ0XCI7XG5cdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHR9O1xuXG5cdGNvbnN0IGRpc3BsYXlDb3JyZWN0ID0gKCkgPT4ge1xuXHRcdHRpdGxlRXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICMyMmM1NWVcIjtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRjaGVja21hcmsuc3R5bGUub3BhY2l0eSA9IDE7XG5cdH07XG5cblx0Y29uc3QgY2xlYXJWYWx1ZXMgPSAoKSA9PiB7XG5cdFx0dGl0bGUudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiXCI7XG5cdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXG5cdFx0dGl0bGUudmFsdWUgPSBcIlwiO1xuXHRcdGRlc2NyaXB0aW9uLnZhbHVlID0gXCJcIjtcblx0XHRkdWVEYXRlLnZhbHVlID0gXCJcIjtcblx0XHRwcmlvcml0eS52YWx1ZSA9IFwiTG93XCI7XG5cdFx0cHJvamVjdHMudmFsdWUgPSBcIlByb2plY3QgaWRrXCI7XG5cdH07XG5cblx0Y29uc3QgdG9nZ2xlVGFza01vZGFsID0gKCkgPT4ge1xuXHRcdGNvbnN0IHRhc2tNb2RhbFZpc2liaWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG5cdFx0dGFza01vZGFsVmlzaWJpbGl0eS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlbmRlcixcblx0XHRjbGVhclZhbHVlcyxcblx0XHRkaXNwbGF5RXJyb3IsXG5cdFx0ZGlzcGxheUNvcnJlY3QsXG5cdFx0dG9nZ2xlVGFza01vZGFsLFxuXHR9O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IHRhc2tDYXJkID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgdGFza3MgPSBbXTtcblx0Y29uc3QgZ2V0VGFzayA9ICgpID0+IHRhc2tzO1xuXG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHRwdWJTdWIuc3Vic2NyaWJlKFwidGFzay1jcmVhdGVkXCIsICh0YXNrUHJvcGVydGllcykgPT4ge1xuXHRcdFx0X2NyZWF0ZVRhc2tDYXJkKHRhc2tQcm9wZXJ0aWVzKTtcblx0XHR9KTtcblxuXHRcdHB1YlN1Yi5zdWJzY3JpYmUoXCJ0YXNrLWNvbXBsZXRlZFwiLCBfY29tcGxldGVkVGFza0NhcmQpO1xuXHR9O1xuXG5cdGNvbnN0IF9jb21wbGV0ZWRUYXNrQ2FyZCA9ICgpID0+IHtcblx0XHQvLyBjb25zb2xlLmxvZyhcInRlc3RcIik7XG5cdH07XG5cblx0Y29uc3QgX2NyZWF0ZVRhc2tDYXJkID0gKHRhc2spID0+IHtcblx0XHR0YXNrcy5wdXNoKHRhc2spO1xuXG5cdFx0Y29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG5cblx0XHRjb25zdCB0YXNrQ2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHRjb25zdCB0YXNrQ2hlY2tlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y29uc3QgdGFza0NoZWNrZWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tDaGVja21hcmtTVkcgPSBgXG5cdFx0PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgY2xhc3M9XCJ0YXNrLWNoZWNrbWFyay1zdmdcIiB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMThcIj5cblx0XHRcdDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTksMjAuNDJMMi43OSwxNC4yMUw1LjYyLDExLjM4TDksMTQuNzdMMTguODgsNC44OEwyMS43MSw3LjcxTDksMjAuNDJaXCIgLz5cblx0XHQ8L3N2Zz5gO1xuXG5cdFx0dGFza0NhcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG5cblx0XHR0YXNrQ2FyZENvbnRhaW5lci5kYXRhc2V0LnRhc2sgPSBgdGFzayR7Z2V0VGFzaygpLmxlbmd0aCAtIDF9YDtcblxuXHRcdHRhc2tDaGVja2VkLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNoZWNrZWRcIik7XG5cdFx0dGFza0NoZWNrZWRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNoZWNrbWFyay1jb250YWluZXJcIik7XG5cblx0XHR0YXNrQ2hlY2tlZENvbnRhaW5lci5pbm5lckhUTUwgKz0gdGFza0NoZWNrbWFya1NWRztcblx0XHR0YXNrQ2hlY2tlZC5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tlZENvbnRhaW5lcik7XG5cblx0XHRjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHR0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBgVGl0bGU6ICR7dGFzay50aXRsZX1gO1xuXHRcdHRhc2tEYXRlLnRleHRDb250ZW50ID0gYER1ZSBEYXRlOiAke3Rhc2suZGF0ZSA/IHRhc2suZGF0ZSA6IFwiTm9uZVwifWA7XG5cdFx0dGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYERlc2NyaXB0aW9uOiAke1xuXHRcdFx0dGFzay5kZXNjcmlwdGlvbiA/IHRhc2suZGVzY3JpcHRpb24gOiBcIk5vbmVcIlxuXHRcdH1gO1xuXHRcdHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IGBQcmlvcml0eTogJHt0YXNrLnByaW9yaXR5fWA7XG5cblx0XHR0YXNrQ2FyZENvbnRhaW5lci5hcHBlbmQoXG5cdFx0XHR0YXNrQ2hlY2tlZCxcblx0XHRcdHRhc2tUaXRsZSxcblx0XHRcdHRhc2tEYXRlLFxuXHRcdFx0dGFza0Rlc2NyaXB0aW9uLFxuXHRcdFx0dGFza1ByaW9yaXR5XG5cdFx0KTtcblxuXHRcdHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NhcmRDb250YWluZXIpO1xuXHR9O1xuXG5cdHJldHVybiB7IHJlbmRlciwgZ2V0VGFzayB9O1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG5cdGV2ZW50czoge30sXG5cdHN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXHR9LFxuXHR1bnN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdW5zdWJzY3JpYmVkRm4pIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKFxuXHRcdFx0XHQoZm4pID0+IGZuICE9PSB1bnN1YnNjcmliZWRGblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdHB1Ymxpc2g6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRmbihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcbn07XG4iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcbmltcG9ydCB7IHRhc2tDYXJkIH0gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uXCI7XG5cbmZ1bmN0aW9uIFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuXHRyZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0IH07XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoXCJ0YXNrLXN1Ym1pdHRlZFwiLCBjcmVhdGVUYXNrKTtcblxuZnVuY3Rpb24gY3JlYXRlVGFzaygpIHtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnZhbHVlO1xuXHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG5cdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIikudmFsdWU7XG5cdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eS1zZWxlY3RlZFwiKS52YWx1ZTtcblx0Y29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKS52YWx1ZTtcblxuXHRwdWJTdWIucHVibGlzaChcblx0XHRcInRhc2stY3JlYXRlZFwiLFxuXHRcdFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblx0KTtcbn1cblxucHViU3ViLnN1YnNjcmliZShcInRhc2stc3VibWl0dGVkXCIsIGNvbXBsZXRlZFRhc2spO1xuXG5mdW5jdGlvbiBjb21wbGV0ZWRUYXNrKCkge1xuXHRjb25zdCBjaGVja21hcmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWNoZWNrZWRcIik7XG5cblx0Y2hlY2ttYXJrcy5mb3JFYWNoKChjaGVja21hcmspID0+IHtcblx0XHRjaGVja21hcmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHQvLyBjb25zdCBjaGVja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi50YXNrXCIpO1xuXHRcdFx0Ly8gY29uc3QgZ2V0VGFza0luZGV4ID0gK2NoZWNrZWQuZGF0YXNldC50YXNrLnJlcGxhY2UoL1xcRCsvZywgXCJcIik7XG5cblx0XHRcdC8vIHRhc2tDYXJkLmdldFRhc2soKS5zcGxpY2UoZ2V0VGFza0luZGV4LCAxKTtcblx0XHRcdGNvbnNvbGUubG9nKFwibG9nZ2VkXCIpO1xuXG5cdFx0XHRwdWJTdWIucHVibGlzaChcInRhc2stY29tcGxldGVkXCIpO1xuXHRcdH0pO1xuXHR9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHJlbmRlclBhZ2UgZnJvbSBcIi4vbW9kdWxlcy9kb21NYW5pcHVsYXRpb25cIjtcblxucmVuZGVyUGFnZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9