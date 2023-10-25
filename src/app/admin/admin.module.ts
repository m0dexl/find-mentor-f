import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminUsercategoryComponent } from './admin-usercategory/admin-usercategory.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent,
    AdminContentComponent,
    AdminUsercategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminModule { }
