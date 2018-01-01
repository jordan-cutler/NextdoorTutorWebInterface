import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../global/service/auth.service';
import GoogleAuth = gapi.auth2.GoogleAuth;

@Component({
  selector: 'app-tutor-search',
  templateUrl: './tutor-search.component.html',
  styleUrls: ['./tutor-search.component.css']
})
export class TutorsearchComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private zone: NgZone) { }

  ngOnInit() {
  }

  onSignout() {
    const auth2: GoogleAuth = this.authService.getAuth();
    const router = this.router;
    auth2.signOut().then(() => {
      this.zone.run(() => {
        router.navigate(['/']);
        console.log('signed out');
      });
    });
  }


}
