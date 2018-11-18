import Student from "./student.js";
import CorzineSort from "./corzinesort.js";

let studentsArray = undefined;

$(document).ready(function() {
  // The event listener for the file upload
  document
    .getElementById("txtFileUpload")
    .addEventListener("change", upload, false);

  // Method that checks that the browser supports the HTML5 File API
  function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      isCompatible = true;
    }
    return isCompatible;
  }

  // Method that reads and processes the selected file
  function upload(evt) {
    if (!browserSupportFileUpload()) {
      alert("The File APIs are not fully supported in this browser!");
    } else {
      var data = null;
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var csvData = event.target.result;
        data = $.csv.toArrays(csvData);
        if (data && data.length > 0) {
          alert("Imported -" + data.length + "- rows successfully!");
          printOutData(data);
          //   console.log(JSON.stringify(data));
        } else {
          alert("No data to import!");
        }
      };
      reader.onerror = function() {
        alert("Unable to read " + file.fileName);
      };
    }
  }
});

function printOutData(studentsArray) {
  const studentsHash = Student.parseStudents(studentsArray);
  const corzine = new CorzineSort(studentsHash);
  corzine.placeStudents();
  const placements = corzine.placements;
  const announceMetrics = corzine.announceMetrics;
  console.log(placements);
  appendData(placements);
}

function appendData(placements) {
  const colors = Object.keys(placements);
  for (let i = 0; i < colors.length; i++) {
    let color = colors[i];
    console.log(color);
    let students = placements[color];
    var ul = $(`<ul class=${color}> <h1 class='heading'>${color}</h1>`);
    for (let i = 0; i < students.length; i++) {
      let student = students[i];
      ul.append(`<li class=${student.lastChoice}>${student.name}`);
    }
    $("body").append(ul);
  }
}
