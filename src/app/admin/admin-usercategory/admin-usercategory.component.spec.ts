import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsercategoryComponent } from './admin-usercategory.component';

describe('AdminUsercategoryComponent', () => {
  let component: AdminUsercategoryComponent;
  let fixture: ComponentFixture<AdminUsercategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsercategoryComponent]
    });
    fixture = TestBed.createComponent(AdminUsercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
