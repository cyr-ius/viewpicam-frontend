import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'imgSecure',
  standalone: true
})
export class ImgSecurePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  transform(url: string): Observable<SafeUrl>  {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
    )
  }

}
