import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Period, SchedulerDay, SchedulerSettings, SchedulerState } from '../models/app-models';
import { BASE_URL } from '../tokens/app.token';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {


  BASE_URL = inject(BASE_URL)

  private schedulerDay = signal<SchedulerDay[]>([])
  scheduler_day = this.schedulerDay.asReadonly()
  private schedulerSettings = signal<SchedulerSettings|undefined>(undefined)
  scheduler_settings = this.schedulerSettings.asReadonly()
  private Period = signal<string>('')
  period = this.Period.asReadonly()
  private dayMode = signal<number>(-1)
  daymode = this.dayMode.asReadonly()
  private schedulerState = signal<boolean>(false)
  scheduler_state = this.schedulerState.asReadonly()


  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {}

  Start(){
    return this.http.post(`${this.BASE_URL}/tasks/start`,'').pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  Stop(){
    return this.http.post(`${this.BASE_URL}/tasks/stop`,'').pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  setDaymode(mode:number){
    this.dayMode.set(mode);
    this.getPeriod(mode).subscribe((rsp) => {
      this.Period.set(rsp.period)
    })
  }

  getState():Observable<SchedulerState>{
    return this.http.get<SchedulerState>(`${this.BASE_URL}/tasks/status`).pipe(
      tap(data => {
        this.schedulerState.set(data.state)
      }),
      catchError((error) => this.common.handleError(error, {}))
    )
  }

  getPeriod(daymode_id:number):Observable<Period>{
    return this.http.get<Period>(`${this.BASE_URL}/schedule/period/${daymode_id}`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  getSunrise():Observable<{datetime:Date}>{
    return this.http.get<any>(`${this.BASE_URL}/schedule/sun/sunrise`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  getSunset():Observable<{datetime:Date}>{
    return this.http.get<any>(`${this.BASE_URL}/schedule/sun/sunset`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  getGMTOffset():Observable<{gmt_offset:string}>{
    return this.http.get<any>(`${this.BASE_URL}/schedule/gmtoffset`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  getTimezones():Observable<string[]>{
    return this.http.get<any>(`${this.BASE_URL}/schedule/timezones`).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  getSettings():Observable<SchedulerSettings>{
    return this.http.get<SchedulerSettings>(`${this.BASE_URL}/schedule/`).pipe(
      tap(data => {
        this.schedulerSettings.set(data);
        this.setDaymode(data.daymode);
      }),
      catchError((error) => this.common.handleError(error, []))
    )
  }

  saveSettings(data:SchedulerSettings|undefined):Observable<void> {
    return this.http.put<SchedulerSettings>(`${this.BASE_URL}/schedule/`,data).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

  getSchedule():Observable<SchedulerDay[]>{
    return this.http.get<SchedulerDay[]>(`${this.BASE_URL}/schedule/scheduler`).pipe(
      tap(data => {
        this.schedulerDay.set(data)
      }),
      catchError((error) => this.common.handleError(error, {}))
    )
  }

  setSchedule(data:SchedulerDay[]): Observable<void>{
    return this.http.put(`${this.BASE_URL}/schedule/scheduler`,data).pipe(
      catchError((error) => this.common.handleError(error, []))
    )
  }

}
