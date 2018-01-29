import { OverallTutorReviewSummary } from '@shared/tutor/reviews/overall-tutor-review-summary.model';
import { Grade } from '@shared/tutor/tutor-model/grade.model';
import { ReviewGrade } from '@shared/tutor/reviews/review-grade.model';

export class OverallTutorReviewSummarySortService {
  private currentlySortingBy = SortOn.AverageCourseReview;
  private ascendingOrDescending = SortBy.Descending;

  constructor() {
  }

  private static getGradeSort(summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary): number {
    const summary1MissingInfo = !summary1.tutor || !summary1.tutor.grade;
    const summary2MissingInfo = !summary2.tutor || !summary2.tutor.grade;
    if (summary1MissingInfo && summary2MissingInfo) {
      return 0;
    }
    if (summary1MissingInfo) {
      return -1;
    }
    if (summary2MissingInfo) {
      return 1;
    }
    return ReviewGrade.getRank((new Grade(summary2.tutor.grade))) - ReviewGrade.getRank(new Grade(summary1.tutor.grade));
  }

  private static getHourlyRateSort(summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary): number {
    const summary1MissingInfo = !summary1.tutor || !summary1.tutor.hourlyRate;
    const summary2MissingInfo = !summary2.tutor || !summary2.tutor.hourlyRate;
    if (summary1MissingInfo && summary2MissingInfo) {
      return 0;
    }
    if (summary1MissingInfo) {
      return -1;
    }
    if (summary2MissingInfo) {
      return 1;
    }
    return summary1.tutor.hourlyRate - summary2.tutor.hourlyRate;
  }

  private static getAverageOverallReviewSort(summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary): number {
    return (
      ReviewGrade.getRank(new Grade(summary2.averageOfAllReviewsForAllCourses))
      -
      ReviewGrade.getRank(new Grade(summary1.averageOfAllReviewsForAllCourses))
    );
  }

  private static getAverageCourseReviewSort(summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary): number {
    const summary1MissingInfo = !summary1.courseReviewSummary || !summary1.courseReviewSummary.averageOfAllScoresAmongAllReviews;
    const summary2MissingInfo = !summary2.courseReviewSummary || !summary2.courseReviewSummary.averageOfAllScoresAmongAllReviews;
    if (summary1MissingInfo && summary2MissingInfo) {
      return 0;
    }
    if (summary1MissingInfo) {
      return -1;
    }
    if (summary2MissingInfo) {
      return 1;
    }
    return ReviewGrade.getRank(new Grade(summary2.courseReviewSummary.averageOfAllScoresAmongAllReviews)) -
      ReviewGrade.getRank(new Grade(summary1.courseReviewSummary.averageOfAllScoresAmongAllReviews));
  }


  private static sortByHourlyRateAscending(summaries: OverallTutorReviewSummary[]): OverallTutorReviewSummary[] {
    summaries.sort((summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary) => {
      const rateSort = OverallTutorReviewSummarySortService.getHourlyRateSort(summary1, summary2);
      return OverallTutorReviewSummarySortService.sortByPriorityFieldFirstAscending(rateSort, summary1, summary2);
    });
    return summaries;
  }

  private static sortByGradeAscending(summaries: OverallTutorReviewSummary[]): OverallTutorReviewSummary[] {
    summaries.sort((summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary) => {
      const gradeSort = OverallTutorReviewSummarySortService.getGradeSort(summary1, summary2);
      return OverallTutorReviewSummarySortService.sortByPriorityFieldFirstAscending(gradeSort, summary1, summary2);
    });
    return summaries;
  }

  private static sortByAverageCourseReviewAscending(summaries: OverallTutorReviewSummary[]): OverallTutorReviewSummary[] {
    summaries.sort((summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary) => {
      const averageCourseReviewSort = OverallTutorReviewSummarySortService.getAverageCourseReviewSort(summary1, summary2);
      return OverallTutorReviewSummarySortService.sortByPriorityFieldFirstAscending(averageCourseReviewSort, summary1, summary2);
    });
    return summaries;
  }

  private static sortByAverageOverallReviewAscending(summaries: OverallTutorReviewSummary[]): OverallTutorReviewSummary[] {
    summaries.sort((summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary) => {
      const averageOverallReviewSort = OverallTutorReviewSummarySortService.getAverageOverallReviewSort(summary1, summary2);
      return OverallTutorReviewSummarySortService.sortByPriorityFieldFirstAscending(averageOverallReviewSort, summary1, summary2);
    });
    return summaries;
  }

  /**
   * If whatever sort was calculated did not return a tie, it will return that value. If it is a tie, it will go through
   * the secondary ordering we specify
   * @param {number} priorityNumber
   * @param {OverallTutorReviewSummary} summary1
   * @param {OverallTutorReviewSummary} summary2
   * @returns {number}
   */
  private static sortByPriorityFieldFirstAscending(priorityNumber: number,
                                                   summary1: OverallTutorReviewSummary,
                                                   summary2: OverallTutorReviewSummary) {
    console.log(summary1);
    console.log(summary2);
    console.log(priorityNumber);
    console.log('subtraction = ' + (summary1.tutor.hourlyRate - summary2.tutor.hourlyRate));
    if (priorityNumber !== 0) {
      return priorityNumber;
    }
    const averageCourseReviewSort = OverallTutorReviewSummarySortService.getAverageCourseReviewSort(summary1, summary2);
    if (averageCourseReviewSort !== 0) {
      return averageCourseReviewSort;
    }
    const averageOverallReviewSort = OverallTutorReviewSummarySortService.getAverageOverallReviewSort(summary1, summary2);
    if (averageOverallReviewSort !== 0) {
      return averageOverallReviewSort;
    }
    const hourlyRateSort = OverallTutorReviewSummarySortService.getHourlyRateSort(summary1, summary2);
    if (hourlyRateSort !== 0) {
      return hourlyRateSort;
    }
    return OverallTutorReviewSummarySortService.getGradeSort(summary1, summary2);
  }

  sortAscending(summaries: OverallTutorReviewSummary[]) {
    this.ascendingOrDescending = SortBy.Ascending;
    this.sortByCurrent(summaries);
  }

  sortDescending(summaries: OverallTutorReviewSummary[]) {
    this.ascendingOrDescending = SortBy.Descending;
    this.sortByCurrent(summaries);
  }

  sortByHourlyRate(summaries: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = SortOn.HourlyRate;
    this.sortByCurrent(summaries);
  }

  sortByGrade(summaries: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = SortOn.Grade;
    this.sortByCurrent(summaries);
  }

  sortByAverageOverAllCourses(summaries: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = SortOn.AverageOverallReview;
    this.sortByCurrent(summaries);
  }

  sortByAverageForCourse(summaries: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = SortOn.AverageCourseReview;
    this.sortByCurrent(summaries);
  }

  sortByCurrent(summaries: OverallTutorReviewSummary[]) {
    if (this.currentlySortingBy === SortOn.HourlyRate) {
      OverallTutorReviewSummarySortService.sortByHourlyRateAscending(summaries);
    } else if (this.currentlySortingBy === SortOn.Grade) {
      OverallTutorReviewSummarySortService.sortByGradeAscending(summaries);
    } else if (this.currentlySortingBy === SortOn.AverageOverallReview) {
      OverallTutorReviewSummarySortService.sortByAverageOverallReviewAscending(summaries);
    } else if (this.currentlySortingBy === SortOn.AverageCourseReview) {
      OverallTutorReviewSummarySortService.sortByAverageCourseReviewAscending(summaries);
    }

    if (this.ascendingOrDescending === SortBy.Descending) {
      summaries.reverse();
    }
  }
}

export enum SortOn {
  HourlyRate = 'Hourly Rate',
  Grade = 'Grade',
  AverageOverallReview = 'Avg. Overall Review',
  AverageCourseReview = 'Avg. Course Review'
}

export enum SortBy {
  Ascending = 'Ascending',
  Descending = 'Descending'
}
