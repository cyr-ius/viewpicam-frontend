import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CameraToken, IdpService } from '../../../client';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-camera-token',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './camera-token.component.html',
})
export class CameraTokenComponent {
  camtoken!: CameraToken;
  copyToClipboard!: CommonService['copyToClipboard'];

  constructor(
    private idp: IdpService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.copyToClipboard = this.common.copyToClipboard;
    this.getToken();
  }

  getToken() {
    this.idp.idpGetCamToken().subscribe((rsp) => {
      this.camtoken = rsp;
    });
  }

  setToken() {
    if (this.camtoken) {
      this.idp.idpPostCamToken().subscribe(() => {
        this.getToken();
      });
    }
  }

  deleteToken() {
    this.idp.idpDeleteCamToken().subscribe(() => {
      this.camtoken.cam_token = '';
    });
  }
}
