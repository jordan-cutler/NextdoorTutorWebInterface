import { UserSession } from './user-session.model';
import { Injectable } from '@angular/core';
import { ApplicationGlobals } from '../ApplicationGlobals';
import { User } from '../user/user-model/user.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserSessionService {

  private currentUserSession: UserSession;

  private userUpdatedSubject = new Subject<User>();

  constructor() {
  }

  storeCurrentUserSession(userSession: UserSession) {
    ApplicationGlobals.setJwtInLocalStorage(userSession.getJwt());
    this.currentUserSession = userSession;
    this.userUpdatedSubject.next(this.currentUserSession.getUser());
  }

  getCurrentUser() {
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
