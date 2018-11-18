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

/***/ "./JavaScript/root.js":
/*!****************************!*\
  !*** ./JavaScript/root.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _student_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./student.js */ \"./JavaScript/student.js\");\n\n\nlet studentData = undefined;\n\n$(document).ready(function() {\n  // The event listener for the file upload\n  document\n    .getElementById(\"txtFileUpload\")\n    .addEventListener(\"change\", upload, false);\n\n  // Method that checks that the browser supports the HTML5 File API\n  function browserSupportFileUpload() {\n    var isCompatible = false;\n    if (window.File && window.FileReader && window.FileList && window.Blob) {\n      isCompatible = true;\n    }\n    return isCompatible;\n  }\n\n  // Method that reads and processes the selected file\n  function upload(evt) {\n    if (!browserSupportFileUpload()) {\n      alert(\"The File APIs are not fully supported in this browser!\");\n    } else {\n      var data = null;\n      var file = evt.target.files[0];\n      var reader = new FileReader();\n      reader.readAsText(file);\n      reader.onload = function(event) {\n        var csvData = event.target.result;\n        data = $.csv.toArrays(csvData);\n        if (data && data.length > 0) {\n          alert(\"Imported -\" + data.length + \"- rows successfully!\");\n          studentData = data;\n          console.log(JSON.stringify(data));\n        } else {\n          alert(\"No data to import!\");\n        }\n      };\n      reader.onerror = function() {\n        alert(\"Unable to read \" + file.fileName);\n      };\n    }\n  }\n});\n\n// let studentData = parseStudents(studentData);\nconsole.log(studentData);\n\n\n//# sourceURL=webpack:///./JavaScript/root.js?");

/***/ }),

/***/ "./JavaScript/student.js":
/*!*******************************!*\
  !*** ./JavaScript/student.js ***!
  \*******************************/
/*! exports provided: Student, parseStudents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Student\", function() { return Student; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseStudents\", function() { return parseStudents; });\nclass Student {\n  constructor(studentArray) {\n    this.name = studentArray[0];\n    this.priority = studentArray[1];\n    this.choices = this.parseChoices(studentArray);\n    this.placement = \"\";\n    this.lastChoice = \"\";\n  }\n\n  parseChoices(studentArray) {\n    let choices = [];\n    for (let i = 2; i < studentArray.length; i++) {\n      choices.push(studentArray[i]);\n    }\n    return choices;\n  }\n}\n\nfunction parseStudents(studentsArray) {\n  studentsArray.shift();\n  let allStudents = [];\n  studentsArray.forEach(studentArray => {\n    oneStudent = new Student(studentArray);\n    allStudents.push(oneStudent);\n  });\n  return allStudents;\n}\n\n\n//# sourceURL=webpack:///./JavaScript/student.js?");

/***/ })

/******/ });