import { User } from '../../user/user-model/user.model';
import { Semester } from './semester.model';
import { Course } from '../../course/course.model';

export class Tutor {

  constructor(
    public user: User,
    public hourlyRate: number,
    public course: Course,
    public grade: string,
    public instructor: string,
    public pastExperience: string,
    public notes: string,
    public semesterTaken: Semester,
    public hasTakenCourse: boolean,
    public instructorNameWhoEndorsed: string
  ) {
  }

  public static tutorJsonToTutorModel(tutorJson: any): Tutor {
    const user: User = User.userJsonToUserModel(tutorJson.user);
    const hourlyRate: number = Number(tutorJson.hourlyRate);
    const course: Course = Course.toModelFromJson(tutorJson.course);
    const grade: string = tutorJson.grade;
    const instructor: string = tutorJson.instructor;
    const pastExperience: string = tutorJson.pastExperience;
    const notes: string = tutorJson.notes;
    const yearTaken: number = tutorJson.semesterTaken.year;
    const termTaken: string = tutorJson.semesterTaken.term;
    const semesterTaken: Semester = new Semester(termTaken, yearTaken);
    const hasTakenCourse: boolean = tutorJson.hasTakenCourse;
    const instructorNameWhoEndorsed: string = tutorJson.instructorNameWhoEndorsed;

    return new Tutor(
      user, hourlyRate, course,
      grade, instructor, pastExperience,
      notes, semesterTaken, hasTakenCourse, instructorNameWhoEndorsed
    );
  }
}
