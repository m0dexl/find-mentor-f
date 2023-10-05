import { Component } from '@angular/core';
import { faCircle, faSchool, faPersonChalkboard, faChalkboardUser, faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  faCircle = faCircle;
  faSchool = faSchool;
  faPersonChalkboard = faPersonChalkboard;
  faChalkboardUser = faChalkboardUser;
  faChalkboardTeacher = faChalkboardTeacher;
}
