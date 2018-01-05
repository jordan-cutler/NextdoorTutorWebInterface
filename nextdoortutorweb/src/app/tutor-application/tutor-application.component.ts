import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Course } from '../shared/course/course.model';
import { CourseService } from '../shared/course/course.service';
import { Grade } from '../shared/tutor/tutor-model/grade.model';
import { Semester } from '../shared/tutor/tutor-model/semester.model';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from '../shared/preloader/preloader.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.css']
})
export class TutorApplicationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('applicationForm') applicationForm: NgForm;
  coursesUserIsNotTutoring: Course[];

  private coursesUserIsNotTutoringSubscription: Subscription;
  validGrades: Grade[];
  validSemesters: string[];
  validYears: number[];

  hourlyRate: string;
  defaultCheckedValue = true;
  defaultGrade: string;

  constructor(private courseService: CourseService, private preloaderService: PreloaderService) {
  }

  ngOnInit() {
    this.coursesUserIsNotTutoringSubscription = this.courseService.getCoursesCurrentUserHasntTutoredBefore().subscribe(
      (courses: Course[]) => {
        this.coursesUserIsNotTutoring = courses;
        this.setUpIntervalToCheckForCoursesUpdatedOnDomEvent(courses.length - 1);
      }
    );
    this.validGrades = Grade.VALID_GRADES;
    this.validSemesters = Semester.VALID_SEMESTERS;
    this.validYears = Semester.VALID_YEARS;
    this.hourlyRate = '20';
    this.defaultGrade = 'B+';
  }

  onSubmit(event: Event) {
    
  }

  setUpIntervalToCheckForCoursesUpdatedOnDomEvent(indexOfLastElement: number) {
    this.preloaderService.show();
    const intervalReference = setInterval(() => {
      if ($('#course').find('option[value=' + indexOfLastElement + ']').length) {
        $('select').material_select();
        this.preloaderService.hide();
        clearInterval(intervalReference);
      }
    }, 200);
  }

  ngAfterViewInit() {
    $('select').material_select();
    $('input.character-count').characterCounter();
  }

  ngOnDestroy() {
    this.coursesUserIsNotTutoringSubscription.unsubscribe();
  }

}
