import Student from "./student.js";
import CorzineSort from "./corzinesort.js";
import exportFunction from "./export.js";

let studentsArray = undefined;

$(document).ready(function() {
  // The event listener for the file upload
  document
    .getElementById("txtFileUpload")
    .addEventListener("change", upload, false);

  document
   
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
  console.log(studentsHash);
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
    let students = placements[color];
    var ul = $(
      `<ul id='listWithHandle${i}' class='list-group g-${color} col-md-3'> <h3 class='heading'>${color}</h3>`
    );
    ul.css("border", `5px solid ${color}`);
    for (let i = 0; i < students.length; i++) {
      let student = students[i];
      let newdiv = $(`<li class='list-group-item p-${student.priority}' 
                        id=${student.name} 
                        data-name=${student.name} 
                        data-priority=${student.priority}
                        data-group=${color}>
                        <span class='badge'> ${student.lastChoice}</span>
                        <span class='glyphicon glyphicon-move' aria-hidden='true'></span>
                        ${student.name} 
                        </li>                 
      `);
      ul.append(newdiv);
      if (student.lastChoice == 1) {
        newdiv.css("background-color", "lightgreen");
      } else if (student.lastChoice == 2) {
        newdiv.css("background-color", "yellow");
      } else if (student.lastChoice == 3) {
        newdiv.css("background-color", "orange");
      } else {
        newdiv.css("background-color", "indianred");
      }
    }
    $("body").append(ul);
  }

  for (let i = 0; i < colors.length; i++) {
    let listWithHandle = `listWithHandle${i}`;
    Sortable.create(window[listWithHandle], {
      handle: ".list-group-item",
      animation: 150,
      group: "list",
      onAdd: function(event) {
        let newColor = event.to.classList[1];
        $(event.item).data("group", newColor);
      }
    });
  }

  $("#export").click(function() {
    let studentsExport = [];
    $(".list-group > li").each(function() {
      let student = {};
      student["name"] = $(this).attr("data-name");
      student["color"] = $(this).data("group");
      student["priority"] = $(this).attr("data-priority");
      studentsExport.push(student);
    });

    // console.log($(studentsExport));
    exportFunction(studentsExport, "CorzineSort", true);
  });
}
