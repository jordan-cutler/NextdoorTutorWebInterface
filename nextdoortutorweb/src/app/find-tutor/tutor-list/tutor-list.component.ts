import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Tutor } from '../../shared/tutor/tutor-model/tutor.model';
import { ImageService } from '../../shared/image.service';
import { UserSessionService } from '../../shared/user-session/user-session.service';
import { EmailTutorService } from './email-tutor-modal/email-tutor.service';
import { EmailTutorData } from './email-tutor-modal/EmailTutorData';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit, AfterViewInit {
  @Input() tutors: Tutor[];

  currentUserId: string;
  currentUserSessionToken: string;

  constructor(public imageService: ImageService,
              public userSessionService: UserSessionService,
              private emailTutorService: EmailTutorService) {
  }

  ngOnInit() {
    this.currentUserSessionToken = this.userSessionService.getCurrentUserSession().getSessionToken();
    this.currentUserId = this.userSessionService.getCurrentUser().userId;
  }

  ngAfterViewInit() {
    $('.collapsible').collapsible();
    $('input.character-count').characterCounter();
    $('textarea.character-count').characterCounter();
  }

  onBookTutor(event: Event, email: string, courseNumber: string, name: string) {
    event.preventDefault();
    event.stopPropagation();
    const emailTutorData: EmailTutorData = {
      tutorEmail: email,
      courseNumber: courseNumber,
      tutorName: name
    };
    this.emailTutorService.getEmailTutorModalOpenSubject().next(emailTutorData);
  }
}
