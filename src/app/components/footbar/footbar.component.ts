import { AsyncPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SettingsService } from '../../core/services/settings.service';
import { ThemeColorsComponent } from '../../core/theme-colors/theme-colors.component';
import { ThemeLanguageComponent } from '../../core/theme-language/theme-language.component';

@Component({
  selector: 'app-footbar',
  standalone: true,
  imports: [ThemeColorsComponent,ThemeLanguageComponent, AsyncPipe],
  templateUrl: './footbar.component.html'
})
export class FootbarComponent {

  current_user = computed(() => this.authService.current_user())
  gitVersion = computed(() => this.settingsService.versions())

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ){}

}
