import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApplicationGlobals } from '../shared/ApplicationGlobals';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { PreloaderService } from '../core/preloader/preloader.service';
import { UserSession } from '../shared/user-session/user-session.model';
import { User } from '../shared/user/user-model/user.model';
import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

  private static readonly GET_USER_FROM_JWT_ROUTE = '/users/userByJwt';

  constructor(private userSessionService: UserSessionService,
              private httpClient: HttpClient,
              private preloaderService: PreloaderService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else if (ApplicationGlobals.jwtPresentInLocalStorage()) {
      const jwt: string = ApplicationGlobals.getJwtFromLocalStorage();
      this.preloaderService.show();
      return this.httpClient.get(AuthGuard.GET_USER_FROM_JWT_ROUTE).map(
        (userJson) => {
          this.userSessionService.storeCurrentUserSession(new UserSession(User.userJsonToUserModel(userJson), jwt));
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
