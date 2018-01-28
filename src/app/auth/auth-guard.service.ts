import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApplicationGlobals } from '@shared/ApplicationGlobals';
import { UserSessionService } from '@shared/user-session/user-session.service';
import { PreloaderService } from '../core/preloader/preloader.service';
import { UserSession } from '@shared/user-session/user-session.model';

import 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userSessionService: UserSessionService,
              private preloaderService: PreloaderService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else if (ApplicationGlobals.jwtPresentInLocalStorage()) {
      this.preloaderService.show();
      return this.userSessionService.attemptToRetrieveUserCredentialsFromServer().map(
        (userSession: UserSession) => {
          this.userSessionService.storeCurrentUserSession(userSession);
          this.preloaderService.hide();
          return true;
        }
      ).catch( () => {
        ApplicationGlobals.clearJwtFromLocalStorage();
        this.preloaderService.hide();
        this.router.navigate(['/']);
        return Observable.throw(false);
      });
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
