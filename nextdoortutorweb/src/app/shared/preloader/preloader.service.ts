import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PreloaderState } from './PreloaderState';

@Injectable()
export class PreloaderService {

  preloaderSubject = new Subject<PreloaderState>();

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
}
