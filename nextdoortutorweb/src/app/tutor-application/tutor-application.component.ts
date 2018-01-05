import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../shared/course/course.model';
import { CourseService } from '../shared/course/course.service';
import { Grade } from '../shared/tutor/tutor-model/grade.model';
import { Semester } from '../shared/tutor/tutor-model/semester.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.css']
})
export class TutorApplicationComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  coursesUserIsNotTutoring: Course[];

  coursesUserIsNotTutoringObservable: Observable<Course[]>;
  private coursesUserIsNotTutoringSubscription: Subscription;
  validGrades: Grade[];
  validSemesters: string[];
  validYears: number[];

  hourlyRate: string;
  defaultCheckedValue = true;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.coursesUserIsNotTutoringObservable = this.courseService.getCoursesCurrentUserHasntTutoredBefore();
    this.coursesUserIsNotTutoringSubscription = this.coursesUserIsNotTutoringObservable.subscribe(
      (courses: Course[]) => {
        this.coursesUserIsNotTutoring = courses;
        $('select').material_select();
        setTimeout(() => {
          $('select').material_select();
        }, 500);
      }
    );
    this.validGrades = Grade.VALID_GRADES;
    this.validSemesters = Semester.VALID_SEMESTERS;
    this.validYears = Semester.VALID_YEARS;
    this.hourlyRate = '20';
  }

  onSubmit(event: Event) {

  }

  ngAfterViewInit() {
    $('select').material_select();
    $('input.character-count').characterCounter();
  }

  ngOnChanges() {
    console.log('on changes called');
    $('select').material_select();
  }

  ngOnDestroy() {
    this.coursesUserIsNotTutoringSubscription.unsubscribe();
  }

}
