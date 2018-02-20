import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTutorIsTutoringComponent } from './courses-tutor-is-tutoring.component';

describe('CoursesTutorIsTutoringComponent', () => {
  let component: CoursesTutorIsTutoringComponent;
  let fixture: ComponentFixture<CoursesTutorIsTutoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesTutorIsTutoringComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesTutorIsTutoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
