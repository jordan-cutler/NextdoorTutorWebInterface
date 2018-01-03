import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log('inited preloader');
    // $('body').css('opacity', '0.55');
  }

  ngAfterViewInit() {
    $('.container').children().each((index, element) => {
      console.log(element);
      $(element).css('opacity', '0.55');
    });
    $('app-preloader').css('opacity', '1');
  }

  ngOnDestroy() {
    $('body').css('opacity', '1');
  }

}
