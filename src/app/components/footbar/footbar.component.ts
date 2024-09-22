import { AsyncPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ThemeColorsComponent } from '../../core/theme-colors/theme-colors.component';
import { ThemeLanguageComponent } from '../../core/theme-language/theme-language.component';
import { SignalsAuthService } from '../../core/signals/signals-auth.service';
import { SignalsSettingsService } from '../../core/signals/signals-settings.service';

@Component({
  selector: 'app-footbar',
  standalone: true,
  imports: [ThemeColorsComponent, ThemeLanguageComponent, AsyncPipe],
  templateUrl: './footbar.component.html',
})
export class FootbarComponent {
  current_user = computed(() => this.signalAuth.current_user());
  gitVersion = computed(() => this.signalSettings.versions());

  constructor(
    private signalAuth: SignalsAuthService,
    private signalSettings: SignalsSettingsService
  ) {}
}
