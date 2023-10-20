import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeModule } from '../home/home.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  
  ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule,
    ToastModule
  ]
})
export class LoginModule { }
