import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CourseService {

  private static readonly COURSESWITHTUTORSROUTE = '/api/courses/haveTutors';
  private static readonly COURSESUSERHASNTTUTOREDBEFOREROUTE = '/api/courses/notTutoring';
  private static readonly GETCOURSESUSERISTUTORINGROUTE = '/api/courses/tutoring';

  constructor(private httpClient: HttpClient) {

  }

  // getCoursesWithTutors(successFunction: (data: any) => any, errorFunction: (data: any) => any) {
  //   return this.httpClient.get(CourseApiUtil.COURSESWITHTUTORSROUTE, HttpRequestUtil.getSessionInfoJson(),
  //     successFunction, errorFunction
  //   )
  // }
  //
  // getCoursesCurrentUserHasntTutoredBefore(
  //   successFunction: (data: any) => any, errorFunction: (data: any) => any
  // ) {
  //   return HttpRequestUtil.GetRequest(CourseApiUtil.COURSESUSERHASNTTUTOREDBEFOREROUTE + "/" + UserSession.userId(),
  //     HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction
  //   );
  // }
  //
  // getCoursesUserIsTutoring(userId: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
  //   return HttpRequestUtil.GetRequest(CourseApiUtil.GETCOURSESUSERISTUTORINGROUTE + "/" + userId,
  //     HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction);
  // }
}
