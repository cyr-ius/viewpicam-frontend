import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsSettingsService } from '../../../core/signals/signals-settings.service';
import { Command, RaspiconfigService } from '../../../generator';

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
    const data = <Command>({ cmd: cmd, params: [params] });
    this.raspiConfig.raspiconfigPost(data).subscribe();
  }
}
