export default class Student {
  static parseStudents(studentsArray) {
    studentsArray.shift();
    let allStudents = [];
    studentsArray.forEach(studentArray => {
      let oneStudent = new Student(studentArray);
      allStudents.push(oneStudent);
    });
    return allStudents;
  }

  constructor(studentArray) {
    this.name = studentArray[0];
    this.priority = studentArray[1];
    this.choices = this.parseChoices(studentArray);
    this.placement = "";
    this.lastChoice = "";
  }

  parseChoices(studentArray) {
<<<<<<< HEAD
    let choices = [];
    for (let i = 2; i < studentArray.length; i++) {
      choices.push(studentArray[i]);
=======
    const choiceCodes = {
      B: "Brown",
      G: "Green",
      R: "Red",
      O: "Orange",
      L: "Blue",
      Y: "Yellow"
    };
    let choices = [];
    for (let i = 2; i < 8; i++) {
      let firstLetter = studentArray[i][0];
      choices.push(choiceCodes[firstLetter]);
>>>>>>> master
    }
    return choices;
  }

  toJSON() {
    return {
      name: this.name,
      priority: this.priority
    };
  }
}