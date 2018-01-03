import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from './shared/preloader/preloader.service';
import { PreloaderState } from './shared/preloader/PreloaderState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadingSubscription: Subscription;
  loading: boolean;

  constructor(private authService: AuthService,
              private preloaderService: PreloaderService,
              private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.preloaderService.preloaderSubject.subscribe(
      (preloaderState: PreloaderState) => {
        this.loading = preloaderState.state;
        this.cd.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
