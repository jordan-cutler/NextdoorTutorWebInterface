import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tutor } from '../../../shared/tutor/tutor-model/tutor.model';
import { NgForm } from '@angular/forms';
import { TutorService } from '../../../shared/tutor/tutor.service';
import { Subject } from 'rxjs/Subject';
import { PreloaderService } from '../../../core/preloader/preloader.service';
import { TutorUpdateData } from '../../../shared/tutor/TutorUpdateData';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-course-tutor-modal',
  templateUrl: './edit-course-tutor-modal.component.html',
  styleUrls: ['./edit-course-tutor-modal.component.css']
})
export class EditCourseTutorModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') changeTutorInfoForm: NgForm;
  @Input() tutor: Tutor;

  readonly modalId = 'editCourseTutorModal';
  private readonly modalSelector = '#' + this.modalId;

  private coursesUserIsTutoringListUpdatedSubject = new Subject();

  constructor(private tutorService: TutorService,
              private preloaderService: PreloaderService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.modalSelector).modal();
    $(this.modalSelector).modal('open');
    $('input.character-count').characterCounter();
    setTimeout(Materialize.updateTextFields, 200);
  }

  onSubmit(event: Event) {
    const tutorUpdateData: TutorUpdateData = {
      courseNumber: this.tutor.courseNumber,
      hourlyRate: +this.tutor.hourlyRate,
      pastExperience: this.tutor.pastExperience,
      notes: this.tutor.notes
    };
    this.preloaderService.show();
    this.tutorService.updateTutorAsCurrentUser(tutorUpdateData).subscribe(
      (successful: boolean) => {
        this.preloaderService.hide();
        if (successful) {
          this.coursesUserIsTutoringListUpdatedSubject.next();
          Materialize.toast('Successfully edited your tutor profile for ' + this.tutor.courseNumber, 2500);
        } else {
          Materialize.toast('Failed to update your tutor profile. Try again soon.', 2500);
        }
      },
      (error) => {
        this.preloaderService.hide();
        Materialize.toast('Failed to update your tutor profile. Try again soon.', 2500);
      }
    );
  }

  onStopTutoringCourseClick() {
    this.preloaderService.show();
    this.tutorService.removeCurrentUserFromCourseTutor(this.tutor.courseNumber).subscribe(
      (successful: boolean) => {
        this.preloaderService.hide();
        if (successful) {
          this.coursesUserIsTutoringListUpdatedSubject.next();
          Materialize.toast('Successfully removed you from tutoring for ' + this.tutor.courseNumber + '.', 3000);
        } else {
          Materialize.toast('Failed to remove you from tutoring for ' + this.tutor.courseNumber + '. Try again soon', 3000);
        }
        $(this.modalSelector).modal('close');
      },
      (error) => {
        this.preloaderService.hide();
        Materialize.toast('Failed to remove you from tutoring for ' + this.tutor.courseNumber + '. Try again soon', 3000);
        $(this.modalSelector).modal('close');
      }
    );
  }

  getCoursesUserIsTutoringListUpdatedObservable(): Observable<any> {
    return this.coursesUserIsTutoringListUpdatedSubject.asObservable();
  }

  ngOnDestroy() {
  }

}
