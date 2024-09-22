import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
import { OtpService, Secret, UserPublic } from '../../../generator';

@Component({
  selector: 'app-modal-qr',
  standalone: true,
  imports: [FormsModule, SafeHtmlPipe],
  templateUrl: './modal-qr.component.html',
})
export class ModalQrComponent {
  @ViewChild('qrModal') qrModal!: ElementRef;
  bsModal: any;
  secret = <Secret>{};
  message: string | null = null;
  user = <UserPublic>{};

  otp_svg: string = '';

  constructor(private otp: OtpService) {}

  ngAfterViewInit(): void {
    let modal = this.qrModal.nativeElement;
    if (modal) {
      this.bsModal = new window.bootstrap.Modal(modal);
    }
  }

  show(confirmed: boolean, id: number) {
    if (!confirmed && id) {
      this.otp.otpGet(id).subscribe({
        next: (data) => {
          this.message = null;
          this.otp_svg = data.otp_secret;
          this.bsModal.show();
        },
        error: (err) => (this.message = err.message),
      });
    } else {
      this.bsModal.show();
    }
  }

  hide() {
    this.bsModal.show();
  }

  onRevoke() {
    if (confirm('Are you sure to delete OTP Code ?') && this.user.id) {
      this.otp.otpDelete(this.user.id).subscribe({
        next: () => {
          this.user.otp_confirmed = false;
          this.bsModal.hide();
        },
        error: (err) => (this.message = err.message),
      });
    }
  }

  onCheck() {
    if (this.user.id) {
      this.otp
        .otpPost(this.user.id, this.secret)
        .subscribe({
          next: () => (this.user.otp_confirmed = true),
          error: () => (this.message = 'OTP failed'),
        });
    }
  }
}
