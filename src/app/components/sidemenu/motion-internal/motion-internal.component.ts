import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Command, RaspiconfigService } from '../../../client';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsSettingsService } from '../../../core/signals/signals-settings.service';

@Component({
  selector: 'app-motion-internal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './motion-internal.component.html',
})
export class MotionInternalComponent {
  raspiconfig = computed(() => this.signalRaspiconfig.config());
  preview_select_disable = computed(() =>
    this.signalSettings.preview_select_disable()
  );

  constructor(
    private raspiConfig: RaspiconfigService,
    private signalSettings: SignalsSettingsService,
    private signalRaspiconfig: SignalsRaspiconfigService
  ) {}

  sendCmd(cmd: any, params: any) {
    if ( ! Array.isArray(params))
      params = [params]
    const data = <Command>({ cmd: cmd, params: params });
    this.raspiConfig.raspiconfigPost(data).subscribe();
  }
}
