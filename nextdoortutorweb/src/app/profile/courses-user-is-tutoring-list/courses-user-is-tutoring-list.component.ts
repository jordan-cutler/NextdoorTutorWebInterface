import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../shared/course/course.model';
import { CourseService } from '../../shared/course/course.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-courses-user-is-tutoring-list',
  templateUrl: './courses-user-is-tutoring-list.component.html',
  styleUrls: ['./courses-user-is-tutoring-list.component.css']
})
export class CoursesUserIsTutoringListComponent implements OnInit {
  @Input() userId: string;
  coursesObservable: Observable<Course[]>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.coursesObservable = this.courseService.getCoursesUserIsTutoring(this.userId);
  }

}
