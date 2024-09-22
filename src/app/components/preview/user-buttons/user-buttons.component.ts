import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonPublic, ButtonsService } from '../../../generator';


@Component({
  selector: 'app-user-buttons',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-buttons.component.html',
})
export class UserButtonsComponent implements OnInit {
  ubuttons!: Observable<ButtonPublic[]>;

  constructor(private buttons: ButtonsService) {}

  ngOnInit(): void {
    this.ubuttons = this.buttons.buttonsGetButtons();
  }
}
