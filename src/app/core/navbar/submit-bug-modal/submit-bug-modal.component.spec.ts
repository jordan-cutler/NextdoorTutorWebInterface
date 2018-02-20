import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBugModalComponent } from './submit-bug-modal.component';

describe('SubmitBugModalComponent', () => {
  let component: SubmitBugModalComponent;
  let fixture: ComponentFixture<SubmitBugModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitBugModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitBugModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
