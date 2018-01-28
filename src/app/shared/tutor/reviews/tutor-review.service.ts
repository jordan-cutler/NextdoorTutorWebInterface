import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OverallTutorReviewSummary } from './overall-tutor-review-summary.model';
import { BasicTutorInfo } from './basic-tutor-info.model';
import { Subject } from 'rxjs/Subject';
import { CourseReviewSummary } from './course-review-summary.model';

@Injectable()
export class TutorReviewService {

  private static readonly OVERALLSUMMARYROUTE = '/api/tutorReview/overallSummary';
  private static readonly ALLOVERALLSUMMARIESFORCOURSEROUTE = '/api/tutorReview/summariesForCourse';
  private static readonly ALLCOURSEREVIEWSUMMARIESFORTUTORROUTE = '/api/tutorReview/summariesForTutor';
  private static readonly GETBASICTUTORINFOROUTE = '/api/tutorReview/basicTutorInfo';
  private static readonly SUBMITTUTORREVIEWROUTE = '/api/tutorReview';

  private successfulReviewUploadSubject = new Subject();

  constructor(private httpClient: HttpClient) {

  }

  sendSuccessfulReviewUploadedEvent() {
    this.successfulReviewUploadSubject.next();
  }

  getSuccessfulReviewUploadedObservable() {
    return this.successfulReviewUploadSubject.asObservable();
  }

  getOverallTutorReview(tutorId: string, courseNumber: string): Observable<OverallTutorReviewSummary> {
    const params =
      new HttpParams()
        .append('tutorId', tutorId)
        .append('courseNumber', courseNumber);

    return this.httpClient.get(
      TutorReviewService.OVERALLSUMMARYROUTE,
      { params: params }
    ).map(
      (overallTutorReviewSummaryJson) => {
        return OverallTutorReviewSummary.toModelFromJson(overallTutorReviewSummaryJson);
      }
    );
  }

  getAllOverallTutorReviewSummariesForCourse(courseNumber: string): Observable<OverallTutorReviewSummary[]> {
    return this.httpClient.get(
      TutorReviewService.ALLOVERALLSUMMARIESFORCOURSEROUTE + '/' + courseNumber
    ).map(
      (overallTutorReviewSummariesJson: any[]) => overallTutorReviewSummariesJson.map(
        (overallTutorReviewSummaryJson) => OverallTutorReviewSummary.toModelFromJson(overallTutorReviewSummaryJson)
      )
    );
  }

  getAllCourseReviewSummariesForTutor(userId: string): Observable<CourseReviewSummary[]> {
    return this.httpClient.get(
      TutorReviewService.ALLCOURSEREVIEWSUMMARIESFORTUTORROUTE + '/' + userId
    ).map(
      (courseReviewSummariesJson: any[]) => courseReviewSummariesJson.map(
        (courseReviewSummaryJson) => CourseReviewSummary.toModelFromJson(courseReviewSummaryJson)
      )
    );
  }

  getBasicTutorInfo(email: string): Observable<BasicTutorInfo> {
    return this.httpClient.get(
      TutorReviewService.GETBASICTUTORINFOROUTE + '/' + email
    ).map((basicTutorInfoJson) => {
      return BasicTutorInfo.toModelFromJson(basicTutorInfoJson);
    });
  }

  submitReviewForTutor(tutorId: string, courseNumber: string,
                       knowledgeable: string, helpful: string,
                       charismatic: string, overall: string, notes: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      TutorReviewService.SUBMITTUTORREVIEWROUTE,
      {
        tutorId: tutorId,
        courseNumber: courseNumber,
        knowledgeable: knowledgeable,
        helpful: helpful,
        charismatic: charismatic,
        overall: overall,
        notes: notes
      }
    );
  }
}
