import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchedulerService } from '../../../core/services/scheduler.service';


@Component({
  selector: 'app-schedule-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-form.component.html'
})
export class ScheduleFormComponent implements OnInit{

  scheduler_day = computed(() => this.schedulerService.scheduler_day())
  daymode = computed(() => this.schedulerService.daymode())

  constructor(
    private schedulerService: SchedulerService
  ){}

  ngOnInit(): void {
    this.schedulerService.getSchedule().subscribe();
  }
}
