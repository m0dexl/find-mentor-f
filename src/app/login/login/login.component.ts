import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request-model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginRequest: LoginRequest = <LoginRequest>{};

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['../profile']);
    } else {
      const errorMessage =
        'Hatalı giriş yaptınız. Kullanıcı adınızı veya şifrenizi kontrol ediniz.';
        
      if (window.confirm(errorMessage)) {
        this.loginRequest.password = ''; 
      }     
    }
  }
}
