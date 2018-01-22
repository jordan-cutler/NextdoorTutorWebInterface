import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { UserSessionService } from '../../../shared/user-session/user-session.service';
import { EmailTutorService } from './email-tutor.service';
import { NgForm } from '@angular/forms';
import { PreloaderService } from '../../../core/preloader/preloader.service';
import { DataNeededToFormEmailToTutor } from './DataNeededToFormEmailToTutor';
import { FormValidity } from '../../../shared/FormValidity';
import { MaterializeAction } from 'angular2-materialize';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-tutor-modal',
  templateUrl: './email-tutor-modal.component.html',
  styleUrls: ['./email-tutor-modal.component.scss']
})
export class EmailTutorModalComponent implements OnInit, AfterViewInit {
  @ViewChild('form') sendEmailForm: NgForm;
  @ViewChild('messageInputField') messageInputField: ElementRef;

  @Input() emailTutorData: DataNeededToFormEmailToTutor;
  tutorName: string;
  tutorEmail: string;
  courseNumber: string;
  modalId: string;

  subject: string;
  message: string;
  modalActions = new EventEmitter<string|MaterializeAction>();

  private static createSubject(courseNumber: string) {
    return `NextdoorTutor - ${courseNumber}`;
  }

  private static createMessage(requesterName: string, tutorName: string, courseNumber: string) {
    const tutorFirstName = tutorName.substring(0, tutorName.indexOf(' '));

    return `Hi ${tutorFirstName}, \n\n` +
      `Would you meet up to tutor me for ${courseNumber}? Please email me back with a time that would work well for you. \n\n` +
      `Best,\n\n` +
      requesterName;
  }

  constructor(private userSessionService: UserSessionService,
              private emailTutorService: EmailTutorService,
              private preloaderService: PreloaderService) {
  }

  ngOnInit() {
    this.modalId = 'emailTutorModal';

    this.tutorEmail = this.emailTutorData.tutorEmail;
    this.courseNumber = this.emailTutorData.courseNumber;
    this.tutorName = this.emailTutorData.tutorName;

    this.subject = EmailTutorModalComponent.createSubject(this.courseNumber);
    this.message = EmailTutorModalComponent.createMessage(
      this.userSessionService.getCurrentUser().name,
      this.tutorName,
      this.courseNumber
    );
  }

  ngAfterViewInit() {
    this.openModal();
  }

  private openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  onSubmit(event: Event) {
    const valid = this.giveUserFeedbackOnFormInputsIfNeeded(this.sendEmailForm).valid;
    if (!valid) {
      return false;
    }

    this.emailTutor(this.subject, this.message, this.tutorEmail, this.courseNumber);
  }

  private giveUserFeedbackOnFormInputsIfNeeded(sendEmailForm: NgForm): FormValidity {
    if (sendEmailForm.invalid) {
      const controls = this.sendEmailForm.form.controls;
      const subjectInvalid = controls['subject'].invalid;
      const messageInvalid = controls['message'].invalid;
      // TODO: Add some class around these fields that makes them red after the user hits the submit button.
      // TODO: We can probably add a tooltip to the fields instead of having a toast
      if (subjectInvalid && messageInvalid) {
        Materialize.toast('Subject and message must be entered', 3000);
      } else if (subjectInvalid) {
        Materialize.toast('Subject must be entered', 3000);
      } else if (messageInvalid) {
        Materialize.toast('Message must be entered', 3000);
      }
      return { valid: false };
    } else {
      return { valid: true };
    }
  }

  private emailTutor(subject: string, message: string, tutorEmail: string, courseNumber: string) {
    this.preloaderService.show();
    this.emailTutorService.sendEmailToTutor(subject, message, tutorEmail, courseNumber).subscribe(
      (successful: boolean) => {
        if (successful) {
          Materialize.toast('Successfully emailed tutor. They will email you back soon if interested.', 3000);
          this.sendEmailForm.reset();
          this.modalActions.emit({action: 'modal', params: ['close']});
        } else {
          Materialize.toast('Failed to send email. Please try again soon.', 3000);
        }
        this.preloaderService.hide();
      },
      (error: HttpErrorResponse) => {
        this.preloaderService.hide();
        const userEmailLimitDescription =
          'You have reached the maximum number of email requests you can make per day. You can send more tomorrow.';
        const applicationEmailLimitDescription =
          'NextdoorTutor has reached their limit for sending emails for the day. Users will be able to send more tomorrow.';
        if (error.error.description === userEmailLimitDescription) {
          Materialize.toast(userEmailLimitDescription + ' In the meantime, you may email them directly at ' + tutorEmail, 7000);
        } else if (error.error.description === applicationEmailLimitDescription) {
          Materialize.toast(
            applicationEmailLimitDescription +
            ' We apologize for any inconvenience. You may send an email directly to the tutor at ' + tutorEmail, 8000
          );
        } else {
          Materialize.toast('Failed to send email. Please try again soon.', 3000);
        }
      }
    );
  }
}

