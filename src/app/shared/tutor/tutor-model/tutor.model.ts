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
    const { grade, instructor, pastExperience, notes, hasTakenCourse, instructorNameWhoEndorsed } = tutorJson;
    const { year: yearTaken, term: termTaken } = tutorJson.semesterTaken;
    const semesterTaken: Semester = new Semester(termTaken, yearTaken);

    return new Tutor(
      user, hourlyRate, course,
      grade, instructor, pastExperience,
      notes, semesterTaken, hasTakenCourse, instructorNameWhoEndorsed
    );
  }
}
