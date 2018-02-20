import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorReviewModalComponent } from './tutor-review-modal.component';

describe('TutorReviewModalComponent', () => {
  let component: TutorReviewModalComponent;
  let fixture: ComponentFixture<TutorReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutorReviewModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
