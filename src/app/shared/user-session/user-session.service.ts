import { UserSession } from './user-session.model';
import { Injectable } from '@angular/core';
import { ApplicationGlobals } from '../ApplicationGlobals';
import { User } from '../user/user-model/user.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserSessionService {

  private static readonly GET_USER_FROM_JWT_ROUTE = '/users/userByJwt';
  private currentUserSession: UserSession;
  private userUpdatedSubject = new Subject<User>();

  constructor(private httpClient: HttpClient) {
  }

  attemptToRetrieveUserCredentialsFromServer(): Observable<UserSession> {
    if (!this.currentUserSession && ApplicationGlobals.jwtPresentInLocalStorage()) {
      const jwt: string = ApplicationGlobals.getJwtFromLocalStorage();
      return this.httpClient.get(UserSessionService.GET_USER_FROM_JWT_ROUTE).map(
        (userJson) => new UserSession(User.userJsonToUserModel(userJson), jwt)
      );
    } else {
      return null;
    }
  }

  storeCurrentUserSession(userSession: UserSession) {
    if (userSession) {
      ApplicationGlobals.setJwtInLocalStorage(userSession.getJwt());
      this.currentUserSession = userSession;
      this.userUpdatedSubject.next(this.currentUserSession.getUser());
    }
  }

  getCurrentUser(): User | null {
    if (this.currentUserSession) {
      return this.currentUserSession.getUser();
    } else {
      return null;
    }
  }

  getCurrentUserObservable(): Observable<User> {
    return this.userUpdatedSubject.asObservable();
  }

  nullifyCurrentUserSession() {
    this.currentUserSession = null;
    this.userUpdatedSubject.next(null);
  }

  updateStoredUser(user: User) {
    this.currentUserSession.setUser(user);
    this.userUpdatedSubject.next(user);
  }
}
