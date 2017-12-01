class Course {
    private _courseNumber: string = "";
    private _title: string = "";

    constructor(courseNumber: string, title: string) {
        this._courseNumber = courseNumber;
        this._title = title;
    }

    get courseNumber(): string {
        return this._courseNumber;
    }

    get title(): string {
        return this._title;
    }

    public static CourseJsonArrayToCourseModelArray(coursesJson: any) {
        let courses: Course[] = [];
        coursesJson.forEach(function(courseJson: any) {
            courses.push(Course.CourseJsonToCourseModel(courseJson));
        });
        return courses;
    }

    public static CourseJsonToCourseModel(courseJson: any) {
        return new Course(courseJson.courseNumber, courseJson.title);
    }

    public toString = () : string => {
        return `${this._courseNumber} ${this._title}`;
    }
}
