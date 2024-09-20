import { Component, computed, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as colorconverter from '../../../../../src/scripts/colorconverter.js';
import { Preset } from '../../../core/models/app-models';
import { RaspiconfigService } from '../../../core/services/raspiconfig.service';
import { SettingsService } from '../../../core/services/settings.service';


@Component({
  selector: 'app-camera-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './camera-settings.component.html',
})
export class CameraSettingsComponent implements OnInit {
  raspiconfig = computed(() => this.raspiConfig.config());
  upreset = computed(() => this.settingsService.settings().upreset);
  pilight_mode = computed(() => this.settingsService.settings().pilight_mode);
  presets = <Preset[]>[];
  selected_preset: any;

  preset: string = '';
  at_yuv: string | null = null;
  ac_yuv: string | null = null;


  constructor(
    private settingsService: SettingsService,
    private raspiConfig: RaspiconfigService
  ) {
    effect(()=>{
      console.log(this.settingsService.settings().upreset);
    })
  }

  ngOnInit(): void {
    const upreset = this.settingsService.settings().upreset;
    this.settingsService
      .getPresets(upreset)
      .subscribe((data) => (this.presets = data));

    let color_uyv = [
      this.raspiConfig.config().at_y,
      this.raspiConfig.config().at_u,
      this.raspiConfig.config().at_v,
    ];
    this.at_yuv =
      '#' + colorconverter.RGB2HEX(colorconverter.YUV2RGB(color_uyv));

    let color_yuv = [
      this.raspiConfig.config().ac_y,
      this.raspiConfig.config().ac_u,
      this.raspiConfig.config().ac_v,
    ];
    this.ac_yuv =
      '#' + colorconverter.RGB2HEX(colorconverter.YUV2RGB(color_yuv));
  }

  setPreset(preset: string, fps_divider:number) {
    this.presets.forEach((element) => {
      if (element.name == preset) {
        this.selected_preset = element;
      }
    });
    this.raspiConfig.config().video_width = this.selected_preset.width;
    this.raspiConfig.config().video_height = this.selected_preset.height;
    this.raspiConfig.config().video_fps = this.selected_preset.fps;
    this.raspiConfig.config().mp4box_fps = this.selected_preset.i_rate;
    this.raspiConfig.config().image_width = this.selected_preset.i_width;
    this.raspiConfig.config().image_height = this.selected_preset.i_height;

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

  switchLed() {
    // Pipan call library
  }

  sendCmd(cmd: string, params: any) {
    this.raspiConfig.sendCmd(cmd, params);
  }
}
