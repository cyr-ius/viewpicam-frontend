import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, computed, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Observable, retry, tap, timer } from 'rxjs';
import { IdpService, Login, TokenInfo } from '../../client';
import { CommonService } from '../../core/services/common.service';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';
import { SignalsAuthService } from '../../core/signals/signals-auth.service';
import { SecondFactorComponent } from '../second-factor/second-factor.component';


type Gina = Login & {remember:boolean, password_2:string, next:string}

@Component({
  selector: 'app-first-factor',
  standalone: true,
  imports: [FormsModule, CommonModule, SecondFactorComponent],
  templateUrl: './first-factor.component.html',
  styleUrl: './first-factor.component.css',
})
export class FirstFactorComponent implements OnInit {
  @ViewChild(SecondFactorComponent)
  otpModal!: SecondFactorComponent;

  login = <Gina>{ remember: false };
  register: boolean = false;
  backend_ready: boolean = true;

  message$ = computed(() => this.signalAuth.message());
  spinner = computed(() => this.globalSpinner.spinner());

  constructor(
    private common: CommonService,
    private globalSpinner: GlobalSpinnerService,
    private router: Router,
    private signalAuth: SignalsAuthService,
    private idp: IdpService
  ) {}

  ngOnInit(): void {
    this.idp
      .idpCheckFirstRun()
      .pipe(
        retry({
          delay: () => {
            this.backend_ready = false;
            return timer(400);
          },
        }),
        finalize(() => (this.backend_ready = true))
      )
      .subscribe((data: HttpResponse<undefined>) => {
        if (data.status == 204) {
          this.register = true;
        }
      });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;
    if (!this.register) {
      this.post_login(formData).subscribe({
        next: (data: HttpResponse<TokenInfo>) => {
          if (data.status == 202) {
            this.requestOtp(form);
          } else {
            this.router.navigate(['preview']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.login.password = '';
          this.login.password_2 = '';
          this.router.navigate(['login']);
          this.signalAuth.setMessage(this.common.subscribeError(error));
        },
      });
    } else {
      this.idp.idpRegisterUser(formData, 'response').subscribe({
        next: () => {
          this.register = false;
          this.login.password = '';
        },
        error: (error: HttpErrorResponse) => {
          this.login.password = '';
          this.login.password_2 = '';
          this.router.navigate(['login']);
          this.signalAuth.setMessage(this.common.subscribeError(error));
        },
      });
    }
  }

  requestOtp(form: NgForm) {
    let subscription = this.otpModal
      .showConfirmation()
      .onClose()
      .subscribe(() => {
        form.value.otp_code = this.otpModal.secret;
        this.onSubmit(form);
        delete form.value.otp_code;
        subscription.unsubscribe();
      });
  }

  post_login(login: Gina): Observable<HttpResponse<TokenInfo>> {
    this.signalAuth.setRemember(login.remember);
    const now = new Date().getTime();
    return this.idp.idpAuthorize(login, 'response').pipe(
      tap((rsp) => {
        this.signalAuth.setExpiresIn(rsp.body!.expires_in * 1000 + now);
      })
    );
  }
}

