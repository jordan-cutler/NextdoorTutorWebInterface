import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-terms-and-conditions-modal',
  templateUrl: './terms-and-conditions-modal.component.html',
  styleUrls: ['./terms-and-conditions-modal.component.scss']
})
export class TermsAndConditionsModalComponent implements OnInit, OnDestroy {
  @Input() openModalSubject: Subject<any>;

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
    this.openModalSubject.subscribe(
      () => this.modalActions.emit({action: 'modal', params: ['open']})
    );
  }

  ngOnDestroy() {
    this.openModalSubject.unsubscribe();
  }
}
