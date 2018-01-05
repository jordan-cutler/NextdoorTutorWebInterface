import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../shared/course/course.service';
import { Course } from '../shared/course/course.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { TutorService } from '../shared/tutor/tutor.service';
import { Tutor } from '../shared/tutor/tutor-model/tutor.model';

@Component({
  selector: 'app-find-tutor',
  templateUrl: './find-tutor.component.html',
  styleUrls: ['./find-tutor.component.css']
})
export class FindTutorComponent implements OnInit, OnDestroy {
  private coursesWithTutorsSubscription: Subscription;
  courses: Course[];

  private tutorsForSelectedCourseSubscription: Subscription;
  selectedCourseNumber: string;
  tutorsForSelectedCourse: Tutor[];

  constructor(private courseService: CourseService, private tutorService: TutorService) { }

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
    this.tutorsForSelectedCourseSubscription = this.tutorService.getTutorsForCourse(courseNumber).subscribe(
      (tutors: Tutor[]) => {
        this.tutorsForSelectedCourse = tutors;
      }
    );
  }

  ngOnDestroy() {
    this.coursesWithTutorsSubscription.unsubscribe();

    if (this.tutorsForSelectedCourseSubscription) {
      this.tutorsForSelectedCourseSubscription.unsubscribe();
    }
  }
}
