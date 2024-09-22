import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
    SystemService,
    UserLevel,
    UserPublic, UsersService
} from '../../../client';
import { ModalQrComponent } from '../../modals/modal-qr/modal-qr.component';

type User = UserPublic & { password?: string | null };


@Component({
  selector: 'app-adm-users',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalQrComponent],
  templateUrl: './adm-users.component.html',
})
export class AdmUsersComponent {
  @ViewChild(ModalQrComponent)
  qrModal!: ModalQrComponent;

  userlevel = <UserLevel[]>[];
  users = <User[]>[];
  user = <User>{};

  constructor(
    private SystemService: SystemService,
    private UsersService: UsersService
  ) {}

  ngOnInit(): void {
    this.SystemService.systemGetUserlevel().subscribe(
      (rsp) => (this.userlevel = rsp)
    );
    this.listUsers();
  }

  delete(id: number) {
    this.UsersService.usersDeleteUser(id).subscribe(() => {
      this.listUsers();
    });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;
    this.UsersService.usersPost(formData).subscribe(() => {
      this.listUsers();
      form.resetForm();
    });
  }

  onChange(user: User) {
    this.UsersService.usersPutUser(user.id, user).subscribe();
  }

  listUsers() {
    this.UsersService.usersGet().subscribe((rsp) => {
      this.users = rsp;
    });
  }

  otpCheckModal(user: User) {
    if (user.otp_confirmed !== undefined) this.qrModal.show(user.otp_confirmed, user.id);
  }
}
