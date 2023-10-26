import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/core/models/category.model';
import { Notice } from 'src/core/models/notice.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-ads-content',
  templateUrl: './ads-content.component.html',
  styleUrls: ['./ads-content.component.scss'],
})
export class AdsContentComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  notices: Notice[] = [];
  categories: Category[] = [];
  filteredNotices: Notice[] = [];
  selectedCategory: string = '';

  ngOnInit() {
    this.selectedCategory = this.route.snapshot.paramMap.get('category')!;
    console.log(this.selectedCategory);
    this.getCategories();
    this.refresh();
  }
  refresh() {
    this.apiService.getAllEntities(Notice).subscribe((response) => {
      this.notices = response.data;
      console.log();
      if (this.selectedCategory == '' || !this.selectedCategory) {
        this.filteredNotices = this.notices;
      } else {
        this.filteredNotices = this.notices.filter(
          (notice) =>
            notice.noticeCategoryName.toLowerCase() ===
            this.selectedCategory.toLowerCase()
        );
      }
      this.notices.forEach((notice) => {
        notice.noticeTitle =
          notice.noticeTitle.charAt(0).toUpperCase() +
          notice.noticeTitle.slice(1);
        notice.noticeCategoryName =
          notice.noticeCategoryName.charAt(0).toUpperCase() +
          notice.noticeCategoryName.slice(1);
      });
    });
  }

  getCategories() {
    this.apiService.getAllEntities(Category).subscribe((response) => {
      this.categories = response.data;
    });
  }

  filterNotices() {
    if (this.selectedCategory == '') {
      this.filteredNotices = this.notices;
    } else if (this.selectedCategory != '') {
      this.filteredNotices = this.notices.filter(
        (notice) =>
          notice.noticeCategoryName.toLowerCase() ===
          this.selectedCategory.toLowerCase()
      );
    }
  }
}
