import { UserSession } from '../model/user-session.model';

export class UserSessionService {
  currentUserSession: UserSession;
  
  storeCurrentUser(userSession: UserSession) {
    this.currentUserSession = userSession;
  }
  
  getCurrentUserSession() {
    return this.currentUserSession;
  }
  
  getCurrentUser() {
    return this.currentUserSession.user;
  }
}
