import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { ApiToken, CamToken, FreeDisk, Log, Macros, Multiview, Preset, Rsync, Settings, User, UserButton, UserLevel } from '../models/app-models';
import { BASE_URL } from '../tokens/app.token';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService  {

  BASE_URL = inject(BASE_URL)

  private Settings = signal<any>({});
  settings = this.Settings.asReadonly();

  private Versions = signal<any>({});
  versions = this.Versions.asReadonly();


  private menuId = signal('');
  menu_id = this.menuId.asReadonly();


  private displayMode = signal<boolean>(true);
  display_mode = this.displayMode.asReadonly();

  private mjpegMode = signal<boolean>(false);
  mjpeg_mode = this.mjpegMode.asReadonly();

  private colorMode = signal<string>('auto');
  color_mode = this.colorMode.asReadonly();

  private previewDisable = signal(false);
  preview_select_disable = this.previewDisable.asReadonly();

  constructor(
    private http: HttpClient,
    private common: CommonService,
    private router: Router
  ) {

    let mjpegMode = localStorage.getItem("mjpeg_mode")
    if (mjpegMode){
      this.setMjpegMode(mjpegMode == 'true'?true:false)
    }
    let displayMode = localStorage.getItem("display_mode")
    if (displayMode){
      this.setDisplayMode(displayMode == 'true'?true:false)
    }
    let colorMode = localStorage.getItem("color_mode")
    if (colorMode){
      this.setColorMode(colorMode)
    }

    effect(() => {
      localStorage.setItem("display_mode", this.display_mode()?'true':'false')
      localStorage.setItem("mjpeg_mode", this.mjpeg_mode()?'true':'false')
      localStorage.setItem("color_mode", this.color_mode())
    })

     this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let menu = event.url.split('/')[1]
        this.menuId.set(menu);
      }
    })

  }

  setDisplayMode(state:boolean){
    this.displayMode.set(state);
  }
  setMjpegMode(state:boolean){
    this.mjpegMode.set(state);
  }
  setColorMode(state:string){
    this.colorMode.set(state);
  }
  setPreviewDisabled(state:boolean){
    this.previewDisable.set(state);
  }
  setConfig(config:any){
    this.Settings.set(config)
  }
  setVersions(config:any){
    this.Versions.set(config)
  }

  getPresets(preset:string|void):Observable<Preset[]>{
    let queryParams = new HttpParams()
    if (preset){
      queryParams = queryParams.append("preset",preset);
    }
    return this.http.get<Preset[]>(`${this.BASE_URL}/system/presets`,{params: queryParams}).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  getFreedisk():Observable<FreeDisk> {
    return this.http.get<FreeDisk>(`${this.BASE_URL}/system/disk/free`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getUserLevel():Observable<UserLevel[]> {
    return this.http.get<UserLevel[]>(`${this.BASE_URL}/system/userlevel`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  haltedSys():Observable<void>{
    return this.http.post(`${this.BASE_URL}/system/shutdown`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  restartSys():Observable<void>{
    return this.http.post(`${this.BASE_URL}/system/restart`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }
  restartApp():Observable<void>{
    return this.http.post(`${this.BASE_URL}/system/restart/app`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }
  resetSettings():Observable<void>{
    return this.http.post(`${this.BASE_URL}/system/reset`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getLog():Observable<Log[]>{
    return this.http.get<Log[]>(`${this.BASE_URL}/logs/`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }
  downloadLog():Observable<void>{
    return this.http.get(`${this.BASE_URL}/logs/download`,{ responseType: 'blob' }).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }
  deleteLog():Observable<void>{
    return this.http.delete(`${this.BASE_URL}/logs/`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  setSetting(data:any|Settings){
    return this.http.post<Settings>(`${this.BASE_URL}/settings/`, data).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getSetting():Observable<Settings>{
    return this.http.get<Settings>(`${this.BASE_URL}/settings/`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  setRsync(data:Rsync):Observable<void>{
    return this.http.post(`${this.BASE_URL}/rsync/`,data).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getRsync():Observable<Rsync>{
    return this.http.get<Rsync>(`${this.BASE_URL}/rsync/`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  deleteRsync():Observable<void>{
    return this.http.delete(`${this.BASE_URL}/rsync/`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  setMultiview(data:Multiview):Observable<void>{
    return this.http.post(`${this.BASE_URL}/multiview/`,data).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getMultiview():Observable<Multiview[]>{
    return this.http.get<Multiview>(`${this.BASE_URL}/multiview/`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  deleteMultiview(id:number):Observable<void>{
    return this.http.delete(`${this.BASE_URL}/multiview/${id}`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  setUserButtons(data:Multiview):Observable<void>{
    return this.http.post(`${this.BASE_URL}/buttons/`,data).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getUserButtons():Observable<UserButton[]>{
    return this.http.get<UserButton[]>(`${this.BASE_URL}/buttons/`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  deleteUserButtons(id:number):Observable<void>{
    return this.http.delete(`${this.BASE_URL}/buttons/${id}`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  setMacros(data:Macros):Observable<void>{
    return this.http.post(`${this.BASE_URL}/settings/macros`,data).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getMacros():Observable<Macros[]>{
    return this.http.get<Macros[]>(`${this.BASE_URL}/settings/macros`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  updateUser(id:number , data:User):Observable<void>{
    return this.http.put(`${this.BASE_URL}/users/${id}`,data).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  deleteUsers(id:number):Observable<void>{
    return this.http.delete(`${this.BASE_URL}/users/${id}`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  setUsers(data:User):Observable<void>{
    return this.http.post(`${this.BASE_URL}/users/`,data).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.BASE_URL}/users/`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  restoreSettings(file: any):Observable<void>{
    return this.http.post(`${this.BASE_URL}/settings/restore`, file).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  backupSettings():Observable<HttpResponse<void>>{
    return this.http.get(`${this.BASE_URL}/settings/backup`, { responseType: 'blob' }).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  getVersion():Observable<any>{
    return this.http.get<Object>(`${this.BASE_URL}/system/version`).pipe(
      catchError((error) => this.common.handleError(error, {}))
    )
  }

}
