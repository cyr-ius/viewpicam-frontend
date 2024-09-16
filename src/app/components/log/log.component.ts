import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { Log } from '../../core/models/app-models';
import { SettingsService } from '../../core/services/settings.service';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html'
})
export class LogComponent implements OnInit {

  logs = <Log[]> []
  spinner = computed(() => this.globalSpinner.spinner())

  constructor(
    private settingsService: SettingsService,
    private globalSpinner: GlobalSpinnerService
  ){}

  ngOnInit(): void {
    this.globalSpinner.on()
    this.settingsService.getLog(true).subscribe(rsp => this.logs = rsp)
  }

}
