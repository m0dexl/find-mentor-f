import { Component, OnInit } from '@angular/core';
import { Category } from 'src/core/models/category.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-admin-usercategory',
  templateUrl: './admin-usercategory.component.html',
  styleUrls: ['./admin-usercategory.component.scss'],
})
export class AdminUsercategoryComponent {
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  usercategories: Category[] = []; 


}
