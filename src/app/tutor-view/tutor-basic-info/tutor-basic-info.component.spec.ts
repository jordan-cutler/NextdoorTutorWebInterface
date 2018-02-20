import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorBasicInfoComponent } from './tutor-basic-info.component';

describe('TutorBasicInfoComponent', () => {
  let component: TutorBasicInfoComponent;
  let fixture: ComponentFixture<TutorBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutorBasicInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
