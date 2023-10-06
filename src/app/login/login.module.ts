import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeModule } from '../home/home.module';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  
  ],
  imports: [
    CommonModule,
    HomeModule
  ]
})
export class LoginModule { }
