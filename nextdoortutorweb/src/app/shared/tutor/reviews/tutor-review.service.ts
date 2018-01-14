import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OverallTutorReviewSummary } from './overall-tutor-review-summary.model';

import 'rxjs/Rx';

@Injectable()
export class TutorReviewService {

  private static readonly OVERALLSUMMARYROUTE = '/api/tutorReview/overallSummary';
  private static readonly ALLSUMMARIESROUTE = '/api/tutorReview/summariesForCourse';

  constructor(private httpClient: HttpClient) {

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
      TutorReviewService.ALLSUMMARIESROUTE + '/' + courseNumber
    ).map(
      (overallTutorReviewSummariesJson: any[]) => overallTutorReviewSummariesJson.map(
        (overallTutorReviewSummaryJson) => OverallTutorReviewSummary.toModelFromJson(overallTutorReviewSummaryJson)
      )
    );
  }
}
