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
   validateName() {
     if (this.firstName.length > 20) {
       alert('Adınız en fazla 20 karakter içermelidir.');
       this.firstName = this.firstName.slice(0, 20); // Adı 20 karaktere kırp
     }
     if (/[!@#$%^&*(),.?":{}|<>]/.test(this.firstName)) {
       alert('Adınız özel karakter içeremez.');
       this.firstName = this.firstName.replace(/[!@#$%^&*(),.?":{}|<>]/g, ''); // Özel karakterleri kaldır
     }
   }

   isValidEmail(email: string): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)/;
    return emailPattern.test(email);
  }


  async signup() {

    //if else bloğunu ekledim
    if (this.password && this.passwordConfirm && this.password == this.passwordConfirm) {
      
      // if (this.firstName.length > 20) { //max 20 karakter
      //   alert('Adınız en fazla 20 karakter içermelidir.');
      //   return;
      // }
      // // first name özel karakter girilememe
      // if (/[!@#$%^&*(),.?":{}|<>]/.test(this.firstName)) {
      //   alert('Adınız özel karakter içeremez.');
      //   return;
      // }
      if (this.registerRequest.userName.length < 6 || this.registerRequest.userName.length > 15) {
        alert('Kullanıcı adınız en az 6, en fazla 15 karakter içermelidir.');
        return;
      }
      if (this.password.length < 6 || this.password.length > 20) {
        alert('Şifreniz en az 6, en fazla 20 karakter içermelidir.');
        return;
      }
      if (!this.isValidEmail(this.registerRequest.email)) {
        alert('Geçerli bir e-posta adresi giriniz.');
        return;
      }

      this.validateName()
      
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
