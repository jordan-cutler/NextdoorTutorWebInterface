import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionService } from '../user-session/user-session.service';
import { Course } from './course.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {

  private static readonly COURSESWITHTUTORSROUTE = '/api/courses/haveTutors';
  private static readonly COURSESUSERHASNTTUTOREDBEFOREROUTE = '/api/courses/notTutoring';
  private static readonly GETCOURSESUSERISTUTORINGROUTE = '/api/courses/tutoring';

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService) {
  }

  getCoursesWithTutors(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(CourseService.COURSESWITHTUTORSROUTE);
  }

  getCoursesCurrentUserHasntTutoredBefore(): Observable<Course[]> {
    const currentUserId = this.userSessionService.getCurrentUser().userId;
    return this.httpClient.get<Course[]>(CourseService.COURSESUSERHASNTTUTOREDBEFOREROUTE);
  }

  getCoursesUserIsTutoring(userId: string): Observable<Course[]> {
    return this.httpClient.get<Course[]>(CourseService.GETCOURSESUSERISTUTORINGROUTE + '/' + userId);
  }
}
