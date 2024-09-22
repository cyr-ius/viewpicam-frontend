import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import _ from 'lodash';
import {
    SettingsService,
    SystemService,
} from '../../../client';
import { SignalsSettingsService } from '../../../core/signals/signals-settings.service';
@Component({
  selector: 'app-adm-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adm-options.component.html',
})
export class AdmOptionsComponent implements OnInit {
  presets!: string[];
  settings = computed(() => this.signalSettings.settings());

  constructor(
    private signalSettings: SignalsSettingsService,
    private settingsService: SettingsService,
    private SystemService: SystemService
  ) {}

  ngOnInit(): void {
    this.SystemService.systemGetPresets().subscribe((rsp) => {
      let modes: string[] = [];
      rsp.forEach((item) => modes.push(item.mode));
      this.presets = _.uniq(modes);
    });
  }

  onChange() {
    this.settingsService
      .settingsPost(this.settings())
      .subscribe();
  }
}
