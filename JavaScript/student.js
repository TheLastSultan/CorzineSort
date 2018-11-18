export class Student {
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

export function parseStudents(studentsArray) {
  studentsArray.shift();
  let allStudents = [];
  studentsArray.forEach(studentArray => {
    oneStudent = new Student(studentArray);
    allStudents.push(oneStudent);
  });
  return allStudents;
}
