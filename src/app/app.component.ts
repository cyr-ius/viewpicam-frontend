import { Component, effect, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FootbarComponent } from './components/footbar/footbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { AuthService } from './core/services/auth.service';
import { RaspiconfigService } from './core/services/raspiconfig.service';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FootbarComponent, NavbarComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private renderer: Renderer2,
    private settingsService: SettingsService,
    private authService:AuthService,
    private raspiConfig: RaspiconfigService
  ){
    effect(() => {
      this.renderer.setAttribute(document.querySelector('html'), 'data-bs-theme', this.settingsService.color_mode());
      if (this.authService.current_user()) {
        this.raspiConfig.getConfig().subscribe(rsp => this.raspiConfig.setConfig(rsp));
        this.settingsService.getSetting().subscribe( rsp => this.settingsService.setConfig(rsp))
        this.settingsService.getVersion().subscribe( rsp => this.settingsService.setVersions(rsp))
      }
    })
  }
}
