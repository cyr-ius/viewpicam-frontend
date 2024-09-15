import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Multiview } from '../../../core/models/app-models';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-adm-multiview',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './adm-multiview.component.html'
})
export class AdmMultiviewComponent implements OnInit{

  multiviews = <Multiview[]> []
  multiview = <Multiview> {state:false}

  constructor(
    private settingsService:SettingsService
  ){}


  ngOnInit(): void {
    this.listMultiview()
  }

  delete(id:number){
    this.settingsService.deleteMultiview(id).subscribe(()=>{
      this.listMultiview()
    })
  }

  onSubmit(form:NgForm){
    const formData = form.value;
    this.settingsService.setMultiview(formData).subscribe(()=> {
      this.listMultiview();
      form.resetForm();
    })
  }

  listMultiview(){
    this.settingsService.getMultiview().subscribe((rsp)=>{
      this.multiviews = rsp
    })
  }

}
