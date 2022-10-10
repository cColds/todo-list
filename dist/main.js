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
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");



function dom() {
	_taskModal__WEBPACK_IMPORTED_MODULE_0__.taskModal.checkFormValidity();
	_selectedTask__WEBPACK_IMPORTED_MODULE_1__.taskNavigation.selectedTask();
	_task__WEBPACK_IMPORTED_MODULE_2__.task.taskProps();
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
/* harmony export */   "taskNavigation": () => (/* binding */ taskNavigation)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/modules/pubSub.js");

// pubSub.subscribe("unstyledTask", task.unstylePreviousTask);
// pubSub.subscribe("styledTask", task.styleCurrentTask);
// pubSub.publish("unstyledTask");
// pubSub.publish("styledTask", e);

const taskNavigation = (function () {
	const selectedTask = function () {
		const taskItemsList = document.querySelector(".task-items");

		taskItemsList.addEventListener("click", (e) => {
			if (e.target.tagName === "LI") {
				taskNavigation.unstylePreviousTask();
				taskNavigation.styleCurrentTask(e);
			}
		});
	};
	const unstylePreviousTask = function () {
		document
			.querySelector(".task-selected")
			.classList.remove("task-selected");
	};
	const styleCurrentTask = function (e) {
		const taskHeader = document.querySelector(".task-selected-header");

		e.target.classList.add("task-selected");
		taskHeader.textContent = e.target.textContent;
	};

	return { selectedTask, unstylePreviousTask, styleCurrentTask };
})();


/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "task": () => (/* binding */ task)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/modules/pubSub.js");


const task = (function () {
	let name = "John";
	const taskProps = () => {
		_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe("task-created", () => console.log(name));
	};
	return { taskProps };
})();


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


const taskModal = (function () {
	const title = document.querySelector("#title");

	const checkFormValidity = () => {
		const isValidTitle = () => title.checkValidity();
		const isValidForm = () => {
			if (isValidTitle()) {
				taskModal.toggleTaskModal();
				_pubSub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish("task-created");
			} else taskModal.displayValidity().displayError();
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
	};
	const displayValidity = () => {
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
	};

	const clearValues = () => {
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
	};

	const toggleTaskModal = () => {
		const taskModalVisibility = document.querySelector(".task-modal");
		taskModalVisibility.classList.toggle("hide");
	};

	return { checkFormValidity, displayValidity, clearValues, toggleTaskModal };
})();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNRO0FBQ2xCO0FBQ2Y7QUFDZixDQUFDLG1FQUEyQjtBQUM1QixDQUFDLHNFQUEyQjtBQUM1QixDQUFDLGlEQUFjO0FBQ2Y7Ozs7Ozs7Ozs7Ozs7OztBQ1BPO0FBQ1AsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQmtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUJpQzs7QUFFM0I7QUFDUDtBQUNBO0FBQ0EsRUFBRSxxREFBZ0I7QUFDbEI7QUFDQSxVQUFVO0FBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1JpQzs7QUFFM0I7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOzs7Ozs7O1VDckZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0M7O0FBRWhDLHdEQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zZWxlY3RlZFRhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrTW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRhc2tNb2RhbCB9IGZyb20gXCIuL3Rhc2tNb2RhbFwiO1xuaW1wb3J0IHsgdGFza05hdmlnYXRpb24gfSBmcm9tIFwiLi9zZWxlY3RlZFRhc2tcIjtcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb20oKSB7XG5cdHRhc2tNb2RhbC5jaGVja0Zvcm1WYWxpZGl0eSgpO1xuXHR0YXNrTmF2aWdhdGlvbi5zZWxlY3RlZFRhc2soKTtcblx0dGFzay50YXNrUHJvcHMoKTtcbn1cbiIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG5cdGV2ZW50czoge30sXG5cdHN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXHR9LFxuXHR1bnN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdW5zdWJzY3JpYmVkRm4pIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKFxuXHRcdFx0XHQoZm4pID0+IGZuICE9PSB1bnN1YnNjcmliZWRGblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdHB1Ymxpc2g6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRmbihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcbn07XG4iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcbi8vIHB1YlN1Yi5zdWJzY3JpYmUoXCJ1bnN0eWxlZFRhc2tcIiwgdGFzay51bnN0eWxlUHJldmlvdXNUYXNrKTtcbi8vIHB1YlN1Yi5zdWJzY3JpYmUoXCJzdHlsZWRUYXNrXCIsIHRhc2suc3R5bGVDdXJyZW50VGFzayk7XG4vLyBwdWJTdWIucHVibGlzaChcInVuc3R5bGVkVGFza1wiKTtcbi8vIHB1YlN1Yi5wdWJsaXNoKFwic3R5bGVkVGFza1wiLCBlKTtcblxuZXhwb3J0IGNvbnN0IHRhc2tOYXZpZ2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3Qgc2VsZWN0ZWRUYXNrID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHRhc2tJdGVtc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2staXRlbXNcIik7XG5cblx0XHR0YXNrSXRlbXNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0aWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09IFwiTElcIikge1xuXHRcdFx0XHR0YXNrTmF2aWdhdGlvbi51bnN0eWxlUHJldmlvdXNUYXNrKCk7XG5cdFx0XHRcdHRhc2tOYXZpZ2F0aW9uLnN0eWxlQ3VycmVudFRhc2soZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdGNvbnN0IHVuc3R5bGVQcmV2aW91c1Rhc2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0ZG9jdW1lbnRcblx0XHRcdC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VsZWN0ZWRcIilcblx0XHRcdC5jbGFzc0xpc3QucmVtb3ZlKFwidGFzay1zZWxlY3RlZFwiKTtcblx0fTtcblx0Y29uc3Qgc3R5bGVDdXJyZW50VGFzayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc3QgdGFza0hlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1zZWxlY3RlZC1oZWFkZXJcIik7XG5cblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwidGFzay1zZWxlY3RlZFwiKTtcblx0XHR0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG5cdH07XG5cblx0cmV0dXJuIHsgc2VsZWN0ZWRUYXNrLCB1bnN0eWxlUHJldmlvdXNUYXNrLCBzdHlsZUN1cnJlbnRUYXNrIH07XG59KSgpO1xuIiwiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSBcIi4vcHViU3ViXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0gKGZ1bmN0aW9uICgpIHtcblx0bGV0IG5hbWUgPSBcIkpvaG5cIjtcblx0Y29uc3QgdGFza1Byb3BzID0gKCkgPT4ge1xuXHRcdHB1YlN1Yi5zdWJzY3JpYmUoXCJ0YXNrLWNyZWF0ZWRcIiwgKCkgPT4gY29uc29sZS5sb2cobmFtZSkpO1xuXHR9O1xuXHRyZXR1cm4geyB0YXNrUHJvcHMgfTtcbn0pKCk7XG4iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcblxuZXhwb3J0IGNvbnN0IHRhc2tNb2RhbCA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblxuXHRjb25zdCBjaGVja0Zvcm1WYWxpZGl0eSA9ICgpID0+IHtcblx0XHRjb25zdCBpc1ZhbGlkVGl0bGUgPSAoKSA9PiB0aXRsZS5jaGVja1ZhbGlkaXR5KCk7XG5cdFx0Y29uc3QgaXNWYWxpZEZvcm0gPSAoKSA9PiB7XG5cdFx0XHRpZiAoaXNWYWxpZFRpdGxlKCkpIHtcblx0XHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdFx0XHRwdWJTdWIucHVibGlzaChcInRhc2stY3JlYXRlZFwiKTtcblx0XHRcdH0gZWxzZSB0YXNrTW9kYWwuZGlzcGxheVZhbGlkaXR5KCkuZGlzcGxheUVycm9yKCk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IHRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10YXNrXCIpO1xuXHRcdGNvbnN0IHRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuXHRcdGNvbnN0IHNob3dUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNob3ctdGFzay1tb2RhbFwiKTtcblxuXHRcdHRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tNb2RhbC50b2dnbGVUYXNrTW9kYWwpO1xuXG5cdFx0dGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaXNWYWxpZEZvcm0pO1xuXG5cdFx0c2hvd1Rhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0dGFza01vZGFsLmNsZWFyVmFsdWVzKCk7XG5cdFx0XHR0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKCk7XG5cdFx0fSk7XG5cblx0XHR0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuXHRcdFx0aWYgKGlzVmFsaWRUaXRsZSgpKSB0YXNrTW9kYWwuZGlzcGxheVZhbGlkaXR5KCkuZGlzcGxheUNvcnJlY3QoKTtcblx0XHRcdGVsc2UgdGFza01vZGFsLmRpc3BsYXlWYWxpZGl0eSgpLmRpc3BsYXlFcnJvcigpO1xuXHRcdH0pO1xuXHR9O1xuXHRjb25zdCBkaXNwbGF5VmFsaWRpdHkgPSAoKSA9PiB7XG5cdFx0Y29uc3QgdGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3JcIik7XG5cdFx0Y29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdFx0Y29uc3QgY2hlY2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1jaGVja21hcmstc3ZnID4gc3ZnXCIpO1xuXHRcdGNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1lcnJvci1zdmcgPiBzdmdcIik7XG5cblx0XHRjb25zdCBkaXNwbGF5RXJyb3IgPSAoKSA9PiB7XG5cdFx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHkuXCI7XG5cdFx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICNlZjQ0NDRcIjtcblx0XHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHR9O1xuXG5cdFx0Y29uc3QgZGlzcGxheUNvcnJlY3QgPSAoKSA9PiB7XG5cdFx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICMyMmM1NWVcIjtcblx0XHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH07XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRpc3BsYXlFcnJvcixcblx0XHRcdGRpc3BsYXlDb3JyZWN0LFxuXHRcdFx0dGl0bGVFcnJvcixcblx0XHRcdHRpdGxlSW5wdXQsXG5cdFx0XHRjaGVja21hcmssXG5cdFx0XHRlcnJvcixcblx0XHR9O1xuXHR9O1xuXG5cdGNvbnN0IGNsZWFyVmFsdWVzID0gKCkgPT4ge1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcblx0XHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuXHRcdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eS1zZWxlY3RlZFwiKTtcblx0XHRjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKTtcblxuXHRcdHRhc2tNb2RhbC5kaXNwbGF5VmFsaWRpdHkoKS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0dGFza01vZGFsLmRpc3BsYXlWYWxpZGl0eSgpLnRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiXCI7XG5cdFx0dGFza01vZGFsLmRpc3BsYXlWYWxpZGl0eSgpLmNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHR0YXNrTW9kYWwuZGlzcGxheVZhbGlkaXR5KCkuZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDA7XG5cblx0XHR0aXRsZS52YWx1ZSA9IFwiXCI7XG5cdFx0ZGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuXHRcdGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuXHRcdHByaW9yaXR5LnZhbHVlID0gXCJMb3dcIjtcblx0XHRwcm9qZWN0cy52YWx1ZSA9IFwiUHJvamVjdCBpZGtcIjtcblx0fTtcblxuXHRjb25zdCB0b2dnbGVUYXNrTW9kYWwgPSAoKSA9PiB7XG5cdFx0Y29uc3QgdGFza01vZGFsVmlzaWJpbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcblx0XHR0YXNrTW9kYWxWaXNpYmlsaXR5LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXHR9O1xuXG5cdHJldHVybiB7IGNoZWNrRm9ybVZhbGlkaXR5LCBkaXNwbGF5VmFsaWRpdHksIGNsZWFyVmFsdWVzLCB0b2dnbGVUYXNrTW9kYWwgfTtcbn0pKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcblxuZG9tKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=