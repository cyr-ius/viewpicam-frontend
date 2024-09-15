import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User, UserLevel } from '../../../core/models/app-models';
import { SettingsService } from '../../../core/services/settings.service';
import { ModalQrComponent } from '../../modals/modal-qr/modal-qr.component';


@Component({
  selector: 'app-adm-users',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalQrComponent],
  templateUrl: './adm-users.component.html'
})
export class AdmUsersComponent {

  @ViewChild(ModalQrComponent)
  qrModal!: ModalQrComponent

  userlevel = <UserLevel[]> []
  users = <User[]> []
  user = <User> {}

  constructor(
    private settingsService:SettingsService
  ){}

  ngOnInit(): void {
    this.settingsService.getUserLevel().subscribe(rsp => this.userlevel = rsp)
    this.listUsers()
  }

  delete(id:number){
    this.settingsService.deleteUsers(id).subscribe(()=>{
      this.listUsers()
    })
  }

  onSubmit(form:NgForm){
    const formData = form.value;
    this.settingsService.setUsers(formData).subscribe(()=> {
      this.listUsers();
      form.resetForm();
    })
  }

  onChange(user: User){
    this.settingsService.updateUser(user.id, user).subscribe()
  }

  listUsers(){
    this.settingsService.getUsers().subscribe((rsp)=>{
      this.users = rsp
    })
  }

  otpCheckModal(user: User){
    this.qrModal.show(user)

  }
}
