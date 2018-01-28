import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '@shared/course/course.service';
import { Course } from '@shared/course/course.model';
import { Subscription } from 'rxjs/Subscription';
import { TutorReviewService } from '@shared/tutor/reviews/tutor-review.service';
import { OverallTutorReviewSummary } from '@shared/tutor/reviews/overall-tutor-review-summary.model';
import { PreloaderService } from '@core/preloader/preloader.service';
import { OverallTutorReviewSummarySortService } from './tutor-list/sort-bar/overall-tutor-review-summary-sort.service';
import { ActivatedRoute, Params } from '@angular/router';

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
              private preloaderService: PreloaderService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => this.onCourseSelect(params['courseNumber'])
    );
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
    /*
    By wrapping in Promise.resolve( ), Creates a microtask that gets executed after the current synchronous code has
    finished executing hence the update to the property will happen after the verification step
    Prevents this error:
    ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'false'. Current value: 'true'
    for preloaderservice
     */
    Promise.resolve(null).then(() => {
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
    });

  }

  ngOnDestroy() {
    this.coursesWithTutorsSubscription.unsubscribe();

    if (this.tutorsForSelectedCourseSubscription) {
      this.tutorsForSelectedCourseSubscription.unsubscribe();
    }
  }
}
