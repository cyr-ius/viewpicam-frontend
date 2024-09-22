import { Component, effect, inject, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FootbarComponent } from './components/footbar/footbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { SignalsAuthService } from './core/signals/signals-auth.service';
import { SignalsRaspiconfigService } from './core/signals/signals-raspiconfig.service';
import { SignalsSettingsService } from './core/signals/signals-settings.service';
import { RaspiconfigService, SettingsService, SystemService } from './generator';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FootbarComponent, NavbarComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = inject(Title);

  constructor(
    private renderer: Renderer2,
    private signalAuth: SignalsAuthService,
    private raspiconfig: RaspiconfigService,
    private system: SystemService,
    private settings: SettingsService,
    private signalSettings: SignalsSettingsService,
    private signalRaspiconfig: SignalsRaspiconfigService
  ) {
    effect(() => {
      this.renderer.setAttribute(
        document.querySelector('html'),
        'data-bs-theme',
        this.signalSettings.color_mode()
      );
      if (this.signalAuth.current_user()) {
        this.raspiconfig
          .raspiconfigGet()
          .subscribe((rsp) => this.signalRaspiconfig.setConfig(rsp));
        this.settings.settingsGet().subscribe((rsp) => {
          this.signalSettings.setConfig(rsp);
        });
        this.system.systemGetVersion().subscribe((rsp: any) => {
          this.signalSettings.setVersions(rsp);
          this.title.setTitle(`ViewPiCam (${rsp.current_version})`);
        });
      }
    });
  }
}
