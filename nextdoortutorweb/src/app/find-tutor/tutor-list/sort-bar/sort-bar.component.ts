import { Component, Input, OnInit } from '@angular/core';
import { OverallTutorReviewSummarySortService } from './overall-tutor-review-summary-sort.service';
import { OverallTutorReviewSummary } from '../../../shared/tutor/reviews/overall-tutor-review-summary.model';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {
  @Input() summaries: OverallTutorReviewSummary[];

  constructor(private overallTutorReviewSummarySortService: OverallTutorReviewSummarySortService) { }

  ngOnInit() {
  }

  onSortAscendingClick() {
    this.overallTutorReviewSummarySortService.sortAscending(this.summaries);
  }

  onSortDescendingClick() {
    this.overallTutorReviewSummarySortService.sortDescending(this.summaries);
  }

  onSortByHourlyRateClick() {
    this.overallTutorReviewSummarySortService.sortByHourlyRate(this.summaries);
  }

  onSortByGradeClick() {
    this.overallTutorReviewSummarySortService.sortByGrade(this.summaries);
  }

  onSortByAverageOverallReviewClick() {
    this.overallTutorReviewSummarySortService.sortByAverageOverAllCourses(this.summaries);
  }

  onSortByAverageCourseReviewClick() {
    this.overallTutorReviewSummarySortService.sortByAverageForCourse(this.summaries);
  }

}
