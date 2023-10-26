import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminUsercategoryComponent } from './admin-usercategory/admin-usercategory.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    AdminComponent,
    AdminContentComponent,
    AdminUsercategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
  ]
})
export class AdminModule { }
