import { UserSession } from '../model/user-session.model';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable()
export class UserSessionService {
  private currentUserSession: UserSession;
  
  constructor(private router: Router, private zone: NgZone) {
    
  }
  
  storeCurrentUser(userSession: UserSession) {
    this.currentUserSession = userSession;
  }
  
  getCurrentUserSession() {
    return this.currentUserSession;
  }
  
  getCurrentUser() {
    return this.currentUserSession.user;
  }
  
  signOutCurrentUser(auth2: GoogleAuth) {
    auth2.signOut().then(() => {
      this.zone.run(() => {
        this.router.navigate(['/']);
        this.currentUserSession = null;
        console.log('signed out');
      });
    });
  }
}
