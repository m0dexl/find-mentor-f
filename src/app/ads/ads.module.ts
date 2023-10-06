import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsContentComponent } from './ads-content/ads-content.component';
import { AdsComponent } from './ads/ads.component';
import { HomeModule } from '../home/home.module';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    AdsContentComponent,
    AdsComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    HomeModule
  ]
})
export class AdsModule { }
