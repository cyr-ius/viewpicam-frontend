import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { StatusMjpeg } from '../models/app-models';
import { BASE_URL } from '../tokens/app.token';
import { CommonService } from './common.service';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RaspiconfigService {

  BASE_URL = inject(BASE_URL)

  private raspiMjpegConfig = signal<any>({});
  config = this.raspiMjpegConfig.asReadonly();
  private motionMode = signal<string>('internal');
  motion_mode = this.motionMode.asReadonly();
  private statusMjpeg = signal<string>("", {equal: _.isEqual});
  status_mjpeg = this.statusMjpeg.asReadonly();
  private isHalted = signal<boolean>(false);
  halted = this.isHalted.asReadonly();
  private mediaPath = signal<string>('');
  media_path = this.mediaPath.asReadonly();


  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {}

  setStatus(value:string){
    this.statusMjpeg.set(value)
  }

  setHalted(value:boolean){
    this.isHalted.set(value)
  }

  setMotionMode(value:string){
    this.motionMode.set(value)
  }

  getStatusMjpeg(last:string):Observable<StatusMjpeg>{
    let queryParams = new HttpParams()
    queryParams = queryParams.append("last",last);
    return this.http.get<StatusMjpeg>(`${this.BASE_URL}/raspiconfig/status`,{params:queryParams})
  }

  sendCmd(cmd:string, params:any): void{
    if (typeof params === "number" || params instanceof Number) {
      params = [params.toString()];
    }
    if (typeof params === "string" || params instanceof String) {
      params = [params];
    }
    // console.log("Sendcmd: "+cmd+", params:"+params);
    this.http.post<any>(`${this.BASE_URL}/raspiconfig/command`,{"cmd":cmd, params: params}).pipe(
      catchError((error) => this.common.handleError(error,""))
    ).subscribe()
  }

  getConfig(): Observable<any>{
    return this.http.get<any>(`${this.BASE_URL}/raspiconfig/`).pipe(
      tap((data)=> {
        this.motionMode.set(data.motion_external == 0?'internal':'external');
        const media_path = data.media_path.replace(data.base_path, '')
        this.mediaPath.set(media_path);
      }),
      catchError((error) => this.common.handleError(error,{}))
    )
  }

  setConfig(data:any){
    this.raspiMjpegConfig.set(data)
  }
}
