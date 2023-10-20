import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { NoticeFormAnswer } from 'src/core/models/noticeformanswer.model';
import { Notice } from 'src/core/models/notice.model';
import { NoticeRequest } from 'src/core/models/request/notice-request-model';
import { User } from 'src/core/models/user.model';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss'],
})
export class FormDetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.refresh();
  }

  currentUser: User = <User>{};
  currentUsersNotice: Notice = <Notice>{};
  public noticeRequest: NoticeRequest = <NoticeRequest>{};
  noticeformanswer: NoticeFormAnswer[] = [];

  allNotices: Notice[] = [];

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
      this.allNotices = response.data;
      for (let val of this.allNotices) {
        if (val.mentorUser_Id == id) {
          this.currentUsersNotice = val;
        }
      }
    });
  }
  getNoticeFormAnswers() {
    this.apiService.getAllEntities(NoticeFormAnswer).subscribe((response) => {
      this.noticeformanswer = response.data;
    });
  }

  isNoticeDetailPopupVisible: boolean = true;
  noticeDetailPopupControl() {
    this.isNoticeDetailPopupVisible = !this.isNoticeDetailPopupVisible;
  }

  isPopupVisible: boolean = false;

  showPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  isEditing = false;
  ilanEkleVisible = false;
  isFormValid = true;

  ilanAdi: string = 'Frontend Eğitimi';
  ilanKategorisi: string = 'Bilgisayar/Yazılım';
  ilanTarihi: string = '9.10.2023';

  editedIlanAdi: string = '';
  editedIlanKategorisi: string = '';
  editedIlanTarihi: string = '';

  addIlanAdi: string = '';
  addIlanKategorisi: string = '';
  addIlanTarihi: string = '';

  showIlanEkle() {
    this.ilanEkleVisible = !this.ilanEkleVisible;
  }

  closeIlanEkle() {
    this.ilanEkleVisible = !this.ilanEkleVisible;
  }

  ilanSil(id: number) {
    this.apiService.deleteEntity(id, Notice);
  }

  duzenleIlan() {
    this.isEditing = true;
  }

  kaydetIlan() {
    this.ilanAdi = this.editedIlanAdi;
    this.ilanKategorisi = this.editedIlanKategorisi;
    this.ilanTarihi = this.editedIlanTarihi;
    this.isEditing = false;
  }

  ekleIlan() {
    if (this.addIlanAdi && this.addIlanKategorisi && this.addIlanTarihi) {
      alert('İlan eklendi');
      this.ilanAdi = this.addIlanAdi;
      this.ilanKategorisi = this.addIlanKategorisi;
      this.ilanTarihi = this.addIlanTarihi;
      this.ilanEkleVisible = !this.ilanEkleVisible;
    } else {
      alert('Eksik veya yanlış yazdınız.Tekrar kontrol ediniz.');
    }
  }
}
