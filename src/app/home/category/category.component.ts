import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service'; 
import { Router } from '@angular/router';
import { Categories } from 'src/core/models/categories.model'; 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html', 
  styleUrls: ['./category.component.scss'], 
})
export class CategoryComponent implements OnInit {
  constructor(private ApiService: ApiService, 
    private router: Router) {
   
  }

  categories: Categories[] = []; // Kategorileri depolamak için bir dizi tanımlaması

  ngOnInit() {  // Bileşen başlatıldığında otomatik olarak "refresh" fonksiyonunu çağırıyoruz.
    this.refresh();
  }

  refresh() {  // refresh fonksiyonu, kategorileri API'den alarak bileşenin "categories" dizisine yerleştirir.
    this.ApiService.getAllEntities(Categories).subscribe((response) => {     // API hizmetini kullanarak kategorileri almak için "getAllEntities" fonksiyonunu çağırıyoruz.
      this.categories = response.data;     // API yanıtından gelen kategorileri "categories" dizisine atıyoruz.
      console.log(this.categories); 
    });
  }
}
