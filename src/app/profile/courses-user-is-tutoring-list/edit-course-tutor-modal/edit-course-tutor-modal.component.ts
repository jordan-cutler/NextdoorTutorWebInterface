import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tutor } from '@shared/tutor/tutor-model/tutor.model';
import { NgForm } from '@angular/forms';
import { TutorService } from '@shared/tutor/tutor.service';
import { Subject } from 'rxjs/Subject';
import { PreloaderService } from '@app/core/preloader/preloader.service';
import { TutorUpdateData } from '@shared/tutor/TutorUpdateData';
import { Observable } from 'rxjs/Observable';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-edit-course-tutor-modal',
  templateUrl: './edit-course-tutor-modal.component.html',
  styleUrls: ['./edit-course-tutor-modal.component.scss']
})
export class EditCourseTutorModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') changeTutorInfoForm: NgForm;
  @Input() tutor: Tutor;
  courseNumber: string;

  readonly modalId = 'editCourseTutorModal';
  private readonly modalSelector = '#' + this.modalId;

  private coursesUserIsTutoringListUpdatedSubject = new Subject();
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private tutorService: TutorService,
              private preloaderService: PreloaderService) {
  }

  ngOnInit() {
    this.courseNumber = this.tutor.course.courseNumber;
  }

  ngAfterViewInit() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout(Materialize.updateTextFields, 200);
  }

  onSubmit(event: Event) {
    const tutorUpdateData: TutorUpdateData = {
      courseNumber: this.courseNumber,
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
          Materialize.toast('Successfully edited your tutor profile for ' + this.courseNumber, 2500);
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
    this.tutorService.removeCurrentUserFromCourseTutor(this.courseNumber).subscribe(
      (successful: boolean) => {
        this.preloaderService.hide();
        if (successful) {
          this.coursesUserIsTutoringListUpdatedSubject.next();
          Materialize.toast('Successfully removed you from tutoring for ' + this.courseNumber + '.', 3000);
        } else {
          Materialize.toast('Failed to remove you from tutoring for ' + this.courseNumber + '. Try again soon', 3000);
        }
        $(this.modalSelector).modal('close');
      },
      (error) => {
        this.preloaderService.hide();
        Materialize.toast('Failed to remove you from tutoring for ' + this.courseNumber + '. Try again soon', 3000);
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
