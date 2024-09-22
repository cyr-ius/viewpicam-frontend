import { CommonModule } from "@angular/common";
import { Component, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SignalsSettingsService } from "../signals/signals-settings.service";

@Component({
  selector: 'app-theme-colors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-colors.component.html',
  styleUrl: './theme-colors.component.css',
})
export class ThemeColorsComponent {
  color = computed(() => this.signalSettings.color_mode());

  constructor(private signalSettings: SignalsSettingsService) {}

  toggleMode(value: string) {
    this.signalSettings.setColorMode(value);
  }
}
