import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-upload.component.html'
})
export class ModalUploadComponent implements OnInit {

  file!: File;
  selectedFile: any
  message: string = ""
  uploadingFile:boolean = false

  el = viewChild.required<ElementRef>('uploadModal')

  constructor(
    private settingsService: SettingsService
  ){}

  ngOnInit(): void {
    this.el().nativeElement.addEventListener('show.bs.modal', (event: any) => {
      this.uploadingFile = false
    })
  }

  onFilechange(event: any) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.uploadingFile = true

    this.settingsService.restoreSettings(formData).subscribe({
      next: resp => {
        const modal = window.bootstrap.Modal.getInstance(this.el().nativeElement)
        modal?.hide()
      },
      error: error => this.message = error.message
    })
  }

}
