import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutor } from './tutor-model/tutor.model';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TutorService {

  private static readonly ADDTUTORROUTE = '/api/tutors/add';
  private static readonly GETUTORSFORCOURSEROUTE = '/api/tutors/course';
  private static readonly GETTUTORROUTE = '/api/tutors';
  private static readonly DELETETUTORROUTE = '/api/tutors';
  private static readonly UPDATETUTORROUTE = '/api/tutors';

  constructor(private httpClient: HttpClient) {
  }

  addTutor(tutor: Tutor) {
    return this.httpClient.post(TutorService.ADDTUTORROUTE, tutor);
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

  getTutorById(tutorId: string, courseNumber: string): Observable<Tutor> {
    const params = new HttpParams().set('courseNumber', courseNumber);
    return this.httpClient.get(
      TutorService.GETTUTORROUTE + '/' + tutorId,
      { params: params })
      .map( (tutor) => {
        return Tutor.tutorJsonToTutorModel(tutor);
    });
  }

  removeCurrentUserFromCourseTutor(courseNumber: string) {
    const params = new HttpParams().set('courseNumber', courseNumber);
    return this.httpClient.delete(
      TutorService.DELETETUTORROUTE,
      { params: params });
  }

  updateTutorAsCurrentUser(courseNumber: string, hourlyRate: number, pastExperience: string, notes: string,
                           successFunction: (data: any) => any, errorFunction: (data: any) => any) {
    return this.httpClient.put(
      TutorService.UPDATETUTORROUTE,
      {
        courseNumber: courseNumber, hourlyRate: hourlyRate,
        pastExperience: pastExperience, notes: notes
      }
    );
  }
}
