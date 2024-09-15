import { AsyncPipe } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchedulerService } from '../../../core/services/scheduler.service';
import { RaspiconfigService } from '../../../core/services/raspiconfig.service';


@Component({
  selector: 'app-setttings-form',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './setttings-form.component.html'
})
export class SetttingsFormComponent implements OnInit {

  scheduler_settings = computed(() => this.schedulerService.scheduler_settings())
  raspiconfig= computed( ()=> this.raspiconfigService.config() )
  timezones!: Observable<string[]>

  constructor(
    private schedulerService:SchedulerService,
    private raspiconfigService:RaspiconfigService
  ){}

  ngOnInit(): void {
    this.timezones = this.schedulerService.getTimezones();
    this.schedulerService.getSettings().subscribe()
  }

  onDayModeChange(){
    const daymode = +this.scheduler_settings()!.daymode
    this.schedulerService.setDaymode(daymode)
  }


}
