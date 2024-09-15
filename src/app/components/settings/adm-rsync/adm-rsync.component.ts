import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Rsync } from '../../../core/models/app-models';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-adm-rsync',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adm-rsync.component.html'
})
export class AdmRSyncComponent implements OnInit {


 rsync = <Rsync> {rs_enabled:false}

  constructor(
    private settingsService: SettingsService
  ){}

  ngOnInit(): void {
    this.settingsService.getRsync().subscribe((rsp)=>{
      this.rsync = rsp
    })
  }

  onSubmit(form: NgForm){
    const formData = form.value;
    this.settingsService.setRsync(formData).subscribe()
  }

  onReset(form: NgForm){
    this.settingsService.deleteRsync().subscribe(()=>{
      form.resetForm()
    })
  }
}
