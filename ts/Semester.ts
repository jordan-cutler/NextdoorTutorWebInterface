class Semester {

    public static readonly VALID_SEMESTER: string[] = [
        "fall",
        "spring",
        "summer"
    ];

    public static VALID_YEAR: string[] = [];

    private _semester: string = "";

    constructor(semester: string) {
        this._semester = semester;
    }

    private getValidYears(): string[] {
        let year = (new Date()).getFullYear();
        return [year.toString(), (year-1).toString(), (year-2).toString(), (year-3).toString()];
    }

    public static isSemesterValid(semester: string): boolean {
        return Semester.VALID_SEMESTER.some(function (element: string, index: number, array: string[]) {
            return element === semester;
        });
    }

    public static isYearValid(year: string): boolean {
        return Semester.VALID_YEAR.some(function(element: string, index: number, array: string[]){
            return element === year;
        });
    }
}