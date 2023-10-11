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
  providers: [MessageService,ConfirmationService]
})
export class SignupComponent implements OnInit {

  public registerRequest: RegisterRequest = <RegisterRequest> {};

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async signup(){
    let status = await this.authService.register(this.registerRequest);

    if(status == ResponseStatus.Ok){
      this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde eklendi', life: 3000 });
      await this.router.navigate(['../profile']);
    }else if(status == ResponseStatus.Invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Kullanıcı oluşturulamadı' });
      this.registerRequest.Password = '';
    }
  }
}
