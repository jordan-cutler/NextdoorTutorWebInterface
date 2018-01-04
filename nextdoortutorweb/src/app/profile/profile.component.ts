import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { User } from '../shared/user/user-model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userIdOfCurrentUser: string;
  currentUser: User;

  constructor(private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.currentUser = this.userSessionService.getCurrentUser();
    this.userIdOfCurrentUser = this.currentUser.userId;
  }

}
