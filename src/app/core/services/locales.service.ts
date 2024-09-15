import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Locales } from '../models/app-models';
import { BASE_URL } from '../tokens/app.token';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  BASE_URL = inject(BASE_URL)

  constructor(
    private http: HttpClient,
    private common: CommonService
  ){}

  getLocales():Observable<Locales> {
    return this.http.get<Locales>(`${this.BASE_URL}/system/locales`).pipe(
      catchError((error)=> this.common.handleError(error, []))
    )
  }
  getLocaleById(user_id:number):Observable<string|undefined> {
    return this.http.get<string>(`${this.BASE_URL}/users/${user_id}/locale`).pipe(
      catchError((error)=> this.common.handleError(error, undefined))
    )
  }

}
