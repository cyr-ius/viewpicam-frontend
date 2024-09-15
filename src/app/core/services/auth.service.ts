import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ApiToken, CamToken, current_user, Login, OtpSecret, Token, User } from '../models/app-models';
import { BASE_URL } from '../tokens/app.token';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = inject(BASE_URL)

  private currentUser = signal<current_user|null>(null);
  current_user = this.currentUser.asReadonly();
  private expiresIn = signal<number>(new Date().getTime());
  expires_in = this.expiresIn.asReadonly();
  private Message = signal<string|null>(null)
  message = this.Message.asReadonly()

  private remember = signal(false);


  constructor(
    private router: Router,
    private common: CommonService,
    private http: HttpClient
  ) {}

  login(login: Login): Observable<HttpResponse<Token>>{
    this.remember.set(login.remember)
    const now = new Date().getTime()
    return this.http.post<Token>(`${this.BASE_URL}/idp/authorize`, login, { observe: 'response' }).pipe(
      tap((rsp) => {
        this.setExpiresIn(rsp.body!.expires_in * 1000 + now)
      })
    )
  }

  logout():Observable<void>{
    if (this.remember()){
      this.currentUser.set(null);
      this.router.navigate(['login']);
      return of();
    }
    return this.http.get<void>(`${this.BASE_URL}/idp/logout`).pipe(
      tap((data) => {
        this.currentUser.set(null);
        this.router.navigate(['login']);
      })
    );
  }

  getUserInfo():Observable<HttpResponse<User>>{
    return this.http.get<User>(`${this.BASE_URL}/idp/userinfo`, { observe: 'response' })
  }

  firstenrollment(): Observable<HttpResponse<undefined>>{
    return this.http.get<undefined>(`${this.BASE_URL}/idp/firstenrollment`, { observe: 'response' })
  }

  register(login:Login):Observable<void>{
    return this.http.post<void>(`${this.BASE_URL}/idp/register`, login)
  }

  getJWToken(){
    return localStorage.getItem("access_token");
  }

  checkOTPToken(user_id:number, secret:OtpSecret):Observable<any>{
    return this.http.post(`${this.BASE_URL}/otp/${user_id}`, secret);
  }

  revokeOTPToken(user_id:number,):Observable<any>{
    return this.http.delete(`${this.BASE_URL}/otp/${user_id}`);
  }

  getOTPQrCode(user_id:number):Observable<any> {
    return this.http.get(`${this.BASE_URL}/otp/${user_id}`);
  }


  setCameraToken():Observable<void>{
    return this.http.post(`${this.BASE_URL}/idp/camera_token`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getCameraToken():Observable<CamToken>{
    return this.http.get<CamToken>(`${this.BASE_URL}/idp/camera_token`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  deleteCameraToken():Observable<void>{
    return this.http.delete(`${this.BASE_URL}/idp/camera_token`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  setApiToken():Observable<void>{
    return this.http.post(`${this.BASE_URL}/idp/token`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getApiToken():Observable<ApiToken>{
    return this.http.get<ApiToken>(`${this.BASE_URL}/idp/token`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  deleteApiToken():Observable<void>{
    return this.http.delete(`${this.BASE_URL}/idp/token`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  parseJwt(token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  isExpired(token:string) {
    let tokenPayload = this.parseJwt(token);
    return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.exp;
  }

  setCurrentUser(user:current_user|null) {
    this.currentUser.set(user)
  }

  setMessage(msg: string|null): void {
    this.Message.set(msg)
  }

  setExpiresIn(value: number): void {
    localStorage.setItem("expires_in", value.toString())
    this.expiresIn.set(value)
  }

}
