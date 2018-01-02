import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-bug-modal',
  templateUrl: './submit-bug-modal.component.html',
  styleUrls: ['./submit-bug-modal.component.css']
})
export class SubmitBugModalComponent implements OnInit {
  @Input() modalId: string;

  constructor() { }

  ngOnInit() {
  }

}
