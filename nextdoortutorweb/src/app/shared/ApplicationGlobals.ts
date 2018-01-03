import { UserSession } from './user-session/user-session.model';

export class ApplicationGlobals {
  static readonly FIND_TUTOR_ROUTE = '/findtutor';
  private static readonly USER_SESSION_LOCAL_STORAGE_KEY = 'userSession';

  static clearUserSessionFromLocalStorage() {
    localStorage.removeItem(ApplicationGlobals.USER_SESSION_LOCAL_STORAGE_KEY);
  }

  static setUserSessionInLocalStorage(userSession: UserSession) {
    localStorage.setItem(ApplicationGlobals.USER_SESSION_LOCAL_STORAGE_KEY, JSON.stringify(userSession));
  }

  static getUserSessionFromLocalStorage(): UserSession {
    const jsonObjectFromLocalStorage = JSON.parse(localStorage.getItem(ApplicationGlobals.USER_SESSION_LOCAL_STORAGE_KEY));
    if (jsonObjectFromLocalStorage) {
      return UserSession.userSessionJsonToUserSessionModel(jsonObjectFromLocalStorage);
    } else {
      return null;
    }
  }

  static userSessionPresentInLocalStorage(): boolean {
    return !!localStorage.getItem(ApplicationGlobals.USER_SESSION_LOCAL_STORAGE_KEY);
  }
}
