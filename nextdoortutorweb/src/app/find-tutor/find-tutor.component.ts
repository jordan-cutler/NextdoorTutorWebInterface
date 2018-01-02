import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../course/course.service';
import { Course } from '../course/course.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-find-tutor',
  templateUrl: './find-tutor.component.html',
  styleUrls: ['./find-tutor.component.css']
})
export class FindTutorComponent implements OnInit, OnDestroy {
  coursesWithTutorsSubscription: Subscription;
  courses: Course[];
  
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.coursesWithTutorsSubscription = this.courseService.getCoursesWithTutors().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      }
    );
  }

  getCourses(): Observable<Course[]> {
    return this.courseService.getCoursesWithTutors();
  }

  initializeSearchBar(courses: Course[]) {
    
  }

  ngOnDestroy() {
    this.coursesWithTutorsSubscription.unsubscribe();
  }
}
