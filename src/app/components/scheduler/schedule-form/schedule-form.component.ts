import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalsSchedulerService } from '../../../core/signals/signals-scheduler.service';


@Component({
  selector: 'app-schedule-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-form.component.html',
})
export class ScheduleFormComponent {
  scheduler_day = computed(() => this.signalScheduler.scheduler_day());
  daymode = computed(() => this.signalScheduler.daymode());
  current_period = computed(() => this.signalScheduler.current_period())

  constructor(
    private signalScheduler: SignalsSchedulerService
  ) {}
}