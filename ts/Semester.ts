class Semester {

    public static readonly VALID_SEMESTERS: string[] = [
        "Fall",
        "Spring",
        "Summer",
        "Winter"
    ];

    public static readonly VALID_YEARS: number[] = Semester.getValidYears();

    private _semester: string = "";
    private _year: number;

    constructor(semester: string, yearTaken: number) {
        this._semester = semester;
        this._year = yearTaken;
    }

    get semester(): string {
        return this._semester;
    }

    get year(): number {
        return this._year;
    }

    private static getValidYears(): number[] {
        let year = (new Date()).getFullYear();
        return [year, (year-1), (year-2), (year-3), (year-4)];
    }

    public static isSemesterValid(semester: string): boolean {
        return Semester.VALID_SEMESTERS.some(function (element: string, index: number, array: string[]) {
            return element === semester;
        });
    }

    public static isYearValid(year: number): boolean {
        return Semester.VALID_YEARS.some(function(element: number, index: number, array: number[]){
            return element === year;
        });
    }
}