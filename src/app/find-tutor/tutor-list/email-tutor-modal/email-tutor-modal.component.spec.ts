import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTutorModalComponent } from './email-tutor-modal.component';

describe('EmailTutorModalComponent', () => {
  let component: EmailTutorModalComponent;
  let fixture: ComponentFixture<EmailTutorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailTutorModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTutorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
