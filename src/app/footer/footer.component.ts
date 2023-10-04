import { Component } from '@angular/core';
import { faInstagram,faTwitter,faFacebook } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
}
