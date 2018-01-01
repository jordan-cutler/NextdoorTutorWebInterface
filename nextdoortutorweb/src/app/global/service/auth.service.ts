import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;
import { HttpClient } from '@angular/common/http';
import { UserSession } from '../model/user-session.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  static readonly myClientId = '66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com';
  auth2: GoogleAuth;

  constructor(private httpClient: HttpClient) {

  }

  initializeAuthorization(element: HTMLElement, onsuccess: (googleUser: GoogleUser) => void) {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: AuthService.myClientId,
        cookie_policy: 'single_host_origin',
        scope: 'profile',
        hosted_domain: 'lehigh.edu'
      });
      this.attachSignIn(element, onsuccess);
    });
  }

  private attachSignIn(element, onsuccess: (googleUser: GoogleUser) => void) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: GoogleUser) => {
        onsuccess(googleUser);
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  getAuth(): GoogleAuth {
    return this.auth2;
  }

  setCurrentUserSession(userSession: UserSession) {

  }
}
