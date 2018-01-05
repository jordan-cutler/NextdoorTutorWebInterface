import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('signInButtonTop') signInButtonTopRef: ElementRef;
  @ViewChild('signInButtonSide') signInButtonSideRef: ElementRef;
  user: User;
  submitBugModalId = 'submitBugModal';
  private submitBugModalSelector = '#' + this.submitBugModalId;

  isLoggedInSubscription: Subscription;

  constructor(private userSessionService: UserSessionService,
              private authService: AuthService,
              private router: Router,
              private zone: NgZone
  ) { }

  ngOnInit() {
    this.user = this.userSessionService.getCurrentUser();
    this.isLoggedInSubscription = this.userSessionService.getCurrentUserObservable().subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  ngAfterViewInit() {
    $('.button-collapse').sideNav({
      closeOnClick: true
    });

    this.authService.initializeAuthorization([this.signInButtonTopRef.nativeElement, this.signInButtonSideRef.nativeElement], () => {
      this.zone.run(() => {
        this.router.navigate([ApplicationGlobals.FIND_TUTOR_ROUTE]);
      });
    });
  }

  onSubmitBugClick() {
    $(this.submitBugModalSelector).modal('open');
  }

  onSignOutClick() {
    this.authService.signOutCurrentUser();
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

}
