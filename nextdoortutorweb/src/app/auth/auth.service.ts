import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;
import { HttpClient } from '@angular/common/http';
import { UserSession } from '../shared/user-session/user-session.model';
import { Injectable, NgZone } from '@angular/core';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';

@Injectable()
export class AuthService {
  private static readonly myClientId = '66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com';
  private static readonly SIGNINROUTE = '/user/loginWithGoogle';
  private static readonly SIGNOUTROUTE = '/user/logout';
  private auth2: GoogleAuth;
  isUserSignedIn = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService, private zone: NgZone,
              private router: Router) {
    console.log('in authservice constructor');
    if (this.isUserLoggedIn()) {
      console.log('made it to if statement');
      this.isUserSignedIn.next(true);
    }
  }

  initializeAuthorization(element: HTMLElement, onsuccess: () => void) {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: AuthService.myClientId,
        cookie_policy: 'single_host_origin',
        scope: 'profile',
        hosted_domain: 'lehigh.edu'
      });
      this.renderSignInButton(element, onsuccess);
    });
  }

  renderSignInButton(element: HTMLElement, onsuccess: () => void) {
    gapi.signin2.render(element.id, {
      onsuccess: (googleUser: GoogleUser) => {
        const idToken = googleUser.getAuthResponse().id_token;
        this.httpClient.post(AuthService.SIGNINROUTE, { idToken: idToken })
          .map(
            (userSession) => {
              return UserSession.userSessionJsonToUserSessionModel(userSession);
            }
          )
          .subscribe(
            (userSession: UserSession) => {
              console.log(userSession);
              localStorage.setItem('userSession', JSON.stringify(userSession));
              console.log('saved = ' + JSON.stringify(userSession));
              this.userSessionService.storeCurrentUser(userSession);
              this.isUserSignedIn.next(true);
              console.log('user signed in = ' + this.isUserSignedIn);
              onsuccess();
            }
          );
      }
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
    this.auth2.signOut().then(() => {
      this.zone.run(() => {
        this.router.navigate(['/']);
        this.userSessionService.nullifyCurrentUserSession();
        console.log('signed out');
      });
    });
  }
}
