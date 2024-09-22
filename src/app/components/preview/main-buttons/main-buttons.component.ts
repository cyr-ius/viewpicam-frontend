import { Component, computed, effect } from '@angular/core';
import { Command, RaspiconfigService } from '../../../client';
import { SignalsAuthService } from '../../../core/signals/signals-auth.service';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsSettingsService } from '../../../core/signals/signals-settings.service';

export interface MainButton {
  disable: boolean;
  css: string;
  label: string;
  cmd: string | null;
  params: string | number | null;
}

@Component({
  selector: 'app-main-buttons',
  standalone: true,
  imports: [],
  templateUrl: './main-buttons.component.html',
})
export class MainButtonsComponent {
  current_user = computed(() => this.signalAuth.current_user());

  constructor(
    private signalAuth: SignalsAuthService,
    private raspiConfig: RaspiconfigService,
    private signalSettings: SignalsSettingsService,
    private signalRaspiconfig: SignalsRaspiconfigService
  ) {
    effect(
      () => {
        this.changeButtons(this.signalRaspiconfig.status_mjpeg());
      },
      { allowSignalWrites: true }
    );
  }

  css_primary = 'btn btn-primary';
  css_warning = 'btn btn-warning';

  video_btn = <MainButton>{
    disable: false,
    css: this.css_primary,
    label: 'record video start',
    cmd: 'ca',
    params: '1',
  };
  image_btn = <MainButton>{
    disable: false,
    css: this.css_primary,
    label: 'record image',
    cmd: 'im',
    params: '',
  };
  timelapse_btn = <MainButton>{
    disable: false,
    css: this.css_primary,
    label: 'timelapse start',
    cmd: 'tl',
    params: '1',
  };
  md_btn = <MainButton>{
    disable: false,
    css: this.css_primary,
    label: 'motion detection start',
    cmd: 'md',
    params: '1',
  };
  halt_btn = <MainButton>{
    disable: false,
    css: this.css_primary,
    label: 'camera stop',
    cmd: 'ru',
    params: '0',
  };

  changeButtons(data: string): void {
    if (data == 'ready') {
      this.video_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'record video start',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'timelapse start',
        cmd: 'tl',
        params: '1',
      };
      this.md_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'motion detection start',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
      this.signalRaspiconfig.setHalted(false);
    } else if (data == 'md_ready') {
      this.video_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record video start',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'timelapse start',
        cmd: 'tl',
        params: '1',
      };
      this.md_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'motion detection stop',
        cmd: 'md',
        params: '0',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
      this.signalRaspiconfig.setHalted(false);
    } else if (data == 'timelapse') {
      this.video_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'record video start',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'timelapse stop',
        cmd: 'tl',
        params: '0',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'motion detection start',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
    } else if (data == 'tl_md_ready') {
      this.video_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record video start',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'timelapse stop',
        cmd: 'tl',
        params: '0',
      };
      this.md_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'motion detection stop',
        cmd: 'md',
        params: '0',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
      this.signalRaspiconfig.setHalted(false);
    } else if (data == 'video') {
      this.video_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'record video stop',
        cmd: 'ca',
        params: '0',
      };
      this.image_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'timelapse start',
        cmd: 'tl',
        params: '1',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'motion detection start',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
      this.signalSettings.setPreviewDisabled(true);
    } else if (data == 'md_video') {
      this.video_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record video stop',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'timelapse start',
        cmd: 'tl',
        params: '1',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'recording video...',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
    } else if (data == 'tl_video') {
      this.video_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'record video stop',
        cmd: 'ca',
        params: '0',
      };
      this.image_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'timelapse stop',
        cmd: 'tl',
        params: '0',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'motion detection start',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
    } else if (data == 'tl_md_video') {
      this.video_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'record video stop',
        cmd: 'ca',
        params: '0',
      };
      this.image_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: false,
        css: this.css_warning,
        label: 'timelapse stop',
        cmd: 'tl',
        params: '0',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'recording video...',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
    } else if (data == 'image') {
      this.video_btn = <MainButton>{
        disable: true,
        css: this.css_warning,
        label: 'record video start',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: true,
        css: this.css_warning,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: true,
        css: this.css_warning,
        label: 'timelapse start',
        cmd: 'tl',
        params: '1',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'motion detection start',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'camera stop',
        cmd: 'ru',
        params: '0',
      };
    } else if (data == 'halted') {
      this.video_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record video start',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'timelapse start',
        cmd: 'tl',
        params: '1',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'motion detection start',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'camera start',
        cmd: 'ru',
        params: '1',
      };
      this.signalRaspiconfig.setHalted(true);
    } else if (data == '') {
      this.video_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record video start',
        cmd: 'ca',
        params: '1',
      };
      this.image_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'record image',
        cmd: 'im',
        params: '',
      };
      this.timelapse_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'timelapse start',
        cmd: 'tl',
        params: '1',
      };
      this.md_btn = <MainButton>{
        disable: true,
        css: this.css_primary,
        label: 'motion detection start',
        cmd: 'md',
        params: '1',
      };
      this.halt_btn = <MainButton>{
        disable: false,
        css: this.css_primary,
        label: 'camera start',
        cmd: 'ru',
        params: '1',
      };
      this.signalRaspiconfig.setHalted(true);
    } else if (data.slice(0, 5) == 'Error') {
      alert(
        'Error in RaspiMJPEG: ' +
          data.slice(7) +
          '\nRestart ViewPI Cam or the whole RPi.'
      );
    }
  }

  sendCmd(cmd: any, params: any) {
    const data = <Command>{ cmd: cmd, params: [params] };
    this.raspiConfig.raspiconfigPost(data).subscribe();
  }
}
