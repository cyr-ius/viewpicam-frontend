import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-log-level-mode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-level-mode.component.html'
})
export class LogLevelModeComponent {

  settings = computed(()=> this.settingsService.settings())

  constructor(
    public settingsService: SettingsService
  ){}

  onChange(){
    this.settingsService.setSetting(this.settings()).subscribe()
  }

}
