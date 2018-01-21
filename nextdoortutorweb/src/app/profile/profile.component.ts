import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { User } from '../shared/user/user-model/user.model';
import { TutorReviewService } from '../shared/tutor/reviews/tutor-review.service';
import { Subscription } from 'rxjs/Subscription';
import { BasicTutorInfo } from '../shared/tutor/reviews/basic-tutor-info.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userIdOfCurrentUser: string;
  currentUser: User;
  basicInfo: BasicTutorInfo;

  basicInfoSubscription: Subscription;

  constructor(private userSessionService: UserSessionService, private tutorReviewService: TutorReviewService) { }

  ngOnInit() {
    this.currentUser = this.userSessionService.getCurrentUser();
    this.userIdOfCurrentUser = this.currentUser.userId;

    this.basicInfoSubscription = this.tutorReviewService.getBasicTutorInfo(this.currentUser.email).subscribe(
      (basicInfo: BasicTutorInfo) => {
        this.basicInfo = basicInfo;
      }
    );
  }

  ngOnDestroy() {
    this.basicInfoSubscription.unsubscribe();
  }

}
