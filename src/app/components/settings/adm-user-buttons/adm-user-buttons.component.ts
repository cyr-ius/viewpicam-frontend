import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserButton } from '../../../core/models/app-models';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-adm-user-buttons',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adm-user-buttons.component.html'
})
export class AdmUserButtonsComponent {


  userbuttons = <UserButton[]> []
  button = <UserButton> {display:false}

  constructor(
    private settingsService:SettingsService
  ){}


  ngOnInit(): void {
    this.listUserButtons()
  }

  delete(id:number){
    this.settingsService.deleteUserButtons(id).subscribe(()=>{
      this.listUserButtons()
    })
  }

  onSubmit(form:NgForm){
    const formData = form.value;
    this.settingsService.setUserButtons(formData).subscribe(()=> {
      this.listUserButtons();
      form.resetForm();
    })
  }

  listUserButtons(){
    this.settingsService.getUserButtons().subscribe((rsp)=>{
      this.userbuttons = rsp
    })
  }


}
