import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailsPopUpComponent } from './form-details-pop-up.component';

describe('FormDetailsPopUpComponent', () => {
  let component: FormDetailsPopUpComponent;
  let fixture: ComponentFixture<FormDetailsPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDetailsPopUpComponent]
    });
    fixture = TestBed.createComponent(FormDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
