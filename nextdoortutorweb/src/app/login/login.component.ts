import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../global/service/auth.service';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('signInButton') signInButtonRef: ElementRef;

  constructor(private router: Router, private authService: AuthService, private zone: NgZone) {
  }

  ngOnInit() {
    this.authService.initializeAuthorization(this.signInButtonRef.nativeElement, (googleUser: GoogleUser) => {
      
      this.router.navigate(['/tutor-search']);
    });
  }

}


