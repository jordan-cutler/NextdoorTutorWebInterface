class Course {
    private _courseNumber: string = "";


    constructor(courseNumber: string) {
        this._courseNumber = courseNumber;
    }

    get courseNumber(): string {
        return this._courseNumber;
    }
}
