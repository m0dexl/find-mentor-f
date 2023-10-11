import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { FormDetailsPopUpComponent } from './form-details-pop-up/form-details-pop-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileContentComponent,
    FormDetailsComponent,
    FormDetailsPopUpComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class ProfileModule { }
