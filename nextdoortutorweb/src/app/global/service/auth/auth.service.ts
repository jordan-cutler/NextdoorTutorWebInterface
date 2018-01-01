import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;
import { HttpClient } from '@angular/common/http';
import { UserSession } from '../../model/user-session.model';
import { Injectable } from '@angular/core';
import { UserSessionService } from '../user-session.service';

@Injectable()
export class AuthService {
  private static readonly myClientId = '66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com';
  private static readonly SIGNINROUTE = '/user/loginWithGoogle';
  private auth2: GoogleAuth;

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService) {
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
    gapi.signin2.render(element.id, { onsuccess: (googleUser: GoogleUser) => {
      const idToken = googleUser.getAuthResponse().id_token;
      this.httpClient.post<UserSession>(AuthService.SIGNINROUTE, { idToken: idToken } )
        .subscribe(
          (userSession: UserSession) => {
            this.setCurrentUserSession(userSession);
            onsuccess();
          }
        );
    }});
  }

  getAuth(): GoogleAuth {
    return this.auth2;
  }

  setCurrentUserSession(userSession: UserSession) {
    this.userSessionService.storeCurrentUser(userSession);
  }

  isUserLoggedIn(): boolean {
    return !!this.userSessionService.getCurrentUserSession();
  }
}
