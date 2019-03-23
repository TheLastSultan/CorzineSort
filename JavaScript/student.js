export default class Student {
  static parseStudents(studentsArray) {
    let allStudents = [];
    for( let i = 1 ; i < studentsArray.length; i++){
      let oneStudent = new Student(studentsArray[i]);
      allStudents.push(oneStudent);
    };
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

    let choices = [] ;
    for (let i = 2; i < 8; i++) {
      let letters = studentArray[i];
      choices.push(letters);
    }
    return choices;
  }

  // toJSON() {
  //   return {
  //     name: this.name,
  //     priority: this.priority
  //   };
  // }
}
