import { Component, Input, OnInit } from '@angular/core';
import { User } from '@shared/user/user-model/user.model';
import { UserSessionService } from '@shared/user-session/user-session.service';
import { BasicTutorInfo } from '@shared/tutor/reviews/basic-tutor-info.model';

@Component({
  selector: 'app-tutor-basic-info',
  templateUrl: './tutor-basic-info.component.html',
  styleUrls: ['./tutor-basic-info.component.scss']
})
export class TutorBasicInfoComponent implements OnInit {
  @Input() basicTutorInfo: BasicTutorInfo;
  tutorUser: User;
  currentUser: User;
  hasProfilePhoto: boolean;
  constructor(private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.currentUser = this.userSessionService.getCurrentUser();
    this.tutorUser = this.basicTutorInfo.user;
    this.hasProfilePhoto = !!this.tutorUser.profilePhotoId;
  }

}
