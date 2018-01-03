import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserSessionService } from '../../../shared/user-session/user-session.service';
import { EmailTutorService } from './email-tutor.service';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.service';

@Component({
  selector: 'app-email-tutor-modal',
  templateUrl: './email-tutor-modal.component.html',
  styleUrls: ['./email-tutor-modal.component.css']
})
export class EmailTutorModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') sendEmailForm: NgForm;

  tutorName: string;
  tutorEmail: string;
  courseNumber: string;
  modalId: string;
  modalSelector: string;

  subject: string;
  message: string;

  private emailTutorButtonClickedSubscription: Subscription;

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
              private preloaderService: PreloaderService
  ) { }

  ngOnInit() {
    this.modalId = 'emailTutorModal';
    this.modalSelector = '#' + this.modalId;

    this.emailTutorButtonClickedSubscription = this.emailTutorService.getEmailTutorModalOpenSubject().subscribe(
      (emailTutorData: EmailTutorData) => {
        this.tutorEmail = emailTutorData.tutorEmail;
        this.courseNumber = emailTutorData.courseNumber;
        this.tutorName = emailTutorData.tutorName;

        this.subject = EmailTutorModalComponent.createSubject(this.courseNumber);
        this.message = EmailTutorModalComponent.createMessage(
          this.userSessionService.getCurrentUser().name,
          this.tutorName,
          this.courseNumber
        );

        this.openModal();
      }
    );
  }

  private openModal() {
    Materialize.updateTextFields();
    $(this.modalSelector).modal('open');
    Materialize.updateTextFields();
  }

  onSubmit(event: Event) {
    console.log(this.sendEmailForm);
    if (this.sendEmailForm.invalid) {
      const controls = this.sendEmailForm.form.controls;
      const subjectInvalid = controls.subject.invalid;
      const messageInvalid = controls.message.invalid;
      // TODO: Add some class around these fields that makes them red after the user hits the submit button.
      // TODO: We can probably add a tooltip to the fields instead of having a toast
      if (subjectInvalid && messageInvalid) {
        Materialize.toast('Subject and message must be entered', 3000);
      } else if (subjectInvalid) {
        Materialize.toast('Subject must be entered', 3000);
      } else if (messageInvalid) {
        Materialize.toast('Message must be entered', 3000);
      }
      return false;
    }

    // this.preloaderService.show();
    // setTimeout(() => {
    //   Materialize.toast('Successfully emailed tutor. They will email you back soon if interested.', 3000);
    //   this.sendEmailForm.reset();
    //   $(this.modalSelector).modal('close');
    //   this.preloaderService.hide();
    // }, 10000);

    this.preloaderService.show();
    this.emailTutorService.sendEmailToTutor(this.subject, this.message, this.tutorEmail, this.courseNumber).subscribe(
      (successful: boolean) => {
        if (successful) {
          Materialize.toast('Successfully emailed tutor. They will email you back soon if interested.', 3000);
          this.sendEmailForm.reset();
          $(this.modalSelector).modal('close');
        } else {
          Materialize.toast('Failed to send email. Please try again soon.', 3000);
        }
        this.preloaderService.hide();
      }
    );
  }

  ngAfterViewInit() {
    $(this.modalSelector).modal();
    Materialize.updateTextFields();
  }

  ngOnDestroy() {
    this.emailTutorButtonClickedSubscription.unsubscribe();
  }

}