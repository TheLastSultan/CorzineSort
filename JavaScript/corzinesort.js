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
    for (let i = 0; i < studentObj.choices.length; i++) {
      const color = studentObj.choices[i];

      if (this.choiceCaps[color] >= this.placements[color].length) {
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

  placeStudents(studentsHash = this.studentHash) {
    studentsHash.forEach(studentHash => {
      this.placeStudent(studentHash);
    });
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
