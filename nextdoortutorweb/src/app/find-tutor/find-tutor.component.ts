import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../shared/course/course.service';
import { Course } from '../shared/course/course.model';
import { Subscription } from 'rxjs/Subscription';
import { TutorService } from '../shared/tutor/tutor.service';
import { Tutor } from '../shared/tutor/tutor-model/tutor.model';
import { TutorSortService } from './tutor-list/tutor-sort.service';

import 'rxjs/Rx';
import { TutorReviewService } from '../shared/tutor/reviews/tutor-review.service';
import { OverallTutorReviewSummary } from '../shared/tutor/reviews/overall-tutor-review-summary.model';
import { PreloaderService } from '../core/preloader/preloader.service';

@Component({
  selector: 'app-find-tutor',
  templateUrl: './find-tutor.component.html',
  styleUrls: ['./find-tutor.component.scss'],
  providers: [TutorSortService]
})
export class FindTutorComponent implements OnInit, OnDestroy {
  private coursesWithTutorsSubscription: Subscription;
  courses: Course[];

  private tutorsForSelectedCourseSubscription: Subscription;
  selectedCourseNumber: string;
  summariesForSelectedCourse: OverallTutorReviewSummary[];

  constructor(private courseService: CourseService,
              private tutorSortService: TutorSortService,
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
