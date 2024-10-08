import { Component, OnInit } from '@angular/core';
import { FreeDisk, SystemService } from '../../../client';

@Component({
  selector: 'app-freedisk',
  standalone: true,
  imports: [],
  templateUrl: './freedisk.component.html',
})
export class FreediskComponent implements OnInit {
  disk_usage!: FreeDisk;
  style = "";

  constructor(private system: SystemService) {}

  ngOnInit(): void {
    this.system
      .systemGetFreedisks()
      .subscribe((data) => {
        this.disk_usage = data
        this.style=`background-color:${data.color};width:${data.prc}%;`

      });
  }
}
