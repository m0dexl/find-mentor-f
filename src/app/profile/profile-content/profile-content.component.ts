import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/core/models/user.model';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  currentUser : User = <User> {};
  ngOnInit() {

  }
  faEdit = faEdit;

  constructor(){
    const userJson = localStorage.getItem('currentUser');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
    console.log(this.currentUser)
    console.log("asdas")
  }

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
