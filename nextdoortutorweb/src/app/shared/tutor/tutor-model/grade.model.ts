export class Grade {

  public static readonly VALID_GRADES: Grade[] = [
    new Grade('A'),
    new Grade('A-'),
    new Grade('B+'),
    new Grade('B'),
    new Grade('B-'),
    new Grade('C+'),
    new Grade('C'),
    new Grade('C-')
  ];

  private _grade: string;

  constructor(grade: string) {
    this._grade = grade;
  }

  get grade(): string {
    return this._grade;
  }

  /**
   * the better the grade, the closer it is to rank 1
   * @param {Grade} grade
   * @returns {number}
   */
  public static getRank(grade: Grade): number {
    if (Grade.isGradeValid(grade)) {
      return Grade.VALID_GRADES.findIndex((element: Grade) => {
        return element.grade === grade.grade;
      });
    } else {
      return Number.MAX_VALUE;
    }
  }

  public static isGradeValid(grade: Grade): boolean {
    return Grade.VALID_GRADES.some((element: Grade) => {
      return element.grade === grade.grade;
    });
  }
}
