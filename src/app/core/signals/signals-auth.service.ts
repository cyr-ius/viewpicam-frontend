import { Injectable, signal } from '@angular/core';
import { UserPublic } from '../../client';

@Injectable({
  providedIn: 'root',
})
export class SignalsAuthService {
  private currentUser = signal<UserPublic | null>(null);
  current_user = this.currentUser.asReadonly();
  private expiresIn = signal<number>(new Date().getTime());
  expires_in = this.expiresIn.asReadonly();
  private Message = signal<string | null>(null);
  message = this.Message.asReadonly();
  private Remember = signal(false);
  remember = this.Remember.asReadonly();

  constructor() {}

  setCurrentUser(user: UserPublic | null) {
    this.currentUser.set(user);
  }

  setExpiresIn(value: number): void {
    localStorage.setItem('expires_in', value.toString());
    this.expiresIn.set(value);
  }

  setMessage(msg: string | null): void {
    this.Message.set(msg);
  }

  setRemember(value: boolean) {
    this.Remember.set(value);
  }

  getJWToken() {
    return localStorage.getItem('access_token');
  }
}
