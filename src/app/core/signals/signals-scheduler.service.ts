import { effect, Injectable, signal } from '@angular/core';
import _ from 'lodash';
import { Schedule, ScheduleService, TasksService } from '../../client';
import { SchedulerWithCalendars } from '../../client/model/schedulerWithCalendars';
import { SignalsAuthService } from './signals-auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignalsSchedulerService {
  private schedulerDay = signal<SchedulerWithCalendars[]>([]);
  scheduler_day = this.schedulerDay.asReadonly();
  private schedulerSettings = signal<Schedule>(<Schedule>{});
  scheduler_settings = this.schedulerSettings.asReadonly();

  private currentPeriod = signal<string>('');
  current_period = this.currentPeriod.asReadonly();

  private dayMode = signal<number>(-1);
  daymode = this.dayMode.asReadonly();
  private schedulerState = signal<boolean>(false);
  scheduler_state = this.schedulerState.asReadonly();

  private gmtOffset = signal<string>('', {equal: _.isEqual});
  gmt_offset = this.gmtOffset.asReadonly();

  constructor(
    private schedule: ScheduleService,
    private signalAuth: SignalsAuthService,
    private TasksService: TasksService,
  ) {
    effect(() => {
      if (this.signalAuth.current_user()) {
        this.schedule.scheduleGet().subscribe(
          (data)=> {
            this.setSchedulerSettings(data);
            this.setTimezone(data.gmt_offset);
            this.setDaymode(data.daymode);
          }
        );
        this.schedule.scheduleGetSchedulers().subscribe(
          (data) => this.setSchedulerDay(data)
        );
        this.TasksService.tasksStatus().subscribe(
          (data) => this.setState(data.state)
        );

      }
    });
  }

  setDaymode(mode: number) {
    this.dayMode.set(mode);
    this.schedule.scheduleGetPeriod(mode).subscribe((rsp) => {
      this.currentPeriod.set(rsp.period);
    });
  }

  setSchedulerDay(days: SchedulerWithCalendars[]) {
    this.schedulerDay.set(days);
  }

  setSchedulerSettings(settings: Schedule) {
    this.schedulerSettings.set(settings);
  }

  setState(state: boolean) {
    this.schedulerState.set(state);
  }

  setTimezone(timezone: string) {
    this.gmtOffset.set(timezone);
  }
}
