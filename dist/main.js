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

	const _completedTaskCard = (index) => {
		const completedTask = document.querySelector(
			`[data-task=task${index}]`
		);
		completedTask.innerHTML = "";
		completedTask.remove();
		renderNewDataSet();
	};

	const renderNewDataSet = () => {
		const taskClass = document.querySelectorAll(".task");
		let i = 0;

		taskClass.forEach((task) => {
			task.dataset.task = `task${i}`;
			i++;
		});
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
		taskChecked.addEventListener("click", (e) => (0,_task__WEBPACK_IMPORTED_MODULE_1__.completedTask)(e));
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "completedTask": () => (/* binding */ completedTask)
/* harmony export */ });
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

function completedTask(e) {
	const task = e.target.closest(".task");
	const getTaskIndex = +task.dataset.task.replace(/\D+/g, "");
	const completedTask = _domManipulation__WEBPACK_IMPORTED_MODULE_1__.taskCard.getTask().splice(getTaskIndex, 1);

	_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish("task-completed", getTaskIndex);
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
// import "./styles.css";


(0,_modules_domManipulation__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNKO0FBQ1M7O0FBRXhCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFjO0FBQ2xCLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEVBQUUscURBQWdCO0FBQ2xCO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLHFEQUFnQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLE1BQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsRUFBRTtBQUNoQztBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQ0FBMEMscUJBQXFCOztBQUUvRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLFdBQVc7QUFDL0Msc0NBQXNDLCtCQUErQjtBQUNyRTtBQUNBO0FBQ0EsR0FBRztBQUNILDBDQUEwQyxjQUFjOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxvREFBYTtBQUM1RDs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbk1NO0FBQ1AsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJrQztBQUNXOztBQUU3QztBQUNBLFVBQVU7QUFDVjs7QUFFQSxxREFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLG1EQUFjO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsdUJBQXVCLDhEQUFnQjs7QUFFdkMsQ0FBQyxtREFBYztBQUNmOzs7Ozs7O1VDNUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNtRDs7QUFFbkQsb0VBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHViU3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YlN1YiB9IGZyb20gXCIuL3B1YlN1YlwiO1xuaW1wb3J0IHsgdGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IGNvbXBsZXRlZFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlclBhZ2UoKSB7XG5cdHRhc2tNb2RhbC5yZW5kZXIoKTtcblx0dGFza05hdmlnYXRpb24ucmVuZGVyKCk7XG5cdHRhc2tDYXJkLnJlbmRlcigpO1xufVxuXG5jb25zdCB0YXNrTmF2aWdhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB0YXNrSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWl0ZW1zXCIpO1xuXG5cdFx0dGFza0l0ZW1zTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGlmIChlLnRhcmdldC50YWdOYW1lID09PSBcIkxJXCIpIHtcblx0XHRcdFx0dW5zdHlsZVByZXZpb3VzVGFzaygpO1xuXHRcdFx0XHRzaG93Q3VycmVudFRhc2soZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdGNvbnN0IHVuc3R5bGVQcmV2aW91c1Rhc2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgdW5zdHlsZVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VsZWN0ZWRcIik7XG5cdFx0dW5zdHlsZVRhc2suY2xhc3NMaXN0LnJlbW92ZShcInRhc2stc2VsZWN0ZWRcIik7XG5cdH07XG5cdGNvbnN0IHNob3dDdXJyZW50VGFzayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc3QgdGFza0hlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1zZWxlY3RlZC1oZWFkZXJcIik7XG5cblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwidGFzay1zZWxlY3RlZFwiKTtcblx0XHR0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG5cdH07XG5cblx0cmV0dXJuIHsgcmVuZGVyIH07XG59KSgpO1xuXG5jb25zdCB0YXNrTW9kYWwgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcblx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcblx0Y29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5LXNlbGVjdGVkXCIpO1xuXHRjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKTtcblxuXHRjb25zdCBfaXNWYWxpZFRpdGxlID0gKCkgPT4gdGl0bGUuY2hlY2tWYWxpZGl0eSgpO1xuXG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHRjb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdGFza1wiKTtcblx0XHRjb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblx0XHRjb25zdCBzaG93VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaG93LXRhc2stbW9kYWxcIik7XG5cblx0XHR0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKTtcblxuXHRcdHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGlmIChfaXNWYWxpZFRpdGxlKCkpIHtcblx0XHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdFx0XHRwdWJTdWIucHVibGlzaChcInRhc2stc3VibWl0dGVkXCIpO1xuXHRcdFx0fSBlbHNlIHRhc2tNb2RhbC5kaXNwbGF5RXJyb3IoKTtcblx0XHR9KTtcblxuXHRcdHNob3dUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRhc2tNb2RhbC5jbGVhclZhbHVlcygpO1xuXHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0dGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcblx0XHRcdGlmIChfaXNWYWxpZFRpdGxlKCkpIHRhc2tNb2RhbC5kaXNwbGF5Q29ycmVjdCgpO1xuXHRcdFx0ZWxzZSB0YXNrTW9kYWwuZGlzcGxheUVycm9yKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgdGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3JcIik7XG5cdGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuXHRjb25zdCBjaGVja21hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWNoZWNrbWFyay1zdmcgPiBzdmdcIik7XG5cdGNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1lcnJvci1zdmcgPiBzdmdcIik7XG5cblx0Y29uc3QgZGlzcGxheUVycm9yID0gKCkgPT4ge1xuXHRcdHRpdGxlRXJyb3IudGV4dENvbnRlbnQgPSBcIlRpdGxlIGNhbm5vdCBiZSBlbXB0eS5cIjtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjZWY0NDQ0XCI7XG5cdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHR9O1xuXG5cdGNvbnN0IGRpc3BsYXlDb3JyZWN0ID0gKCkgPT4ge1xuXHRcdHRpdGxlRXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICMyMmM1NWVcIjtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRjaGVja21hcmsuc3R5bGUub3BhY2l0eSA9IDE7XG5cdH07XG5cblx0Y29uc3QgY2xlYXJWYWx1ZXMgPSAoKSA9PiB7XG5cdFx0dGl0bGUudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiXCI7XG5cdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXG5cdFx0dGl0bGUudmFsdWUgPSBcIlwiO1xuXHRcdGRlc2NyaXB0aW9uLnZhbHVlID0gXCJcIjtcblx0XHRkdWVEYXRlLnZhbHVlID0gXCJcIjtcblx0XHRwcmlvcml0eS52YWx1ZSA9IFwiTG93XCI7XG5cdFx0cHJvamVjdHMudmFsdWUgPSBcIlByb2plY3QgaWRrXCI7XG5cdH07XG5cblx0Y29uc3QgdG9nZ2xlVGFza01vZGFsID0gKCkgPT4ge1xuXHRcdGNvbnN0IHRhc2tNb2RhbFZpc2liaWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG5cdFx0dGFza01vZGFsVmlzaWJpbGl0eS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHJlbmRlcixcblx0XHRjbGVhclZhbHVlcyxcblx0XHRkaXNwbGF5RXJyb3IsXG5cdFx0ZGlzcGxheUNvcnJlY3QsXG5cdFx0dG9nZ2xlVGFza01vZGFsLFxuXHR9O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IHRhc2tDYXJkID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgdGFza3MgPSBbXTtcblx0Y29uc3QgZ2V0VGFzayA9ICgpID0+IHRhc2tzO1xuXG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHRwdWJTdWIuc3Vic2NyaWJlKFwidGFzay1jcmVhdGVkXCIsICh0YXNrUHJvcGVydGllcykgPT4ge1xuXHRcdFx0X2NyZWF0ZVRhc2tDYXJkKHRhc2tQcm9wZXJ0aWVzKTtcblx0XHR9KTtcblxuXHRcdHB1YlN1Yi5zdWJzY3JpYmUoXCJ0YXNrLWNvbXBsZXRlZFwiLCBfY29tcGxldGVkVGFza0NhcmQpO1xuXHR9O1xuXG5cdGNvbnN0IF9jb21wbGV0ZWRUYXNrQ2FyZCA9IChpbmRleCkgPT4ge1xuXHRcdGNvbnN0IGNvbXBsZXRlZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0YFtkYXRhLXRhc2s9dGFzayR7aW5kZXh9XWBcblx0XHQpO1xuXHRcdGNvbXBsZXRlZFRhc2suaW5uZXJIVE1MID0gXCJcIjtcblx0XHRjb21wbGV0ZWRUYXNrLnJlbW92ZSgpO1xuXHRcdHJlbmRlck5ld0RhdGFTZXQoKTtcblx0fTtcblxuXHRjb25zdCByZW5kZXJOZXdEYXRhU2V0ID0gKCkgPT4ge1xuXHRcdGNvbnN0IHRhc2tDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza1wiKTtcblx0XHRsZXQgaSA9IDA7XG5cblx0XHR0YXNrQ2xhc3MuZm9yRWFjaCgodGFzaykgPT4ge1xuXHRcdFx0dGFzay5kYXRhc2V0LnRhc2sgPSBgdGFzayR7aX1gO1xuXHRcdFx0aSsrO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9jcmVhdGVUYXNrQ2FyZCA9ICh0YXNrKSA9PiB7XG5cdFx0dGFza3MucHVzaCh0YXNrKTtcblxuXHRcdGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuXG5cdFx0Y29uc3QgdGFza0NhcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0Y29uc3QgdGFza0NoZWNrZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRhc2tDaGVja2VkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrQ2hlY2ttYXJrU1ZHID0gYFxuXHRcdDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwidGFzay1jaGVja21hcmstc3ZnXCIgd2lkdGg9XCIxOFwiIGhlaWdodD1cIjE4XCI+XG5cdFx0XHQ8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk05LDIwLjQyTDIuNzksMTQuMjFMNS42MiwxMS4zOEw5LDE0Ljc3TDE4Ljg4LDQuODhMMjEuNzEsNy43MUw5LDIwLjQyWlwiIC8+XG5cdFx0PC9zdmc+YDtcblxuXHRcdHRhc2tDYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuXG5cdFx0dGFza0NhcmRDb250YWluZXIuZGF0YXNldC50YXNrID0gYHRhc2ske2dldFRhc2soKS5sZW5ndGggLSAxfWA7XG5cblx0XHR0YXNrQ2hlY2tlZC5jbGFzc0xpc3QuYWRkKFwidGFzay1jaGVja2VkXCIpO1xuXHRcdHRhc2tDaGVja2VkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjaGVja21hcmstY29udGFpbmVyXCIpO1xuXG5cdFx0dGFza0NoZWNrZWRDb250YWluZXIuaW5uZXJIVE1MICs9IHRhc2tDaGVja21hcmtTVkc7XG5cdFx0dGFza0NoZWNrZWQuYXBwZW5kQ2hpbGQodGFza0NoZWNrZWRDb250YWluZXIpO1xuXG5cdFx0Y29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0dGFza1RpdGxlLnRleHRDb250ZW50ID0gYFRpdGxlOiAke3Rhc2sudGl0bGV9YDtcblx0XHR0YXNrRGF0ZS50ZXh0Q29udGVudCA9IGBEdWUgRGF0ZTogJHt0YXNrLmRhdGUgPyB0YXNrLmRhdGUgOiBcIk5vbmVcIn1gO1xuXHRcdHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGBEZXNjcmlwdGlvbjogJHtcblx0XHRcdHRhc2suZGVzY3JpcHRpb24gPyB0YXNrLmRlc2NyaXB0aW9uIDogXCJOb25lXCJcblx0XHR9YDtcblx0XHR0YXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSBgUHJpb3JpdHk6ICR7dGFzay5wcmlvcml0eX1gO1xuXG5cdFx0dGFza0NhcmRDb250YWluZXIuYXBwZW5kKFxuXHRcdFx0dGFza0NoZWNrZWQsXG5cdFx0XHR0YXNrVGl0bGUsXG5cdFx0XHR0YXNrRGF0ZSxcblx0XHRcdHRhc2tEZXNjcmlwdGlvbixcblx0XHRcdHRhc2tQcmlvcml0eVxuXHRcdCk7XG5cblx0XHR0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDYXJkQ29udGFpbmVyKTtcblx0XHR0YXNrQ2hlY2tlZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGNvbXBsZXRlZFRhc2soZSkpO1xuXHR9O1xuXG5cdHJldHVybiB7IHJlbmRlciwgZ2V0VGFzayB9O1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG5cdGV2ZW50czoge30sXG5cdHN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXHR9LFxuXHR1bnN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdW5zdWJzY3JpYmVkRm4pIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKFxuXHRcdFx0XHQoZm4pID0+IGZuICE9PSB1bnN1YnNjcmliZWRGblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdHB1Ymxpc2g6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRmbihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcbn07XG4iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcbmltcG9ydCB7IHRhc2tDYXJkIH0gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uXCI7XG5cbmZ1bmN0aW9uIFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuXHRyZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0IH07XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoXCJ0YXNrLXN1Ym1pdHRlZFwiLCBjcmVhdGVUYXNrKTtcblxuZnVuY3Rpb24gY3JlYXRlVGFzaygpIHtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnZhbHVlO1xuXHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG5cdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIikudmFsdWU7XG5cdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eS1zZWxlY3RlZFwiKS52YWx1ZTtcblx0Y29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKS52YWx1ZTtcblxuXHRwdWJTdWIucHVibGlzaChcblx0XHRcInRhc2stY3JlYXRlZFwiLFxuXHRcdFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBsZXRlZFRhc2soZSkge1xuXHRjb25zdCB0YXNrID0gZS50YXJnZXQuY2xvc2VzdChcIi50YXNrXCIpO1xuXHRjb25zdCBnZXRUYXNrSW5kZXggPSArdGFzay5kYXRhc2V0LnRhc2sucmVwbGFjZSgvXFxEKy9nLCBcIlwiKTtcblx0Y29uc3QgY29tcGxldGVkVGFzayA9IHRhc2tDYXJkLmdldFRhc2soKS5zcGxpY2UoZ2V0VGFza0luZGV4LCAxKTtcblxuXHRwdWJTdWIucHVibGlzaChcInRhc2stY29tcGxldGVkXCIsIGdldFRhc2tJbmRleCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCBcIi4vc3R5bGVzLmNzc1wiO1xuaW1wb3J0IHJlbmRlclBhZ2UgZnJvbSBcIi4vbW9kdWxlcy9kb21NYW5pcHVsYXRpb25cIjtcblxucmVuZGVyUGFnZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9