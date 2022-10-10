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
	const title = document.querySelector("#title");
	const titleError = document.querySelector(".title-error");
	const taskCancelBtn = document.querySelector(".cancel-task");
	const taskAddBtn = document.querySelector(".add-task");
	const showTaskModal = document.querySelector(".show-task-modal");

	const isValidTitle = () => title.checkValidity();
	const displayError = () => {
		titleError.textContent = "Title cannot be empty.";
		error.style.opacity = 1;
		titleInput.style.outline = "2px solid #ef4444";
	};

	taskCancelBtn.addEventListener("click", toggleTaskModal);

	taskAddBtn.addEventListener("click", () => {
		if (isValidTitle()) toggleTaskModal();
		else displayError();
	});

	showTaskModal.addEventListener("click", () => {
		clearValues();
		toggleTaskModal();
	});
	const titleInput = document.querySelector("#title");
	const checkmark = document.querySelector(".title-checkmark-svg > svg");
	const error = document.querySelector(".title-error-svg > svg");

	title.addEventListener("keyup", () => {
		if (isValidTitle()) {
			titleError.textContent = "";
			titleInput.style.outline = "2px solid #22c55e";
			error.style.opacity = 0;
			checkmark.style.opacity = 1;
		} else {
			displayError();
			checkmark.style.opacity = 0;
		}
	});

	const priorities = document.querySelectorAll("#priority-selected");

	priorities.forEach((priority) =>
		priority.addEventListener("click", () => console.log(priority.value))
	);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ0Y7O0FBRXZCO0FBQ2YsQ0FBQyxxREFBUztBQUNWLENBQUMsNERBQWlCO0FBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7QUNOTztBQUNQLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEJrQzs7QUFFM0I7QUFDUDtBQUNBLEVBQUUscURBQWdCO0FBQ2xCLEVBQUUscURBQWdCOztBQUVsQjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQixJQUFJLG1EQUFjO0FBQ2xCO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQzNCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0M7O0FBRWhDLHdEQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zZWxlY3RlZFRhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFza01vZGFsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YXNrTW9kYWwgfSBmcm9tIFwiLi90YXNrTW9kYWxcIjtcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi9zZWxlY3RlZFRhc2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9tKCkge1xuXHR0YXNrTW9kYWwoKTtcblx0dGFzay5zZWxlY3RlZFRhc2soKTtcbn1cbiIsImV4cG9ydCBjb25zdCBwdWJTdWIgPSB7XG5cdGV2ZW50czoge30sXG5cdHN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcblx0XHR0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXHR9LFxuXHR1bnN1YnNjcmliZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdW5zdWJzY3JpYmVkRm4pIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKFxuXHRcdFx0XHQoZm4pID0+IGZuICE9PSB1bnN1YnNjcmliZWRGblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdHB1Ymxpc2g6IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEpIHtcblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRmbihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcbn07XG4iLCJpbXBvcnQgeyBwdWJTdWIgfSBmcm9tIFwiLi9wdWJTdWJcIjtcblxuZXhwb3J0IGNvbnN0IHRhc2sgPSB7XG5cdHNlbGVjdGVkVGFzazogZnVuY3Rpb24gKCkge1xuXHRcdHB1YlN1Yi5zdWJzY3JpYmUoXCJzdHlsZWRUYXNrXCIsIHRhc2suc3R5bGVDdXJyZW50VGFzayk7XG5cdFx0cHViU3ViLnN1YnNjcmliZShcInVuc3R5bGVkVGFza1wiLCB0YXNrLnVuc3R5bGVQcmV2aW91c1Rhc2spO1xuXG5cdFx0Y29uc3QgdGFza0l0ZW1zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1pdGVtc1wiKTtcblxuXHRcdHRhc2tJdGVtc0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gXCJMSVwiKSB7XG5cdFx0XHRcdHB1YlN1Yi5wdWJsaXNoKFwidW5zdHlsZWRUYXNrXCIpO1xuXHRcdFx0XHRwdWJTdWIucHVibGlzaChcInN0eWxlZFRhc2tcIiwgZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHVuc3R5bGVQcmV2aW91c1Rhc2s6IGZ1bmN0aW9uICgpIHtcblx0XHRkb2N1bWVudFxuXHRcdFx0LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1zZWxlY3RlZFwiKVxuXHRcdFx0LmNsYXNzTGlzdC5yZW1vdmUoXCJ0YXNrLXNlbGVjdGVkXCIpO1xuXHR9LFxuXHRzdHlsZUN1cnJlbnRUYXNrOiBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnN0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VsZWN0ZWQtaGVhZGVyXCIpO1xuXG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInRhc2stc2VsZWN0ZWRcIik7XG5cdFx0dGFza0hlYWRlci50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuXHR9LFxufTtcbiIsImV4cG9ydCBjb25zdCB0YXNrTW9kYWwgPSAoKSA9PiB7XG5cdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0Y29uc3QgdGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3JcIik7XG5cdGNvbnN0IHRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10YXNrXCIpO1xuXHRjb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblx0Y29uc3Qgc2hvd1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvdy10YXNrLW1vZGFsXCIpO1xuXG5cdGNvbnN0IGlzVmFsaWRUaXRsZSA9ICgpID0+IHRpdGxlLmNoZWNrVmFsaWRpdHkoKTtcblx0Y29uc3QgZGlzcGxheUVycm9yID0gKCkgPT4ge1xuXHRcdHRpdGxlRXJyb3IudGV4dENvbnRlbnQgPSBcIlRpdGxlIGNhbm5vdCBiZSBlbXB0eS5cIjtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjZWY0NDQ0XCI7XG5cdH07XG5cblx0dGFza0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlVGFza01vZGFsKTtcblxuXHR0YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0aWYgKGlzVmFsaWRUaXRsZSgpKSB0b2dnbGVUYXNrTW9kYWwoKTtcblx0XHRlbHNlIGRpc3BsYXlFcnJvcigpO1xuXHR9KTtcblxuXHRzaG93VGFza01vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0Y2xlYXJWYWx1ZXMoKTtcblx0XHR0b2dnbGVUYXNrTW9kYWwoKTtcblx0fSk7XG5cdGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuXHRjb25zdCBjaGVja21hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWNoZWNrbWFyay1zdmcgPiBzdmdcIik7XG5cdGNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1lcnJvci1zdmcgPiBzdmdcIik7XG5cblx0dGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcblx0XHRpZiAoaXNWYWxpZFRpdGxlKCkpIHtcblx0XHRcdHRpdGxlRXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0dGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgIzIyYzU1ZVwiO1xuXHRcdFx0ZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0XHRjaGVja21hcmsuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRpc3BsYXlFcnJvcigpO1xuXHRcdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgcHJpb3JpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcHJpb3JpdHktc2VsZWN0ZWRcIik7XG5cblx0cHJpb3JpdGllcy5mb3JFYWNoKChwcmlvcml0eSkgPT5cblx0XHRwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY29uc29sZS5sb2cocHJpb3JpdHkudmFsdWUpKVxuXHQpO1xuXG5cdGZ1bmN0aW9uIGNsZWFyVmFsdWVzKCkge1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcblx0XHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuXHRcdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eS1zZWxlY3RlZFwiKTtcblx0XHRjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKTtcblxuXHRcdHRpdGxlLnZhbHVlID0gXCJcIjtcblx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRkZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG5cdFx0ZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG5cdFx0cHJpb3JpdHkudmFsdWUgPSBcIkxvd1wiO1xuXHRcdHByb2plY3RzLnZhbHVlID0gXCJQcm9qZWN0IGlka1wiO1xuXHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiXCI7XG5cdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlVGFza01vZGFsKCkge1xuXHRcdGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcblx0XHR0YXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG5cdH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSBcIi4vbW9kdWxlcy9kb21cIjtcblxuZG9tKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=