import { AsyncPipe } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { CameraSettingsComponent } from '../sidemenu/camera-settings/camera-settings.component';
import { MotionExternalComponent } from '../sidemenu/motion-external/motion-external.component';
import { MotionInternalComponent } from '../sidemenu/motion-internal/motion-internal.component';
import { MainButtonsComponent } from './main-buttons/main-buttons.component';
import { MjpegViewerComponent } from './mjpeg-viewer/mjpeg-viewer.component';
import { PipanButtonsComponent } from './pipan-buttons/pipan-buttons.component';
import { UserButtonsComponent } from './user-buttons/user-buttons.component';
import { toSignal } from '@angular/core/rxjs-interop';


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
    AsyncPipe
  ],
  templateUrl: './preview.component.html',
})

export class PreviewComponent {

  pipan = computed(() => this.settingsService.settings().pipan)
  display_mode = computed(()=> this.settingsService.display_mode())
  ubuttons: any

  constructor(
    private settingsService:SettingsService
  ){
    this.ubuttons = toSignal(this.settingsService.getUserButtons())
  }

}
