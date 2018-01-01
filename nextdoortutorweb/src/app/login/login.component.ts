import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../global/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('signInButton') signInButtonRef: ElementRef;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.initializeAuthorization(this.signInButtonRef.nativeElement, () => {
      this.router.navigate(['/tutor-search']);
    });
  }

}


