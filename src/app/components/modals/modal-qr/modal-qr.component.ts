import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OtpSecret, User } from '../../../core/models/app-models';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
import { AuthService } from '../../../core/services/auth.service';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal-qr',
  standalone: true,
  imports: [FormsModule, SafeHtmlPipe],
  templateUrl: './modal-qr.component.html'
})
export class ModalQrComponent {

  @ViewChild('qrModal') qrModal!:ElementRef
  bsModal:any;
  secret = <OtpSecret> {}
  message:string | null = null
  user = <User> {}

  constructor(
    private authService: AuthService
  ){}

  ngAfterViewInit(): void {
    let modal = this.qrModal.nativeElement
    if (modal){
      this.bsModal = new window.bootstrap.Modal(modal);
    }
  }

  show(user:User){
    this.user = user
    if (!user.otp_confirmed) {
      this.authService.getOTPQrCode(user.id).subscribe({
        next: (data)=> {
          this.message = null
          this.user.otp_svg = data.otp_secret
          this.bsModal.show();
        },
        error: (err) => this.message = err.message
      })
    } else {
      this.bsModal.show();
    }
  }

  hide(){
    this.bsModal.show();
  }

  onRevoke(){
    if(confirm("Are you sure to delete OTP Code ?")) {
      this.authService.revokeOTPToken(this.user.id).subscribe({
        next: ()=> {
          this.user.otp_confirmed=false;
          this.bsModal.hide();
        },
        error: (err) => this.message = err.message
      })
    }
  }

  onCheck() {
    this.authService.checkOTPToken(this.user.id, this.secret).subscribe({
      next: ()=> this.user.otp_confirmed=true,
      error: (err) => this.message = "OTP failed"
    })
  }

}
