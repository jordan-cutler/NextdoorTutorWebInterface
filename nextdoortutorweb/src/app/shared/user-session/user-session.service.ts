import { UserSession } from './user-session.model';
import { Injectable, OnInit } from '@angular/core';
import { ApplicationGlobals } from '../ApplicationGlobals';
import { User } from '../user/user-model/user.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserSessionService {

  private currentUserSession: UserSession;

  private userUpdatedSubject = new Subject<User>();

  constructor() {
    if (ApplicationGlobals.userSessionPresentInLocalStorage()) {
      this.currentUserSession = ApplicationGlobals.getUserSessionFromLocalStorage();
    }
  }

  storeCurrentUserSession(userSession: UserSession) {
    this.currentUserSession = userSession;
    this.userUpdatedSubject.next(this.currentUserSession.getUser());
  }

  getCurrentUserSession() {
    return this.currentUserSession;
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
    ApplicationGlobals.setUserSessionInLocalStorage(this.currentUserSession);
    this.userUpdatedSubject.next(user);
  }
}
