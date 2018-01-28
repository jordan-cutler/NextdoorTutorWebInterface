import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { User } from '@shared/user/user-model/user.model';
import { UserSessionService } from '@shared/user-session/user-session.service';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { ApplicationGlobals } from '@shared/ApplicationGlobals';
import { Subscription } from 'rxjs/Subscription';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('signInButtonTop') signInButtonTopRef: ElementRef;
  user: User;
  submitBugModalId = 'submitBugModal';

  isLoggedInSubscription: Subscription;
  sideNavActions = new EventEmitter<string|MaterializeAction>();
  submitBugModalActions = new EventEmitter<string|MaterializeAction>();

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
    this.authService.initializeAuthorization([this.signInButtonTopRef.nativeElement], () => {
      this.zone.run(() => {
        this.router.navigate([ApplicationGlobals.FIND_TUTOR_ROUTE]);
      });
    });
  }

  onSubmitBugClick() {
    this.submitBugModalActions.emit({action: 'modal', params: ['open']});
  }

  onSignOutClick() {
    this.sideNavActions.emit({action: 'sideNav', params: ['hide']});
    this.authService.signOutCurrentUser();
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

}
