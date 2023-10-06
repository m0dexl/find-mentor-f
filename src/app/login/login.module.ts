import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    LoginComponent,
  
  ],
  imports: [
    CommonModule,
    HomeModule
  ]
})
export class LoginModule { }
