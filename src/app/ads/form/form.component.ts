import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service'; 
import { Router } from '@angular/router';
import {Answer} from 'src/core/models/answer.model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  constructor(private ApiService: ApiService, 
    private router: Router) {
   
  }

  answer: Answer[] = [];

  ngOnInit() {  // Bileşen başlatıldığında otomatik olarak "refresh" fonksiyonunu çağırıyoruz.
    this.refresh();
  }

  refresh() {  
    this.ApiService.getAllEntities(Answer).subscribe((response) => {     
      this.answer = response.data;     
      console.log(this.answer); 
    });
  }

  //

}
