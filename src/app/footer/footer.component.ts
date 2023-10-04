import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
library.add(faTwitter, faFacebook, faInstagram);

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

}
