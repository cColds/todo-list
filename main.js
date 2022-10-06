/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/task-modal/clearValues.js":
/*!***************************************!*\
  !*** ./src/task-modal/clearValues.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearValues": () => (/* binding */ clearValues)
/* harmony export */ });
function clearValues() {
	const title = document.querySelector("#title");
	const titleError = document.querySelector(".titleError");
	const description = document.querySelector("#description");
	const dueDate = document.querySelector("#date");
	const priority = document.querySelector("#priority-selected");
	const projects = document.querySelector("#project-selected");

	title.value = "";
	titleError.textContent = "ㅤ";
	description.value = "";
	dueDate.value = "";
	priority.value = "Low";
	projects.value = "Project idk";
}


/***/ }),

/***/ "./src/task-modal/displayError.js":
/*!****************************************!*\
  !*** ./src/task-modal/displayError.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayError": () => (/* binding */ displayError)
/* harmony export */ });
function displayError() {
	const titleError = document.querySelector(".titleError");
	titleError.textContent = "Title cannot be empty.";
}


/***/ }),

/***/ "./src/task-modal/toggleTaskModal.js":
/*!*******************************************!*\
  !*** ./src/task-modal/toggleTaskModal.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleTaskModal": () => (/* binding */ toggleTaskModal)
/* harmony export */ });
function toggleTaskModal() {
	const taskModal = document.querySelector(".task-modal");
	taskModal.classList.toggle("hide");
}


/***/ }),

/***/ "./src/task-modal/validateTitle.js":
/*!*****************************************!*\
  !*** ./src/task-modal/validateTitle.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidTitle": () => (/* binding */ isValidTitle)
/* harmony export */ });
function isValidTitle() {
	const title = document.querySelector("#title");
	return title.checkValidity();
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
/* harmony import */ var _task_modal_toggleTaskModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task-modal/toggleTaskModal */ "./src/task-modal/toggleTaskModal.js");
/* harmony import */ var _task_modal_clearValues__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-modal/clearValues */ "./src/task-modal/clearValues.js");
/* harmony import */ var _task_modal_validateTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-modal/validateTitle */ "./src/task-modal/validateTitle.js");
/* harmony import */ var _task_modal_displayError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task-modal/displayError */ "./src/task-modal/displayError.js");





const priority = document.querySelectorAll("#priority-selected");

priority.forEach((element) => {
	element.addEventListener("click", () => console.log(element.value));
});

const taskCancelBtn = document.querySelector(".cancel-task");
const taskAddBtn = document.querySelector(".add-task");
const showTaskModal = document.querySelector(".show-task-modal");

taskCancelBtn.addEventListener("click", _task_modal_toggleTaskModal__WEBPACK_IMPORTED_MODULE_0__.toggleTaskModal);

taskAddBtn.addEventListener("click", () => {
	if ((0,_task_modal_validateTitle__WEBPACK_IMPORTED_MODULE_2__.isValidTitle)()) (0,_task_modal_toggleTaskModal__WEBPACK_IMPORTED_MODULE_0__.toggleTaskModal)();
	else (0,_task_modal_displayError__WEBPACK_IMPORTED_MODULE_3__.displayError)();
});

showTaskModal.addEventListener("click", () => {
	(0,_task_modal_clearValues__WEBPACK_IMPORTED_MODULE_1__.clearValues)();
	(0,_task_modal_toggleTaskModal__WEBPACK_IMPORTED_MODULE_0__.toggleTaskModal)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNkTztBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSE87QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0hPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7O1VDSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ04rRDtBQUNSO0FBQ0c7QUFDRDs7QUFFekQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLHdDQUF3Qyx3RUFBZTs7QUFFdkQ7QUFDQSxLQUFLLHVFQUFZLElBQUksNEVBQWU7QUFDcEMsTUFBTSxzRUFBWTtBQUNsQixDQUFDOztBQUVEO0FBQ0EsQ0FBQyxvRUFBVztBQUNaLENBQUMsNEVBQWU7QUFDaEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLW1vZGFsL2NsZWFyVmFsdWVzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLW1vZGFsL2Rpc3BsYXlFcnJvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1tb2RhbC90b2dnbGVUYXNrTW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2stbW9kYWwvdmFsaWRhdGVUaXRsZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVmFsdWVzKCkge1xuXHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdGNvbnN0IHRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlRXJyb3JcIik7XG5cdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcblx0Y29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcblx0Y29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5LXNlbGVjdGVkXCIpO1xuXHRjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RlZFwiKTtcblxuXHR0aXRsZS52YWx1ZSA9IFwiXCI7XG5cdHRpdGxlRXJyb3IudGV4dENvbnRlbnQgPSBcIuOFpFwiO1xuXHRkZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG5cdGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuXHRwcmlvcml0eS52YWx1ZSA9IFwiTG93XCI7XG5cdHByb2plY3RzLnZhbHVlID0gXCJQcm9qZWN0IGlka1wiO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlFcnJvcigpIHtcblx0Y29uc3QgdGl0bGVFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGVFcnJvclwiKTtcblx0dGl0bGVFcnJvci50ZXh0Q29udGVudCA9IFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5LlwiO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVRhc2tNb2RhbCgpIHtcblx0Y29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuXHR0YXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaXNWYWxpZFRpdGxlKCkge1xuXHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdHJldHVybiB0aXRsZS5jaGVja1ZhbGlkaXR5KCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHRvZ2dsZVRhc2tNb2RhbCB9IGZyb20gXCIuL3Rhc2stbW9kYWwvdG9nZ2xlVGFza01vZGFsXCI7XG5pbXBvcnQgeyBjbGVhclZhbHVlcyB9IGZyb20gXCIuL3Rhc2stbW9kYWwvY2xlYXJWYWx1ZXNcIjtcbmltcG9ydCB7IGlzVmFsaWRUaXRsZSB9IGZyb20gXCIuL3Rhc2stbW9kYWwvdmFsaWRhdGVUaXRsZVwiO1xuaW1wb3J0IHsgZGlzcGxheUVycm9yIH0gZnJvbSBcIi4vdGFzay1tb2RhbC9kaXNwbGF5RXJyb3JcIjtcblxuY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3ByaW9yaXR5LXNlbGVjdGVkXCIpO1xuXG5wcmlvcml0eS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNvbnNvbGUubG9nKGVsZW1lbnQudmFsdWUpKTtcbn0pO1xuXG5jb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtdGFza1wiKTtcbmNvbnN0IHRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuY29uc3Qgc2hvd1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvdy10YXNrLW1vZGFsXCIpO1xuXG50YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVUYXNrTW9kYWwpO1xuXG50YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdGlmIChpc1ZhbGlkVGl0bGUoKSkgdG9nZ2xlVGFza01vZGFsKCk7XG5cdGVsc2UgZGlzcGxheUVycm9yKCk7XG59KTtcblxuc2hvd1Rhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRjbGVhclZhbHVlcygpO1xuXHR0b2dnbGVUYXNrTW9kYWwoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9