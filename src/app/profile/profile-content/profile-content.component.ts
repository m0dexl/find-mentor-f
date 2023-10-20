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
  firstName: string = "";
  lastName: string = "";
  
  faEdit = faEdit;

  constructor(){}

  ngOnInit() {
    this.getCurrentUser();
    this.firstName = this.getName(this.currentUser.fullName);
    this.lastName = this.getLastname(this.currentUser.fullName);
  }

  getCurrentUser(){
    const userJson = sessionStorage.getItem('current_user');
    console.log(userJson)
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
    console.log("sa",this.currentUser)
  }

  getName(fullName: string){
    const words = fullName.split(' ');
    words.pop();
    return words.join(' ');
  }

  getLastname(fullName: string){
    const words = fullName.split(' ');
    return words[words.length - 1];
  }
  

  inputUsername:boolean = false;


  showInputUsername(){
    this.inputUsername = !this.inputUsername;
  }

}
