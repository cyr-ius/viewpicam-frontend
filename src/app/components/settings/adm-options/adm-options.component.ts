import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import _ from 'lodash';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-adm-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adm-options.component.html'
})
export class AdmOptionsComponent implements OnInit{

  presets!: string[]
  settings = computed(()=> this.settingsService.settings())

  constructor(
    private settingsService:SettingsService
  ){}

  ngOnInit(): void {
    this.settingsService.getPresets().subscribe(
      rsp => {
        let modes: string[] = [];
        rsp.forEach(item => modes.push(item.mode));
        this.presets = _.uniq(modes);
      }
    )
  }

  onChange(){
    this.settingsService.setSetting(this.settings()).subscribe()
  }

}
