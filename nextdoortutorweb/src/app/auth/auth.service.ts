import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;
import { HttpClient } from '@angular/common/http';
import { UserSession } from '../shared/user-session/user-session.model';
import { Injectable, NgZone } from '@angular/core';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';
import { ApplicationGlobals } from '../shared/ApplicationGlobals';

@Injectable()
export class AuthService {
  private static readonly myClientId = '66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com';
  private static readonly SIGNINROUTE = '/user/loginWithGoogle';
  private static readonly SIGNOUTROUTE = '/user/logout';
  private auth2: GoogleAuth;
  isUserSignedIn = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService, private zone: NgZone,
              private router: Router) {
  }

  initializeAuthorization(elements: HTMLElement[], onsuccess: () => void) {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: AuthService.myClientId,
        cookie_policy: 'single_host_origin',
        scope: 'profile',
        hosted_domain: 'lehigh.edu'
      });
      elements.forEach( (element: HTMLElement) => {
        this.attachSignIn(element, onsuccess);
      });
    });
  }

  attachSignIn(element: HTMLElement, onsuccess: () => void) {
      this.getAuth().attachClickHandler(element, {},
        (googleUser: GoogleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          this.httpClient.post(AuthService.SIGNINROUTE, { idToken: idToken })
            .map(
              (userSession) => {
                return UserSession.userSessionJsonToUserSessionModel(userSession);
              }
            )
            .subscribe(
              (userSession: UserSession) => {
                ApplicationGlobals.setUserSessionInLocalStorage(userSession);
                this.userSessionService.storeCurrentUser(userSession);
                this.isUserSignedIn.next(true);
                onsuccess();
              },
              () => {
                Materialize.toast('Failed to authenticate you. Please try again soon', 3000);
                this.signOutUserFromGoogle();
              }
            );
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  getAuth(): GoogleAuth {
    return this.auth2;
  }

  isUserLoggedIn(): boolean {
    if (!!this.userSessionService.getCurrentUserSession()) {
      this.isUserSignedIn.next(true);
      return true;
    } else {
      this.isUserSignedIn.next(false);
      return false;
    }
  }

  signOutCurrentUser() {
    this.httpClient.post(AuthService.SIGNOUTROUTE, {});
    this.isUserSignedIn.next(false);
    this.userSessionService.nullifyCurrentUserSession();
    ApplicationGlobals.clearUserSessionFromLocalStorage();

    this.signOutUserFromGoogle();
  }

  private signOutUserFromGoogle() {
    this.auth2.signOut().then(() => {
      this.zone.run(() => {
        this.router.navigate(['/home']);
      });
    });
  }
}
