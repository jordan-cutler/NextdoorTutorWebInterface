import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Tutor } from '../../../shared/tutor/tutor-model/tutor.model';
import { TutorService } from '../../../shared/tutor/tutor.service';
import { PreloaderService } from '../../../shared/preloader/preloader.service';

@Component({
  selector: 'app-edit-course-tutor-modal',
  templateUrl: './edit-course-tutor-modal.component.html',
  styleUrls: ['./edit-course-tutor-modal.component.css']
})
export class EditCourseTutorModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tutor: Tutor;
  readonly modalId = 'editCourseTutorModal';
  readonly modalSelector = '#' + this.modalId;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.modalSelector).modal();
    $(this.modalSelector).modal('open');
    setTimeout(Materialize.updateTextFields, 200);
  }

  onSubmit(event: Event) {

  }

  ngOnDestroy() {
  }

}
