import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Course } from '../shared/course/course.model';
import { CourseService } from '../shared/course/course.service';
import { Grade } from '../shared/tutor/tutor-model/grade.model';
import { Semester } from '../shared/tutor/tutor-model/semester.model';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from '../shared/preloader/preloader.service';
import { NgForm } from '@angular/forms';
import { TutorService } from '../shared/tutor/tutor.service';
import { Tutor } from '../shared/tutor/tutor-model/tutor.model';
import { UserSessionService } from '../shared/user-session/user-session.service';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.css']
})
export class TutorApplicationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('applicationForm') applicationForm: NgForm;
  coursesUserIsNotTutoring: Course[];

  readonly courseDropdownId = 'course';
  readonly courseDropdownSelector = '#' + this.courseDropdownId;
  readonly gradeDropdownId = 'grade';
  readonly gradeDropdownSelector = '#' + this.gradeDropdownId;
  readonly termDropdownId = 'term';
  readonly termDropdownSelector = '#' + this.termDropdownId;
  readonly yearDropdownId = 'year';
  readonly yearDropdownSelector = '#' + this.yearDropdownId;

  readonly minHourlyRate = 0;
  readonly maxHourlyRate = 50;

  private coursesUserIsNotTutoringSubscription: Subscription;
  validGrades: Grade[];
  validTerms: string[];
  validYears: number[];

  hourlyRate: string;
  defaultCheckedValue = true;
  defaultGrade: string;

  constructor(private courseService: CourseService,
              private userSessionService: UserSessionService,
              private preloaderService: PreloaderService,
              private tutorService: TutorService) {
  }

  ngOnInit() {
    this.coursesUserIsNotTutoringSubscription = this.courseService.getCoursesCurrentUserHasntTutoredBefore().subscribe(
      (courses: Course[]) => {
        this.coursesUserIsNotTutoring = courses;
        this.setUpIntervalToCheckForCoursesUpdatedOnDomEvent(courses.length - 1);
      }
    );
    this.validGrades = Grade.VALID_GRADES;
    this.validTerms = Semester.VALID_TERMS;
    this.validYears = Semester.VALID_YEARS;
    this.hourlyRate = '20';
    this.defaultGrade = 'B+';
  }

  onSubmit(event: Event) {
    console.log(this.applicationForm);
    const selectedOptionSelector = 'option:selected';
    const courseNumber = $(this.courseDropdownSelector).find(selectedOptionSelector).text().split(" ")[0];
    const hourlyRate: number = +this.applicationForm.value.hourlyRate;
    const hasTakenCourse: boolean = this.applicationForm.value.hasTakenCourseCheckbox;
    const grade = $(this.gradeDropdownSelector).find(selectedOptionSelector).text();
    const term = $(this.termDropdownSelector).find(selectedOptionSelector).text();
    const year: number = +$(this.yearDropdownSelector).find(selectedOptionSelector).text();
    const semester = new Semester(term, year);
    const instructor = this.applicationForm.value.instructor;
    const pastExperience = this.applicationForm.value.pastExperience;
    const notes = this.applicationForm.value.notes;

    let invalid = false;
    console.log('hastaken = ' + hasTakenCourse);
    console.log('true === hasTakenCourse = ' + (true === hasTakenCourse));
    if (hasTakenCourse) {
      console.log('hello1');
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
        console.log('hello2');
        Materialize.toast('Let us know who your professor was before submitting.', 3000);
        invalid = true;
      }
    }

    if (hourlyRate < this.minHourlyRate || hourlyRate > this.maxHourlyRate) {
      Materialize.toast('Invalid hourly rate. Only set a value between ' + this.minHourlyRate + ' and ' + this.maxHourlyRate, 4000);
      invalid = true;
    }
    console.log('invalid = ' + invalid);

    if (invalid) {
      console.log('made it in return false');
      return false;
    }

    console.log('made it past invalid');

    const currentUser = this.userSessionService.getCurrentUser();
    const tutor = new Tutor(
      currentUser, hourlyRate, courseNumber, grade, instructor,
      pastExperience, notes, semester, hasTakenCourse
    );
    console.log(tutor.grade);
    this.preloaderService.show();
    this.tutorService.addTutor(tutor).subscribe(
      (successful: boolean) => {
        this.preloaderService.hide();
        if (successful) {
          Materialize.toast('Thanks for becoming a ' + courseNumber + ' tutor! You can find yourself on the find a tutor page.', 4000);
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

  setUpIntervalToCheckForCoursesUpdatedOnDomEvent(indexOfLastElement: number) {
    this.preloaderService.show();
    const intervalReference = setInterval(() => {
      if ($(this.courseDropdownSelector).find('option[value=' + indexOfLastElement + ']').length) {
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
