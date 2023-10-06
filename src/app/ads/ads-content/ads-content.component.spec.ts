import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsContentComponent } from './ads-content.component';

describe('AdsContentComponent', () => {
  let component: AdsContentComponent;
  let fixture: ComponentFixture<AdsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdsContentComponent]
    });
    fixture = TestBed.createComponent(AdsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
