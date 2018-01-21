import { Course } from '../../course/course.model';

export class CourseReviewSummary {
  constructor(public course: Course,
              public knowledgeableAverage: string,
              public helpfulAverage: string,
              public charismaticAverage: string,
              public averageOfAllScoresAmongAllReviews: string,
              public notes: string[]) {
  }

  static toModelFromJson(courseReviewSummaryJson: any): CourseReviewSummary {
    if (!courseReviewSummaryJson) {
      return null;
    }
    const course: Course = Course.toModelFromJson(courseReviewSummaryJson.course);
    const knowledgeableAverage = courseReviewSummaryJson.knowledgeableAverage;
    const helpfulAverage = courseReviewSummaryJson.helpfulAverage;
    const charismaticAverage = courseReviewSummaryJson.charismaticAverage;
    const averageOfAllScoresAmongAllReviews = courseReviewSummaryJson.averageOfAllScoresAmongAllReviews;
    const notes = courseReviewSummaryJson.notes;
    return new CourseReviewSummary(
      course, knowledgeableAverage, helpfulAverage,
      charismaticAverage, averageOfAllScoresAmongAllReviews, notes
    );
  }
}
