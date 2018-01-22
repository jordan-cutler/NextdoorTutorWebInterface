import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from './core/preloader/preloader.service';
import { PreloaderState } from './core/preloader/PreloaderState';
import { UserSessionService } from './shared/user-session/user-session.service';
import { UserSession } from './shared/user-session/user-session.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loadingSubscription: Subscription;
  loading: boolean;

  constructor(private preloaderService: PreloaderService, private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.preloaderService.show();
    this.userSessionService.attemptToRetrieveUserCredentialsFromServer().subscribe(
      (userSession: UserSession) => {
        this.userSessionService.storeCurrentUserSession(userSession);
        this.preloaderService.hide();
      },
      (error) => this.preloaderService.hide()
    );

    this.loading = false;
    this.loadingSubscription = this.preloaderService.getPreloaderObservable().subscribe(
      (preloaderState: PreloaderState) => {
        this.loading = preloaderState.state;
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
