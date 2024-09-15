import { Component } from '@angular/core';
import { AdmMacrosComponent } from './adm-macros/adm-macros.component';
import { AdmMultiviewComponent } from './adm-multiview/adm-multiview.component';
import { AdmOptionsComponent } from './adm-options/adm-options.component';
import { AdmRSyncComponent } from './adm-rsync/adm-rsync.component';
import { AdmUserButtonsComponent } from './adm-user-buttons/adm-user-buttons.component';
import { AdmUsersComponent } from './adm-users/adm-users.component';
import { ApiTokenComponent } from './api-token/api-token.component';
import { CameraTokenComponent } from './camera-token/camera-token.component';
import { LogLevelModeComponent } from './log-level-mode/log-level-mode.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    AdmMacrosComponent,
    AdmMultiviewComponent,
    AdmOptionsComponent,
    AdmRSyncComponent,
    AdmUserButtonsComponent,
    AdmUsersComponent,
    ApiTokenComponent,
    CameraTokenComponent,
    LogLevelModeComponent
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {}
