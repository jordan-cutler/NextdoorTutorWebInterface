export class Course {

  constructor(public courseNumber: string, public title: string) {
  }

  static toModelFromJson(courseJson: any) {
    const { courseNumber, title } = courseJson;
    return new Course(courseNumber, title);
  }
}
