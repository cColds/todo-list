/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AppLogic/helperFunction.js":
/*!****************************************!*\
  !*** ./src/AppLogic/helperFunction.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateId\": () => (/* binding */ updateId)\n/* harmony export */ });\nconst updateId = (arr) => {\n\tlet updatedId = 0;\n\tarr.forEach((item) => {\n\t\titem.id = updatedId;\n\t\tupdatedId++;\n\t});\n};\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/AppLogic/helperFunction.js?");

/***/ }),

/***/ "./src/AppLogic/project.js":
/*!*********************************!*\
  !*** ./src/AppLogic/project.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addProject\": () => (/* binding */ addProject),\n/* harmony export */   \"deleteProject\": () => (/* binding */ deleteProject),\n/* harmony export */   \"editProject\": () => (/* binding */ editProject)\n/* harmony export */ });\n/* harmony import */ var _helperFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunction */ \"./src/AppLogic/helperFunction.js\");\n\n\nconst projectList = [];\n\nconst projectProperties = (title, id) => {\n\treturn { title, id };\n};\n\nconst addProject = (title, id) => {\n\tprojectList.push(projectProperties(title, id));\n\tconsole.log(projectList);\n};\n\nconst deleteProject = (id) => {\n\tprojectList.splice(id, 1);\n\t(0,_helperFunction__WEBPACK_IMPORTED_MODULE_0__.updateId)(projectList);\n\tconsole.log(projectList);\n};\n\nconst editProject = (title, id) => {\n\tprojectList[id] = projectProperties(title, id);\n};\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/AppLogic/project.js?");

/***/ }),

/***/ "./src/AppLogic/task.js":
/*!******************************!*\
  !*** ./src/AppLogic/task.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addTask\": () => (/* binding */ addTask),\n/* harmony export */   \"completeTask\": () => (/* binding */ completeTask),\n/* harmony export */   \"editTask\": () => (/* binding */ editTask)\n/* harmony export */ });\n/* harmony import */ var _helperFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunction */ \"./src/AppLogic/helperFunction.js\");\n\n\nconst taskList = [];\n\nconst taskProperties = (title, description, dueDate, priority, id) => {\n\treturn { title, description, dueDate, priority, id };\n};\n\nconst addTask = (title, description, dueDate, priority, id) => {\n\ttaskList.push(taskProperties(title, description, dueDate, priority, id));\n};\n\nconst completeTask = (id) => {\n\ttaskList.splice(id, 1);\n\t(0,_helperFunction__WEBPACK_IMPORTED_MODULE_0__.updateId)(taskList);\n};\n\nconst editTask = (title, description, dueDate, priority, id) => {\n\ttaskList[id] = taskProperties(title, description, dueDate, priority, id);\n};\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/AppLogic/task.js?");

/***/ }),

/***/ "./src/UI/modals/addTask.js":
/*!**********************************!*\
  !*** ./src/UI/modals/addTask.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"egg\": () => (/* binding */ egg)\n/* harmony export */ });\nconst modal = document.querySelector(\".modal\");\nconst modalOverlay = document.querySelector(\".modal-overlay\");\nconst openModal = document.querySelector(\"#add-task\");\nconst cancelModal = document.querySelector(\"#add-task-cancel\");\nconst addModal = document.querySelector(\"#add-task-add\");\n\nopenModal.addEventListener(\"click\", () => {\n\tmodal.classList.toggle(\"active\");\n\tmodalOverlay.classList.toggle(\"active\");\n});\n\nlet egg = 1;\n\n\n\n//# sourceURL=webpack://todo-list/./src/UI/modals/addTask.js?");

/***/ }),

/***/ "./src/UI/toggleNavigation.js":
/*!************************************!*\
  !*** ./src/UI/toggleNavigation.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toggleNavigationBar\": () => (/* binding */ toggleNavigationBar)\n/* harmony export */ });\nconst nav = document.querySelector(\"nav\");\nconst toggleNavigationBar = () => {\n\tnav.classList.toggle(\"hide\");\n\tmainHamburgerMenu.classList.toggle(\"hide\");\n};\n\nconst navHamburgerMenu = document.querySelector(\"#nav-hamburger-menu\");\nnavHamburgerMenu.addEventListener(\"click\", toggleNavigationBar);\n\nconst mainHamburgerMenu = document.querySelector(\"#main-hamburger-menu\");\nmainHamburgerMenu.addEventListener(\"click\", toggleNavigationBar);\n\n\n//# sourceURL=webpack://todo-list/./src/UI/toggleNavigation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_toggleNavigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/toggleNavigation */ \"./src/UI/toggleNavigation.js\");\n/* harmony import */ var _AppLogic_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppLogic/task */ \"./src/AppLogic/task.js\");\n/* harmony import */ var _AppLogic_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppLogic/project */ \"./src/AppLogic/project.js\");\n/* harmony import */ var _UI_modals_addTask_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/modals/addTask.js */ \"./src/UI/modals/addTask.js\");\n\n\n\n\n\n(0,_AppLogic_project__WEBPACK_IMPORTED_MODULE_2__.addProject)(\"oe\", 0);\n(0,_AppLogic_project__WEBPACK_IMPORTED_MODULE_2__.addProject)(\"ji\", 1);\n(0,_AppLogic_project__WEBPACK_IMPORTED_MODULE_2__.deleteProject)(0);\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;