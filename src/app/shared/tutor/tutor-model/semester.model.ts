export class Semester {

  public static readonly VALID_TERMS: string[] = [
    'Fall',
    'Spring',
    'Summer',
    'Winter'
  ];

  public static readonly VALID_YEARS: number[] = Semester.getValidYears();

  constructor(public term: string, public year: number) {
  }

  private static getValidYears(): number[] {
    const year = (new Date()).getFullYear();
    return [year, (year - 1), (year - 2), (year - 3), (year - 4)];
  }

  public static isTermValid(term: string): boolean {
    return Semester.VALID_TERMS.some(function (element: string, index: number, array: string[]) {
      return element === term;
    });
  }

  public static isYearValid(year: number): boolean {
    return Semester.VALID_YEARS.some(function (element: number, index: number, array: number[]) {
      return element === year;
    });
  }
}
