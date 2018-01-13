import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Tutor } from '../../../shared/tutor/tutor-model/tutor.model';

@Component({
  selector: 'app-course-tutor-is-tutoring-modal',
  templateUrl: './course-tutor-is-tutoring-modal.component.html',
  styleUrls: ['./course-tutor-is-tutoring-modal.component.scss']
})
export class CourseTutorIsTutoringModalComponent implements OnInit, AfterViewInit {
  @Input() tutor: Tutor;

  readonly modalId = 'courseSummary';
  private readonly modalSelector = '#' + this.modalId;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $(this.modalSelector).modal();
    $(this.modalSelector).modal('open');
  }

}
