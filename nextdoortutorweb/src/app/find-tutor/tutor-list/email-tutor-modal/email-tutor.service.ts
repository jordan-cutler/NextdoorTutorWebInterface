import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmailTutorData } from './EmailTutorData';

@Injectable()
export class EmailTutorService {
  private static readonly REQUESTUTORROUTE = '/api/tutors/request';

  private emailTutorModalOpenSubject = new Subject<EmailTutorData>();

  constructor(private httpClient: HttpClient) {
  }

  getEmailTutorModalOpenSubject() {
    return this.emailTutorModalOpenSubject;
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
