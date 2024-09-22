import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonPublic, ButtonsService } from '../../../generator';

@Component({
  selector: 'app-adm-user-buttons',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adm-user-buttons.component.html',
})
export class AdmUserButtonsComponent {
  userbuttons = <ButtonPublic[]>[];
  button = <ButtonPublic>{ display: false };

  constructor(
    private buttonService: ButtonsService
  ) {}

  ngOnInit(): void {
    this.listUserButtons();
  }

  delete(id: number) {
    this.buttonService.buttonsDelete(id).subscribe(() => {
      this.listUserButtons();
    });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;
    this.buttonService.buttonsPostButtons(formData).subscribe(() => {
      this.listUserButtons();
      form.resetForm();
    });
  }

  listUserButtons() {
    this.buttonService.buttonsGetButtons().subscribe((rsp) => {
      this.userbuttons = rsp;
    });
  }
}
