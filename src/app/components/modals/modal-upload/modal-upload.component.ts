import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BASE_URL } from '../../../core/tokens/app.token';
import { SettingsService } from '../../../generator';

@Component({
  selector: 'app-modal-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-upload.component.html',
})
export class ModalUploadComponent implements OnInit {
  BASE_URL = inject(BASE_URL);

  file!: File;
  selectedFile: any;
  message: string = '';
  uploadingFile: boolean = false;

  el = viewChild.required<ElementRef>('uploadModal');

  constructor(
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.el().nativeElement.addEventListener('show.bs.modal', () => {
      this.uploadingFile = false;
    });
  }

  onFilechange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.selectedFile);
    reader.onload = () => {
      if (reader.result) {
        const blob = new Blob([reader.result], { type: this.selectedFile.type });
        this.uploadImage(blob);
      }
    };
  }

  uploadImage(blob: Blob): void {
    this.settings.settingsPostRestore(blob).subscribe({

      next: () => {
        const modal = window.bootstrap.Modal.getInstance(
          this.el().nativeElement
        );
        modal?.hide();
      },
      error: (error) => (this.message = error.message),

    })

  }

}
