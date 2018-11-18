class corzineSort {
  constructor(choiceCaps = { red: 20, blue: 20, orange: 20 }) {
    this.choiceCaps = choiceCaps;
    this.placements = setPlacements();
  }

  setPlacements() {
    let placements = {};
    choiceOptions.forEach(color => (placements[color] = []));
    return placements;
  }

  placeStudent(studentHash) {
    let choices = Object.keys(studentHash);
    choices.forEach(color => {
      if (!isNaN(parseInt("0"))) {
        return;
      } else if (choiceCaps[color] <= placements[color].length) {
        placements[color].push(studentHash.name);
      }
    });
  }

  placeStudents(studentsHash) {
    studentsHash.forEach(studentHash => {
      this.placeStudent(studentHash);
    });
  }
}
