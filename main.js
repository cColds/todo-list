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
/* harmony import */ var _selectedTask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectedTask */ "./src/modules/selectedTask.js");
/* harmony import */ var _taskModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskModal */ "./src/modules/taskModal.js");



function dom() {
	(0,_taskModal__WEBPACK_IMPORTED_MODULE_1__.taskModal)();
	(0,_selectedTask__WEBPACK_IMPORTED_MODULE_0__.selectedTask)();
}


/***/ }),

/***/ "./src/modules/selectedTask.js":
/*!*************************************!*\
  !*** ./src/modules/selectedTask.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectedTask": () => (/* binding */ selectedTask)
/* harmony export */ });
const taskItems = document.querySelectorAll(".tasks > ul > li");

function selectedTask() {
	taskItems.forEach((task) => {
		task.addEventListener("click", () => {
			unstylePreviousSelectedTask();
			styleTask(task);
		});
	});
}

function styleTask(task) {
	const taskHeader = document.querySelector(".task-selected-header");
	task.classList.add("task-selected");
	taskHeader.textContent = task.textContent;
}

function unstylePreviousSelectedTask() {
	taskItems.forEach((item) => {
		if (item.classList.contains("task-selected")) {
			item.classList.toggle("task-selected");
			return;
		}
	});
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQThDO0FBQ047O0FBRXpCO0FBQ2YsQ0FBQyxxREFBUztBQUNWLENBQUMsMkRBQVk7QUFDYjs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQ3hCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0M7O0FBRWhDLHdEQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3NlbGVjdGVkVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrTW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdGVkVGFzayB9IGZyb20gXCIuL3NlbGVjdGVkVGFza1wiO1xuaW1wb3J0IHsgdGFza01vZGFsIH0gZnJvbSBcIi4vdGFza01vZGFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvbSgpIHtcblx0dGFza01vZGFsKCk7XG5cdHNlbGVjdGVkVGFzaygpO1xufVxuIiwiY29uc3QgdGFza0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrcyA+IHVsID4gbGlcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RlZFRhc2soKSB7XG5cdHRhc2tJdGVtcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG5cdFx0dGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0dW5zdHlsZVByZXZpb3VzU2VsZWN0ZWRUYXNrKCk7XG5cdFx0XHRzdHlsZVRhc2sodGFzayk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBzdHlsZVRhc2sodGFzaykge1xuXHRjb25zdCB0YXNrSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlbGVjdGVkLWhlYWRlclwiKTtcblx0dGFzay5jbGFzc0xpc3QuYWRkKFwidGFzay1zZWxlY3RlZFwiKTtcblx0dGFza0hlYWRlci50ZXh0Q29udGVudCA9IHRhc2sudGV4dENvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIHVuc3R5bGVQcmV2aW91c1NlbGVjdGVkVGFzaygpIHtcblx0dGFza0l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLXNlbGVjdGVkXCIpKSB7XG5cdFx0XHRpdGVtLmNsYXNzTGlzdC50b2dnbGUoXCJ0YXNrLXNlbGVjdGVkXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fSk7XG59XG4iLCJleHBvcnQgY29uc3QgdGFza01vZGFsID0gKCkgPT4ge1xuXHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdGNvbnN0IHRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWVycm9yXCIpO1xuXHRjb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdGFza1wiKTtcblx0Y29uc3QgdGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XG5cdGNvbnN0IHNob3dUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNob3ctdGFzay1tb2RhbFwiKTtcblxuXHRjb25zdCBpc1ZhbGlkVGl0bGUgPSAoKSA9PiB0aXRsZS5jaGVja1ZhbGlkaXR5KCk7XG5cdGNvbnN0IGRpc3BsYXlFcnJvciA9ICgpID0+IHtcblx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHkuXCI7XG5cdFx0ZXJyb3Iuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0dGl0bGVJbnB1dC5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgI2VmNDQ0NFwiO1xuXHR9O1xuXG5cdHRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVRhc2tNb2RhbCk7XG5cblx0dGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGlmIChpc1ZhbGlkVGl0bGUoKSkgdG9nZ2xlVGFza01vZGFsKCk7XG5cdFx0ZWxzZSBkaXNwbGF5RXJyb3IoKTtcblx0fSk7XG5cblx0c2hvd1Rhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGNsZWFyVmFsdWVzKCk7XG5cdFx0dG9nZ2xlVGFza01vZGFsKCk7XG5cdH0pO1xuXHRjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0Y29uc3QgY2hlY2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZS1jaGVja21hcmstc3ZnID4gc3ZnXCIpO1xuXHRjb25zdCBlcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtZXJyb3Itc3ZnID4gc3ZnXCIpO1xuXG5cdHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG5cdFx0aWYgKGlzVmFsaWRUaXRsZSgpKSB7XG5cdFx0XHR0aXRsZUVycm9yLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdHRpdGxlSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICMyMmM1NWVcIjtcblx0XHRcdGVycm9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdFx0Y2hlY2ttYXJrLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkaXNwbGF5RXJyb3IoKTtcblx0XHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IHByaW9yaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3ByaW9yaXR5LXNlbGVjdGVkXCIpO1xuXG5cdHByaW9yaXRpZXMuZm9yRWFjaCgocHJpb3JpdHkpID0+XG5cdFx0cHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNvbnNvbGUubG9nKHByaW9yaXR5LnZhbHVlKSlcblx0KTtcblxuXHRmdW5jdGlvbiBjbGVhclZhbHVlcygpIHtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIik7XG5cdFx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcblx0XHRjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHktc2VsZWN0ZWRcIik7XG5cdFx0Y29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0ZWRcIik7XG5cblx0XHR0aXRsZS52YWx1ZSA9IFwiXCI7XG5cdFx0dGl0bGVFcnJvci50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0ZGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuXHRcdGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuXHRcdHByaW9yaXR5LnZhbHVlID0gXCJMb3dcIjtcblx0XHRwcm9qZWN0cy52YWx1ZSA9IFwiUHJvamVjdCBpZGtcIjtcblx0XHR0aXRsZUlucHV0LnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuXHRcdGNoZWNrbWFyay5zdHlsZS5vcGFjaXR5ID0gMDtcblx0XHRlcnJvci5zdHlsZS5vcGFjaXR5ID0gMDtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZVRhc2tNb2RhbCgpIHtcblx0XHRjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG5cdFx0dGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXHR9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZG9tIGZyb20gXCIuL21vZHVsZXMvZG9tXCI7XG5cbmRvbSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9