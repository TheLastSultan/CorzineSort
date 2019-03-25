import { runInNewContext } from 'vm';

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
    this.placements = {"Red": [], "Blue": [] , "Green": [] , "Orange": [] , "Yellow": [], "Brown": []}
    this.studentHash = studentHash;
    this.metrics = this.setMetrics( );
    this.score = 0
    this.popularity = this.setMetrics();
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

  

  encodedChoice(studentChoice){
    // encoded choice has two functions
    // turns the letter into a name eg "B" => "Brown"
    // takes care of equivalent choices "BG" => "Brown"

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



  placeStudent(studentObj){
    studentObj.lastChoice = 0 
    let placed = false 
    const choices = Object.freeze(studentObj.choices.map( choice => this.encodedChoice(choice)))
    choices.forEach( (choice, idx) => {
      const classCount = this.placements[choice].length
      const classCapacity = this.choiceCaps[choice]
      if(classCount < classCapacity && placed == false){
        studentObj.placement = choice
        studentObj.priority = idx 
        studentObj.lastChoice = idx + 1 
        this.metrics[idx] += 1 
        this.placements[choice].push(studentObj)
        placed = true
      } 
    })
    if(!placed) alert(`${studentObj.name} has not been placed !`)
  }



  placeStudents() {

    let sortedStudents = _.sortBy( this.studentHash, 'priority');
    sortedStudents.forEach(student => {
      let studentObj = this.placeStudent(student);
    });

    // evaluate Score of each Corzine Sort
    let sum = 0;
    Object.values(this.metrics).forEach( (el, idx) => { sum +=  (el + 1) ** (idx + 1) });
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