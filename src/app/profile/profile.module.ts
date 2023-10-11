import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { FormDetailsPopUpComponent } from './form-details-pop-up/form-details-pop-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileContentComponent,
    FormDetailsComponent,
    FormDetailsPopUpComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
  ]
})
export class ProfileModule { }
