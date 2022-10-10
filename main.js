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
	_taskModal__WEBPACK_IMPORTED_MODULE_0__.taskModal.checkFormValidity();
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
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/modules/pubSub.js");


const title = document.querySelector("#title");

const taskModal = {
	checkFormValidity: () => {
		const isValidTitle = () => title.checkValidity();
		const isValidForm = () => {
			if (isValidTitle()) taskModal.toggleTaskModal();
			else taskModal.displayValidity().displayError();
		};

		const taskCancelBtn = document.querySelector(".cancel-task");
		const taskAddBtn = document.querySelector(".add-task");
		const showTaskModal = document.querySelector(".show-task-modal");

		taskCancelBtn.addEventListener("click", taskModal.toggleTaskModal);

		taskAddBtn.addEventListener("click", isValidForm);

		showTaskModal.addEventListener("click", () => {
			taskModal.clearValues();
			taskModal.toggleTaskModal();
		});

		title.addEventListener("keyup", () => {
			if (isValidTitle()) taskModal.displayValidity().displayCorrect();
			else taskModal.displayValidity().displayError();
		});
	},
	displayValidity: () => {
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
		return {
			displayError,
			displayCorrect,
			titleError,
			titleInput,
			checkmark,
			error,
		};
	},

	clearValues: () => {
		const description = document.querySelector("#description");
		const dueDate = document.querySelector("#date");
		const priority = document.querySelector("#priority-selected");
		const projects = document.querySelector("#project-selected");

		taskModal.displayValidity().textContent = "";
		taskModal.displayValidity().titleInput.style.outline = "";
		taskModal.displayValidity().checkmark.style.opacity = 0;
		taskModal.displayValidity().error.style.opacity = 0;

		title.value = "";
		description.value = "";
		dueDate.value = "";
		priority.value = "Low";
		projects.value = "Project idk";
	},

	toggleTaskModal: () => {
		const taskModalVisibility = document.querySelector(".task-modal");
		taskModalVisibility.classList.toggle("hide");
	},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ0Y7O0FBRXZCO0FBQ2YsQ0FBQyxtRUFBMkI7QUFDNUIsQ0FBQyw0REFBaUI7QUFDbEI7Ozs7Ozs7Ozs7Ozs7OztBQ05PO0FBQ1AsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQmtDOztBQUUzQjtBQUNQO0FBQ0EsRUFBRSxxREFBZ0I7QUFDbEIsRUFBRSxxREFBZ0I7O0FBRWxCOztBQUVBO0FBQ0E7QUFDQSxJQUFJLG1EQUFjO0FBQ2xCLElBQUksbURBQWM7QUFDbEI7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7Ozs7OztBQzNCa0M7O0FBRWxDOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7VUNqRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05nQzs7QUFFaEMsd0RBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHViU3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3NlbGVjdGVkVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrTW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRhc2tNb2RhbCB9IGZyb20gXCIuL3Rhc2tNb2RhbFwiO1xuaW1wb3J0IHsgdGFzayB9IGZyb20gXCIuL3NlbGVjdGVkVGFza1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb20oKSB7XG5cdHRhc2tNb2RhbC5jaGVja0Zvcm1WYWxpZGl0eSgpO1xuXHR0YXNrLnNlbGVjdGVkVGFzaygpO1xufVxuIiwiZXhwb3J0IGNvbnN0IHB1YlN1YiA9IHtcblx0ZXZlbnRzOiB7fSxcblx0c3Vic2NyaWJlOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuXHRcdHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuXHRcdHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG5cdH0sXG5cdHVuc3Vic2NyaWJlOiBmdW5jdGlvbiAoZXZlbnROYW1lLCB1bnN1YnNjcmliZWRGbikge1xuXHRcdGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG5cdFx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoXG5cdFx0XHRcdChmbikgPT4gZm4gIT09IHVuc3Vic2NyaWJlZEZuXG5cdFx0XHQpO1xuXHRcdH1cblx0fSxcblx0cHVibGlzaDogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xuXHRcdGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG5cdFx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdGZuKGRhdGEpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxufTtcbiIsImltcG9ydCB7IHB1YlN1YiB9IGZyb20gXCIuL3B1YlN1YlwiO1xuXG5leHBvcnQgY29uc3QgdGFzayA9IHtcblx0c2VsZWN0ZWRUYXNrOiBmdW5jdGlvbiAoKSB7XG5cdFx0cHViU3ViLnN1YnNjcmliZShcInN0eWxlZFRhc2tcIiwgdGFzay5zdHlsZUN1cnJlbnRUYXNrKTtcblx0XHRwdWJTdWIuc3Vic2NyaWJlKFwidW5zdHlsZWRUYXNrXCIsIHRhc2sudW5zdHlsZVByZXZpb3VzVGFzayk7XG5cblx0XHRjb25zdCB0YXNrSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWl0ZW1zXCIpO1xuXG5cdFx0dGFza0l0ZW1zTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGlmIChlLnRhcmdldC50YWdOYW1lID09PSBcIkxJXCIpIHtcblx0XHRcdFx0cHViU3ViLnB1Ymxpc2goXCJ1bnN0eWxlZFRhc2tcIik7XG5cdFx0XHRcdHB1YlN1Yi5wdWJsaXNoKFwic3R5bGVkVGFza1wiLCBlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0dW5zdHlsZVByZXZpb3VzVGFzazogZnVuY3Rpb24gKCkge1xuXHRcdGRvY3VtZW50XG5cdFx0XHQucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlbGVjdGVkXCIpXG5cdFx0XHQuY2xhc3NMaXN0LnJlbW92ZShcInRhc2stc2VsZWN0ZWRcIik7XG5cdH0sXG5cdHN0eWxlQ3VycmVudFRhc2s6IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc3QgdGFza0hlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1zZWxlY3RlZC1oZWFkZXJcIik7XG5cblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwidGFzay1zZWxlY3RlZFwiKTtcblx0XHR0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG5cdH0sXG59O1xuIiwiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSBcIi4vcHViU3ViXCI7XG5cbmNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblxuZXhwb3J0IGNvbnN0IHRhc2tNb2RhbCA9IHtcblx0Y2hlY2tGb3JtVmFsaWRpdHk6ICgpID0+IHtcblx0XHRjb25zdCBpc1ZhbGlkVGl0bGUgPSAoKSA9PiB0aXRsZS5jaGVja1ZhbGlkaXR5KCk7XG5cdFx0Y29uc3QgaXNWYWxpZEZvcm0gPSAoKSA9PiB7XG5cdFx0XHRpZiAoaXNWYWxpZFRpdGxlKCkpIHRhc2tNb2RhbC50b2dnbGVUYXNrTW9kYWwoKTtcblx0XHRcdGVsc2UgdGFza01vZGFsLmRpc3BsYXlWYWxpZGl0eSgpLmRpc3BsYXlFcnJvcigpO1xuXHRcdH07XG5cblx0XHRjb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdGFza1wiKTtcblx0XHRjb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblx0XHRjb25zdCBzaG93VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaG93LXRhc2stbW9kYWxcIik7XG5cblx0XHR0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKTtcblxuXHRcdHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGlzVmFsaWRGb3JtKTtcblxuXHRcdHNob3dUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRhc2tNb2RhbC5jbGVhclZhbHVlcygpO1xuXHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0dGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcblx0XHRcdGlmIChpc1ZhbGlkVGl0bGUoKSkgdGFza01vZGFsLmRpc3BsYXlWYWxpZGl0eSgpLmRpc3BsYXlDb3JyZWN0KCk7XG5cdFx0XHRlbHNlIHRhc2tNb2RhbC5kaXNwbGF5VmFsaWRpdHkoKS5kaXNwbGF5RXJyb3IoKTtcblx0XHR9KTtcblx0fSxcblx0ZGlzcGxheVZhbGlkaXR5OiAoKSA9PiB7XG5cdFx0Y29uc3QgdGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3JcIik7XG5cdFx0Y29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdFx0Y29uc3QgY2hlY2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1jaGVja21hcmstc3ZnID4gc3ZnXCIpO1xuXHRcdGNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1lcnJvci1zdmcgPiBzdmdcIik7XG5cblx0XHRjb25zdCBkaXNwbGF5RXJyb3IgPSAoKSA9PiB7XG5cdFx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHkuXCI7XG5cdFx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICNlZjQ0NDRcIjtcblx0XHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHR9O1xuXG5cdFx0Y29uc3QgZGlzcGxheUNvcnJlY3QgPSAoKSA9PiB7XG5cdFx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICMyMmM1NWVcIjtcblx0XHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH07XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRpc3BsYXlFcnJvcixcblx0XHRcdGRpc3BsYXlDb3JyZWN0LFxuXHRcdFx0dGl0bGVFcnJvcixcblx0XHRcdHRpdGxlSW5wdXQsXG5cdFx0XHRjaGVja21hcmssXG5cdFx0XHRlcnJvcixcblx0XHR9O1xuXHR9LFxuXG5cdGNsZWFyVmFsdWVzOiAoKSA9PiB7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpO1xuXHRcdGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIik7XG5cdFx0Y29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5LXNlbGVjdGVkXCIpO1xuXHRcdGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXNlbGVjdGVkXCIpO1xuXG5cdFx0dGFza01vZGFsLmRpc3BsYXlWYWxpZGl0eSgpLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHR0YXNrTW9kYWwuZGlzcGxheVZhbGlkaXR5KCkudGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCJcIjtcblx0XHR0YXNrTW9kYWwuZGlzcGxheVZhbGlkaXR5KCkuY2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdHRhc2tNb2RhbC5kaXNwbGF5VmFsaWRpdHkoKS5lcnJvci5zdHlsZS5vcGFjaXR5ID0gMDtcblxuXHRcdHRpdGxlLnZhbHVlID0gXCJcIjtcblx0XHRkZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG5cdFx0ZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG5cdFx0cHJpb3JpdHkudmFsdWUgPSBcIkxvd1wiO1xuXHRcdHByb2plY3RzLnZhbHVlID0gXCJQcm9qZWN0IGlka1wiO1xuXHR9LFxuXG5cdHRvZ2dsZVRhc2tNb2RhbDogKCkgPT4ge1xuXHRcdGNvbnN0IHRhc2tNb2RhbFZpc2liaWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG5cdFx0dGFza01vZGFsVmlzaWJpbGl0eS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcblx0fSxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcblxuZG9tKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=