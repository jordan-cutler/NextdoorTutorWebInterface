import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './global/service/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;
  
  constructor(public authService: AuthService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.isUserSignedIn.subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        this.cd.detectChanges();
      }
    );
  }
  
  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
}
