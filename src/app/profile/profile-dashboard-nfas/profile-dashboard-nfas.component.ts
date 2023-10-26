import { Component, OnInit } from '@angular/core';
import { Category } from 'src/core/models/category.model';
import { Notice } from 'src/core/models/notice.model';
import { NoticeFormAnswer } from 'src/core/models/noticeformanswer.model';
import { NoticeRequest } from 'src/core/models/request/notice-request-model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-profile-dashboard-nfas',
  templateUrl: './profile-dashboard-nfas.component.html',
  styleUrls: ['./profile-dashboard-nfas.component.scss'],
})
export class ProfileDashboardNfasComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.refresh();
    this.getCurrentUserNoticeFormAnswers();
  }
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  refresh() {
    this.getCurrentUser();
    this.getCategories();
    this.getNoticeByMentorId(this.currentUser.id);
  }

  public noticeRequest: NoticeRequest = <NoticeRequest>{};

  currentUser: User = <User>{};
  currentUserNotice: Notice = <Notice>{};
  currentUserHaveNotice: boolean = false;
  allNoticeFormAnswers: NoticeFormAnswer[] = [];
  currentUserNoticeFormAnswers: NoticeFormAnswer[] = [];
  allNotices: Notice[] = [];
  allCategories: Category[] = [];

  NoticeToEdit: Notice | null = null;

  currentNfa: NoticeFormAnswer = <NoticeFormAnswer>{};

  getCurrentUser() {
    const userJson = sessionStorage.getItem('current_user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
  }

  getCategories() {
    this.apiService.getAllEntities(Category).subscribe((res) => {
      this.allCategories = res.data;
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
        if (
          val.notice_Id == this.currentUserNotice.id &&
          !this.currentUserNoticeFormAnswers.includes(val)
        ) {
          this.currentUserNoticeFormAnswers.push(val);
        }
      }
    });
  }

  isNFAPopupVisible: boolean = false;
  openNFADetailPopupControl(currNfa: NoticeFormAnswer) {
    this.currentNfa = currNfa;
    this.isNFAPopupVisible = true;
  }
  closeNFADetailPopup() {
    this.isNFAPopupVisible = false;
  }

  isNoticeDetailPopupVisible: boolean = false;
  isNoticeEditing = false;

  toggleNoticeDetailPopup() {
    this.isNoticeDetailPopupVisible = !this.isNoticeDetailPopupVisible;
    this.isNoticeEditing = false;
  }

  isAddNoticePopupVisible = false;
  toggleAddNoticePopup() {
    this.isAddNoticePopupVisible = !this.isAddNoticePopupVisible;
  }

  deleteNotice(id: number) {
    this.apiService.deleteEntity(id, Notice);
    this.getNoticeByMentorId(this.currentUser.id);
    this.getCurrentUserNoticeFormAnswers();
    window.location.reload();
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

  async createNotice() {
    this.noticeRequest.mentorUser_Id = this.currentUser.id;
    console.log(123);

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
}
