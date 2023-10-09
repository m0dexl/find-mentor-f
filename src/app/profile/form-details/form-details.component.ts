import { Component } from '@angular/core';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent {
  isPopupVisible = false; // Pop-up'ın görünürlüğünü kontrol etmek için bir değişken ekledik

  showPopup() {
    this.isPopupVisible = true; // Detaylar düğmesine tıklandığında pop-up'ı göster
  }
  
  closePopup() {
    this.isPopupVisible = false; // Kapatma düğmesine tıklandığında veya pop-up'ın dışına tıklandığında pop-up'ı gizle
  }
}

