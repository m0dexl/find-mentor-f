import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/core/models/user.model';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request-model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { TokenResponse } from 'src/core/models/response/token-response-model';
import { RegisterRequest } from 'src/core/models/request/register-request-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Kullanıcının mevcut durumunu temsil eden Observable.
  public currentUser: Observable<User | null>;
  // Kullanıcının mevcut durumunu saklayan özel BehaviorSubject.
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private readonly apiService: ApiService, private router: Router) { //(API çağrıları yapmak için kullanılır.)
     //Bu kod satırı, AuthService sınıfının kurucu fonksiyonunda yer alır 
    // kullanıcının mevcut oturum durumunu saklamak için kullanılan bir BehaviorSubject nesnesini başlatır.
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(<string>sessionStorage.getItem('current_user')))
    //(currentUserSubject, sessionStorage'da saklanan mevcut kullanıcı bilgisini tutar.)
    this.currentUser = this.currentUserSubject.asObservable();//kullanıcının mevcut oturum durumunu izlemek ve diğer bileşenlerle paylaşmak için kullanılır. 
  }

  public get currentValue(): User | null{ //kullanıcının mevcut durumunu okuma işlemi
    return this.currentUserSubject.value;
  }

 // Kullanıcı girişi işlemi
  //Kullanıcıların oturum açma isteklerini işlerken, alınan yanıtları ve kullanıcı bilgilerini günceller.
  // public async login(request: LoginRequest): Promise<ResponseStatus> {
  //   const loginResponse = await this.apiService.login(request).toPromise();

  //   let status = loginResponse!.status;

  //   if (status == ResponseStatus.Ok) {
  //     this.setToken(loginResponse!.data);

  //     const profileResponse = await this.apiService
  //       .getProfileInfo()
  //       .toPromise();
  //   // console.log("sad")

  //     status = profileResponse!.status;

  //     if (status == ResponseStatus.Ok) {
  //       sessionStorage.setItem('current_user', JSON.stringify(profileResponse!.data));

  //       this.currentUserSubject.next(profileResponse!.data);
  //     } else {
  //       await this.logOut();
  //     }
  //   }

  //   return status;
  // }

  public async login (request: LoginRequest): Promise<ResponseStatus> {
    const LoginResponse = await this.apiService.login(request).toPromise();

    let status = LoginResponse!.status;

    if(status == ResponseStatus.Ok){
      await this.setUserInfo(LoginResponse?.data!);
    }

    return status;
  }

  async setUserInfo(token: TokenResponse){
    this.setToken(token);

    const userProfileResponse = await this.apiService.getProfileInfo().toPromise();

    let status = userProfileResponse?.status;

    const userProfile = userProfileResponse?.data;

    if(status == ResponseStatus.Ok && userProfile){
        sessionStorage.setItem('current_user', JSON.stringify(userProfileResponse!.data));
        this.currentUserSubject.next(userProfileResponse!.data);
    } else {
      await this.logOut();
    }
  }

  //Bu fonksiyon, bir kayıt isteği alır ve bu isteği işleyerek bir ResponseStatus değeri içeren bir Promise döndürür.(register fonksiyonunun tanımını ve imzasını oluşturur. )
  public async register(request: RegisterRequest): Promise<ResponseStatus> {


    //kullanıcının kayıt işlemini başlatır ve bu işlemin sonucunu registerResponse değişkeninde saklar.
    //Bu, kayıt işleminin başarı durumunu ve alınan cevap verilerini işlemek için kullanılır.
    const registerResponse = await this.apiService.register(request).toPromise();
  
    let status = registerResponse!.status; //kayıt işleminin sonucunu temsil eden işlem durumunu status adlı bir değişkende saklar. 
  
    if (status == ResponseStatus.Ok) { // İşlem durumu 'Ok' olduğunda (kayıt başarılı ise) bu blok çalışır.
      this.setToken(registerResponse!.data);// Oturum bilgilerini güncelle

      // Kullanıcının oturumunu kapat ve oturum bilgilerini temizle
      sessionStorage.setItem('current_user', JSON.stringify({}));
      this.currentUserSubject.next({} as User);
    }
  
    return status;
  }
  
    public async refreshToken(): Promise<boolean> { // Oturum yenileme işlemi başlar.
      const refreshTokenResponse = await this.apiService // refreshTokenResponse adlı bir değişken oluştur ve oturum yenileme isteğini yap
        .refreshToken(<string>sessionStorage.getItem('refresh_token')) // Mevcut tarayıcı oturumunun yenileme belirtecini alır
        .toPromise();
  
      if (refreshTokenResponse!.status == ResponseStatus.Ok) {  // Oturum yenileme işleminin sonucunu kontrol et
        this.setToken(refreshTokenResponse!.data); // Yenilenmiş oturum bilgilerini ayarla
  
        return true; // İşlem başarılı, true döndür
      }
  
      return false; // İşlem başarısız, false döndür
    }


  private setToken(token: TokenResponse | null) { // Oturum bilgilerini saklama işlemi başlar.
    if(token != null){  // Eğer gelen oturum bilgileri (token) null değilse, bu bloğa girilir.
       
      sessionStorage.setItem('access_token',JSON.stringify(token.accessToken)); // Erişim belirtecini tarayıcı oturumu içinde sakla
      sessionStorage.setItem('token_expiration', JSON.stringify(token.expiration)); // Belirtecin son kullanma süresini sakla
      sessionStorage.setItem('refresh_token', JSON.stringify(token.refreshToken));   // Yenileme belirtecini tarayıcı oturumu içinde sakla
    }
  }

  async logOut() {   // Oturum kapatma işlemi başlar.
    sessionStorage.clear(); // Tarayıcı oturumu içindeki tüm verileri temizle
    this.currentUserSubject.next(null);  // Kullanıcının oturumunu sonlandır ve değeri null olarak ayarla
  }
}
