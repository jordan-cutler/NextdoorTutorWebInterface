import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorApplicationComponent } from './tutor-application.component';

describe('TutorApplicationComponent', () => {
  let component: TutorApplicationComponent;
  let fixture: ComponentFixture<TutorApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutorApplicationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
