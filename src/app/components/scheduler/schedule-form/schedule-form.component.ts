import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { ScheduleService } from '../../../client';
import { SignalsSchedulerService } from '../../../core/signals/signals-scheduler.service';


@Component({
  selector: 'app-schedule-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-form.component.html',
})
export class ScheduleFormComponent implements OnInit {
  scheduler_day = computed(() => this.signalScheduler.scheduler_day());
  daymode = computed(() => this.signalScheduler.daymode());
  current_period = computed(() => this.signalScheduler.current_period())

  constructor(
    private schedule: ScheduleService,
    private signalScheduler: SignalsSchedulerService
  ) {}

  ngOnInit(): void {
    this.schedule
      .scheduleGetSchedulers()
      .pipe(
        tap((data) => this.signalScheduler.setSchedulerDay(data))
      )
      .subscribe();
  }
}
