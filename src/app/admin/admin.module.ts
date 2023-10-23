import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminContentComponent } from './admin-content/admin-content.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
