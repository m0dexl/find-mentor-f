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
}
