import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import bootstrap from 'bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-second-factor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './second-factor.component.html'
})
export class SecondFactorComponent implements AfterViewInit {

  @ViewChild('otpModal', {static:true}) otpModal!:ElementRef

  _onClose:Subject<any>=new Subject<any>();

  secret: string|null = null
  bsModal:any;

  ngAfterViewInit(): void {
    let modal = this.otpModal.nativeElement
    if (modal){
      this.bsModal = new window.bootstrap.Modal(modal);
    }
  }

  showConfirmation() {
    this.secret = null
    this.bsModal.show();
    return {
     onClose:()=>this._onClose
    }
  }

  onCancel() {
    this.bsModal.hide();
    this._onClose.next(false);
  }

  onSubmit() {
    this.bsModal.hide();
    this._onClose.next(true);
  }

}
