import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegisterRequest } from 'src/core/models/request/register-request-model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SignupComponent {

  firstName: string = ''; //ben ekledim 
  lastName: string = ''; //ben ekledim

  //registerRequest: any = {}; //ben ekledim


  password: string = '';
  passwordConfirm: string = '';
  // passwordsDoNotMatch: boolean = false; // ben ekledim



  checkPasswordMatch(): boolean {
    return this.password === this.passwordConfirm;
  }

  public registerRequest: RegisterRequest = <RegisterRequest>{}; //gpt bunu kaldır dedi

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ) { }

  async signup() {

    //if else bloğunu ekledim
    if (this.password && this.passwordConfirm && this.password == this.passwordConfirm) {

      if (this.firstName.length < 6) {
        alert('Adınız en az 6 karakter içermelidir.');
        return;
      }
      
      this.registerRequest.password = this.passwordConfirm
      this.registerRequest.fullName = `${this.firstName} ${this.lastName}` //ben ekledim

      let status = await this.authService.register(this.registerRequest);

      if (status == ResponseStatus.Ok) {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde eklendi', life: 3000 });
        await this.router.navigate(['../profile']);
      } else if (status == ResponseStatus.Invalid) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Kullanıcı oluşturulamadı' });
      }
    } else {
      alert("Şifreler Uyuşmuyor!");
    }
  }
}
