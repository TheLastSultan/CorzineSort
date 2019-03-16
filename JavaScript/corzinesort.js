const _ = require('lodash');

export default class CorzineSort {
  constructor(
    studentHash,
    choiceCaps = {
      Red: 10,
      Blue: 11,
      Green: 11,
      Orange: 11,
      Yellow: 11,
      Brown: 10
    }
  ) {
    this.choiceCaps = choiceCaps;
    this.placements = this.setPlacements();
    this.studentHash = studentHash;
    this.metrics = this.setMetrics();
    this.score = 0
  }

  setPlacements() {
    let placements = {};
    let choiceOptions = Object.keys(this.choiceCaps);
    choiceOptions.forEach(color => (placements[color] = []));
    return placements;
  }

  setMetrics() {
    let metrics = {};
    let choiceNumber = Object.keys(this.choiceCaps);
    for (let i = 0; i < choiceNumber.length; i++) {
      metrics[i] = 0;
    }
    return metrics;
  }

  placeStudent(studentObj) {
    for (let i = 0; i < studentObj.choices.length ; i++) {
      const color = this.encodedChoice(studentObj.choices[i]);
      if (this.choiceCaps[color] >= (this.placements[color].length + 1)) {
        this.placements[color].push(studentObj);
        studentObj.placement = color;
        studentObj.lastChoice = i + 1;
        studentObj.priority = i;
        this.metrics[i] += 1;
        break;
      }

      if (i == Object.keys(this.choiceCaps).length) {
        alert(studentObj.name + "was not placed!!");
      }
    }

    return this.placements;
  }

  encodedChoice(studentChoice){

    const choiceCodes = {
      B: "Brown",
      G: "Green",
      R: "Red",
      O: "Orange",
      L: "Blue",
      Y: "Yellow"
    };

    let priorityLine =  [];
    studentChoice.split("").forEach( individualChoice =>{
      const codedChoice = choiceCodes[individualChoice]
      const rank = this.placements[codedChoice].length
      priorityLine.push( {codedChoice, rank})
    })

    // find the emptiest choice in linear time
    let bestChoice = priorityLine[0];
    priorityLine.forEach( currChoice => {
      if (currChoice.rank < bestChoice.rank){
        bestChoice = currChoice;
      }
    });

    return bestChoice.codedChoice
  }

  placeStudents(studentsHash = this.studentHash) {

    let sortedStudents = _.sortBy( studentsHash, 'priority');

    sortedStudents.forEach(studentHash => {
      this.placeStudent(studentHash);
    });

    // evaluate Score of each Corzine Sort
    let sum = 0;
    Object.values(this.metrics).forEach( (el, idx) => { sum +=  el * (idx + 1) });
    this.score = sum;
  }

  announceMetrics() {
    let message = "";
    const metrics = this.metrics;
    if (metrics[0]) {
      message += metrics[0] + " students got their 1st choice. ";
    }
    if (metrics[1]) {
      message += metrics[1].toString() + " student(s) got their 2nd choice. ";
    }
    if (metrics[2]) {
      message += metrics[2].toString() + " student(s) got their 3rd choice. ";
    }
    if (metrics[3]) {
      message += metrics[3].toString() + " student(s) got their 4th choice. ";
    }
    if (metrics[4]) {
      message += metrics[4].toString() + " student(s) got their 5th choice. ";
    }
    if (metrics[5]) {
      message += metrics[5].toString() + " students got their 6th choice. ";
    }

    return message;
  }
}
