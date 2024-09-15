import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SchedulerService } from '../../../core/services/scheduler.service';


@Component({
  selector: 'app-current-state',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './current-state.component.html'
})
export class CurrentStateComponent  implements OnInit {


  period = computed(() => this.schedulerService.period())

  constructor(
    private schedulerService: SchedulerService
  ){}

  offset:string = "";
  sunrise:Date= new Date();
  sunset:Date= new Date();
  current_time = new Date();
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe( () => this.current_time = new Date())
    this.schedulerService.getSunrise().subscribe( (rsp) => this.sunrise = rsp.datetime);
    this.schedulerService.getSunset().subscribe( (rsp) => this.sunset = rsp.datetime);
    this.schedulerService.getGMTOffset().subscribe( (rsp) => this.offset = rsp.gmt_offset);
    this.schedulerService.getState().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
