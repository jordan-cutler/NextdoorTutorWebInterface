export class Course {

  constructor(public courseNumber: string, public title: string) {
  }

  static toModelFromJson(courseJson: any) {
    const courseNumber = courseJson.courseNumber;
    const title = courseJson.title;
    return new Course(courseNumber, title);
  }
}
