import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBasicInfoModalComponent } from './edit-basic-info-modal.component';

describe('EditBasicInfoModalComponent', () => {
  let component: EditBasicInfoModalComponent;
  let fixture: ComponentFixture<EditBasicInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBasicInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBasicInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
