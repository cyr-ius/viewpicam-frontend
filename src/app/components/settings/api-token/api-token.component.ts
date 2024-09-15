import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiToken } from '../../../core/models/app-models';
import { CommonService } from '../../../core/services/common.service';
import { SettingsService } from '../../../core/services/settings.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-api-token',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './api-token.component.html'
})
export class ApiTokenComponent {

  apitoken!: ApiToken;
  copyToClipboard!: CommonService["copyToClipboard"]

  constructor(
    private authService: AuthService,
    private common: CommonService
  ){}

  ngOnInit(): void {
    this.copyToClipboard = this.common.copyToClipboard
    this.getToken();
  }

  getToken(){
    this.authService.getApiToken().subscribe((rsp)=>{
      this.apitoken = rsp
    })
  }

  setToken(){
    if (this.apitoken){
      this.authService.setApiToken().subscribe(()=>{
        this.getToken();
      })
    }
  }

  deleteToken(){
    this.authService.deleteApiToken().subscribe(()=>{
      this.apitoken.api_token = ""
    })
  }

}
