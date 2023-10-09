import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CategoryModule } from './category/category.module';
import { LoginModule } from './login/login.module';
import { AdsModule } from './ads/ads.module';
import { ProfileModule } from './profile/profile.module';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FontAwesomeModule,
    CategoryModule,
    LoginModule,
    AdsModule,
    ProfileModule,
   
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
