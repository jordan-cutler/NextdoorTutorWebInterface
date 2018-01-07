import {
  ChangeDetectorRef,
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
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-courses-user-is-tutoring-list',
  templateUrl: './courses-user-is-tutoring-list.component.html',
  styleUrls: ['./courses-user-is-tutoring-list.component.css']
})
export class CoursesUserIsTutoringListComponent implements OnInit {
  @Input() userId: string;
  courses: Course[];

  private editCourseTutorModalFactory: ComponentFactory<EditCourseTutorModalComponent>;
  private editCourseTutorModalComponent: ComponentRef<EditCourseTutorModalComponent>;

  private coursesListUpdatedSubscription: Subscription;

  constructor(private courseService: CourseService,
              private tutorService: TutorService,
              private userSessionService: UserSessionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.updateCourses();
    this.editCourseTutorModalFactory = this.componentFactoryResolver.resolveComponentFactory(EditCourseTutorModalComponent);
  }

  updateCourses() {
    this.courseService.getCoursesUserIsTutoring(this.userId).subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        this.cd.detectChanges();
      }
    );
  }

  onCourseClick(course: Course) {
    this.tutorService.getTutorInformationForCurrentUserByCourseNumber(course.courseNumber).subscribe(
      (tutor: Tutor) => {
        if (this.editCourseTutorModalComponent) {
          this.editCourseTutorModalComponent.destroy();
        }
        this.editCourseTutorModalComponent = this.viewContainerRef.createComponent(this.editCourseTutorModalFactory);
        this.editCourseTutorModalComponent.instance.tutor = tutor;
        this.coursesListUpdatedSubscription =
          this.editCourseTutorModalComponent.instance.getCoursesUserIsTutoringListUpdatedObservable().subscribe(
            () => {
              this.updateCourses();
            }
          );
        this.editCourseTutorModalComponent.changeDetectorRef.detectChanges();
      });
  }
}
