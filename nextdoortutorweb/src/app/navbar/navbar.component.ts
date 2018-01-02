import { Component, NgZone, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserSessionService } from '../global/service/user-session.service';
import { AuthService } from '../global/service/auth/auth.service';
import { Router } from '@angular/router';
import { ApplicationGlobals } from '../global/ApplicationGlobals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  submitBugModalId: string;

  constructor(private userSessionService: UserSessionService,
              private authService: AuthService,
              private router: Router,
              private zone: NgZone
  ) { }

  ngOnInit() {
    this.user = this.userSessionService.getCurrentUser();
    this.submitBugModalId = 'submitBugModal';
  }

  onFindTutorClick() {
    this.zone.run(() => {
      this.router.navigate([ApplicationGlobals.FIND_TUTOR_ROUTE]);
    });
  }

  onTutorACourseClick() {

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
