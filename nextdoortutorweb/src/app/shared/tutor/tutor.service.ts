import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutor } from './tutor-model/tutor.model';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { TutorUpdateData } from './TutorUpdateData';

@Injectable()
export class TutorService {

  private static readonly ADDTUTORROUTE = '/api/tutors/add';
  private static readonly GETUTORSFORCOURSEROUTE = '/api/tutors/course';
  private static readonly GETTUTORROUTE = '/api/tutors';
  private static readonly INSTRUCTORENDORSEROUTE = '/api/tutors/instructorEndorse';
  private static readonly REMOVEINSTRUCTORENDORSEMENTROUTE = '/api/tutors/removeInstructorEndorsement';
  private static readonly DELETETUTORROUTE = '/api/tutors/delete';
  private static readonly UPDATETUTORROUTE = '/api/tutors';
  constructor(private httpClient: HttpClient) {
  }

  addTutor(tutor: Tutor): Observable<boolean> {
    return this.httpClient.post<boolean>(TutorService.ADDTUTORROUTE, {
      hourlyRate: tutor.hourlyRate,
      course: tutor.course,
      grade: tutor.grade,
      instructor: tutor.instructor,
      pastExperience: tutor.pastExperience,
      notes: tutor.notes,
      semesterTaken: tutor.semesterTaken,
      hasTakenCourse: tutor.hasTakenCourse
    });
  }

  getTutorsForCourse(courseNumber: string): Observable<Tutor[]> {
    return this.httpClient.get(TutorService.GETUTORSFORCOURSEROUTE + '/' + courseNumber)
      .map((tutors: any[]) => { return tutors.map((tutor) => {
              return Tutor.tutorJsonToTutorModel(tutor);
            }
          );
        }
      );
  }

  getTutorInformationForCurrentUserByCourseNumber(courseNumber: string): Observable<Tutor> {
    const params = new HttpParams().set('courseNumber', courseNumber);
    return this.httpClient.get(TutorService.GETTUTORROUTE + '/' + courseNumber)
      .map( (tutor) => {
        return Tutor.tutorJsonToTutorModel(tutor);
    });
  }

  giveInstructorEndorsement(tutorId: string, tutorCourseNumber: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      TutorService.INSTRUCTORENDORSEROUTE,
      {
        tutorId: tutorId,
        courseNumber: tutorCourseNumber
      }
    );
  }

  removeInstructorEndorsement(tutorId: string, tutorCourseNumber: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      TutorService.REMOVEINSTRUCTORENDORSEMENTROUTE,
      {
        tutorId: tutorId,
        courseNumber: tutorCourseNumber
      }
    );
  }

  removeCurrentUserFromCourseTutor(courseNumber: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      TutorService.DELETETUTORROUTE,
      { courseNumber: courseNumber });
  }


  updateTutorAsCurrentUser(tutorUpdateData: TutorUpdateData): Observable<boolean> {
    return this.httpClient.put<boolean>(
      TutorService.UPDATETUTORROUTE,
      {
        courseNumber: tutorUpdateData.courseNumber,
        hourlyRate: tutorUpdateData.hourlyRate,
        pastExperience: tutorUpdateData.pastExperience,
        notes: tutorUpdateData.notes
      }
    );
  }
}
