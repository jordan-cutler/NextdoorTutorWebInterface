import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PreloaderState } from './PreloaderState';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PreloaderService {

  private preloaderSubject = new Subject<PreloaderState>();

  constructor() { }

  show() {
    this.preloaderSubject.next({
      state: true
    });
  }

  hide() {
    this.preloaderSubject.next({
      state: false
    });
  }

  getPreloaderObservable(): Observable<PreloaderState> {
    return this.preloaderSubject.asObservable();
  }
}
