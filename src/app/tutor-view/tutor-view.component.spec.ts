import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorViewComponent } from './tutor-view.component';

describe('TutorViewComponent', () => {
  let component: TutorViewComponent;
  let fixture: ComponentFixture<TutorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutorViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
