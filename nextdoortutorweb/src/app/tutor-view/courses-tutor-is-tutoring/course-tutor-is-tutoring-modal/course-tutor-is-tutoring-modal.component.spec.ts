import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTutorIsTutoringModalComponent } from './course-tutor-is-tutoring-modal.component';

describe('CourseTutorIsTutoringModalComponent', () => {
  let component: CourseTutorIsTutoringModalComponent;
  let fixture: ComponentFixture<CourseTutorIsTutoringModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTutorIsTutoringModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTutorIsTutoringModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
