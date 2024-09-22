import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MultiviewPublic, MultiviewService } from '../../client';

@Component({
  selector: 'app-multiview',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './multiview.component.html',
})
export class MultiviewComponent implements OnInit {
  multiviews!: Observable<MultiviewPublic[]>;

  constructor(private multiviewsService: MultiviewService) {}

  ngOnInit(): void {
    this.multiviews = this.multiviewsService.multiviewGet();
  }
}
