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
		document
			.querySelector(".task-selected")
			.classList.remove("task-selected");
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

	const render = () => {
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
			if (isValidTitle()) taskModal.displayCorrect();
			else taskModal.displayError();
		});
	};
	const isValidTitle = () => title.checkValidity();
	const isValidForm = () => {
		if (isValidTitle()) {
			taskModal.toggleTaskModal();
		} else taskModal.displayError();
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
		displayCorrect,
		displayError,
	};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ0o7O0FBRWY7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQy9HTTtBQUNQLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7O0FDcEJrQzs7Ozs7OztVQ0FsQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1EOztBQUVuRCxvRUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbU1hbmlwdWxhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSBcIi4vcHViU3ViXCI7XG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4vdGFza1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJQYWdlKCkge1xuXHR0YXNrTW9kYWwucmVuZGVyKCk7XG5cdHRhc2tOYXZpZ2F0aW9uLnJlbmRlcigpO1xufVxuXG5jb25zdCB0YXNrTmF2aWdhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB0YXNrSXRlbXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWl0ZW1zXCIpO1xuXG5cdFx0dGFza0l0ZW1zTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGlmIChlLnRhcmdldC50YWdOYW1lID09PSBcIkxJXCIpIHtcblx0XHRcdFx0dW5zdHlsZVByZXZpb3VzVGFzaygpO1xuXHRcdFx0XHRzaG93Q3VycmVudFRhc2soZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdGNvbnN0IHVuc3R5bGVQcmV2aW91c1Rhc2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0ZG9jdW1lbnRcblx0XHRcdC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VsZWN0ZWRcIilcblx0XHRcdC5jbGFzc0xpc3QucmVtb3ZlKFwidGFzay1zZWxlY3RlZFwiKTtcblx0fTtcblx0Y29uc3Qgc2hvd0N1cnJlbnRUYXNrID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zdCB0YXNrSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlbGVjdGVkLWhlYWRlclwiKTtcblxuXHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXNlbGVjdGVkXCIpO1xuXHRcdHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcblx0fTtcblxuXHRyZXR1cm4geyByZW5kZXIgfTtcbn0pKCk7XG5cbmNvbnN0IHRhc2tNb2RhbCA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpO1xuXHRjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuXHRjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHktc2VsZWN0ZWRcIik7XG5cdGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXNlbGVjdGVkXCIpO1xuXG5cdGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHRjb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdGFza1wiKTtcblx0XHRjb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblx0XHRjb25zdCBzaG93VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaG93LXRhc2stbW9kYWxcIik7XG5cblx0XHR0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrTW9kYWwudG9nZ2xlVGFza01vZGFsKTtcblxuXHRcdHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGlzVmFsaWRGb3JtKTtcblxuXHRcdHNob3dUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRhc2tNb2RhbC5jbGVhclZhbHVlcygpO1xuXHRcdFx0dGFza01vZGFsLnRvZ2dsZVRhc2tNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0dGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcblx0XHRcdGlmIChpc1ZhbGlkVGl0bGUoKSkgdGFza01vZGFsLmRpc3BsYXlDb3JyZWN0KCk7XG5cdFx0XHRlbHNlIHRhc2tNb2RhbC5kaXNwbGF5RXJyb3IoKTtcblx0XHR9KTtcblx0fTtcblx0Y29uc3QgaXNWYWxpZFRpdGxlID0gKCkgPT4gdGl0bGUuY2hlY2tWYWxpZGl0eSgpO1xuXHRjb25zdCBpc1ZhbGlkRm9ybSA9ICgpID0+IHtcblx0XHRpZiAoaXNWYWxpZFRpdGxlKCkpIHtcblx0XHRcdHRhc2tNb2RhbC50b2dnbGVUYXNrTW9kYWwoKTtcblx0XHR9IGVsc2UgdGFza01vZGFsLmRpc3BsYXlFcnJvcigpO1xuXHR9O1xuXG5cdGNvbnN0IHRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWVycm9yXCIpO1xuXHRjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0Y29uc3QgY2hlY2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1jaGVja21hcmstc3ZnID4gc3ZnXCIpO1xuXHRjb25zdCBlcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3Itc3ZnID4gc3ZnXCIpO1xuXG5cdGNvbnN0IGRpc3BsYXlFcnJvciA9ICgpID0+IHtcblx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHkuXCI7XG5cdFx0ZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0dGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgI2VmNDQ0NFwiO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0fTtcblxuXHRjb25zdCBkaXNwbGF5Q29ycmVjdCA9ICgpID0+IHtcblx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjMjJjNTVlXCI7XG5cdFx0ZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHR9O1xuXG5cdGNvbnN0IGNsZWFyVmFsdWVzID0gKCkgPT4ge1xuXHRcdHRpdGxlLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMDtcblxuXHRcdHRpdGxlLnZhbHVlID0gXCJcIjtcblx0XHRkZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG5cdFx0ZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG5cdFx0cHJpb3JpdHkudmFsdWUgPSBcIkxvd1wiO1xuXHRcdHByb2plY3RzLnZhbHVlID0gXCJQcm9qZWN0IGlka1wiO1xuXHR9O1xuXG5cdGNvbnN0IHRvZ2dsZVRhc2tNb2RhbCA9ICgpID0+IHtcblx0XHRjb25zdCB0YXNrTW9kYWxWaXNpYmlsaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuXHRcdHRhc2tNb2RhbFZpc2liaWxpdHkuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRyZW5kZXIsXG5cdFx0Y2xlYXJWYWx1ZXMsXG5cdFx0dG9nZ2xlVGFza01vZGFsLFxuXHRcdGRpc3BsYXlDb3JyZWN0LFxuXHRcdGRpc3BsYXlFcnJvcixcblx0fTtcbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgcHViU3ViID0ge1xuXHRldmVudHM6IHt9LFxuXHRzdWJzY3JpYmU6IGZ1bmN0aW9uIChldmVudE5hbWUsIGZuKSB7XG5cdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gfHwgW107XG5cdFx0dGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblx0fSxcblx0dW5zdWJzY3JpYmU6IGZ1bmN0aW9uIChldmVudE5hbWUsIHVuc3Vic2NyaWJlZEZuKSB7XG5cdFx0aWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcblx0XHRcdHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihcblx0XHRcdFx0KGZuKSA9PiBmbiAhPT0gdW5zdWJzY3JpYmVkRm5cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXHRwdWJsaXNoOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBkYXRhKSB7XG5cdFx0aWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcblx0XHRcdHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0Zm4oZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG59O1xuIiwiaW1wb3J0IHsgcHViU3ViIH0gZnJvbSBcIi4vcHViU3ViXCI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCByZW5kZXJQYWdlIGZyb20gXCIuL21vZHVsZXMvZG9tTWFuaXB1bGF0aW9uXCI7XG5cbnJlbmRlclBhZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==