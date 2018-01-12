import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from './core/preloader/preloader.service';
import { PreloaderState } from './core/preloader/PreloaderState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loadingSubscription: Subscription;
  loading: boolean;

  constructor(private preloaderService: PreloaderService) { }

  ngOnInit() {
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
