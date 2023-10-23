import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  
//Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;       
}

}
