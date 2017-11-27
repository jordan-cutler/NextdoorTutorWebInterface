class Grade {

    public static readonly VALID_GRADES: string[] = [
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-"
    ];

    private _grade: string = "";

    constructor(grade: string) {
        this._grade = grade;
    }

    get grade(): string {
        return this._grade;
    }

    public static isGradeValid(grade: string): boolean {
        return Grade.VALID_GRADES.some(function(element: string) {
            return element === grade;
        });
    }
}