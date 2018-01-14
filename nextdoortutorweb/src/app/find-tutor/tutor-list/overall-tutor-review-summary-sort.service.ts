import { OverallTutorReviewSummary } from '../../shared/tutor/reviews/overall-tutor-review-summary.model';
import { Grade } from '../../shared/tutor/tutor-model/grade.model';

export class OverallTutorReviewSummarySortService {
  private currentlySortingBy = 'hourlyRate';
  private ascendingOrDescending = 'ascending';

  constructor() {
  }

  private static getGradeSort(summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary): number {
    if (!summary1.tutor || !summary1.tutor.grade) {
      return -1;
    }
    if (!summary2.tutor || !summary2.tutor.grade) {
      return 1;
    }
    return Grade.getRank((new Grade(summary2.tutor.grade))) - Grade.getRank(new Grade(summary1.tutor.grade));
  }

  private static getHourlyRateSort(summary1: OverallTutorReviewSummary, summary2: OverallTutorReviewSummary): number {
    if (!summary1.tutor || !summary1.tutor.grade) {
      return -1;
    }
    if (!summary2.tutor || !summary2.tutor.grade) {
      return 1;
    }
    return summary1.tutor.hourlyRate - summary2.tutor.hourlyRate;
  }

  private static getAverageOverallReviewSort(a: OverallTutorReviewSummary, b: OverallTutorReviewSummary): number {
    return Grade.getRank(new Grade(b.averageOfAllReviewsForAllCourses)) - Grade.getRank(new Grade(a.averageOfAllReviewsForAllCourses));
  }

  private static getAverageCourseReviewSort(a: OverallTutorReviewSummary, b: OverallTutorReviewSummary): number {
    if (!a.courseReviewSummary || !a.courseReviewSummary.averageOfAllScoresAmongAllReviews) {
      return -1;
    }
    if (!b.courseReviewSummary || !b.courseReviewSummary.averageOfAllScoresAmongAllReviews) {
      return 1;
    }
    return Grade.getRank(new Grade(b.courseReviewSummary.averageOfAllScoresAmongAllReviews)) -
      Grade.getRank(new Grade(a.courseReviewSummary.averageOfAllScoresAmongAllReviews));
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

  sortAscending(tutors: OverallTutorReviewSummary[]) {
    this.ascendingOrDescending = 'ascending';
    this.sortByCurrent(tutors);
  }

  sortDescending(tutors: OverallTutorReviewSummary[]) {
    this.ascendingOrDescending = 'descending';
    this.sortByCurrent(tutors);
  }

  sortByHourlyRate(tutors: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = 'hourlyRate';
    this.sortByCurrent(tutors);
  }

  sortByGrade(tutors: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = 'grade';
    this.sortByCurrent(tutors);
  }

  sortByAverageOverAllCourses(tutors: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = 'averageOverallReview';
    this.sortByCurrent(tutors);
  }

  sortByAverageForCourse(summaries: OverallTutorReviewSummary[]) {
    this.currentlySortingBy = 'averageCourseReview';
    this.sortByCurrent(summaries);
  }

  sortByCurrent(summaries: OverallTutorReviewSummary[]) {
    if (this.ascendingOrDescending === 'ascending') {
      if (this.currentlySortingBy === 'hourlyRate') {
        OverallTutorReviewSummarySortService.sortByHourlyRateAscending(summaries);
      } else if (this.currentlySortingBy === 'grade') {
        OverallTutorReviewSummarySortService.sortByGradeAscending(summaries);
      } else if (this.currentlySortingBy === 'averageOverallReview') {
        OverallTutorReviewSummarySortService.sortByAverageOverallReviewAscending(summaries);
      } else if (this.currentlySortingBy === 'averageCourseReview') {
        OverallTutorReviewSummarySortService.sortByAverageCourseReviewAscending(summaries);
      }
    } else if (this.ascendingOrDescending === 'descending') {
      if (this.currentlySortingBy === 'hourlyRate') {
        OverallTutorReviewSummarySortService.sortByHourlyRateAscending(summaries).reverse();
      } else if (this.currentlySortingBy === 'grade') {
        OverallTutorReviewSummarySortService.sortByGradeAscending(summaries).reverse();
      } else if (this.currentlySortingBy === 'averageOverallReview') {
        OverallTutorReviewSummarySortService.sortByAverageOverallReviewAscending(summaries).reverse();
      } else if (this.currentlySortingBy === 'averageCourseReview') {
        OverallTutorReviewSummarySortService.sortByAverageCourseReviewAscending(summaries).reverse();
      }
    }
  }

}
