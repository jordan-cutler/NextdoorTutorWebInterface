import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserSessionService } from '../global/service/user-session.service';
import { AuthService } from '../global/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  submitBugModalId: string;

  constructor(private userSessionService: UserSessionService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.userSessionService.getCurrentUser();
    $('.modal').modal();
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
    this.submitBugModalId = 'submitBugModal';
  }

  onTutorACourseClick() {

  }

  onFindTutorClick() {

  }

  onProfileClick() {

  }

  onSubmitBugClick() {
    $('#' + this.submitBugModalId).modal('open');
  }

  onSignOutClick() {
    this.authService.signOutCurrentUser();
  }

}
