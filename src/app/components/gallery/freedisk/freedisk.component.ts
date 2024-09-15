import { Component, OnInit } from '@angular/core';
import { FreeDisk } from '../../../core/models/app-models';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-freedisk',
  standalone: true,
  imports: [],
  templateUrl: './freedisk.component.html'
})
export class FreediskComponent implements OnInit{

  disk_usage!: FreeDisk

  constructor(
    private settingsService: SettingsService
  ){}

  ngOnInit(): void {
    this.settingsService.getFreedisk().subscribe(
      (data) => this.disk_usage = data
    )
  }
}
