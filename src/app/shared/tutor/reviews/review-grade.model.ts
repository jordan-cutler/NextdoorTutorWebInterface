export class ReviewGrade {
  public static readonly VALID_GRADES: ReviewGrade[] = [
    new ReviewGrade('A+'),
    new ReviewGrade('A'),
    new ReviewGrade('A-'),
    new ReviewGrade('B+'),
    new ReviewGrade('B'),
    new ReviewGrade('B-'),
    new ReviewGrade('C+'),
    new ReviewGrade('C'),
    new ReviewGrade('C-'),
    new ReviewGrade('D'),
    new ReviewGrade('F')
  ];

  constructor(public grade: string) {
  }

  /**
   * the better the grade, the closer it is to rank 1
   * @param {Grade} grade
   * @returns {number}
   */
  public static getRank(grade: ReviewGrade): number {
    if (ReviewGrade.isReviewGradeValid(grade)) {
      return ReviewGrade.VALID_GRADES.findIndex((element: ReviewGrade) => {
        return element.grade === grade.grade;
      });
    } else {
      return ReviewGrade.VALID_GRADES.length + 1;
    }
  }

  public static isReviewGradeValid(grade: ReviewGrade): boolean {
    return ReviewGrade.VALID_GRADES.some((element: ReviewGrade) => {
      return element.grade === grade.grade;
    });
  }
}
