import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit,
  ViewContainerRef
} from '@angular/core';
import { Course } from '../../shared/course/course.model';
import { CourseService } from '../../shared/course/course.service';
import { Observable } from 'rxjs/Observable';
import { UserSessionService } from '../../shared/user-session/user-session.service';
import { EditCourseTutorModalComponent } from './edit-course-tutor-modal/edit-course-tutor-modal.component';
import { TutorService } from '../../shared/tutor/tutor.service';
import { Tutor } from '../../shared/tutor/tutor-model/tutor.model';

@Component({
  selector: 'app-courses-user-is-tutoring-list',
  templateUrl: './courses-user-is-tutoring-list.component.html',
  styleUrls: ['./courses-user-is-tutoring-list.component.css']
})
export class CoursesUserIsTutoringListComponent implements OnInit {
  @Input() userId: string;
  coursesObservable: Observable<Course[]>;

  editCourseTutorModalFactory: ComponentFactory<EditCourseTutorModalComponent>;
  editCourseTutorModalComponent: ComponentRef<EditCourseTutorModalComponent>;

  constructor(private courseService: CourseService,
              private tutorService: TutorService,
              private userSessionService: UserSessionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.coursesObservable = this.courseService.getCoursesUserIsTutoring(this.userId);
    this.editCourseTutorModalFactory = this.componentFactoryResolver.resolveComponentFactory(EditCourseTutorModalComponent);
  }

  onCourseClick(course: Course) {
    this.tutorService.getTutorById(this.userSessionService.getCurrentUser().userId, course.courseNumber).subscribe(
      (tutor: Tutor) => {
        if (this.editCourseTutorModalComponent) {
          this.editCourseTutorModalComponent.destroy();
        }
        this.editCourseTutorModalComponent = this.viewContainerRef.createComponent(this.editCourseTutorModalFactory);
        this.editCourseTutorModalComponent.instance.tutor = tutor;
        this.editCourseTutorModalComponent.changeDetectorRef.detectChanges();
      });
  }
}
