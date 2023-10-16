import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notice } from 'src/core/models/notice.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-form-details-pop-up',
  templateUrl: './form-details-pop-up.component.html',
  styleUrls: ['./form-details-pop-up.component.scss'],
})
export class FormDetailsPopUpComponent implements OnInit {
  constructor(private apiService: ApiService, 
    private router: Router) {}

  notices: Notice[] = [];  //ilanları depolamak için dizi

  ngOnInit() {  //sayfa yüklendiğinde çalışacak fonksiyon
    this.refreshData();
  }

  refreshData() {  //ilanları apiden alarak bileşenin notices dizisine yerleştirir
    this.apiService.getAllEntities(Notice).subscribe((response) => {   //getallentites kullanarak tüm ilanları çağırıyoruz
      this.notices = response.data;   //apiden gelen yanıtı notices dizisine atıyoruz
      console.log(this.notices);
    });
  }

  isPopupVisible = true;
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

  showPopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  showIlanEkle() {
    this.ilanEkleVisible = !this.ilanEkleVisible;
  }

  closeIlanEkle() {
    this.ilanEkleVisible = !this.ilanEkleVisible;
  }

  ilanSil() {
    if (confirm('İlanı silmek istediğinizden emin misiniz?')) {
      // Silme işlemi burada gerçekleştirilebilir
      this.ilanAdi = '';
      this.ilanKategorisi = '';
      this.ilanTarihi = '';
      this.isPopupVisible = true;
      this.isEditing = false;
    }
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
