import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';
import { Log, LogsService } from '../../generator';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
})
export class LogComponent implements OnInit {
  logs = <Log[]>[];
  spinner = computed(() => this.globalSpinner.spinner());

  constructor(
    private globalSpinner: GlobalSpinnerService,
    private LogsService: LogsService
  ) {}

  ngOnInit(): void {
    this.globalSpinner.on();
    this.LogsService.logsGet(true).subscribe(
      (rsp) => (this.logs = rsp)
    );
  }
}
