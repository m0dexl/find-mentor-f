import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { ApiService } from 'src/core/services/api/api.service';
import { NoticeFormAnswerRequest } from 'src/core/models/request/noticeformanswer-request-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class FormComponent {
  public formAnswerRequest: NoticeFormAnswerRequest = <NoticeFormAnswerRequest>{};

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  async formAnswer() {
    this.apiService.formAnswer(this.formAnswerRequest).subscribe(
      (response) => {
        if (response.status === ResponseStatus.Ok) {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Form yanıtları başarıyla gönderildi',
          });
         
        } else if (response.status === ResponseStatus.Invalid) {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Geçersiz form yanıtları',
          });
          
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Beklenmeyen bir hata oluştu',
          });
          
        }
      },
      (error) => {
        console.error('API çağrısı sırasında bir hata oluştu', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'API çağrısı sırasında bir hata oluştu',
        });
        
      }
    );
  }
}

