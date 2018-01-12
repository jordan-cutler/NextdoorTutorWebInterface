import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-bug-modal',
  templateUrl: './submit-bug-modal.component.html',
  styleUrls: ['./submit-bug-modal.component.scss']
})
export class SubmitBugModalComponent implements AfterViewInit {
  @Input() modalId: string;

  constructor() { }

  ngAfterViewInit() {
    $('#' + this.modalId).modal();
  }

}
