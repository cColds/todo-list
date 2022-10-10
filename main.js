/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dom)
/* harmony export */ });
/* harmony import */ var _taskModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskModal */ "./src/modules/taskModal.js");
/* harmony import */ var _selectedTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectedTask */ "./src/modules/selectedTask.js");



function dom() {
	(0,_taskModal__WEBPACK_IMPORTED_MODULE_0__.taskModal)();
	_selectedTask__WEBPACK_IMPORTED_MODULE_1__.task.selectedTask();
}


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

/***/ "./src/modules/selectedTask.js":
/*!*************************************!*\
  !*** ./src/modules/selectedTask.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "task": () => (/* binding */ task)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/modules/pubSub.js");


const task = {
	selectedTask: function () {
		_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("styledTask", task.styleCurrentTask);
		_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("unstyledTask", task.unstylePreviousTask);

		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish("unstyledTask");
				_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish("styledTask", e);
			}
		});
	},
	unstylePreviousTask: function () {
		document
			.querySelector(".task-selected")
			.classList.remove("task-selected");
	},
	styleCurrentTask: function (e) {
		const taskHeader = document.querySelector(".task-selected-header");

		e.target.classList.add("task-selected");
		taskHeader.textContent = e.target.textContent;
	},
};


/***/ }),

/***/ "./src/modules/taskModal.js":
/*!**********************************!*\
  !*** ./src/modules/taskModal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskModal": () => (/* binding */ taskModal)
/* harmony export */ });
const taskModal = () => {
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

	const title = document.querySelector("#title");

	const isValidTitle = () => title.checkValidity();
	const isValidForm = () =>
		isValidTitle() ? toggleTaskModal() : displayError();

	const taskCancelBtn = document.querySelector(".cancel-task");
	const taskAddBtn = document.querySelector(".add-task");
	const showTaskModal = document.querySelector(".show-task-modal");

	taskCancelBtn.addEventListener("click", toggleTaskModal);

	taskAddBtn.addEventListener("click", isValidForm);

	showTaskModal.addEventListener("click", () => {
		clearValues();
		toggleTaskModal();
	});

	title.addEventListener("keyup", () => {
		isValidTitle() ? displayCorrect() : displayError();
	});

	function clearValues() {
		const description = document.querySelector("#description");
		const dueDate = document.querySelector("#date");
		const priority = document.querySelector("#priority-selected");
		const projects = document.querySelector("#project-selected");

		title.value = "";
		titleError.textContent = "";
		description.value = "";
		dueDate.value = "";
		priority.value = "Low";
		projects.value = "Project idk";
		titleInput.style.outline = "";
		checkmark.style.opacity = 0;
		error.style.opacity = 0;
	}

	function toggleTaskModal() {
		const taskModal = document.querySelector(".task-modal");
		taskModal.classList.toggle("hide");
	}
};


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
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");


(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ0Y7O0FBRXZCO0FBQ2YsQ0FBQyxxREFBUztBQUNWLENBQUMsNERBQWlCO0FBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7QUNOTztBQUNQLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEJrQzs7QUFFM0I7QUFDUDtBQUNBLEVBQUUscURBQWdCO0FBQ2xCLEVBQUUscURBQWdCOztBQUVsQjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQixJQUFJLG1EQUFjO0FBQ2xCO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQzNCTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2hFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmdDOztBQUVoQyx3REFBRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc2VsZWN0ZWRUYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tNb2RhbC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFza01vZGFsIH0gZnJvbSBcIi4vdGFza01vZGFsXCI7XG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4vc2VsZWN0ZWRUYXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvbSgpIHtcblx0dGFza01vZGFsKCk7XG5cdHRhc2suc2VsZWN0ZWRUYXNrKCk7XG59XG4iLCJleHBvcnQgY29uc3QgcHViU3ViID0ge1xuXHRldmVudHM6IHt9LFxuXHRzdWJzY3JpYmU6IGZ1bmN0aW9uIChldmVudE5hbWUsIGZuKSB7XG5cdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gfHwgW107XG5cdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblx0fSxcblx0dW5zdWJzY3JpYmU6IGZ1bmN0aW9uIChldmVudE5hbWUsIHVuc3Vic2NyaWJlZEZuKSB7XG5cdFx0aWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcblx0XHRcdHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihcblx0XHRcdFx0KGZuKSA9PiBmbiAhPT0gdW5zdWJzY3JpYmVkRm5cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXHRwdWJsaXNoOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBkYXRhKSB7XG5cdFx0aWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcblx0XHRcdHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0Zm4oZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG59O1xuIiwiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSBcIi4vcHViU3ViXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuXHRzZWxlY3RlZFRhc2s6IGZ1bmN0aW9uICgpIHtcblx0XHRwdWJTdWIuc3Vic2NyaWJlKFwic3R5bGVkVGFza1wiLCB0YXNrLnN0eWxlQ3VycmVudFRhc2spO1xuXHRcdHB1YlN1Yi5zdWJzY3JpYmUoXCJ1bnN0eWxlZFRhc2tcIiwgdGFzay51bnN0eWxlUHJldmlvdXNUYXNrKTtcblxuXHRcdGNvbnN0IHRhc2tJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2staXRlbXNcIik7XG5cblx0XHR0YXNrSXRlbXNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0aWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09IFwiTElcIikge1xuXHRcdFx0XHRwdWJTdWIucHVibGlzaChcInVuc3R5bGVkVGFza1wiKTtcblx0XHRcdFx0cHViU3ViLnB1Ymxpc2goXCJzdHlsZWRUYXNrXCIsIGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHR1bnN0eWxlUHJldmlvdXNUYXNrOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZG9jdW1lbnRcblx0XHRcdC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VsZWN0ZWRcIilcblx0XHRcdC5jbGFzc0xpc3QucmVtb3ZlKFwidGFzay1zZWxlY3RlZFwiKTtcblx0fSxcblx0c3R5bGVDdXJyZW50VGFzazogZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zdCB0YXNrSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlbGVjdGVkLWhlYWRlclwiKTtcblxuXHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXNlbGVjdGVkXCIpO1xuXHRcdHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcblx0fSxcbn07XG4iLCJleHBvcnQgY29uc3QgdGFza01vZGFsID0gKCkgPT4ge1xuXHRjb25zdCB0aXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1lcnJvclwiKTtcblx0Y29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdGNvbnN0IGNoZWNrbWFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtY2hlY2ttYXJrLXN2ZyA+IHN2Z1wiKTtcblx0Y29uc3QgZXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWVycm9yLXN2ZyA+IHN2Z1wiKTtcblxuXHRjb25zdCBkaXNwbGF5RXJyb3IgPSAoKSA9PiB7XG5cdFx0dGl0bGVFcnJvci50ZXh0Q29udGVudCA9IFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5LlwiO1xuXHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICNlZjQ0NDRcIjtcblx0XHRjaGVja21hcmsuc3R5bGUub3BhY2l0eSA9IDA7XG5cdH07XG5cblx0Y29uc3QgZGlzcGxheUNvcnJlY3QgPSAoKSA9PiB7XG5cdFx0dGl0bGVFcnJvci50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0dGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgIzIyYzU1ZVwiO1xuXHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMTtcblx0fTtcblxuXHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cblx0Y29uc3QgaXNWYWxpZFRpdGxlID0gKCkgPT4gdGl0bGUuY2hlY2tWYWxpZGl0eSgpO1xuXHRjb25zdCBpc1ZhbGlkRm9ybSA9ICgpID0+XG5cdFx0aXNWYWxpZFRpdGxlKCkgPyB0b2dnbGVUYXNrTW9kYWwoKSA6IGRpc3BsYXlFcnJvcigpO1xuXG5cdGNvbnN0IHRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10YXNrXCIpO1xuXHRjb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblx0Y29uc3Qgc2hvd1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvdy10YXNrLW1vZGFsXCIpO1xuXG5cdHRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVRhc2tNb2RhbCk7XG5cblx0dGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaXNWYWxpZEZvcm0pO1xuXG5cdHNob3dUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjbGVhclZhbHVlcygpO1xuXHRcdHRvZ2dsZVRhc2tNb2RhbCgpO1xuXHR9KTtcblxuXHR0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuXHRcdGlzVmFsaWRUaXRsZSgpID8gZGlzcGxheUNvcnJlY3QoKSA6IGRpc3BsYXlFcnJvcigpO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBjbGVhclZhbHVlcygpIHtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIik7XG5cdFx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcblx0XHRjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHktc2VsZWN0ZWRcIik7XG5cdFx0Y29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0ZWRcIik7XG5cblx0XHR0aXRsZS52YWx1ZSA9IFwiXCI7XG5cdFx0dGl0bGVFcnJvci50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0ZGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuXHRcdGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuXHRcdHByaW9yaXR5LnZhbHVlID0gXCJMb3dcIjtcblx0XHRwcm9qZWN0cy52YWx1ZSA9IFwiUHJvamVjdCBpZGtcIjtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMDtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZVRhc2tNb2RhbCgpIHtcblx0XHRjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG5cdFx0dGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXHR9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZG9tIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5cbmRvbSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9