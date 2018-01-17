import { Component, Input, OnInit } from '@angular/core';
import { OverallTutorReviewSummarySortService, SortBy, SortOn } from './overall-tutor-review-summary-sort.service';
import { OverallTutorReviewSummary } from '../../../shared/tutor/reviews/overall-tutor-review-summary.model';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {
  @Input() summaries: OverallTutorReviewSummary[];
  selectedSortOn: SortOn;
  selectedSortBy: SortBy;
  sortOnOptions: SortOn[];
  sortByOptions: SortBy[];

  constructor(private overallTutorReviewSummarySortService: OverallTutorReviewSummarySortService) { }

  ngOnInit() {
    this.selectedSortOn = SortOn.AverageCourseReview;
    this.selectedSortBy = SortBy.Descending;
    this.sortOnOptions = [
      SortOn.AverageOverallReview,
      SortOn.AverageCourseReview,
      SortOn.Grade,
      SortOn.HourlyRate
    ];
    this.sortByOptions = [
      SortBy.Descending,
      SortBy.Ascending
    ];
  }

  onChangeSortOn(sortOption: SortOn) {
    if (sortOption === SortOn.HourlyRate) {
      this.sortByHourlyRate();
    } else if (sortOption === SortOn.Grade) {
      this.sortByGrade();
    } else if (sortOption === SortOn.AverageOverallReview) {
      this.sortByAverageOverallReview();
    } else if (sortOption === SortOn.AverageCourseReview) {
      this.sortByAverageCourseReview();
    }
  }

  onChangeSortBy(sortBy: SortBy) {
    if (sortBy === SortBy.Descending) {
      this.sortDescending();
    } else if (sortBy === SortBy.Ascending) {
      this.sortAscending();
    }
  }

  sortAscending() {
    this.overallTutorReviewSummarySortService.sortAscending(this.summaries);
  }

  sortDescending() {
    this.overallTutorReviewSummarySortService.sortDescending(this.summaries);
  }

  sortByHourlyRate() {
    this.overallTutorReviewSummarySortService.sortByHourlyRate(this.summaries);
  }

  sortByGrade() {
    this.overallTutorReviewSummarySortService.sortByGrade(this.summaries);
  }

  sortByAverageOverallReview() {
    this.overallTutorReviewSummarySortService.sortByAverageOverAllCourses(this.summaries);
  }

  sortByAverageCourseReview() {
    this.overallTutorReviewSummarySortService.sortByAverageForCourse(this.summaries);
  }

}
