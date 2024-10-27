import { effect, Injectable, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SettingsService, SystemService } from '../../client';
import { SignalsAuthService } from './signals-auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignalsSettingsService {
  private Settings = signal<any>({});
  settings = this.Settings.asReadonly();

  private Versions = signal<any>({});
  versions = this.Versions.asReadonly();

  private menuId = signal('');
  menu_id = this.menuId.asReadonly();

  private displayMode = signal<boolean>(true);
  display_mode = this.displayMode.asReadonly();

  private mjpegMode = signal<boolean>(false);
  mjpeg_mode = this.mjpegMode.asReadonly();

  private colorMode = signal<string>('auto');
  color_mode = this.colorMode.asReadonly();

  private previewDisable = signal(false);
  preview_select_disable = this.previewDisable.asReadonly();

  constructor(
    private router: Router,
    private settingsSvc : SettingsService,
    private system: SystemService,
    private signalAuth: SignalsAuthService,
  ) {

    let mjpegMode = localStorage.getItem('mjpeg_mode');
    if (mjpegMode) {
      this.setMjpegMode(mjpegMode == 'true' ? true : false);
    }
    let displayMode = localStorage.getItem('display_mode');
    if (displayMode) {
      this.setDisplayMode(displayMode == 'true' ? true : false);
    }
    let colorMode = localStorage.getItem('color_mode');
    if (colorMode) {
      this.setColorMode(colorMode);
    }

    effect(() => {
      if (this.signalAuth.current_user()) {
        this.settingsSvc
        .settingsGet()
        .subscribe((rsp) => this.setConfig(rsp));
        this.system
        .systemGetVersion()
        .subscribe((rsp) => this.setVersions(rsp));
      }

      localStorage.setItem('display_mode', this.display_mode() ? 'true' : 'false');
      localStorage.setItem('mjpeg_mode', this.mjpeg_mode() ? 'true' : 'false');
      localStorage.setItem('color_mode', this.color_mode());
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let menu = event.url.split('/')[1];
        this.menuId.set(menu);
      }
    });
  }

  setDisplayMode(state: boolean) {
    this.displayMode.set(state);
  }
  setMjpegMode(state: boolean) {
    this.mjpegMode.set(state);
  }
  setColorMode(state: string) {
    this.colorMode.set(state);
  }
  setPreviewDisabled(state: boolean) {
    this.previewDisable.set(state);
  }
  setConfig(config: any) {
    this.Settings.set(config);
  }
  setVersions(config: any) {
    this.Versions.set(config);
  }
}
