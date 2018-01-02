import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './global/service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(public authService: AuthService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.authService.isUserSignedIn.subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        this.cd.detectChanges();
      }
    );
  }
}
