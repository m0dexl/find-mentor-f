import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../home/home.module';
import { AdsComponent } from './ads/ads.component';
import { AdsContentComponent } from './ads-content/ads-content.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdsComponent,
    AdsContentComponent,
    FormComponent
    ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule,
    RouterModule
  ]
})
export class AdsModule { }

//asdad