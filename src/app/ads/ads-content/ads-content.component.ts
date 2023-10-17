import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Notice } from 'src/core/models/notice.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-ads-content',
  templateUrl: './ads-content.component.html',
  styleUrls: ['./ads-content.component.scss']
})
export class AdsContentComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  notices: Notice[] = [];

  ngOnInit(){
    this.refresh();
  }
  refresh(){
    this.apiService.getAllEntities(Notice).subscribe((response) => {
      this.notices = response.data;
    })
  }
}
