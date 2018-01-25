import { Tutor } from '../tutor-model/tutor.model';
import { CourseReviewSummary } from './course-review-summary.model';

export class OverallTutorReviewSummary {
  constructor(public averageOfAllReviewsForAllCourses: string,
              public tutor: Tutor,
              public courseReviewSummary: CourseReviewSummary) {
  }

  static toModelFromJson(overallTutorReviewSummaryJson: any): OverallTutorReviewSummary {
    if (!overallTutorReviewSummaryJson) {
      return null;
    }
    const averageOfAllReviewsForAllCourses = overallTutorReviewSummaryJson.averageOfAllReviewsForAllCourses;
    const tutor = Tutor.tutorJsonToTutorModel(overallTutorReviewSummaryJson.tutor);
    const courseReviewSummary = CourseReviewSummary.toModelFromJson(overallTutorReviewSummaryJson.courseReviewSummary);
    return new OverallTutorReviewSummary(averageOfAllReviewsForAllCourses, tutor, courseReviewSummary);
  }
}
