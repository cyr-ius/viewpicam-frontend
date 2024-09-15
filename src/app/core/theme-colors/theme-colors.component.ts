import { Component, computed } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-colors',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './theme-colors.component.html',
  styleUrl: './theme-colors.component.css'
})
export class ThemeColorsComponent {

  color = computed(() => this.settingsService.color_mode())

  constructor(
    private settingsService:SettingsService
  ){}

  toggleMode(value:string){
    this.settingsService.setColorMode(value);
  }
}
