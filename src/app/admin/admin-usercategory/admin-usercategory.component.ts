import { Component, OnInit } from '@angular/core';
import { Category } from 'src/core/models/category.model';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { Notice } from 'src/core/models/notice.model';

@Component({
  selector: 'app-admin-usercategory',
  templateUrl: './admin-usercategory.component.html',
  styleUrls: ['./admin-usercategory.component.scss'],
})
export class AdminUsercategoryComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  usercategories: Category[] = [];
  notices: Notice[] = [];

  
  newCategoryName: string = '';   // Yeni kategori eklemek için kullanılacak değişkenler
  newCategoryDescription: string = '';

  categoryCount: number = 0;
  mentorCount: number = 0;
  noticeCount: number = 0;

  ngOnInit() {
    this.getCategories();
    this.getNotice();
  }

  getCategories() {
    this.apiService.getAllEntities(Category).subscribe((response) => {
      this.usercategories = response.data;
      this.categoryCount = this.usercategories.length; //kaç kategori varsa



      // Büyük harf yapma işlemi
      this.usercategories = this.usercategories.map((category) => {
        return {
          ...category,
          category_Name:
            category.category_Name.charAt(0).toLocaleUpperCase('tr') +
            category.category_Name.slice(1),
          category_Description:
            category.category_Description.charAt(0).toLocaleUpperCase('tr') +
            category.category_Description.slice(1),
        };
      });
    });
  }

  status = false;
  addToggle() {
    this.status = !this.status;
  }

  deleteCategory(id: number) {
    if (confirm('Kategoriyi silmek istediğinizden emin misiniz?')) {
      this.apiService
        .deleteEntity(id, Category)
        .then((response) => {
          this.getCategories();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  getNotice(){
      this.apiService.getAllEntities(Notice).subscribe((response) => {
      this.notices = response.data;
      this.noticeCount = this.notices.length; //kaç kategori varsa

  })
}

  //Modal

  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newCategoryName = '';
    this.newCategoryDescription = '';
  }

  saveNewCategory() {
    if (!this.newCategoryName || !this.newCategoryDescription) {  //kategori adı ve açıklaması boş olmamalı     
      alert('Lütfen kategori adı ve açıklama giriniz.');
      return;
    }
    const newCategory: Category = {
      id: 0, // Geçici bir id
      category_Name: this.newCategoryName,
      category_Description: this.newCategoryDescription,
    };

    this.apiService
      .createEntity(newCategory, 'Category')
      .then((response: any) => {
        if (response?.status === ResponseStatus.Ok) {
          this.getCategories();
          this.closeModal();
        }
      });

}
}