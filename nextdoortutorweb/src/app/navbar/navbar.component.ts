import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/user/user-model/user.model';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ApplicationGlobals } from '../shared/ApplicationGlobals';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  user: User;
  submitBugModalId: string;

  isLoggedInSubscription: Subscription;

  constructor(private userSessionService: UserSessionService,
              private authService: AuthService,
              private router: Router,
              private zone: NgZone
  ) { }

  ngOnInit() {
    this.user = this.userSessionService.getCurrentUser();
    this.isLoggedInSubscription = this.userSessionService.userUpdatedSubject.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.submitBugModalId = 'submitBugModal';
  }

  ngAfterViewInit() {
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
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

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

}
