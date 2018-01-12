import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { CourseService } from '../../shared/course/course.service';
import { Course } from '../../shared/course/course.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-courses-tutor-is-tutoring',
  templateUrl: './courses-tutor-is-tutoring.component.html',
  styleUrls: ['./courses-tutor-is-tutoring.component.scss']
})
export class CoursesTutorIsTutoringComponent implements OnInit, OnDestroy {
  @Input() tutorUser: User;
  courses: Course[];

  getCoursesSubscription: Subscription;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCoursesSubscription = this.courseService.getCoursesUserIsTutoring(this.tutorUser.userId).subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      }
    );
  }

  onCourseClick(course: Course) {

  }

  ngOnDestroy() {
    this.getCoursesSubscription.unsubscribe();
  }

}
