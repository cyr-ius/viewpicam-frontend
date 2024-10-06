import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ScheduleService, TasksService } from '../../../client';
import { SignalsSchedulerService } from '../../../core/signals/signals-scheduler.service';

@Component({
  selector: 'app-current-state',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './current-state.component.html',
})
export class CurrentStateComponent implements OnInit {
  current_period = computed(() => this.signalScheduler.current_period());
  offset: string = '';
  sunrise: string = '';
  sunset: string = '';
  current_time = new Date();
  subscription!: Subscription;

  constructor(
    private TasksService: TasksService,
    private schedule: ScheduleService,
    private signalScheduler: SignalsSchedulerService
  ) {}

  ngOnInit(): void {
    this.schedule
      .scheduleGetSunrise()
      .subscribe((rsp) => (this.sunrise = rsp.day_time));
    this.schedule
      .scheduleGetSunset()
      .subscribe((rsp) => (this.sunset = rsp.day_time));
    this.schedule
      .scheduleGetGmtoffset()
      .subscribe((rsp) => (this.offset = rsp.gmt_offset));

    this.TasksService.tasksStatus().subscribe(
      (data) => this.signalScheduler.setState(data.state)
    );
    this.subscription = this.TimeClock()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  TimeClock(): Subscription {
    return interval(1000).subscribe(
      () => (this.current_time = new Date())
    );
  }

}
