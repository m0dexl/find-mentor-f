import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, share } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from 'src/core/models/request/login-request-model';
import { BaseDataResponse } from 'src/core/models/response/base-data-response-model';
import { TokenResponse } from 'src/core/models/response/token-response-model';
import { RegisterRequest } from 'src/core/models/request/register-request-model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endpoint = environment.api_url;

  constructor(private readonly http: HttpClient) { }

  login(request: LoginRequest): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
    .post<BaseDataResponse<TokenResponse>>(
      this.endpoint + "/Auth/Login",
      request
    )
    .pipe(
      map((result) => {
        return result;
      })
    )
  }

  register(request: RegisterRequest):Observable<BaseDataResponse<TokenResponse>>{
    return this.http
    .post<BaseDataResponse<TokenResponse>>(
      this.endpoint + "/Auth/Register",
      request
    )
    .pipe(
      map((result) => {
        return result;
      })
    )
  }
}
