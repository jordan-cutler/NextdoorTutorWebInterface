import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ApplicationGlobals } from '../shared/ApplicationGlobals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ViewChild('signInButton') signInButtonRef: ElementRef;

  constructor(private router: Router, private authService: AuthService, private zone: NgZone) {
  }

  ngOnInit() {
    // this.authService.initializeAuthorization(this.signInButtonRef.nativeElement, () => {
    //   this.zone.run(() => {
    //     this.router.navigate([ApplicationGlobals.FIND_TUTOR_ROUTE]);
    //   });
    // });
  }

}


