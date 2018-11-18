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
    let choices = [];
    for (let i = 2; i < studentArray.length; i++) {
      choices.push(studentArray[i]);
    }
    return choices;
  }
}
