import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Category } from 'src/core/models/category.model';

@Component({
  selector: 'app-categories-content',
  templateUrl: './categories-content.component.html',
  styleUrls: ['./categories-content.component.scss'],
})
export class CategoriesContentComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  categories: Category[] = []; // Kategorileri depolamak için bir dizi tanımlaması

  ngOnInit() {
    // Bileşen başlatıldığında otomatik olarak "refresh" fonksiyonunu çağırıyoruz.
    this.refresh();
  }

  refresh() {
    // refresh fonksiyonu, kategorileri API'den alarak bileşenin "categories" dizisine yerleştirir.
    this.apiService.getAllEntities(Category).subscribe((response) => {
      // API hizmetini kullanarak kategorileri almak için "getAllEntities" fonksiyonunu çağırıyoruz.
      this.categories = response.data; // API yanıtından gelen kategorileri "categories" dizisine atıyoruz.

      // Büyük harf yapma işlemi
      this.categories = this.categories.map((category) => {
        return {
          ...category,
          category_Name:
            category.category_Name.charAt(0).toLocaleUpperCase('tr') +
            category.category_Name.slice(1),
          category_Description:
            category.category_Description.charAt(0).toLocaleUpperCase('tr') +
            category.category_Description.slice(1),
        };
      });

      console.log(this.categories);
    });
  }
}
