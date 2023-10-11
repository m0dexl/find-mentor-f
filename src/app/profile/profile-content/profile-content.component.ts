import { Component } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent {
  faEdit = faEdit;

  users= [
    {
      username: "camila",
      name: "Camila",
      lastname: "Smith",
      category: "UI Designer",
      email: "jsmith@gmail.com",
      phoneno: 8802123456,
      createdDate: "13 July 1983"
    }
  ]

  inputUsername:boolean = false;


  showInputUsername(){
    this.inputUsername = !this.inputUsername;
  }

}
