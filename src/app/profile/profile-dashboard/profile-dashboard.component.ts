import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/core/models/category.model';
import { Notice } from 'src/core/models/notice.model';
import { NoticeFormAnswer } from 'src/core/models/noticeformanswer.model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss'],
})
export class ProfileDashboardComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getCurrentUser();
    this.divideFullname(this.currentUser.fullName);
    this.getNoticeByMentorId(this.currentUser.id);
    this.getCurrentUserNoticeFormAnswers();
  }

  allNotices: Notice[] = [];
  currentUserNotice: Notice = <Notice>{};

  allNoticeFormAnswers: NoticeFormAnswer[] = [];
  currentUserNoticeFormAnswers: NoticeFormAnswer[] = [];

  currentUser: User = <User>{};
  firstName: string = '';
  lastName: string = '';
  userToEdit: User | null = null;
  currentUserHaveNotice: boolean = false;

  status = false;
  addToggle() {
    this.status = !this.status;
  }

  divideFullname(fullName: string) {
    if (fullName.length == 1) {
      this.firstName = fullName;
    } else {
      const words = fullName.split(' ');
      words.pop();
      this.firstName = words.join(' ');

      const words2 = fullName.split(' ');
      this.lastName = words2[words2.length - 1];
    }
  }

  getCurrentUser() {
    const userJson = sessionStorage.getItem('current_user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
  }

  isUserEditing: boolean = false;
  openUpdateUserPopup() {
    this.isUserEditing = true;
    this.userToEdit = this.currentUser;
  }
  closeUpdateUserPopup() {
    this.isUserEditing = false;
  }
  updateUser(id: number, updatedUser: User) {
    this.apiService
      .updateEntity(id, updatedUser, User)
      .then((res) => {
        console.log(res);
        if (res?.status == ResponseStatus.Ok) {
          this.refresh();
        }
      })
      .catch((err) => {
        console.log('Bilgiler güncellenirken hata oluştur:', err);
      });
    this.isUserEditing = false;
  }

  getNoticeByMentorId(id: number) {
    this.apiService.getAllEntities(Notice).subscribe((response) => {
      if (response.data.length > 0) {
        this.allNotices = response.data;
        for (let val of this.allNotices) {
          if (val.mentorUser_Id == id) {
            this.currentUserNotice = val;
            this.currentUserHaveNotice = true;
          } else {
            this.currentUserHaveNotice = false;
          }
        }
      }
    });
  }

  getCurrentUserNoticeFormAnswers() {
    this.apiService.getAllEntities(NoticeFormAnswer).subscribe((response) => {
      this.allNoticeFormAnswers = response.data;
      for (let val of this.allNoticeFormAnswers) {
        if (val.notice_Id == this.currentUserNotice.id) {
          this.currentUserNoticeFormAnswers.push(val);
        }
      }
    });
  }
  // constructor(private apiService: ApiService, private router: Router) {}

  // usercategories: Category[] = [];
  // notices: Notice[] = [];
  // users: User[] = [];

  // newCategoryName: string = ''; // Yeni kategori eklemek için kullanılacak değişkenler
  // newCategoryDescription: string = '';

  // editCategoryName: string = ''; // Düzenleme için kullanılacak değişkenler
  // editCategoryDescription: string = '';
  // selectedCategoryId: number | null = null;
  // categoryCount: number = 0;
  // userCount: number = 0;
  // noticeCount: number = 0;

  // ngOnInit() {
  //   this.getCategories();
  //   this.getNotice();
  //   this.getUser();
  // }

  // getCategories() {
  //   this.apiService.getAllEntities(Category).subscribe((response) => {
  //     this.usercategories = response.data;
  //     this.categoryCount = this.usercategories.length; //kaç kategori varsa

  //     this.usercategories = this.usercategories.map((category) => {
  //       return {
  //         ...category,
  //         category_Name:
  //           category.category_Name.charAt(0).toUpperCase() +
  //           category.category_Name.slice(1),
  //         category_Description:
  //           category.category_Description.charAt(0).toUpperCase() +
  //           category.category_Description.slice(1),
  //       };
  //     });
  //   });
  // }

  // status = false;
  // addToggle() {
  //   this.status = !this.status;
  // }

  // //silme işlemi

  // deleteCategory(id: number) {
  //   if (confirm('Kategoriyi silmek istediğinizden emin misiniz?')) {
  //     this.apiService
  //       .deleteEntity(id, Category)
  //       .then((response) => {
  //         this.getCategories();
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }
  // //ilan ve mentör sayısını yansıtmak için kullandığımız kodlar

  // getNotice() {
  //   this.apiService.getAllEntities(Notice).subscribe((response) => {
  //     this.notices = response.data;
  //     this.noticeCount = this.notices.length; //kaç ilan varsa
  //   });
  // }

  // getUser() {
  //   this.apiService.getAllEntities(User).subscribe((response) => {
  //     const allUsers = response.data;
  //     const userType1Users = allUsers.filter((user) => user.userType === 1); //user typeı 1 olan mentörleri getir
  //     this.userCount = userType1Users.length;
  //   });
  // }

  // // Kategori Ekleme
  // isModalOpen = false;
  // openModal() {
  //   this.isModalOpen = true;
  // }

  // closeModal() {
  //   this.isModalOpen = false;
  //   this.newCategoryName = '';
  //   this.newCategoryDescription = '';
  // }
  // saveNewCategory() {
  //   if (!this.newCategoryName || !this.newCategoryDescription) {
  //     //kategori adı ve açıklaması boş olmamalı
  //     alert('Lütfen kategori adı ve açıklama giriniz.');
  //     return;
  //   }
  //   const newCategory: Category = {
  //     id: 0, // Geçici bir id
  //     category_Name: this.newCategoryName,
  //     category_Description: this.newCategoryDescription,
  //   };

  //   this.apiService
  //     .createEntity(newCategory, 'Category')
  //     .then((response: any) => {
  //       if (response?.status === ResponseStatus.Ok) {
  //         this.getCategories();
  //         this.closeModal();
  //       }
  //     });
  // }

  // // Düzenleme işlemleri
  // isEditModalOpen = false;

  // openEditModal(category: Category) {
  //   this.selectedCategoryId = category.id;
  //   this.editCategoryName = category.category_Name;
  //   this.editCategoryDescription = category.category_Description;
  //   this.isEditModalOpen = true;
  // }

  // closeEditModal() {
  //   this.selectedCategoryId = null;
  //   this.editCategoryName = '';
  //   this.editCategoryDescription = '';
  //   this.isEditModalOpen = false;
  // }

  // saveEditedCategory() {
  //   if (!this.editCategoryName || !this.editCategoryDescription) {
  //     alert('Lütfen kategori adı ve açıklama giriniz.');
  //     return;
  //   }

  //   const editedCategory: Category = {
  //     id: this.selectedCategoryId as number, // null türünü number'a zorlayarak hata olasılığını azaltır
  //     category_Name: this.editCategoryName,
  //     category_Description: this.editCategoryDescription,
  //   };

  //   this.apiService
  //     .updateEntity(this.selectedCategoryId as number, editedCategory, Category)
  //     .then((response: any) => {
  //       if (response?.status === ResponseStatus.Ok) {
  //         this.getCategories();
  //         this.closeEditModal();
  //       }
  //     });
  // }
}
