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

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ requiredArgs)\n/* harmony export */ });\nfunction requiredArgs(required, args) {\n  if (args.length < required) {\n    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/requiredArgs/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isSameDay)\n/* harmony export */ });\n/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ \"./node_modules/date-fns/esm/startOfDay/index.js\");\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n/**\n * @name isSameDay\n * @category Day Helpers\n * @summary Are the given dates in the same day (and year and month)?\n *\n * @description\n * Are the given dates in the same day (and year and month)?\n *\n * @param {Date|Number} dateLeft - the first date to check\n * @param {Date|Number} dateRight - the second date to check\n * @returns {Boolean} the dates are in the same day (and year and month)\n * @throws {TypeError} 2 arguments required\n *\n * @example\n * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?\n * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))\n * //=> true\n *\n * @example\n * // Are 4 September and 4 October in the same day?\n * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))\n * //=> false\n *\n * @example\n * // Are 4 September, 2014 and 4 September, 2015 in the same day?\n * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))\n * //=> false\n */\n\nfunction isSameDay(dirtyDateLeft, dirtyDateRight) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(2, arguments);\n  var dateLeftStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(dirtyDateLeft);\n  var dateRightStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(dirtyDateRight);\n  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/isSameDay/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/isToday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isToday/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isToday)\n/* harmony export */ });\n/* harmony import */ var _isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameDay/index.js */ \"./node_modules/date-fns/esm/isSameDay/index.js\");\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n/**\n * @name isToday\n * @category Day Helpers\n * @summary Is the given date today?\n * @pure false\n *\n * @description\n * Is the given date today?\n *\n * > ⚠️ Please note that this function is not present in the FP submodule as\n * > it uses `Date.now()` internally hence impure and can't be safely curried.\n *\n * @param {Date|Number} date - the date to check\n * @returns {Boolean} the date is today\n * @throws {TypeError} 1 argument required\n *\n * @example\n * // If today is 6 October 2014, is 6 October 14:00:00 today?\n * const result = isToday(new Date(2014, 9, 6, 14, 0))\n * //=> true\n */\n\nfunction isToday(dirtyDate) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, arguments);\n  return (0,_isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(dirtyDate, Date.now());\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/isToday/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ startOfDay)\n/* harmony export */ });\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n/**\n * @name startOfDay\n * @category Day Helpers\n * @summary Return the start of a day for the given date.\n *\n * @description\n * Return the start of a day for the given date.\n * The result will be in the local timezone.\n *\n * @param {Date|Number} date - the original date\n * @returns {Date} the start of a day\n * @throws {TypeError} 1 argument required\n *\n * @example\n * // The start of a day for 2 September 2014 11:55:00:\n * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))\n * //=> Tue Sep 02 2014 00:00:00\n */\n\nfunction startOfDay(dirtyDate) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, arguments);\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(dirtyDate);\n  date.setHours(0, 0, 0, 0);\n  return date;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/startOfDay/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toDate)\n/* harmony export */ });\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n/**\n * @name toDate\n * @category Common Helpers\n * @summary Convert the given argument to an instance of Date.\n *\n * @description\n * Convert the given argument to an instance of Date.\n *\n * If the argument is an instance of Date, the function returns its clone.\n *\n * If the argument is a number, it is treated as a timestamp.\n *\n * If the argument is none of the above, the function returns Invalid Date.\n *\n * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.\n *\n * @param {Date|Number} argument - the value to convert\n * @returns {Date} the parsed date in the local time zone\n * @throws {TypeError} 1 argument required\n *\n * @example\n * // Clone the date:\n * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))\n * //=> Tue Feb 11 2014 11:30:30\n *\n * @example\n * // Convert the timestamp to date:\n * const result = toDate(1392098430000)\n * //=> Tue Feb 11 2014 11:30:30\n */\n\nfunction toDate(argument) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, arguments);\n  var argStr = Object.prototype.toString.call(argument); // Clone the date\n\n  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {\n    // Prevent the date to lose the milliseconds when passed to new Date() in IE10\n    return new Date(argument.getTime());\n  } else if (typeof argument === 'number' || argStr === '[object Number]') {\n    return new Date(argument);\n  } else {\n    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {\n      // eslint-disable-next-line no-console\n      console.warn(\"Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments\"); // eslint-disable-next-line no-console\n\n      console.warn(new Error().stack);\n    }\n\n    return new Date(NaN);\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/toDate/index.js?");

/***/ }),

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addProject\": () => (/* binding */ addProject),\n/* harmony export */   \"deleteProject\": () => (/* binding */ deleteProject),\n/* harmony export */   \"editProject\": () => (/* binding */ editProject)\n/* harmony export */ });\n/* harmony import */ var _helperFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunction */ \"./src/AppLogic/helperFunction.js\");\n\n\nconst projectList = [];\n\nconst projectProperties = (title, id) => {\n\treturn { title, id };\n};\n\nconst addProject = (title, id) => {\n\tprojectList.push(projectProperties(title, id));\n};\n\nconst deleteProject = (id) => {\n\tprojectList.splice(id, 1);\n\t(0,_helperFunction__WEBPACK_IMPORTED_MODULE_0__.updateId)(projectList);\n};\n\nconst editProject = (title, id) => {\n\tprojectList[id] = projectProperties(title, id);\n};\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/AppLogic/project.js?");

/***/ }),

/***/ "./src/AppLogic/task.js":
/*!******************************!*\
  !*** ./src/AppLogic/task.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addTask\": () => (/* binding */ addTask),\n/* harmony export */   \"completeTask\": () => (/* binding */ completeTask),\n/* harmony export */   \"editTask\": () => (/* binding */ editTask),\n/* harmony export */   \"taskList\": () => (/* binding */ taskList)\n/* harmony export */ });\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ \"./node_modules/date-fns/esm/isToday/index.js\");\n/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pubsub */ \"./src/pubsub.js\");\n/* harmony import */ var _UI_navigation_switchProject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UI/navigation/switchProject.js */ \"./src/UI/navigation/switchProject.js\");\n/* harmony import */ var _helperFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helperFunction */ \"./src/AppLogic/helperFunction.js\");\n\n\n\n\n\nconst taskList = [];\n\nconst taskProperties = (title, description, dueDate, priority, id) => {\n\treturn { title, description, dueDate, priority, id };\n};\n\nconst addTask = (title, description, dueDate, priority, id) => {\n\ttaskList.push(taskProperties(title, description, dueDate, priority, id));\n};\n\nconst completeTask = (id) => {\n\ttaskList.splice(id, 1);\n\t(0,_helperFunction__WEBPACK_IMPORTED_MODULE_2__.updateId)(taskList);\n};\n\nconst editTask = (title, description, dueDate, priority, id) => {\n\ttaskList[id] = taskProperties(title, description, dueDate, priority, id);\n};\n\n_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe(\"task-submitted\", (task) => {\n\ttaskList.push(task);\n\t_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish(\"task-pushed\", task);\n});\n\n_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe(\"switch-main-project\", checkProjectToFilter);\n_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.subscribe(\"task-pushed\", checkProjectToFilter);\n\nfunction checkProjectToFilter() {\n\tconst selectedProjectName = (0,_UI_navigation_switchProject_js__WEBPACK_IMPORTED_MODULE_1__.getProjectName)();\n\tif (selectedProjectName === \"Inbox\") filterInbox();\n\telse if (selectedProjectName === \"Today\") filterTodayTask();\n\telse if (selectedProjectName === \"Week\") console.log(\"week\");\n\telse console.log(\"filter regular projects\");\n}\n\nconst filterInbox = () => {\n\tconsole.log(\"inbox\");\n};\n\nconst filterTodayTask = () => {\n\tconst todayTaskList = [];\n\n\ttaskList.forEach((task) => {\n\t\tif ((0,date_fns__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(task.dueDate)) todayTaskList.push(task);\n\t\tconsole.log(todayTaskList);\n\t});\n\n\tconsole.log(\"today\");\n};\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/AppLogic/task.js?");

/***/ }),

/***/ "./src/UI/modal/addTask.js":
/*!*********************************!*\
  !*** ./src/UI/modal/addTask.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"egg\": () => (/* binding */ egg)\n/* harmony export */ });\n/* harmony import */ var _AppLogic_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppLogic/task */ \"./src/AppLogic/task.js\");\n/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pubsub */ \"./src/pubsub.js\");\n\n\n\nconst modal = document.querySelector(\".modal\");\nconst overlayModal = document.querySelector(\".modal-overlay\");\nconst openModal = document.querySelector(\"#add-task\");\nconst cancelBtn = document.querySelector(\"#add-task-cancel\");\nconst closeBtn = document.querySelector(\".modal-header-cancel\");\nconst add = document.querySelector(\"#add-task-add\");\n\nconst title = document.querySelector(\"#add-task-title\");\nconst titleError = document.querySelector(\".title-error\");\nconst dueDate = document.querySelector(\"#add-task-due-date\");\nconst dueDateError = document.querySelector(\".due-date-error\");\nconst description = document.querySelector(\"#add-task-description\");\nconst priority = document.querySelector(\"#add-task-priority\");\n\nconst clearModalValues = () => {\n\ttitle.value = \"\";\n\tdueDate.value = \"\";\n\tdescription.value = \"\";\n\tpriority.value = \"Low\";\n\n\ttitle.classList.remove(\"active\");\n\ttitleError.classList.remove(\"active\");\n\tdueDate.classList.remove(\"active\");\n\tdueDateError.classList.remove(\"active\");\n};\n\nconst toggleError = () => {\n\tif (title.value) {\n\t\ttitle.classList.remove(\"active\");\n\t\ttitleError.classList.remove(\"active\");\n\t} else {\n\t\ttitle.classList.add(\"active\");\n\t\ttitleError.classList.add(\"active\");\n\t}\n};\n\ntitle.addEventListener(\"keyup\", () => {\n\ttoggleError();\n});\n\nconst toggleModal = () => {\n\tmodal.classList.toggle(\"active\");\n\toverlayModal.classList.toggle(\"active\");\n};\n\nopenModal.addEventListener(\"click\", () => {\n\tclearModalValues();\n\ttoggleModal();\n});\n\ncancelBtn.addEventListener(\"click\", toggleModal);\ncloseBtn.addEventListener(\"click\", toggleModal);\n\nadd.addEventListener(\"click\", () => {\n\tif (!title.value) {\n\t\ttoggleError();\n\t\treturn;\n\t}\n\ttoggleModal();\n\n\tconst dueDateFormatted = dueDate.value.replaceAll(\"-\", \"/\");\n\n\tconst taskValues = {\n\t\ttitle: title.value,\n\t\tdueDate: new Date(dueDateFormatted),\n\t\tdescription: description.value,\n\t\tpriority: priority.value,\n\t\tid: _AppLogic_task__WEBPACK_IMPORTED_MODULE_0__.taskList.length,\n\t};\n\n\t_pubsub__WEBPACK_IMPORTED_MODULE_1__.pubSub.publish(\"task-submitted\", taskValues);\n});\n\nlet egg = 1;\n\n\n\n//# sourceURL=webpack://todo-list/./src/UI/modal/addTask.js?");

/***/ }),

/***/ "./src/UI/navigation/switchProject.js":
/*!********************************************!*\
  !*** ./src/UI/navigation/switchProject.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProjectName\": () => (/* binding */ getProjectName),\n/* harmony export */   \"mainProjects\": () => (/* binding */ mainProjects)\n/* harmony export */ });\n/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pubsub */ \"./src/pubsub.js\");\n\n\nconst getProjectName = () =>\n\tdocument.querySelector(\".selected .projects-item-name\").textContent;\n\nconst mainProjects = document.querySelector(\"#main-projects-list\");\n\nmainProjects.addEventListener(\"click\", (e) => {\n\tconst mainTitle = document.querySelector(\"#main-title\");\n\tconst previousSelected = mainProjects.querySelector(\".selected\");\n\n\tpreviousSelected.classList.remove(\"selected\");\n\te.target.closest(\".projects-item\").classList.add(\"selected\");\n\n\tconst currentSelectedTitle = document.querySelector(\n\t\t\".selected .projects-item-name\"\n\t);\n\n\tmainTitle.textContent = currentSelectedTitle.textContent;\n\t_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubSub.publish(\"switch-main-project\");\n});\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/UI/navigation/switchProject.js?");

/***/ }),

/***/ "./src/UI/navigation/toggleNavigation.js":
/*!***********************************************!*\
  !*** ./src/UI/navigation/toggleNavigation.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toggleNavigationBar\": () => (/* binding */ toggleNavigationBar)\n/* harmony export */ });\nconst gridLayout = document.querySelector(\"#grid-layout\");\nconst nav = document.querySelector(\"nav\");\n\nconst toggleNavigationBar = () => {\n\tnav.classList.toggle(\"hide\");\n\tmainHamburgerMenu.classList.toggle(\"hide\");\n\tsetNavValue();\n};\n\nconst setNavValue = () => {\n\tconst isNavOpen = gridLayout.dataset.navOpened === \"true\";\n\tif (isNavOpen) gridLayout.dataset.navOpened = \"false\";\n\telse gridLayout.dataset.navOpened = \"true\";\n};\n\nconst navHamburgerMenu = document.querySelector(\"#nav-hamburger-menu\");\nnavHamburgerMenu.addEventListener(\"click\", toggleNavigationBar);\n\nconst mainHamburgerMenu = document.querySelector(\"#main-hamburger-menu\");\nmainHamburgerMenu.addEventListener(\"click\", toggleNavigationBar);\n\n\n//# sourceURL=webpack://todo-list/./src/UI/navigation/toggleNavigation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_navigation_toggleNavigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/navigation/toggleNavigation */ \"./src/UI/navigation/toggleNavigation.js\");\n/* harmony import */ var _AppLogic_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppLogic/task */ \"./src/AppLogic/task.js\");\n/* harmony import */ var _AppLogic_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppLogic/project */ \"./src/AppLogic/project.js\");\n/* harmony import */ var _UI_modal_addTask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/modal/addTask */ \"./src/UI/modal/addTask.js\");\n/* harmony import */ var _UI_navigation_switchProject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI/navigation/switchProject */ \"./src/UI/navigation/switchProject.js\");\n\n\n\n\n\n\n(0,_AppLogic_project__WEBPACK_IMPORTED_MODULE_2__.addProject)(\"oe\", 0);\n(0,_AppLogic_project__WEBPACK_IMPORTED_MODULE_2__.addProject)(\"ji\", 1);\n(0,_AppLogic_project__WEBPACK_IMPORTED_MODULE_2__.deleteProject)(0);\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/pubsub.js":
/*!***********************!*\
  !*** ./src/pubsub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pubSub\": () => (/* binding */ pubSub)\n/* harmony export */ });\nconst pubSub = {\n\tevents: {},\n\tsubscribe: function (eventName, fn) {\n\t\tthis.events[eventName] = this.events[eventName] || [];\n\t\tthis.events[eventName].push(fn);\n\t},\n\n\tpublish: function (eventName, data) {\n\t\tif (this.events[eventName]) {\n\t\t\tthis.events[eventName].forEach((fn) => {\n\t\t\t\tfn(data);\n\t\t\t});\n\t\t}\n\t},\n};\n\n\n//# sourceURL=webpack://todo-list/./src/pubsub.js?");

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