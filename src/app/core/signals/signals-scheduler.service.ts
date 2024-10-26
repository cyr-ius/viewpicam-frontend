import { Injectable, signal } from '@angular/core';
import { Schedule, ScheduleService } from '../../client';
import { SchedulerWithCalendars } from '../../client/model/schedulerWithCalendars';

@Injectable({
  providedIn: 'root',
})
export class SignalsSchedulerService {
  private schedulerDay = signal<SchedulerWithCalendars[]>([]);
  scheduler_day = this.schedulerDay.asReadonly();
  private schedulerSettings = signal<Schedule>({
    autocamera_interval: 0,
    autocapture_interval: 0,
    cmd_poll: 0,
    dawnstart_minutes: 0,
    dayend_minutes: 0,
    daymode: 0,
    daystart_minutes: 0,
    duskend_minutes: 0,
    management_interval: 0,
    max_capture: 0,
    mode_poll: 0,
    purgeimage_hours: 0,
    purgelapse_hours: 0,
    purgevideo_hours: 0,
    purgespace_level: 0,
    purgespace_modeex: 0,
    gmt_offset: "Etc/UTC",
    latitude:0,
    longitude: 0
  });
  scheduler_settings = this.schedulerSettings.asReadonly();

  private currentPeriod = signal<string>('');
  current_period = this.currentPeriod.asReadonly();

  private dayMode = signal<number>(-1);
  daymode = this.dayMode.asReadonly();
  private schedulerState = signal<boolean>(false);
  scheduler_state = this.schedulerState.asReadonly();

  private gmtOffset = signal<string>(this.scheduler_settings().gmt_offset);
  gmt_offset = this.gmtOffset.asReadonly();

  constructor(private schedule: ScheduleService) {}

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
