import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MultiviewPublic, MultiviewService } from '../../../client';

@Component({
  selector: 'app-adm-multiview',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './adm-multiview.component.html',
})
export class AdmMultiviewComponent implements OnInit {
  multiviews = <MultiviewPublic[]>[];
  multiview = <MultiviewPublic>{ state: 0 };

  constructor(
    private multiviewService: MultiviewService
  ) {}

  ngOnInit(): void {
    this.listMultiview();
  }

  delete(id: number) {
    this.multiviewService.multiviewDeleteMultiview(id).subscribe(() => {
      this.listMultiview();
    });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;
    this.multiviewService.multiviewPost(formData).subscribe(() => {
      this.listMultiview();
      form.resetForm();
    });
  }

  listMultiview() {
    this.multiviewService.multiviewGet().subscribe((rsp) => {
      this.multiviews = rsp;
    });
  }
}
