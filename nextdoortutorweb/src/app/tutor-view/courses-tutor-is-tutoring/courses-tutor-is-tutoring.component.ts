import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { CourseService } from '../../shared/course/course.service';
import { Course } from '../../shared/course/course.model';
import { Subscription } from 'rxjs/Subscription';
import { DynamicComponentGenerator } from '../../shared/dynamic-component-generator';
import { CourseTutorIsTutoringModalComponent } from './course-tutor-is-tutoring-modal/course-tutor-is-tutoring-modal.component';
import { Tutor } from '../../shared/tutor/tutor-model/tutor.model';

@Component({
  selector: 'app-courses-tutor-is-tutoring',
  templateUrl: './courses-tutor-is-tutoring.component.html',
  styleUrls: ['./courses-tutor-is-tutoring.component.scss']
})
export class CoursesTutorIsTutoringComponent implements OnInit, OnDestroy {
  @Input() tutor: Tutor;
  courses: Course[];

  getCoursesSubscription: Subscription;
  dynamicCourseTutorIsTutoringModalComponentGenerator: DynamicComponentGenerator<CourseTutorIsTutoringModalComponent>;

  constructor(private courseService: CourseService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getCoursesSubscription = this.courseService.getCoursesUserIsTutoring(this.tutor.user.userId).subscribe(
      (courses: Course[]) => this.courses = courses
    );
    this.dynamicCourseTutorIsTutoringModalComponentGenerator = new DynamicComponentGenerator<CourseTutorIsTutoringModalComponent>(
      this.componentFactoryResolver, this.viewContainerRef, CourseTutorIsTutoringModalComponent
    );
  }

  onCourseClick(course: Course) {
    this.dynamicCourseTutorIsTutoringModalComponentGenerator.destroyComponentIfExists();
    this.dynamicCourseTutorIsTutoringModalComponentGenerator.createComponent();
    this.dynamicCourseTutorIsTutoringModalComponentGenerator.getComponentInstance().tutor = this.tutor;
    this.dynamicCourseTutorIsTutoringModalComponentGenerator.addComponentToDom();
  }

  ngOnDestroy() {
    this.getCoursesSubscription.unsubscribe();
  }

}
