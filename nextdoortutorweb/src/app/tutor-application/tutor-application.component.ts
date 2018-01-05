import {
  AfterContentChecked, AfterContentInit, AfterViewInit, Component, NgZone, OnChanges, OnDestroy,
  OnInit
} from '@angular/core';
import { Course } from '../shared/course/course.model';
import { CourseService } from '../shared/course/course.service';
import { Grade } from '../shared/tutor/tutor-model/grade.model';
import { Semester } from '../shared/tutor/tutor-model/semester.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from '../shared/preloader/preloader.service';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.css']
})
export class TutorApplicationComponent implements OnInit, AfterViewInit, OnDestroy {
  coursesUserIsNotTutoring: Course[];

  coursesUserIsNotTutoringObservable: Observable<Course[]>;
  private coursesUserIsNotTutoringSubscription: Subscription;
  validGrades: Grade[];
  validSemesters: string[];
  validYears: number[];

  hourlyRate: string;
  defaultCheckedValue = true;
  constructor(private courseService: CourseService, private preloaderService: PreloaderService) { }

  ngOnInit() {
    console.log('ng on init');
    this.coursesUserIsNotTutoringObservable = this.courseService.getCoursesCurrentUserHasntTutoredBefore();
    // this.coursesUserIsNotTutoringSubscription = this.coursesUserIsNotTutoringObservable.subscribe(
    //   (courses: Course[]) => {
    //     this.preloaderService.show();
    //     setTimeout(() => {
    //       this.coursesUserIsNotTutoring = courses;
    //       console.log('finished assigning courses');
    //     }, 1000);
    //
    //     $('select').material_select();
    //
    //     setTimeout(() => {
    //       $('select').material_select();
    //       this.preloaderService.hide();
    //       console.log('called material select');
    //     }, 1500);
    //   }
    // );
    this.validGrades = Grade.VALID_GRADES;
    this.validSemesters = Semester.VALID_SEMESTERS;
    this.validYears = Semester.VALID_YEARS;
    this.hourlyRate = '20';
  }

  onSubmit(event: Event) {

  }

  ngAfterViewInit() {
    $('.material-select').material_select();
    $('input.character-count').characterCounter();
  }

  ngOnDestroy() {
    // this.coursesUserIsNotTutoringSubscription.unsubscribe();
  }

}
