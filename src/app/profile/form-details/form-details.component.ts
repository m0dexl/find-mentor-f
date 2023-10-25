import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { NoticeFormAnswer } from 'src/core/models/noticeformanswer.model';
import { Notice } from 'src/core/models/notice.model';
import { NoticeRequest } from 'src/core/models/request/notice-request-model';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
  noticeformanswer: NoticeFormAnswer[] = [];

  allNotices: Notice[] = [];

  NoticeToEdit: Notice | null = null;

  async refresh() {
    this.getCurrentUser();
    this.getNoticeByMentorId(this.currentUser.id);
    this.getNoticeFormAnswers();
  }
  getCurrentUser() {
    const userJson = sessionStorage.getItem('current_user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
  }
  getNoticeByMentorId(id: number) {
    // this.apiService.getEntityById(id, Notice).then((response: any) => {
    //   this.currentUsersNotice = response?.data;
    //   console.log('sa', response?.data);
    // });
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
  getNoticeFormAnswers() {
    this.apiService.getAllEntities(NoticeFormAnswer).subscribe((response) => {
      this.noticeformanswer = response.data;
    });
  }

  isNoticeDetailPopupVisible: boolean = false;
  toggleNoticeDetailPopup() {
    this.isNoticeDetailPopupVisible = !this.isNoticeDetailPopupVisible;
    this.isNoticeEditing = false;
  }

  deleteNotice(id: number) {
    this.apiService.deleteEntity(id, Notice);
    this.getNoticeByMentorId(this.currentUser.id);
    window.location.reload();
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

  editedNoticeTitle: string = '';
  editedNoticeDescription: string = '';
  editedNoticeCategoryName: string = '';

  isNFAPopupVisible: boolean = false;
  toggleNFADetailPopupControl() {
    this.isNFAPopupVisible = !this.isNFAPopupVisible;
  }

  isNoticeEditing = false;
  isFormValid = true;

  // ilanAdi: string = 'Frontend Eğitimi';
  // ilanKategorisi: string = 'Bilgisayar/Yazılım';
  // ilanTarihi: string = '9.10.2023';
  // ilanAciklamasi: string = '';

  // mevcut ilanı güncellemeye yarayan şeyler

  addIlanAdi: string = '';
  addIlanKategorisi: string = '';
  addIlanTarihi: string = '';
  addIlanAciklamasi: string = '';

  isAddNoticePopupVisible = false;
  toggleAddNoticePopup() {
    this.isAddNoticePopupVisible = !this.isAddNoticePopupVisible;
  }

  editNotice() {
    this.isNoticeEditing = true;
    this.NoticeToEdit = this.currentUserNotice;
  }

  kaydetIlan() {
    this.isNoticeEditing = false;
  }

  async ekleIlan() {
    this.noticeRequest.mentorUser_Id = this.currentUser.id;

    await this.apiService
      .createEntity(this.noticeRequest, 'Notice')
      .then((res) => {
        console.log(res);
        if (res?.status == ResponseStatus.Ok) {
          this.refresh();
          window.location.reload();
        }
      });

    // if (this.addIlanAdi && this.addIlanKategorisi && this.addIlanAciklamasi) {
    //   if (this.addIlanAciklamasi.length >= 100) {
    //     alert('İlan eklendi');
    //     this.currentUserNotice.noticeTitle = this.addIlanAdi;
    //     this.currentUserNotice.noticeCategoryName = this.addIlanKategorisi;
    //     this.currentUserNotice.noticeDescription = this.addIlanAciklamasi;
    //     this.isAddNoticePopupVisible = !this.isAddNoticePopupVisible;
    //   } else {
    //     alert(
    //       'İlan açıklaması en az 100 karakter içermelidir. Lütfen tekrar kontrol ediniz.'
    //     );
    //   }
    // } else {
    //   alert('Eksik veya yanlış bilgi girdiniz. Lütfen tekrar kontrol ediniz.');
    // }
  }
}
