import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Tutor } from '../../tutor/tutor.model';
import { ImageService } from '../../global/service/image.service';
import { UserSessionService } from '../../global/service/user-session.service';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit, AfterViewInit {
  @Input() tutors: Tutor[];

  currentUserId: string;
  currentUserSessionToken: string;

  contactTutorEmail: string;
  contactTutorCourseNumber: string;
  contactTutorName: string;

  constructor(public imageService: ImageService, public userSessionService: UserSessionService) { }

  ngOnInit() {
    this.currentUserSessionToken = this.userSessionService.getCurrentUserSession().sessionToken;
    this.currentUserId = this.userSessionService.getCurrentUser().userId;
    this.tutors.forEach((tutor: Tutor) => {
      console.log(tutor.userId);
    });
  }

  ngAfterViewInit() {
    $('.collapsible').collapsible();
    $('input.character-count').characterCounter();
    $('textarea.character-count').characterCounter();
  }

  onBookTutor(event: Event, email: string, courseNumber: string, name: string) {
    event.preventDefault();
    event.stopPropagation();
    this.contactTutorEmail = email;
    this.contactTutorCourseNumber = courseNumber;
    this.contactTutorName = name;
  }
}
