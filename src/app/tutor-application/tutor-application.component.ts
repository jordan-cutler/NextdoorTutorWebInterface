import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Course } from '@shared/course/course.model';
import { CourseService } from '@shared/course/course.service';
import { Grade } from '@shared/tutor/tutor-model/grade.model';
import { Semester } from '@shared/tutor/tutor-model/semester.model';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from '../core/preloader/preloader.service';
import { NgForm } from '@angular/forms';
import { TutorService } from '@shared/tutor/tutor.service';
import { Tutor } from '@shared/tutor/tutor-model/tutor.model';
import { UserSessionService } from '@shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { ApplicationGlobals } from '@shared/ApplicationGlobals';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.scss']
})
export class TutorApplicationComponent implements OnInit, OnDestroy {
  @ViewChild('applicationForm') applicationForm: NgForm;
  coursesUserIsNotTutoring: Course[];

  readonly courseDropdownId = 'course';
  readonly gradeDropdownId = 'grade';
  readonly termDropdownId = 'term';
  readonly yearDropdownId = 'year';

  readonly minHourlyRate = 0;
  readonly maxHourlyRate = 50;

  private coursesUserIsNotTutoringSubscription: Subscription;
  validGrades: Grade[];
  validTerms: string[];
  validYears: number[];

  hourlyRate: string;
  defaultCheckedValue = true;
  selectedGrade: string;
  selectedCourse: string;
  defaultCourse: string;

  constructor(private courseService: CourseService,
              private userSessionService: UserSessionService,
              private preloaderService: PreloaderService,
              private tutorService: TutorService,
              private router: Router) {
  }

  ngOnInit() {
    this.coursesUserIsNotTutoringSubscription = this.courseService.getCoursesCurrentUserHasntTutoredBefore().subscribe(
      (courses: Course[]) => {
        this.coursesUserIsNotTutoring = courses;
      }
    );
    this.validGrades = Grade.VALID_GRADES;
    this.validTerms = Semester.VALID_TERMS;
    this.validYears = Semester.VALID_YEARS;
    this.hourlyRate = '20';
    this.selectedGrade = 'B+';
    this.defaultCourse = 'N/A';
    this.selectedCourse = this.defaultCourse;
  }

  onSubmit(event: Event) {
    const controls = this.applicationForm.form.controls;
    const course: Course = controls['course'].value;
    let grade = controls['grade'].value;
    const hasTakenCourse: boolean = controls['hasTakenCourseCheckbox'].value;
    const hourlyRate = controls['hourlyRate'].value;
    let instructor = controls['instructor'].value;
    const pastExperience = controls['pastExperience'].value;
    const notes = controls['notes'].value;
    const term = controls['whenPersonTookCourse']['controls']['term'].value;
    const year = controls['whenPersonTookCourse']['controls']['year'].value;
    let semester = new Semester(term, year);
    const instructorNameWhoEndorsed: string = null;

    let invalid = false;
    if (hasTakenCourse) {
      if (!Grade.isGradeValid(new Grade(grade))) {
        Materialize.toast('Grade is invalid. Please select an option from the dropdown', 3000);
        invalid = true;
      }
      if (!Semester.isTermValid(term)) {
        Materialize.toast('Term taken is invalid. Please select an option from the dropdown', 3000);
        invalid = true;
      }
      if (!Semester.isYearValid(year)) {
        Materialize.toast('Year taken is invalid. Please select an option from the dropdown', 3000);
        invalid = true;
      }
      if (!instructor) {
        Materialize.toast('Let us know who your professor was before submitting.', 3000);
        invalid = true;
      }
    } else {
      instructor = null;
      grade = null;
      semester = null;
    }

    if (hourlyRate < this.minHourlyRate || hourlyRate > this.maxHourlyRate) {
      Materialize.toast('Invalid hourly rate. Only set a value between ' + this.minHourlyRate + ' and ' + this.maxHourlyRate, 4000);
      invalid = true;
    }

    if (invalid) {
      return false;
    }

    const currentUser = this.userSessionService.getCurrentUser();
    const tutor = new Tutor(
      currentUser, hourlyRate, course, grade, instructor,
      pastExperience, notes, semester, hasTakenCourse, instructorNameWhoEndorsed
    );
    this.preloaderService.show();
    this.tutorService.addTutor(tutor).subscribe(
      (successful: boolean) => {
        this.preloaderService.hide();
        if (successful) {
          this.router.navigate([ApplicationGlobals.FIND_TUTOR_ROUTE]); // this essentially is acting as a clear form
          Materialize.toast('Thanks for becoming a ' + course.courseNumber + ' tutor! ' +
            'You can find yourself on the find a tutor page now.', 4000);
        } else {
          Materialize.toast('Could not sign you up at the moment. Please try again later.', 3000);
        }
      },
      (error) => {
        this.preloaderService.hide();
        Materialize.toast('Could not sign you up at the moment. Please try again later.', 3000);
      }
    );
  }

  ngOnDestroy() {
    this.coursesUserIsNotTutoringSubscription.unsubscribe();
  }

}
