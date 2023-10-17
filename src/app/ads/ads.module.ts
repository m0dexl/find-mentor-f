import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../home/home.module';
import { FormsModule } from '@angular/forms';
import { AdsComponent } from './ads/ads.component';
import { AdsContentComponent } from './ads-content/ads-content.component';



@NgModule({
  declarations: [
    AdsComponent,
    AdsContentComponent,
  
    ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule
  ]
})
export class AdsModule { }
