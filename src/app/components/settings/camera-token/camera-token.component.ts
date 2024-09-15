import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CamToken } from '../../../core/models/app-models';
import { CommonService } from '../../../core/services/common.service';
import { SettingsService } from '../../../core/services/settings.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-camera-token',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './camera-token.component.html'
})
export class CameraTokenComponent {

  camtoken!: CamToken;
  copyToClipboard!: CommonService["copyToClipboard"]

  constructor(
    private authService: AuthService,
    private common: CommonService
  ){}

  ngOnInit(): void {
    this.copyToClipboard = this.common.copyToClipboard
    this.getToken()
  }

  getToken(){
    this.authService.getCameraToken().subscribe((rsp)=>{
      this.camtoken = rsp
    })
  }

  setToken(){
    if (this.camtoken){
      this.authService.setCameraToken().subscribe(()=>{
        this.getToken()
      })
    }
  }

  deleteToken(){
    this.authService.deleteCameraToken().subscribe(()=>{
      this.camtoken.cam_token = ""
    })
  }

}
