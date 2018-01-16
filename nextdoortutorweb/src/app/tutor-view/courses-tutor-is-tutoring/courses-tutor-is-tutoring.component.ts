import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { DynamicComponentGenerator } from '../../shared/dynamic-component-generator';
import { TutorReviewModalComponent } from './tutor-review-modal/tutor-review-modal.component';
import { BasicTutorInfo } from '../../shared/tutor/reviews/basic-tutor-info.model';
import { CourseReviewSummary } from '../../shared/tutor/reviews/course-review-summary.model';
import { User } from '../../shared/user/user-model/user.model';
import { UserSessionService } from '../../shared/user-session/user-session.service';

@Component({
  selector: 'app-courses-tutor-is-tutoring',
  templateUrl: './courses-tutor-is-tutoring.component.html',
  styleUrls: ['./courses-tutor-is-tutoring.component.scss']
})
export class CoursesTutorIsTutoringComponent implements OnInit {
  @Input() basicTutorInfo: BasicTutorInfo;
  currentUser: User;
  courses: string[];

  dynamicCourseTutorIsTutoringModalComponentGenerator: DynamicComponentGenerator<TutorReviewModalComponent>;

  constructor(private userSessionService: UserSessionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.currentUser = this.userSessionService.getCurrentUser();

    this.courses = this.basicTutorInfo.courseReviewSummaries.map(
      (courseReviewSummary: CourseReviewSummary) => courseReviewSummary.courseNumber
    );
    this.dynamicCourseTutorIsTutoringModalComponentGenerator = new DynamicComponentGenerator<TutorReviewModalComponent>(
      this.componentFactoryResolver, this.viewContainerRef, TutorReviewModalComponent
    );
  }

  onCourseClick(courseNumber: string) {
    this.dynamicCourseTutorIsTutoringModalComponentGenerator.destroyComponentIfExists();
    this.dynamicCourseTutorIsTutoringModalComponentGenerator.createComponent();
    const instance = this.dynamicCourseTutorIsTutoringModalComponentGenerator.getComponentInstance()
    instance.tutorUser = this.basicTutorInfo.user;
    instance.courseNumber = courseNumber;
    this.dynamicCourseTutorIsTutoringModalComponentGenerator.addComponentToDom();
  }


}
