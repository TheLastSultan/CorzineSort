/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./JavaScript/root.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./JavaScript/corzinesort.js":
/*!***********************************!*\
  !*** ./JavaScript/corzinesort.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CorzineSort; });\nclass CorzineSort {\n  constructor(studentHash, choiceCaps = { Red: 20, Blue: 20, Orange: 20 }) {\n    this.choiceCaps = choiceCaps;\n    this.placements = this.setPlacements();\n    this.studentHash = studentHash;\n    this.metrics = this.setMetrics();\n  }\n\n  setPlacements() {\n    let placements = {};\n    let choiceOptions = Object.keys(this.choiceCaps);\n    choiceOptions.forEach(color => (placements[color] = []));\n    return placements;\n  }\n\n  setMetrics() {\n    let metrics = {};\n    let choiceNumber = Object.keys(this.choiceCaps);\n    for (let i = 0; i < choiceNumber.length; i++) {\n      metrics[i] = 0;\n    }\n    return metrics;\n  }\n\n  placeStudent(studentObj) {\n    for (let i = 0; i < studentObj.choices.length; i++) {\n      const color = studentObj.choices[i];\n      if (this.choiceCaps[color] >= this.placements[color].length) {\n        this.placements[color].push(studentObj);\n        studentObj.placement = color;\n        studentObj.lastChoice = i + 1;\n        studentObj.priority += i;\n        this.metrics[i] += 1;\n        break;\n      }\n\n      if (i == Object.keys(this.choiceCaps).length) {\n        alert(studentObj.name + \"was not placed!!\");\n      }\n    }\n\n    return this.placements;\n  }\n\n  placeStudents(studentsHash = this.studentHash) {\n    studentsHash.forEach(studentHash => {\n      this.placeStudent(studentHash);\n    });\n  }\n\n  announceMetrics() {\n    let message = \"\";\n    const metrics = this.metrics;\n    if (metrics[0]) {\n      message += metrics[0] + \" students got their 1st choice. \";\n    }\n    if (metrics[1]) {\n      message += metrics[1].toString() + \" student(s) got their 2nd choice. \";\n    }\n    if (metrics[2]) {\n      message += metrics[2].toString() + \" student(s) got their 3rd choice. \";\n    }\n    if (metrics[3]) {\n      message += metrics[3].toString() + \" student(s) got their 4th choice. \";\n    }\n    if (metrics[4]) {\n      message += metrics[4].toString() + \" student(s) got their 5th choice. \";\n    }\n    if (metrics[5]) {\n      message += metrics[5].toString() + \" students got their 6th choice. \";\n    }\n\n    return message;\n  }\n}\n\n\n//# sourceURL=webpack:///./JavaScript/corzinesort.js?");

/***/ }),

/***/ "./JavaScript/root.js":
/*!****************************!*\
  !*** ./JavaScript/root.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _student_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./student.js */ \"./JavaScript/student.js\");\n/* harmony import */ var _corzinesort_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./corzinesort.js */ \"./JavaScript/corzinesort.js\");\n\n\n\nlet studentsArray = undefined;\n\n$(document).ready(function() {\n  // The event listener for the file upload\n  document\n    .getElementById(\"txtFileUpload\")\n    .addEventListener(\"change\", upload, false);\n\n  // Method that checks that the browser supports the HTML5 File API\n  function browserSupportFileUpload() {\n    var isCompatible = false;\n    if (window.File && window.FileReader && window.FileList && window.Blob) {\n      isCompatible = true;\n    }\n    return isCompatible;\n  }\n\n  // Method that reads and processes the selected file\n  function upload(evt) {\n    if (!browserSupportFileUpload()) {\n      alert(\"The File APIs are not fully supported in this browser!\");\n    } else {\n      var data = null;\n      var file = evt.target.files[0];\n      var reader = new FileReader();\n      reader.readAsText(file);\n      reader.onload = function(event) {\n        var csvData = event.target.result;\n        data = $.csv.toArrays(csvData);\n        if (data && data.length > 0) {\n          alert(\"Imported -\" + data.length + \"- rows successfully!\");\n          printOutData(data);\n          //   console.log(JSON.stringify(data));\n        } else {\n          alert(\"No data to import!\");\n        }\n      };\n      reader.onerror = function() {\n        alert(\"Unable to read \" + file.fileName);\n      };\n    }\n  }\n});\n\nfunction printOutData(studentsArray) {\n  const studentsHash = _student_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].parseStudents(studentsArray);\n  const corzine = new _corzinesort_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](studentsHash);\n  corzine.placeStudents();\n  const placements = corzine.placements;\n  const announceMetrics = corzine.announceMetrics;\n  console.log(placements);\n  console.log(announceMetrics);\n}\n\n\n//# sourceURL=webpack:///./JavaScript/root.js?");

/***/ }),

/***/ "./JavaScript/student.js":
/*!*******************************!*\
  !*** ./JavaScript/student.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Student; });\nclass Student {\n  static parseStudents(studentsArray) {\n    studentsArray.shift();\n    let allStudents = [];\n    studentsArray.forEach(studentArray => {\n      let oneStudent = new Student(studentArray);\n      allStudents.push(oneStudent);\n    });\n    return allStudents;\n  }\n\n  constructor(studentArray) {\n    this.name = studentArray[0];\n    this.priority = studentArray[1];\n    this.choices = this.parseChoices(studentArray);\n    this.placement = \"\";\n    this.lastChoice = \"\";\n  }\n\n  parseChoices(studentArray) {\n    let choices = [];\n    for (let i = 2; i < studentArray.length; i++) {\n      choices.push(studentArray[i]);\n    }\n    return choices;\n  }\n}\n\n\n//# sourceURL=webpack:///./JavaScript/student.js?");

/***/ })

/******/ });