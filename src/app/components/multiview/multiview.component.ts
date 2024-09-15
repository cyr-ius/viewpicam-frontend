import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Multiview } from '../../core/models/app-models';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-multiview',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './multiview.component.html'
})
export class MultiviewComponent implements OnInit {

  multiviews!: Observable<Multiview[]>

  constructor(
    private settingsService:SettingsService
  ){}

  ngOnInit(): void {
    let time = new Date().getTime()
    this.multiviews = this.settingsService.getMultiview()
  }

}
