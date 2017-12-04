class Semester {

    public static readonly VALID_SEMESTERS: string[] = [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
    ];

    public static readonly VALID_YEARS: string[] = Semester.getValidYears();

    private _semester: string = "";

    constructor(semester: string) {
        this._semester = semester;
    }

    private static getValidYears(): string[] {
        let year = (new Date()).getFullYear();
        return [year.toString(), (year-1).toString(), (year-2).toString(), (year-3).toString(), (year-4).toString()];
    }

    public static isSemesterValid(semester: string): boolean {
        return Semester.VALID_SEMESTERS.some(function (element: string, index: number, array: string[]) {
            return element === semester;
        });
    }

    public static isYearValid(year: string): boolean {
        return Semester.VALID_YEARS.some(function(element: string, index: number, array: string[]){
            return element === year;
        });
    }
}