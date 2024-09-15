import { Component, computed, effect } from '@angular/core';
import { MainButton } from '../../../core/models/app-models';
import { AuthService } from '../../../core/services/auth.service';
import { RaspiconfigService } from '../../../core/services/raspiconfig.service';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-main-buttons',
  standalone: true,
  imports: [],
  templateUrl: './main-buttons.component.html'
})
export class MainButtonsComponent {

  current_user = computed(()=> this.authService.current_user())

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private raspiConfig: RaspiconfigService
  ){
    effect(() => {
      this.changeButtons(this.raspiConfig.status_mjpeg())
    },{ allowSignalWrites: true });
  }

  css_primary = "btn btn-primary"
  css_warning = "btn btn-warning"

  video_btn = <MainButton>({disable:false, css: this.css_primary, label: "record video start", cmd: "ca", params:"1"});
  image_btn = <MainButton>({disable:false, css: this.css_primary, label: "record image", cmd:"im", params:""});
  timelapse_btn = <MainButton>({disable:false, css: this.css_primary, label: "timelapse start", cmd:"tl", params:"1"});
  md_btn = <MainButton>({disable:false, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
  halt_btn = <MainButton>({disable:false, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});

  changeButtons(data:string): void {

    if (data == "ready") {
      this.video_btn = <MainButton>({disable:false, css: this.css_primary, label: "record video start", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:false, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_primary, label: "timelapse start", cmd:"tl", params:"1"});
      this.md_btn = <MainButton>({disable:false, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:false, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
      this.raspiConfig.setHalted(false);
    } else if (data == "md_ready") {
      this.video_btn = <MainButton>({disable:true, css: this.css_primary, label: "record video start", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:false, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_primary, label: "timelapse start", cmd:"tl", params:"1"});
      this.md_btn = <MainButton>({disable:false, css: this.css_warning, label: "motion detection stop", cmd:"md", params:"0"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
      this.raspiConfig.setHalted(false);
    }else if (data == "timelapse") {
      this.video_btn = <MainButton>({disable:false, css: this.css_primary, label: "record video start", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:true, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_warning, label: "timelapse stop", cmd:"tl", params:"0"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
    }else if (data == "tl_md_ready") {
      this.video_btn = <MainButton>({disable:true, css: this.css_primary, label: "record video start", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:false, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_warning, label: "timelapse stop", cmd:"tl", params:"0"});
      this.md_btn = <MainButton>({disable:false, css: this.css_warning, label: "motion detection stop", cmd:"md", params:"0"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
      this.raspiConfig.setHalted(false);
    }else if (data == "video") {
      this.video_btn = <MainButton>({disable:false, css: this.css_warning, label: "record video stop", cmd: "ca", params:"0"});
      this.image_btn = <MainButton>({disable:false, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_primary, label: "timelapse start", cmd:"tl", params:"1"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
      this.settingsService.setPreviewDisabled(true);
    }else if (data == "md_video") {
      this.video_btn = <MainButton>({disable:true, css: this.css_primary, label: "record video stop", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:false, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_primary, label: "timelapse start", cmd:"tl", params:"1"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "recording video...", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
    }else if (data == "tl_video") {
      this.video_btn = <MainButton>({disable:false, css: this.css_warning, label: "record video stop", cmd: "ca", params:"0"});
      this.image_btn = <MainButton>({disable:true, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_warning, label: "timelapse stop", cmd:"tl", params:"0"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
    }else if (data == "tl_md_video") {
      this.video_btn = <MainButton>({disable:false, css: this.css_warning, label: "record video stop", cmd: "ca", params:"0"});
      this.image_btn = <MainButton>({disable:true, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:false, css: this.css_warning, label: "timelapse stop", cmd:"tl", params:"0"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "recording video...", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
    }else if (data == "image") {
      this.video_btn = <MainButton>({disable:true, css: this.css_warning, label: "record video start", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:true, css: this.css_warning, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:true, css: this.css_warning, label: "timelapse start", cmd:"tl", params:"1"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:true, css: this.css_primary, label: "camera stop", cmd:"ru", params:"0"});
    }else if (data == "halted") {
      this.video_btn = <MainButton>({disable:true, css: this.css_primary, label: "record video start", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:true, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:true, css: this.css_primary, label: "timelapse start", cmd:"tl", params:"1"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:false, css: this.css_primary, label: "camera start", cmd:"ru", params:"1"});
      this.raspiConfig.setHalted(true);
    }else if (data == "") {
      this.video_btn = <MainButton>({disable:true, css: this.css_primary, label: "record video start", cmd: "ca", params:"1"});
      this.image_btn = <MainButton>({disable:true, css: this.css_primary, label: "record image", cmd:"im", params:""});
      this.timelapse_btn = <MainButton>({disable:true, css: this.css_primary, label: "timelapse start", cmd:"tl", params:"1"});
      this.md_btn = <MainButton>({disable:true, css: this.css_primary, label: "motion detection start", cmd:"md", params:"1"});
      this.halt_btn = <MainButton>({disable:false, css: this.css_primary, label: "camera start", cmd:"ru", params:"1"});
      this.raspiConfig.setHalted(true);
    }else if(data.slice(0,5) == "Error") {
      alert("Error in RaspiMJPEG: " + data.slice(7) + "\nRestart ViewPI Cam or the whole RPi.");
    }
  }

  sendCmd(cmd:any, params:any){
    this.raspiConfig.sendCmd(cmd, [params]);
  }
}
