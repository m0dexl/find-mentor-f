import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDashboardNfasComponent } from './profile-dashboard-nfas.component';

describe('ProfileDashboardNfasComponent', () => {
  let component: ProfileDashboardNfasComponent;
  let fixture: ComponentFixture<ProfileDashboardNfasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDashboardNfasComponent]
    });
    fixture = TestBed.createComponent(ProfileDashboardNfasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
