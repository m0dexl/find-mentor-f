import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service'; 
import { Router } from '@angular/router';
import { NoticeFormAnswer} from 'src/core/models/noticeformanswer.model';
import { Notice } from 'src/core/models/notice.model';
import { NoticeRequest } from 'src/core/models/request/notice-request-model';



@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit{
  constructor(private apiService: ApiService, 
    private router: Router) {
   
  }

  notices: Notice = <Notice>{};  //ilanları depolamak için dizi
  // public noticee : Notice = <Notice> {};

  public noticeRequest : NoticeRequest = <NoticeRequest>{};


  noticeformanswer: NoticeFormAnswer[] = [];
  //selectedForm: mentorForm | null = null; // Seçilen formu saklamak için bir değişken

  ngOnInit() {  // Bileşen başlatıldığında otomatik olarak "refresh" fonksiyonunu çağırıyoruz.
    this.refresh();
    // this.getNoticeById(3);
    this.getNoticeById(3);

  }

  refresh() {  // refresh fonksiyonu, kategorileri API'den alarak bileşenin "mentorform" dizisine yerleştirir.
    this.apiService.getAllEntities(NoticeFormAnswer).subscribe((response) => {     // API hizmetini kullanarak form cevaplarını almak için "getAllEntities" fonksiyonunu çağırıyoruz.
      this.noticeformanswer = response.data;     // API yanıtından gelen kategorileri "mentorform" dizisine atıyoruz.
      console.log(this.noticeformanswer); 
    });

    // this.apiService.getEntityById(3, Notice).sub{}
  }
  getNoticeById(id:number){
    this.apiService.getEntityById(id,Notice).then((response: any) =>{
      this.notices = response?.data;
      console.log(response?.data)
    });
  }
  
  
  
  isPopupVisible = false; // Pop-up'ın görünürlüğünü kontrol etmek için bir değişken ekledik

  

  showPopup() {
    this.isPopupVisible = true; // Detaylar düğmesine tıklandığında pop-up'ı göster
    //const mentorForm: mentorForm = { id: 0, FormId: 0, MentorId: 0, started: item.started };
    //this.selectedForm = mentorForm; // Seçilen formu saklayın
    //this.isPopupVisible = true; // Pop-up'ı göster
  }
  
  closePopup() {
    this.isPopupVisible = false; // Kapatma düğmesine tıklandığında veya pop-up'ın dışına tıklandığında pop-up'ı gizle
  }


  // aşağısı özgenin kısmı

  isPopupVisibleNotice = true;
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

  showPopupNotice() {
    this.isPopupVisibleNotice = !this.isPopupVisibleNotice;
    console.log(this.notices);
  }

  closePopupNotice() {
    this.isPopupVisibleNotice = !this.isPopupVisibleNotice;
  }

  showIlanEkle() {
    this.ilanEkleVisible = !this.ilanEkleVisible;
  }

  closeIlanEkle() {
    this.ilanEkleVisible = !this.ilanEkleVisible;
  }

  // noticess = this.notices[0];

  ilanSil(id:number) {
    this.apiService.deleteEntity(id,Notice)

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

