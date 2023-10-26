import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.showMentor();
  }

  users: User[] = [];

  newUserName: string = ''; // yeni kullanıcı eklemek için
  newFullName: string = '';
  newEmail: string = '';

  showMentor() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data.filter((user) => user.userType === 1); //sadece mentorleri görüntülemek için
      console.log(response);
    });
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
