import { UserSession } from './user-session.model';
import { Injectable, OnInit } from '@angular/core';
import { ApplicationGlobals } from '../ApplicationGlobals';
import { User } from '../user/user-model/user.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserSessionService {

  private currentUserSession: UserSession;

  userUpdatedSubject = new Subject<User>();

  constructor() {
    if (ApplicationGlobals.userSessionPresentInLocalStorage()) {
      this.currentUserSession = ApplicationGlobals.getUserSessionFromLocalStorage();
    }

    this.userUpdatedSubject.subscribe(
      (user: User) => {
        this.updateStoredUser(user);
      }
    );
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

  nullifyCurrentUserSession() {
    this.currentUserSession = null;
    this.userUpdatedSubject.next(null);
  }

  private updateStoredUser(user: User) {
    this.currentUserSession.setUser(user);
    ApplicationGlobals.setUserSessionInLocalStorage(this.currentUserSession);
  }
}
