import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  authToken:string = ""
  eventSource!: EventSourcePolyfill
  streamUrl: string = ""

  constructor(
    private authService:AuthService
  ) {

    this.authToken = this.getToken();
  }

  getStream(): Observable<any> {
    return new Observable((observer) => {
      this.eventSource = new EventSourcePolyfill(this.streamUrl, {
        headers: {
          'Authorization': 'Bearer ' + this.authToken
        },
        heartbeatTimeout: 100000000 // to increase timeout
      });

      this.eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      this.eventSource.onerror = () => {
        this.eventSource?.close();
        // To reconnect after connection closes
        this.reconnect(observer);
      };
    });
  }

  private getToken() {
    let accessToken = this.authService.getJWToken()
    if (accessToken)
      return accessToken; // Retrieve token from local storage or other sources
    return ""
  }

  private reconnect(observer: any): void {
    this.getStream().subscribe(observer);
  }
}
