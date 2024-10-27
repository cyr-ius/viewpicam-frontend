import { AsyncPipe } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Coordinates, ScheduleService } from '../../../client';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsSchedulerService } from '../../../core/signals/signals-scheduler.service';


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
  }

  onDayModeChange() {
    this.schedule.schedulePut(this.scheduler_settings()).subscribe(()=>{
      this.signalScheduler.setDaymode(+this.scheduler_settings()!.daymode);
    })
  }

  onTimeZoneChange(){
    this.schedule.schedulePut(this.scheduler_settings()).subscribe(()=>{
      this.signalScheduler.setTimezone(this.scheduler_settings().gmt_offset);
      this.onDayModeChange();
    })
  }

  onCoordinatesChange(){
    let lat = this.scheduler_settings().latitude;
    let lng = this.scheduler_settings().longitude;
    this.schedule.schedulePostTimezonefinder(<Coordinates>({longitude:lng,latitude:lat})).subscribe(
      (rsp) => {
        this.scheduler_settings().gmt_offset = String(rsp);
        this.onTimeZoneChange();
      }
    )
  }

}
