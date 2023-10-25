import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.showMentor();
  }

  users: User[] = [];

  showMentor() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data.filter((user) => user.userType === 1); //sadece mentorleri görüntülemek için
      console.log(response);
    });
  }


  //Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;       
}

}
