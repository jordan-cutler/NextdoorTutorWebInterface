import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../shared/course/course.service';
import { Course } from '../shared/course/course.model';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/Rx';
import { TutorReviewService } from '../shared/tutor/reviews/tutor-review.service';
import { OverallTutorReviewSummary } from '../shared/tutor/reviews/overall-tutor-review-summary.model';
import { PreloaderService } from '../core/preloader/preloader.service';
import { OverallTutorReviewSummarySortService } from './tutor-list/sort-bar/overall-tutor-review-summary-sort.service';

@Component({
  selector: 'app-find-tutor',
  templateUrl: './find-tutor.component.html',
  styleUrls: ['./find-tutor.component.scss'],
  providers: [OverallTutorReviewSummarySortService]
})
export class FindTutorComponent implements OnInit, OnDestroy {
  private coursesWithTutorsSubscription: Subscription;
  courses: Course[];

  private tutorsForSelectedCourseSubscription: Subscription;
  selectedCourseNumber: string;
  summariesForSelectedCourse: OverallTutorReviewSummary[];

  constructor(private courseService: CourseService,
              private overallTutorReviewSummarySortService: OverallTutorReviewSummarySortService,
              private tutorReviewService: TutorReviewService,
              private preloaderService: PreloaderService) { }

  ngOnInit() {
    this.coursesWithTutorsSubscription = this.getCoursesWithTutorsSubscription();
  }

  getCoursesWithTutorsSubscription() {
    return this.courseService.getCoursesWithTutors().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      }
    );
  }

  onCourseSelect(courseNumber: string) {
    this.selectedCourseNumber = courseNumber;
    this.preloaderService.show();
    this.tutorReviewService.getAllOverallTutorReviewSummariesForCourse(courseNumber).subscribe(
      (summaries: OverallTutorReviewSummary[]) => {
        this.summariesForSelectedCourse = summaries;
        this.preloaderService.hide();
        this.overallTutorReviewSummarySortService.sortByCurrent(this.summariesForSelectedCourse);
      },
      (error) => {
        Materialize.toast('An error occurred while retrieving the tutors for that course. Please try again soon.', 3000);
        this.preloaderService.hide();
      }
    );
    // this.tutorsForSelectedCourseSubscription = this.tutorService.getTutorsForCourse(courseNumber).subscribe(
    //   (summaries: Tutor[]) => {
    //     this.summariesForSelectedCourse = summaries;
    //     this.tutorSortService.sortByCurrent(this.summariesForSelectedCourse);
    //   }
    // );
  }

  ngOnDestroy() {
    this.coursesWithTutorsSubscription.unsubscribe();

    if (this.tutorsForSelectedCourseSubscription) {
      this.tutorsForSelectedCourseSubscription.unsubscribe();
    }
  }
}
