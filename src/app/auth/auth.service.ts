import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleUser;
import { HttpClient } from '@angular/common/http';
import { UserSession } from '@shared/user-session/user-session.model';
import { Injectable, NgZone } from '@angular/core';
import { UserSessionService } from '@shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { ApplicationGlobals } from '@shared/ApplicationGlobals';
import { PreloaderService } from '@core/preloader/preloader.service';

@Injectable()
export class AuthService {
  private static readonly myClientId = '66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com';
  private static readonly SIGNINROUTE = '/user/loginWithGoogle';
  private auth2: GoogleAuth;

  constructor(private httpClient: HttpClient,
              private userSessionService: UserSessionService,
              private zone: NgZone,
              private router: Router,
              private preloaderService: PreloaderService) {
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
      elements.forEach((element: HTMLElement) => {
        this.attachSignIn(element, onsuccess);
      });
    });
  }

  attachSignIn(element: HTMLElement, onsuccess: () => void) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: GoogleUser) => {
        const idToken = googleUser.getAuthResponse().id_token;
        this.preloaderService.show();
        this.httpClient.post(AuthService.SIGNINROUTE, { idToken: idToken })
          .map(
            (userSession) => {
              return UserSession.toModelFromJson(userSession);
            }
          )
          .subscribe(
            (userSession: UserSession) => {
              this.preloaderService.hide();
              this.userSessionService.storeCurrentUserSession(userSession);
              onsuccess();
            },
            () => {
              this.preloaderService.hide();
              Materialize.toast('Failed to authenticate you. Please try again soon. ' +
                'If you run into continuous issues please contact jdc219@lehigh.edu', 3000);
              this.signOutUserFromGoogle();
            }
          );
      }, function (error) {
        Materialize.toast('Error occurred while authenticating. ' +
          'Please make sure you are using your correct lehigh.edu credentials and if the error persists ' +
          'contact jdc219@lehigh.edu or try again soon.', 3000);
      });
  }

  isUserLoggedIn(): boolean {
    return !!this.userSessionService.getCurrentUser();
  }

  signOutCurrentUser() {
    this.userSessionService.nullifyCurrentUserSession();
    ApplicationGlobals.clearJwtFromLocalStorage();
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
