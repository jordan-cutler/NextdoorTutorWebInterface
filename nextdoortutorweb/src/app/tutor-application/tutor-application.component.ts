import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course/course.model';
import { CourseService } from '../shared/course/course.service';
import { Grade } from '../shared/tutor/tutor-model/grade.model';
import { Semester } from '../shared/tutor/tutor-model/semester.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.css']
})
export class TutorApplicationComponent implements OnInit {
  // coursesUserIsNotTutoring: Course[];

  coursesUserIsNotTutoringObservable: Observable<Course[]>;

  validGrades: Grade[];
  validSemesters: string[];
  validYears: number[];

  hourlyRate: string;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.coursesUserIsNotTutoringObservable = this.courseService.getCoursesCurrentUserHasntTutoredBefore();
    this.validGrades = Grade.VALID_GRADES;
    this.validSemesters = Semester.VALID_SEMESTERS;
    this.validYears = Semester.VALID_YEARS;
    this.hourlyRate = '20';
  }

  onSubmit(event: Event) {

  }

}
