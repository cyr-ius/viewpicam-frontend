import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../models/app-models';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private Toasts = signal<ToastMessage[]>([])
  toasts = this.Toasts.asReadonly()

  constructor() {}

  add(toast:ToastMessage){
    this.Toasts.update(
      (values:ToastMessage[]) => [...values, toast]
    )
  }

	remove(toast: ToastMessage) {
		this.Toasts().filter((t) => t !== toast);
	}

  clear() {
		this.Toasts().splice(0, this.Toasts().length);
	}
}
