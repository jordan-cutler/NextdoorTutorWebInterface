import { UserSession } from './user-session.model';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserSessionService {

  private currentUserSession: UserSession;

  constructor() {
    console.log('constructor called yo');
    console.log(localStorage.getItem('userSession'));
    if (localStorage.getItem('userSession')) {
      this.currentUserSession = UserSession.userSessionJsonToUserSessionModel(JSON.parse(localStorage.getItem('userSession')));
    } else {
      console.log('localstorage userSession is null = ' + localStorage.getItem('userSession'));
    }
    // this.currentUserSession = UserSession.userSessionJsonToUserSessionModel(JSON.parse(localStorage.getItem('userSession')));
  }

  storeCurrentUser(userSession: UserSession) {
    this.currentUserSession = userSession;
  }

  getCurrentUserSession() {
    console.log('in user session service = ' + this.currentUserSession);
    return this.currentUserSession;
  }

  getCurrentUser() {
    return this.currentUserSession.getUser();
  }

  nullifyCurrentUserSession() {
    this.currentUserSession = null;
  }
}
