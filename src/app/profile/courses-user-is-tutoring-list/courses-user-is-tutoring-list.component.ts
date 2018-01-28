import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Course } from '@shared/course/course.model';
import { EditCourseTutorModalComponent } from './edit-course-tutor-modal/edit-course-tutor-modal.component';
import { TutorService } from '@shared/tutor/tutor.service';
import { Tutor } from '@shared/tutor/tutor-model/tutor.model';
import { Subscription } from 'rxjs/Subscription';
import { DynamicComponentGenerator } from '@shared/dynamic-component-generator';
import { CourseReviewSummary } from '@shared/tutor/reviews/course-review-summary.model';
import { TutorReviewService } from '@shared/tutor/reviews/tutor-review.service';

@Component({
  selector: 'app-courses-user-is-tutoring-list',
  templateUrl: './courses-user-is-tutoring-list.component.html',
  styleUrls: ['./courses-user-is-tutoring-list.component.scss']
})
export class CoursesUserIsTutoringListComponent implements OnInit, OnDestroy {
  @Input() userId: string;
  @Input() courseReviewSummaries: CourseReviewSummary[];
  courses: Course[];

  private dynamicComponentGenerator: DynamicComponentGenerator<EditCourseTutorModalComponent>;
  private coursesListUpdatedSubscription: Subscription;
  private getCourseReviewSummariesSubscription: Subscription;

  constructor(private tutorReviewService: TutorReviewService,
              private tutorService: TutorService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.dynamicComponentGenerator = new DynamicComponentGenerator<EditCourseTutorModalComponent>(
      this.componentFactoryResolver, this.viewContainerRef, EditCourseTutorModalComponent
    );
  }

  updateCourses() {
    this.getCourseReviewSummariesSubscription = this.tutorReviewService.getAllCourseReviewSummariesForTutor(this.userId).subscribe(
      (courseReviewSummaries: CourseReviewSummary[]) => {
        this.courseReviewSummaries = courseReviewSummaries;
      }
    );
  }

  onCourseClick(course: Course) {
    this.tutorService.getTutorInformationForCurrentUserByCourseNumber(course.courseNumber).subscribe(
      (tutor: Tutor) => {
        this.dynamicComponentGenerator.destroyComponentIfExists();
        this.dynamicComponentGenerator.createComponent();
        const instance = this.dynamicComponentGenerator.getComponentInstance();
        instance.tutor = tutor;
        this.coursesListUpdatedSubscription = instance.getCoursesUserIsTutoringListUpdatedObservable().subscribe(
          () => this.updateCourses()
        );
        this.dynamicComponentGenerator.addComponentToDom();
      });
  }

  ngOnDestroy() {
    if (this.getCourseReviewSummariesSubscription) {
      this.getCourseReviewSummariesSubscription.unsubscribe();
    }
  }
}
