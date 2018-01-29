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

  public static isGradeValid(grade: Grade): boolean {
    return Grade.VALID_GRADES.some((element: Grade) => {
      return element.grade === grade.grade;
    });
  }
}
