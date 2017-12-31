import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

// noinspection UnterminatedStatementJS
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myWidth = 240;
  myTheme = 'dark';
  myScope = 'profile';
  myLongTitle = false;
  initializedView;

  constructor(private router: Router, private authService: AuthService, private zone: NgZone) {
  }

  ngOnInit() {
    this.initializeAuth();
  }

  initializeAuth() {
    this.authService.initializeAuthorization('signInButton', () => {
      this.zone.run(() => {
        this.router.navigate(['/tutorsearch']);
      });
    });
  }

  // onGoogleSignInSuccess(event: GoogleSignInSuccess) {
  //   let googleUser: gapi.auth2.GoogleUser = event.googleUser;
  //   let id: string = googleUser.getId();
  //   let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
  //   console.log('ID: ' +
  //     profile
  //       .getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   this.router.navigate(['/tutorsearch']);
  // }
  //
  // onSignInSuccess = (loggedInUser) => {
  //   console.log('made it');
  //
  // }

  // signOut() {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //   // let router = this.router;
  //   auth2.signOut().then(function () {
  //     // router.navigate(['/']);
  //     console.log('signed out');
  //   });
  // }
}


