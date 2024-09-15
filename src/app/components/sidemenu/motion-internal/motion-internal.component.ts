import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RaspiconfigService } from '../../../core/services/raspiconfig.service';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-motion-internal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './motion-internal.component.html'
})
export class MotionInternalComponent  {

  raspiconfig = computed(() => this.raspiConfig.config())
  preview_select_disable = computed(() => this.settingsService.preview_select_disable())

  constructor(
    private raspiConfig: RaspiconfigService,
    private settingsService: SettingsService,
  ){}

  sendCmd(cmd:any, params:any){
    this.raspiConfig.sendCmd(cmd, params);
  }

}
