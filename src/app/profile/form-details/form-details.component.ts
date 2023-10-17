import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service'; 
import { Router } from '@angular/router';
import { mentorForm } from 'src/core/models/mentorForm.model';



@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit{
  constructor(private ApiService: ApiService, 
    private router: Router) {
   
  }

  mentorform: mentorForm[] = [];
  //selectedForm: mentorForm | null = null; // Seçilen formu saklamak için bir değişken

  ngOnInit() {  // Bileşen başlatıldığında otomatik olarak "refresh" fonksiyonunu çağırıyoruz.
    this.refresh();
  }

  refresh() {  // refresh fonksiyonu, kategorileri API'den alarak bileşenin "mentorform" dizisine yerleştirir.
    this.ApiService.getAllEntities(mentorForm).subscribe((response) => {     // API hizmetini kullanarak form cevaplarını almak için "getAllEntities" fonksiyonunu çağırıyoruz.
      this.mentorform = response.data;     // API yanıtından gelen kategorileri "mentorform" dizisine atıyoruz.
      console.log(this.mentorform); 
    });
  }
  
  
  
  isPopupVisible = false; // Pop-up'ın görünürlüğünü kontrol etmek için bir değişken ekledik

  examples = [
    {
      started: "vvxvfbff",
    },
    {
      started: ""
    },
    {
      started: ""
    },
    {
      started: ""
    },
    {
      started: ""
    },
    {
      started: ""
    }, {
      started: ""
    },
    {
      started: ""
    },
    {
      started: ""
    }
  ]

  showPopup() {
    this.isPopupVisible = true; // Detaylar düğmesine tıklandığında pop-up'ı göster
    //const mentorForm: mentorForm = { id: 0, FormId: 0, MentorId: 0, started: item.started };
    //this.selectedForm = mentorForm; // Seçilen formu saklayın
    //this.isPopupVisible = true; // Pop-up'ı göster
  }
  
  closePopup() {
    this.isPopupVisible = false; // Kapatma düğmesine tıklandığında veya pop-up'ın dışına tıklandığında pop-up'ı gizle
  }
}

