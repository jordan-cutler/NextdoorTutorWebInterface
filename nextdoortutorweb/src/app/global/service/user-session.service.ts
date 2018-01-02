import { UserSession } from '../model/user-session.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserSessionService {

  private currentUserSession: UserSession;

  storeCurrentUser(userSession: UserSession) {
    this.currentUserSession = userSession;
  }

  getCurrentUserSession() {
    return this.currentUserSession;
  }

  getCurrentUser() {
    return this.currentUserSession.user;
  }

  nullifyCurrentUserSession() {
    this.currentUserSession = null;
  }
}
