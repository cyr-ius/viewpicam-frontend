import { HttpClient, HttpParams } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Thumb } from '../models/app-models';
import { BASE_URL } from '../tokens/app.token';
import { CommonService } from './common.service';
import { RaspiconfigService } from './raspiconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ThumbsService {

  BASE_URL = inject(BASE_URL)

  private currentThumb  = signal<Thumb|undefined>(undefined);
  current_thumb  = this.currentThumb.asReadonly();
  private listThumbs = signal<Thumb[]>([]);
  list_thumbs = this.listThumbs.asReadonly()
  private displayPreview = signal<boolean>(false);
  display_preview = this.displayPreview.asReadonly();

  sort_order = signal('desc');
  show_types = signal('both');
  time_filter = signal(1);
  autorefresh = signal(false);

  constructor(
    private common: CommonService,
    private raspiConfig: RaspiconfigService,
    private http: HttpClient
  ) {

    let sortOrder = localStorage.getItem("sort_order")
    if (sortOrder){
      this.sort_order.set(sortOrder)
    }
    let showTypes = localStorage.getItem("show_types")
    if (showTypes){
      this.show_types.set(showTypes)
    }
    let timeFilter = localStorage.getItem("time_filter")
    if (timeFilter){
      this.time_filter.set(+timeFilter)
    }
    let autoRefresh = localStorage.getItem("autorefresh")
    if (autoRefresh){
      this.autorefresh.set(autoRefresh == 'true'?true:false)
    }

    effect(() => {
      localStorage.setItem("sort_order", this.sort_order())
      localStorage.setItem("show_types", this.show_types())
      localStorage.setItem("time_filter", this.time_filter().toString())
      localStorage.setItem("autorefresh", this.autorefresh()?'true':'false')
    })

  }

  setCurrentThumb(thumb:Thumb|undefined) {
    this.currentThumb.set(thumb);
  }
  setDisplayPreview(state:boolean){
    this.displayPreview.set(state);
  }

  setThumbs(thumbs:Thumb[]) {
    this.listThumbs.set(thumbs);
  }

  addThumbs(thumb:Thumb){
    this.listThumbs.update( (values:Thumb[]) => [...values, thumb] )
  }

	removeThumbs(thumb: Thumb) {
		this.listThumbs.set(this.listThumbs().filter((t) => t !== thumb));
	}

  getThumbsList(sort_order:string, show_types:string, time_filter:number):Observable<Thumb[]>{
    let queryParams = new HttpParams()
    queryParams = queryParams.append("sort_order",sort_order);
    queryParams = queryParams.append("show_types",show_types);
    queryParams = queryParams.append("time_filter",time_filter);

    return this.http.get<Thumb[]>(`${this.BASE_URL}/previews/`,{params:queryParams}).pipe(
      tap((data)=> this.setThumbs(data)),
      catchError((error) => this.common.handleError(error, []))
    )
  }

  deleteThumbs(ids: string[]):Observable<void>{
    return this.http.request('delete', `${this.BASE_URL}/previews/`, {body: ids}).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    );
  }

  getThumbById(id:string):Observable<Thumb>{
    return this.http.get<Thumb>(`${this.BASE_URL}/previews/${id}`).pipe(
      catchError((error) => this.common.handleError(error, {}))
    )
  }

  deleteThumbById(id:string):Observable<void>{
    return this.http.delete<Thumb>(`${this.BASE_URL}/previews/${id}`).pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  downloadThumbByName(realname:string):Observable<any>{
      const media_path = this.raspiConfig.media_path();
      return this.http.get(`${media_path}/${realname}`, { responseType: 'blob' });
  }

  lockThumbById(id:string):Observable<void>{
    return this.http.post(`${this.BASE_URL}/previews/${id}/lock`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }

  unlockThumbById(id:string):Observable<void>{
    return this.http.post(`${this.BASE_URL}/previews/${id}/unlock`,'').pipe(
      catchError((error) => this.common.handleError(error, undefined))
    )
  }
}
