import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Rsync, RsyncService } from '../../../generator';

@Component({
  selector: 'app-adm-rsync',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adm-rsync.component.html',
})
export class AdmRSyncComponent implements OnInit {
  rsync = <Rsync>{ rs_enabled: false };

  constructor(
    private rsyncService: RsyncService
  ) {}

  ngOnInit(): void {
    this.rsyncService.rsyncGet().subscribe((rsp) => {
      this.rsync = rsp;
    });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;
    this.rsyncService.rsyncPost(formData).subscribe();
  }

  onReset(form: NgForm) {
    this.rsyncService.rsyncDelete().subscribe(() => {
      form.resetForm();
    });
  }
}
