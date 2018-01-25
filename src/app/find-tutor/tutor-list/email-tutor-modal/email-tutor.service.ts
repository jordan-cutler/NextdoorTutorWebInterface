import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailTutorService {
  private static readonly REQUESTUTORROUTE = '/api/tutors/request';

  constructor(private httpClient: HttpClient) {
  }

  sendEmailToTutor(subject: string, message: string, tutorEmail: string, relatedCourse: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      EmailTutorService.REQUESTUTORROUTE,
      {
        subject: subject,
        message: message,
        tutorEmail: tutorEmail,
        relatedCourse: relatedCourse
      }
    );
  }
}
