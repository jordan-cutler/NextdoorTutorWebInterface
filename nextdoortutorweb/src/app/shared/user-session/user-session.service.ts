import { UserSession } from './user-session.model';
import { Injectable, OnInit } from '@angular/core';
import { ApplicationGlobals } from '../ApplicationGlobals';

@Injectable()
export class UserSessionService {

  private currentUserSession: UserSession;

  constructor() {
    if (ApplicationGlobals.userSessionPresentInLocalStorage()) {
      this.currentUserSession = ApplicationGlobals.getUserSessionFromLocalStorage();
    }
  }

  storeCurrentUser(userSession: UserSession) {
    this.currentUserSession = userSession;
  }

  getCurrentUserSession() {
    return this.currentUserSession;
  }

  getCurrentUser() {
    return this.currentUserSession.getUser();
  }

  nullifyCurrentUserSession() {
    this.currentUserSession = null;
  }
}
