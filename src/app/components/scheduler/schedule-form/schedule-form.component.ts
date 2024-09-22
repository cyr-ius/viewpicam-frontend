import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { SignalsSchedulerService } from '../../../core/signals/signals-scheduler.service';
import { ScheduleService } from '../../../generator';


@Component({
  selector: 'app-schedule-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-form.component.html',
})
export class ScheduleFormComponent implements OnInit {
  scheduler_day = computed(() => this.signalScheduler.scheduler_day());
  daymode = computed(() => this.signalScheduler.daymode());

  constructor(
    private schedule: ScheduleService,
    private signalScheduler: SignalsSchedulerService
  ) {}

  ngOnInit(): void {
    this.schedule
      .scheduleGetSchedulers()
      .pipe(tap((data) => this.signalScheduler.setSchedulerDay(data)))
      .subscribe();
  }
}
