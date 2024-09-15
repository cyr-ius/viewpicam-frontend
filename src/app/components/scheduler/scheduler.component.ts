import { Component } from '@angular/core';
import { CurrentStateComponent } from './current-state/current-state.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { SetttingsFormComponent } from './setttings-form/setttings-form.component';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ScheduleFormComponent, SetttingsFormComponent, CurrentStateComponent],
  templateUrl: './scheduler.component.html'
})
export class SchedulerComponent {}
