import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { RegisterRequest } from 'src/core/models/request/register-request-model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { Notice } from 'src/core/models/notice.model';
import { Category } from 'src/core/models/category.model';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent implements OnInit {

  constructor(private apiService: ApiService,private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.showMentor();
    this.getNotice();
    this.getUser();
    this.getCategories();
  }

  users: User[] = [];
  notices: Notice[] = [];
  usercategories: Category[] = [];

  newUserName: string = ''; // yeni kullanıcı eklemek için
  newFullName: string = '';
  newEmail: string = '';
  categoryCount: number = 0;
  userCount: number = 0;
  noticeCount: number = 0;
  
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


  showMentor() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data.filter((user) => user.userType === 1); //sadece mentorleri görüntülemek için
      console.log(response);
    });
  }
  public addNewUserRequest: RegisterRequest = <RegisterRequest>{}; //gpt bunu kaldır dedi

  async addNewUser(){
    this.addNewUserRequest.userType = 1;

    let status = await this.authService.register(this.addNewUserRequest);

    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['../profile']);
    } else if (status == ResponseStatus.Invalid) {
    }
  }

  deleteMentor(id: number) {
    if (confirm('Kullanıcıyı silmek istediğinizden emin misiniz?')) {
      this.apiService
        .deleteEntity(id, User)
        .then((response) => {
          this.showMentor();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newUserName = '';
    this.newFullName = '';
    this.newEmail = '';
  }
  saveNewMentor() {
    if (!this.newUserName || !this.newFullName || !this.newEmail)  {     
      alert('Lütfen kullanıcı ad, full ad ve mail giriniz.');
      return;
    }
    const newUser: User = {
      id: 0, // Geçici bir id
      userName: this.newUserName,
      fullName: this.newFullName,
      email: this.newEmail,
      userType: 0
    };

    this.apiService
      .createEntity(newUser, 'User')
      .then((response: any) => {
        if (response?.status === ResponseStatus.Ok) {
          this.showMentor();
          this.closeModal();
         
        }
      });

}

isAddUserPopupOpen: boolean = false;
toggleAddUserPopup(){
  this.isAddUserPopupOpen = !this.isAddUserPopupOpen
}
      
  
  //Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;       
}

}
