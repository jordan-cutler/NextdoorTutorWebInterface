import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserSessionService } from '../../../global/service/user-session.service';

@Component({
  selector: 'app-email-tutor-modal',
  templateUrl: './email-tutor-modal.component.html',
  styleUrls: ['./email-tutor-modal.component.css']
})
export class EmailTutorModalComponent implements OnInit, AfterViewInit {
  @Input() tutorName: string;
  @Input() tutorEmail: string;
  @Input() courseNumber: string;
  modalId: string;

  subject: string;
  message: string;
  constructor(private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.modalId = 'emailTutorModal';
    this.subject = `NextdoorTutor - ${this.courseNumber}`;
    const requesterName = this.userSessionService.getCurrentUser().userName;
    const tutorFirstName = this.tutorName.substring(0, this.tutorName.indexOf(' '));
    this.message =
      `Hi ${tutorFirstName}, \n\n` +
      `Would you meet up to tutor me for ${this.courseNumber}? Please email me back with a time that would work well for you. \n\n` +
      `Best,\n\n` +
      requesterName;
  }

  ngAfterViewInit() {
    $('#' + this.modalId).modal();
    $('#' + this.modalId).modal('open');
    Materialize.updateTextFields();
  }

}
