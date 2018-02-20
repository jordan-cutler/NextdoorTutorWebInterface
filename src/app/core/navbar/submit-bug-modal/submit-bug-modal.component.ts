import { Component, EventEmitter, Input } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-submit-bug-modal',
  templateUrl: './submit-bug-modal.component.html',
  styleUrls: ['./submit-bug-modal.component.scss']
})
export class SubmitBugModalComponent {
  @Input() modalId: string;
  @Input() modalActions: EventEmitter<string | MaterializeAction>;

  constructor() {
  }

}
