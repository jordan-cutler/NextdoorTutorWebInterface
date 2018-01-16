import { User } from '../../user/user-model/user.model';
import { CourseReviewSummary } from './course-review-summary.model';

import 'rxjs/Rx';

export class BasicTutorInfo {

  constructor(public averageOfAllReviewsForAllCourses: number,
              public user: User,
              public courseReviewSummaries: CourseReviewSummary[],
              public reviewNotes: string[]) {
  }

  public static toModelFromJson(basicTutorInfoJson: any) {
    const averageOfAllReviewsForAllCourses = basicTutorInfoJson.averageOfAllReviewsForAllCourses;
    const user = User.userJsonToUserModel(basicTutorInfoJson.user);
    const courseReviewSummaries = basicTutorInfoJson.courseReviewSummaries.map(
      (courseReviewSummaryJson) => CourseReviewSummary.toModelFromJson(courseReviewSummaryJson)
    );
    const reviewNotes = basicTutorInfoJson.reviewNotes;
    return new BasicTutorInfo(
      averageOfAllReviewsForAllCourses, user,
      courseReviewSummaries, reviewNotes
    );
  }
}
