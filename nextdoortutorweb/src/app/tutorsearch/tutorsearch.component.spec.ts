import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsearchComponent } from './tutorsearch.component';

describe('TutorsearchComponent', () => {
  let component: TutorsearchComponent;
  let fixture: ComponentFixture<TutorsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
