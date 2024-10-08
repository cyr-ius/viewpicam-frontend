import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService as ClientService } from '../../../client';
import { SignalsSettingsService } from '../../../core/signals/signals-settings.service';

@Component({
  selector: 'app-log-level-mode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-level-mode.component.html',
})
export class LogLevelModeComponent {
  settings = computed(() => this.signalSettings.settings());

  constructor(
    private signalSettings: SignalsSettingsService,
    public SettingsService: ClientService
  ) {}

  onChange() {
    this.SettingsService.settingsPost(this.settings()).subscribe();
  }
}
