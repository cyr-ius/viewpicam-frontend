import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as colorconverter from '../../../../../src/scripts/colorconverter.js';
import { Command, Presets, RaspiconfigService, SystemService } from '../../../client/index.js';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service.js';
import { SignalsSettingsService } from '../../../core/signals/signals-settings.service.js';

@Component({
  selector: 'app-camera-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './camera-settings.component.html',
})
export class CameraSettingsComponent implements OnInit {
  raspiconfig = computed(() => this.signalRaspiconfig.config());
  upreset = computed(() => this.signalSettings.settings().upreset);
  pilight_mode = computed(() => this.signalSettings.settings().pilight_mode);
  presets = <Presets[]>[];
  selected_preset: any;

  preset: string = '';
  at_yuv: string | null = null;
  ac_yuv: string | null = null;

  constructor(
    private signalSettings: SignalsSettingsService,
    private raspiConfig: RaspiconfigService,
    private SystemService: SystemService,
    private signalRaspiconfig: SignalsRaspiconfigService
  ) {}

  ngOnInit(): void {
    const upreset = this.signalSettings.settings().upreset;
    this.SystemService.systemGetPresets(upreset).subscribe(
      (data) => (this.selected_preset = data)
    );

    let color_uyv = [
      this.signalRaspiconfig.config().at_y,
      this.signalRaspiconfig.config().at_u,
      this.signalRaspiconfig.config().at_v,
    ];
    this.at_yuv =
      '#' + colorconverter.RGB2HEX(colorconverter.YUV2RGB(color_uyv));

    let color_yuv = [
      this.signalRaspiconfig.config().ac_y,
      this.signalRaspiconfig.config().ac_u,
      this.signalRaspiconfig.config().ac_v,
    ];
    this.ac_yuv =
      '#' + colorconverter.RGB2HEX(colorconverter.YUV2RGB(color_yuv));
  }

  setPreset(preset: string, fps_divider: number) {
    this.presets.forEach((element) => {
      if (element.name == preset) {
        this.selected_preset = element;
      }
    });
    this.signalRaspiconfig.config().video_width = this.selected_preset.width;
    this.signalRaspiconfig.config().video_height = this.selected_preset.height;
    this.signalRaspiconfig.config().video_fps = this.selected_preset.fps;
    this.signalRaspiconfig.config().mp4box_fps = this.selected_preset.i_rate;
    this.signalRaspiconfig.config().image_width = this.selected_preset.i_width;
    this.signalRaspiconfig.config().image_height =
      this.selected_preset.i_height;

    this.sendCmd('px', [
      this.selected_preset.width,
      this.selected_preset.height,
      this.selected_preset.fps,
      this.selected_preset.i_rate,
      this.selected_preset.i_width,
      this.selected_preset.i_height,
      fps_divider,
    ]);
  }

  setAt(value: string | null) {
    let yuv = colorconverter.RGB2YUV(colorconverter.HEX2RGB(value));
    let enable = value != '#ffffff' ? '1' : '0';
    let params = [
      enable,
      yuv[0].toString(),
      yuv[1].toString(),
      yuv[2].toString(),
    ];
    this.sendCmd('at', params);
  }

  setAc(value: string | null) {
    let enable = value != '#ffffff' ? '1' : '0';
    let yuv = colorconverter.RGB2YUV(colorconverter.HEX2RGB(value));
    let params = [
      enable,
      yuv[0].toString(),
      yuv[1].toString(),
      yuv[2].toString(),
    ];
    this.sendCmd('ac', params);
  }

  switchLed(r: number, g: number, b: number) {
    // Pipan call library
    console.log(r, g, b);
  }

  sendCmd(cmd: string, params: any) {
    const data = <Command>({cmd: cmd, params: [params] });
    this.raspiConfig.raspiconfigPost(data).subscribe();
  }
}
