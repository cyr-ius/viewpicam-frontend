import { Component, effect, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FootbarComponent } from './components/footbar/footbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { SignalsSettingsService } from './core/signals/signals-settings.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FootbarComponent, NavbarComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(
    private renderer: Renderer2,
    private signalSettings: SignalsSettingsService,
    private titleService:Title
  ) {
    effect(() => {
      this.renderer.setAttribute(
        document.querySelector('html'),
        'data-bs-theme',
        this.signalSettings.color_mode()
      );

      if (this.signalSettings.versions().current_version != undefined)
        this.titleService.setTitle(`ViewPiCam (${this.signalSettings.versions().current_version})`);

    });
  }
}
