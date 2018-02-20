import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseTutorModalComponent } from './edit-course-tutor-modal.component';

describe('EditCourseTutorModalComponent', () => {
  let component: EditCourseTutorModalComponent;
  let fixture: ComponentFixture<EditCourseTutorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCourseTutorModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseTutorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
