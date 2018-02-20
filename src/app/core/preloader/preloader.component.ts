import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('body').css('opacity', '0.5');
  }

  ngOnDestroy() {
    $('body').css('opacity', '1');
  }

}
