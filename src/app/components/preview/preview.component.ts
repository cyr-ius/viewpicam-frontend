import { AsyncPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonsService } from '../../client';
import { SignalsSettingsService } from '../../core/signals/signals-settings.service';
import { CameraSettingsComponent } from '../sidemenu/camera-settings/camera-settings.component';
import { MotionExternalComponent } from '../sidemenu/motion-external/motion-external.component';
import { MotionInternalComponent } from '../sidemenu/motion-internal/motion-internal.component';
import { MainButtonsComponent } from './main-buttons/main-buttons.component';
import { MjpegViewerComponent } from './mjpeg-viewer/mjpeg-viewer.component';
import { PipanButtonsComponent } from './pipan-buttons/pipan-buttons.component';
import { UserButtonsComponent } from './user-buttons/user-buttons.component';


@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    MotionExternalComponent,
    MotionInternalComponent,
    CameraSettingsComponent,
    MainButtonsComponent,
    UserButtonsComponent,
    PipanButtonsComponent,
    MjpegViewerComponent,
    AsyncPipe,
  ],
  templateUrl: './preview.component.html',
})
export class PreviewComponent {
  pipan = computed(() => this.signalSettings.settings().pipan);
  display_mode = computed(() => this.signalSettings.display_mode());
  ubuttons: any;

  constructor(
    private buttons: ButtonsService,
    private signalSettings: SignalsSettingsService
  ) {
    this.ubuttons = toSignal(this.buttons.buttonsGetButtons());
  }
}
