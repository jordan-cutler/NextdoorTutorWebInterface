import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserSessionService } from '../../../global/service/user-session.service';
import { EmailTutorService } from './email-tutor.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-email-tutor-modal',
  templateUrl: './email-tutor-modal.component.html',
  styleUrls: ['./email-tutor-modal.component.css']
})
export class EmailTutorModalComponent implements OnInit, AfterViewInit, OnDestroy {
  tutorName: string;
  tutorEmail: string;
  courseNumber: string;
  modalId: string;

  subject: string;
  message: string;

  private emailTutorButtonClickedSubscription: Subscription;

  constructor(private userSessionService: UserSessionService, private emailTutorService: EmailTutorService) { }

  ngOnInit() {
    this.modalId = 'emailTutorModal';

    this.emailTutorButtonClickedSubscription = this.emailTutorService.getEmailTutorModalOpenSubject().subscribe(
      (emailTutorData: EmailTutorData) => {
        this.tutorEmail = emailTutorData.tutorEmail;
        this.courseNumber = emailTutorData.courseNumber;
        this.tutorName = emailTutorData.tutorName;

        this.subject = this.getSubject();
        this.message = this.getMessage();

        this.openModal();
      }
    );

  }

  private getSubject() {
    return `NextdoorTutor - ${this.courseNumber}`;
  }

  private getMessage() {
    const requesterName = this.userSessionService.getCurrentUser().userName;
    const tutorFirstName = this.tutorName.substring(0, this.tutorName.indexOf(' '));

    return `Hi ${tutorFirstName}, \n\n` +
      `Would you meet up to tutor me for ${this.courseNumber}? Please email me back with a time that would work well for you. \n\n` +
      `Best,\n\n` +
      requesterName;
  }

  private openModal() {
    $('#' + this.modalId).modal();
    $('#' + this.modalId).modal('open');
    Materialize.updateTextFields();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.emailTutorButtonClickedSubscription.unsubscribe();
  }

}
