import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/core/models/category.model';
import { Notice } from 'src/core/models/notice.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-ads-content',
  templateUrl: './ads-content.component.html',
  styleUrls: ['./ads-content.component.scss'],
})
export class AdsContentComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  notices: Notice[] = [];
  categories: Category[] = []; // Kategorileri tutacak dizi
  filteredNotices: Notice[] = [];
  selectedCategory: any;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    //ilanları alıyoruz
    this.apiService.getAllEntities(Notice).subscribe((response) => {
      this.notices = response.data;
      this.filteredNotices = response.data;
      // İlan başlığını ve kategori adını büyük harfe dönüştürme
      this.notices.forEach((notice) => {
        notice.noticeTitle =
          notice.noticeTitle.charAt(0).toUpperCase() +
          notice.noticeTitle.slice(1);
        notice.noticeCategoryName =
          notice.noticeCategoryName.charAt(0).toUpperCase() +
          notice.noticeCategoryName.slice(1);
      });

      this.apiService.getAllEntities(Category).subscribe((response) => {
        this.categories = response.data;
      });
    });
  }

  // filterNotices() {
  //   if (this.selectedCategory === '' && this.notices) {
  //    for (let val of this.notices) {
  //      if (val.noticeCategoryName == this.selectedCategory) {
  //        this.filteredNotices.push(val);
  //      }
  //    }
  //    console.log(this.filteredNotices)
  //   } else {
  //     this.filteredNotices = this.notices.filter(
  //       (notice) => notice.noticeCategoryName === this.selectedCategory
  //     );
  //   }
  // }

  filterNotices() {
    console.log(this.selectedCategory);
    // if (this.selectedCategory === '') {
    //   // Hiçbir kategori seçilmediyse, tüm ilanları göster
    //   this.filteredNotices = this.notices;
    // } else {
    //   // Kategori seçildiyse, ilanları kategoriye göre filtrele
    //   this.filteredNotices = this.notices.filter(
    //     (notice) =>
    //       notice.noticeCategoryName.toLowerCase() ===
    //       this.selectedCategory.toLowerCase()
    //   );
    // }
  }
}
