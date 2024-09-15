import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserButton } from '../../../core/models/app-models';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-user-buttons',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-buttons.component.html'
})
export class UserButtonsComponent implements OnInit{

  ubuttons!: Observable<UserButton[]>

  constructor(
    private settingsService: SettingsService
  ){}

  ngOnInit(): void {
    this.ubuttons = this.settingsService.getUserButtons()
  }
}
