import { AsyncPipe } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsSchedulerService } from '../../../core/signals/signals-scheduler.service';
import { ScheduleService } from '../../../generator';


@Component({
  selector: 'app-setttings-form',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './setttings-form.component.html',
})
export class SetttingsFormComponent implements OnInit {
  scheduler_settings = computed(() =>
    this.signalScheduler.scheduler_settings()
  );
  raspiconfig = computed(() => this.signalRaspiconfig.config());
  timezones!: Observable<string[]>;

  constructor(
    private signalRaspiconfig: SignalsRaspiconfigService,
    private schedule: ScheduleService,
    private signalScheduler: SignalsSchedulerService
  ) {}

  ngOnInit(): void {
    this.timezones = this.schedule.scheduleGetTimezone();
    this.schedule
      .scheduleGet()
      .pipe(
        tap((data) => {
          this.signalScheduler.setSchedulerSettings(data);
          this.signalScheduler.setDaymode(data.daymode);
        })
      )
      .subscribe();
  }

  onDayModeChange() {
    const daymode = +this.scheduler_settings()!.daymode;
    this.signalScheduler.setDaymode(daymode);
  }
}
