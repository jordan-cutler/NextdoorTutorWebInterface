export class ApplicationGlobals {
  static readonly FIND_TUTOR_ROUTE = '/findtutor';
  static readonly TUTOR_VIEW_ROUTE = '/tutorview';

  private static readonly JWT_LOCAL_STORAGE_KEY = 'nextdoortutorjwt';

  static clearJwtFromLocalStorage() {
    localStorage.removeItem(ApplicationGlobals.JWT_LOCAL_STORAGE_KEY);
  }

  static setJwtInLocalStorage(jwt: string) {
    localStorage.setItem(ApplicationGlobals.JWT_LOCAL_STORAGE_KEY, jwt);
  }

  static getJwtFromLocalStorage(): string {
    return localStorage.getItem(ApplicationGlobals.JWT_LOCAL_STORAGE_KEY);
  }

  static jwtPresentInLocalStorage(): boolean {
    return !!localStorage.getItem(ApplicationGlobals.JWT_LOCAL_STORAGE_KEY);
  }
}
