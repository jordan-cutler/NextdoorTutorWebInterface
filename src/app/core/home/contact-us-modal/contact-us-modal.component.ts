import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-contact-us-modal',
  templateUrl: './contact-us-modal.component.html',
  styleUrls: ['./contact-us-modal.component.scss']
})
export class ContactUsModalComponent implements OnInit, OnDestroy {
  @Input() openModalSubject: Subject<any>;

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor() {
  }

  ngOnInit() {
    this.openModalSubject.subscribe(
      () => this.modalActions.emit({ action: 'modal', params: ['open'] })
    );
  }

  ngOnDestroy() {
    this.openModalSubject.unsubscribe();
  }
}
