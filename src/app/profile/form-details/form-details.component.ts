import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { NoticeFormAnswer } from 'src/core/models/noticeformanswer.model';
import { Notice } from 'src/core/models/notice.model';
import { NoticeRequest } from 'src/core/models/request/notice-request-model';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/core/models/category.model';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss'],
})
export class FormDetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}
  faRightFromBracket = faRightFromBracket;

  ngOnInit() {
    this.refresh();
  }

  currentUser: User = <User>{};
  currentUserNotice: Notice = <Notice>{};
  currentUserHaveNotice: boolean = false;
  public noticeRequest: NoticeRequest = <NoticeRequest>{};
  allNoticeFormAnswers: NoticeFormAnswer[] = [];
  currentUserNoticeFormAnswers: NoticeFormAnswer[] = [];

  allNotices: Notice[] = [];
  allCategories: Category[] = [];

  NoticeToEdit: Notice | null = null;

  async refresh() {
    this.getCurrentUser();
    this.getCategories();
    this.getNoticeByMentorId(this.currentUser.id);
    this.getCurrentUserNoticeFormAnswers();
  }

  getCurrentUser() {
    const userJson = sessionStorage.getItem('current_user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
  }

  getCategories() {
    this.apiService.getAllEntities(Category).subscribe((res) => {
      this.allCategories = res.data;
      console.log(this.allCategories);
    });
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

  isNoticeDetailPopupVisible: boolean = false;
  isNoticeEditing = false;

  toggleNoticeDetailPopup() {
    this.isNoticeDetailPopupVisible = !this.isNoticeDetailPopupVisible;
    this.isNoticeEditing = false;
  }

  editNotice() {
    this.isNoticeEditing = true;
    this.NoticeToEdit = this.currentUserNotice;
  }

  updateNotice(id: number, updatedNotice: Notice) {
    this.apiService
      .updateEntity(id, updatedNotice, Notice)
      .then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          this.refresh();
        }
      })
      .catch((error) => {
        console.error('ilan güncellenirken hata oluştu:', error);
      });
    this.isNoticeEditing = false;
  }

  deleteNotice(id: number) {
    this.apiService.deleteEntity(id, Notice);
    this.getNoticeByMentorId(this.currentUser.id);
    window.location.reload();
  }

  isAddNoticePopupVisible = false;
  toggleAddNoticePopup() {
    this.isAddNoticePopupVisible = !this.isAddNoticePopupVisible;
  }

  async createNotice() {
    this.noticeRequest.mentorUser_Id = this.currentUser.id;

    await this.apiService
      .createEntity(this.noticeRequest, 'Notice')
      .then((res) => {
        console.log(res);
        if (res?.status == ResponseStatus.Ok) {
          this.refresh();
          window.location.reload();
          this.isAddNoticePopupVisible = !this.isAddNoticePopupVisible;
        }
      });
  }

  isNFAPopupVisible: boolean = false;
  toggleNFADetailPopupControl() {
    this.isNFAPopupVisible = !this.isNFAPopupVisible;
  }
}
