import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tutor } from '../../../shared/tutor/tutor-model/tutor.model';
import { NgForm } from '@angular/forms';
import { TutorService } from '../../../shared/tutor/tutor.service';
import { Subject } from 'rxjs/Subject';
import { PreloaderService } from '../../../shared/preloader/preloader.service';

@Component({
  selector: 'app-edit-course-tutor-modal',
  templateUrl: './edit-course-tutor-modal.component.html',
  styleUrls: ['./edit-course-tutor-modal.component.css']
})
export class EditCourseTutorModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') changeTutorInfoForm: NgForm;
  @Input() tutor: Tutor;

  readonly modalId = 'editCourseTutorModal';
  readonly modalSelector = '#' + this.modalId;

  coursesUserIsTutoringListUpdatedSubject = new Subject();

  constructor(private tutorService: TutorService,
              private preloaderService: PreloaderService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.modalSelector).modal();
    $(this.modalSelector).modal('open');
    setTimeout(Materialize.updateTextFields, 200);
  }

  onSubmit(event: Event) {

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

  ngOnDestroy() {
  }

}
