import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeModule } from '../home/home.module';
import { RouterModule } from '@angular/router';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileContentComponent,
    FormDetailsComponent,
    ProfileDashboardComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
})
export class ProfileModule {}
