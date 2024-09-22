import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SignalsSchedulerService } from '../../../core/signals/signals-scheduler.service';
import { ScheduleService, TasksService } from '../../../generator';

@Component({
  selector: 'app-current-state',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './current-state.component.html',
})
export class CurrentStateComponent implements OnInit {
  period = computed(() => this.signalScheduler.period());

  constructor(
    private TasksService: TasksService,
    private schedule: ScheduleService,
    private signalScheduler: SignalsSchedulerService
  ) {}

  offset: string = '';
  sunrise: string = '';
  sunset: string = '';
  current_time = new Date();
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(
      () => (this.current_time = new Date())
    );
    this.schedule
      .scheduleGetSunrise()
      .subscribe((rsp) => (this.sunrise = rsp.day_time));
    this.schedule
      .scheduleGetSunset()
      .subscribe((rsp) => (this.sunset = rsp.day_time));
    this.schedule
      .scheduleGetGmtoffset()
      .subscribe((rsp) => (this.offset = rsp.gmt_offset));
    this.TasksService.tasksStatus().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
