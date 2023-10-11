import { Component } from '@angular/core';

@Component({
  selector: 'app-form-details-pop-up',
  templateUrl: './form-details-pop-up.component.html',
  styleUrls: ['./form-details-pop-up.component.scss'],
})
export class FormDetailsPopUpComponent {
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

    // Düzenleme başladığında, metin kutularına mevcut değerleri aktar
    // this.editedIlanAdi = this.ilanAdi;
    // this.editedIlanKategorisi = this.ilanKategorisi;
    // this.editedIlanTarihi = this.ilanTarihi;
  }

  kaydetIlan() {
    // Metin kutularındaki değerleri kaydedilen değerlere aktar
    this.ilanAdi = this.editedIlanAdi;
    this.ilanKategorisi = this.editedIlanKategorisi;
    this.ilanTarihi = this.editedIlanTarihi;

    this.isEditing = false; //düzneleme modunu kapat
    console.log('asdasd:', this.ilanAdi);
  }

  
  ekleIlan() {

    // Tüm giriş alanlarının doldurulup doldurulmadığını kontrol edin
    if (this.addIlanAdi && this.addIlanKategorisi && this.addIlanTarihi) {
  
      alert('İlan eklendi');

      this.ilanAdi = this.addIlanAdi;
      this.ilanKategorisi = this.addIlanKategorisi;
      this.ilanTarihi = this.addIlanTarihi;

      this.ilanEkleVisible = !this.ilanEkleVisible; //ilan başarılı şekilde eklenirse popupı kapat

    } else {
      alert('Eksik veya yanlış yazdınız.Tekrar kontrol ediniz.');


    }
  }
}
