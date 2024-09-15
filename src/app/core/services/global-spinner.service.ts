import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSpinnerService {

  private Spinner = signal(false)
  spinner = this.Spinner.asReadonly()

  constructor() { }

  toggle(){
    this.Spinner.set(!this.spinner())
  }

  on(){
    this.Spinner.set(true);
  }

  off(){
    this.Spinner.set(false);
  }


}
