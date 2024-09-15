import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, computed, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Token } from '../../core/models/app-models';
import { AuthService } from '../../core/services/auth.service';
import { CommonService } from '../../core/services/common.service';
import { SecondFactorComponent } from '../second-factor/second-factor.component';
import { finalize, retry, tap, timer } from 'rxjs';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';


@Component({
  selector: 'app-first-factor',
  standalone: true,
  imports: [FormsModule, CommonModule, SecondFactorComponent],
  templateUrl: './first-factor.component.html',
  styleUrl: './first-factor.component.css'
})
export class FirstFactorComponent implements OnInit {

  @ViewChild(SecondFactorComponent)
  otpModal!: SecondFactorComponent;

  login = <Login> {remember:false}
  register: boolean=false;
  backend_ready: boolean = true;

  message$ = computed( ()=> this.authService.message() )
  spinner = computed ( () => this.globalSpinner.spinner() )

  constructor(
    private authService:AuthService,
    private common: CommonService,
    private globalSpinner: GlobalSpinnerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.authService.firstenrollment().pipe(
      retry({ 
        delay: (error, count) => {
          this.backend_ready = false;
          return timer(400)
        }
      }),
      finalize(() => this.backend_ready = true)
    ).subscribe(
      (data: HttpResponse<undefined>)=>{
        if (data.status == 204) {
          this.register = true;
        }
      }
    )
  }

  onSubmit(form: NgForm){
    const formData = form.value;
    if (!this.register){
      this.authService.login(formData).subscribe({
        next: (data: HttpResponse<Token>) => {
          if (data.status == 202) {
            this.requestOtp(form)
          } else {
            this.router.navigate(["preview"]);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.login.password = "";
          this.login.password_2 = "";
          this.router.navigate(["login"]);
          this.authService.setMessage(this.common.subscribeError(error))
        }
      });
    } else {
      this.authService.register(formData).subscribe({
        next: () => {
          this.register = false;
          this.login.password = "";
        },
        error: (error: HttpErrorResponse) => {
          this.login.password = "";
          this.login.password_2 = "";
          this.router.navigate(["login"]);
          this.authService.setMessage(this.common.subscribeError(error))
        }
      })
    }
  }

  requestOtp(form:NgForm) {
    let subscription = this.otpModal.showConfirmation().onClose().subscribe(
      ()=> {
        form.value.otp_code = this.otpModal.secret;
        this.onSubmit(form);
        delete form.value.otp_code
        subscription.unsubscribe()
      }
    );
  }
}

