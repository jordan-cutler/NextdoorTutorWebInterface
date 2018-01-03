import { User } from '../../user/user-model/user.model';
import { Semester } from './semester.model';

export class Tutor {
  private _user: User;
  private _hourlyRate: number;
  private _courseNumber: string;
  private _grade: string;
  private _instructor: string;
  private _pastExperience: string;
  private _notes: string;
  private _semesterTaken: Semester;
  private _hasTakenCourse: boolean;

  constructor(
    user: User, hourlyRate: number, courseNumber: string, grade: string, instructor: string,
    pastExperience: string, notes: string, semesterTaken: Semester, hasTakenCourse: boolean) {
    this._user = user;
    this._hourlyRate = hourlyRate;
    this._courseNumber = courseNumber;
    this._grade = grade;
    this._instructor = instructor;
    this._pastExperience = pastExperience;
    this._notes = notes;
    this._semesterTaken = semesterTaken;
    this._hasTakenCourse = hasTakenCourse;
  }

  get userId(): string {
    return this._user.userId;
  }

  get email(): string {
    return this._user.email;
  }

  get name(): string {
    return this._user.name;
  }

  get major(): string {
    return this._user.major;
  }

  get bio(): string {
    return this._user.bio;
  }

  get hourlyRate(): number {
    return this._hourlyRate;
  }

  get courseNumber(): string {
    return this._courseNumber;
  }

  get grade(): string {
    return this._grade;
  }

  get instructor(): string {
    return this._instructor;
  }

  get pastExperience(): string {
    return this._pastExperience;
  }

  get notes(): string {
    return this._notes;
  }

  get semesterTaken(): Semester {
    return this._semesterTaken;
  }

  get hasTakenCourse(): boolean {
    return this._hasTakenCourse;
  }

  public static tutorJsonToTutorModel(tutorJson: any): Tutor {
    const user: User = User.userJsonToUserModel(tutorJson.user);
    const hourlyRate: number = Number(tutorJson.hourlyRate);
    const courseNumber: string = tutorJson.courseNumber;
    const grade: string = tutorJson.grade;
    const instructor: string = tutorJson.instructor;
    const pastExperience: string = tutorJson.pastExperience;
    const notes: string = tutorJson.notes;
    const yearTaken: number = tutorJson.semesterTaken.year;
    const semester: string = tutorJson.semesterTaken.semester;
    const semesterTaken: Semester = new Semester(semester, yearTaken);
    const hasTakenCourse: boolean = tutorJson.hasTakenCourse;

    return new Tutor(
      user, hourlyRate, courseNumber,
      grade, instructor, pastExperience, notes, semesterTaken, hasTakenCourse
    );
  }
}
