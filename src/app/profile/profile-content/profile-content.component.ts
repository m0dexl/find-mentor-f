import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
})
export class ProfileContentComponent implements OnInit {
  faRightFromBracket = faRightFromBracket;

  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit() {
    this.getCurrentUser();
    this.divideFullname(this.currentUser.fullName);
    // this.firstName = this.getName(this.currentUser.fullName);
    // this.lastName = this.getLastname(this.currentUser.fullName);
  }

  currentUser: User = <User>{};
  firstName: string = '';
  lastName: string = '';

  faEdit = faEdit;

  getCurrentUser() {
    const userJson = sessionStorage.getItem('current_user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
  }

  divideFullname(fullName: string) {
    console.log(fullName.length);
    if (fullName.length == 1) {
      this.firstName = fullName;
    } else {
      const words = fullName.split(' ');
      words.pop();
      this.firstName = words.join(' ');

      const words2 = fullName.split(' ');
      this.lastName = words2[words2.length - 1];
    }
  }

  // getName(fullName: string) {
  //   const words = fullName.split(' ');
  //   words.pop();
  //   return words.join(' ');
  // }

  // getLastname(fullName: string) {
  //   const words = fullName.split(' ');
  //   return words[words.length - 1];
  // }

  inputUsername: boolean = false;

  showInputUsername() {
    this.inputUsername = !this.inputUsername;
  }
}
