import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as colorconverter from '../../../../../src/scripts/colorconverter.js';
import { Command, Presets, RaspiconfigService, SettingsService, SystemService } from '../../../client/index.js';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service.js';

@Component({
  selector: 'app-camera-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './camera-settings.component.html',
})
export class CameraSettingsComponent implements OnInit {
  raspiconfig = computed(() => this.signalRaspiconfig.config());
  presets = <Presets[]>[];

  pilight: boolean = false;
  preset: string = '';
  at_yuv: string | null = null;
  ac_yuv: string | null = null;

  constructor(
    private settings: SettingsService,
    private raspiConfig: RaspiconfigService,
    private SystemService: SystemService,
    private signalRaspiconfig: SignalsRaspiconfigService
  ) {}

  ngOnInit(): void {
    this.settings.settingsGet().subscribe((rsp) => {
      this.pilight = (rsp.pilight == true)
      this.SystemService.systemGetPresets(rsp.upreset).subscribe(
        (data) => (this.presets = data)
      );
    });

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
    let selected_preset: Presets = <Presets>({});
    this.presets.forEach((element) => {
      if (element.name == preset) {
        selected_preset = element;
      }
    });
    this.signalRaspiconfig.config().video_width = selected_preset.width;
    this.signalRaspiconfig.config().video_height = selected_preset.height;
    this.signalRaspiconfig.config().video_fps = selected_preset.fps;
    this.signalRaspiconfig.config().mp4box_fps = selected_preset.i_rate;
    this.signalRaspiconfig.config().image_width = selected_preset.i_width;
    this.signalRaspiconfig.config().image_height =selected_preset.i_height;

    this.sendCmd('px', [
      selected_preset.width,
      selected_preset.height,
      selected_preset.fps,
      selected_preset.i_rate,
      selected_preset.i_width,
      selected_preset.i_height,
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
    if ( ! Array.isArray(params))
      params = [params]
    const data = <Command>({cmd: cmd, params: params });
    this.raspiConfig.raspiconfigPost(data).subscribe();
  }
}
