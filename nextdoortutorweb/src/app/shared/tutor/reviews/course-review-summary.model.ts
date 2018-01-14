export class CourseReviewSummary {
  constructor(public courseNumber: string,
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
    const courseNumber = courseReviewSummaryJson.courseNumber;
    const knowledgeableAverage = courseReviewSummaryJson.knowledgeableAverage;
    const helpfulAverage = courseReviewSummaryJson.helpfulAverage;
    const charismaticAverage = courseReviewSummaryJson.charismaticAverage;
    const averageOfAllScoresAmongAllReviews = courseReviewSummaryJson.averageOfAllScoresAmongAllReviews;
    const notes = courseReviewSummaryJson.notes;
    return new CourseReviewSummary(
      courseNumber, knowledgeableAverage, helpfulAverage,
      charismaticAverage, averageOfAllScoresAmongAllReviews, notes
    );
  }
}
