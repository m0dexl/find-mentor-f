import { Component, OnInit } from '@angular/core';
import { Category } from 'src/core/models/category.model';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { Notice } from 'src/core/models/notice.model';
import { User } from 'src/core/models/user.model';

@Component({
  selector: 'app-admin-usercategory',
  templateUrl: './admin-usercategory.component.html',
  styleUrls: ['./admin-usercategory.component.scss'],
})
export class AdminUsercategoryComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  usercategories: Category[] = [];
  notices: Notice[] = [];
  users: User[] = [];

  newCategoryName: string = ''; // Yeni kategori eklemek için kullanılacak değişkenler
  newCategoryDescription: string = '';

  editCategoryName: string = ''; // Düzenleme için kullanılacak değişkenler
  editCategoryDescription: string = '';
  selectedCategoryId: number | null = null;
  categoryCount: number = 0;
  userCount: number = 0;
  noticeCount: number = 0;

  ngOnInit() {
    this.getCategories();
    this.getNotice();
    this.getUser();
  }

  getCategories() {
    this.apiService.getAllEntities(Category).subscribe((response) => {
      this.usercategories = response.data;
      this.categoryCount = this.usercategories.length; //kaç kategori varsa

      this.usercategories = this.usercategories.map((category) => {
        return {
          ...category,
          category_Name:
            category.category_Name.charAt(0).toUpperCase() +
            category.category_Name.slice(1),
          category_Description:
            category.category_Description.charAt(0).toUpperCase() +
            category.category_Description.slice(1),
        };
      });
    });
  }

  status = false;
  addToggle() {
    this.status = !this.status;
  }

  //silme işlemi

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
  //ilan ve mentör sayısını yansıtmak için kullandığımız kodlar

  getNotice() {
    this.apiService.getAllEntities(Notice).subscribe((response) => {
      this.notices = response.data;
      this.noticeCount = this.notices.length; //kaç ilan varsa
    });
  }

  getUser() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      const allUsers = response.data;
      const userType1Users = allUsers.filter((user) => user.userType === 1); //user typeı 1 olan mentörleri getir
      this.userCount = userType1Users.length;
    });
  }

  // Kategori Ekleme
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
    if (!this.newCategoryName || !this.newCategoryDescription) {
      //kategori adı ve açıklaması boş olmamalı
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

  // Düzenleme işlemleri
  isEditModalOpen = false;

  openEditModal(category: Category) {
    this.selectedCategoryId = category.id;
    this.editCategoryName = category.category_Name;
    this.editCategoryDescription = category.category_Description;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.selectedCategoryId = null;
    this.editCategoryName = '';
    this.editCategoryDescription = '';
    this.isEditModalOpen = false;
  }

  saveEditedCategory() {
    if (!this.editCategoryName || !this.editCategoryDescription) {
      alert('Lütfen kategori adı ve açıklama giriniz.');
      return;
    }

   const editedCategory: Category = {
     id: this.selectedCategoryId as number, // null türünü number'a zorlayarak hata olasılığını azaltır
     category_Name: this.editCategoryName,
     category_Description: this.editCategoryDescription,
   };

   this.apiService
     .updateEntity(this.selectedCategoryId as number, editedCategory, Category)
     .then((response: any) => {
       if (response?.status === ResponseStatus.Ok) {
         this.getCategories();
         this.closeEditModal();
       }
     });
  }
}
