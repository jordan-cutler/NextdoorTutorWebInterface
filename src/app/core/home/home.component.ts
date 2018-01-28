import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  openContactModalSubject = new Subject<any>();
  openTermsAndConditionsModalSubject = new Subject<any>();

  constructor() {
  }

  ngOnInit() {
  }

}


