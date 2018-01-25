import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesUserIsTutoringListComponent } from './courses-user-is-tutoring-list.component';

describe('CoursesUserIsTutoringListComponent', () => {
  let component: CoursesUserIsTutoringListComponent;
  let fixture: ComponentFixture<CoursesUserIsTutoringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesUserIsTutoringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesUserIsTutoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
