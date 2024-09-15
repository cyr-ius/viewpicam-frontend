import { Component } from '@angular/core';
import { ModalUploadComponent } from '../../modals/modal-upload/modal-upload.component';


@Component({
  selector: 'app-motion-external',
  standalone: true,
  imports: [ModalUploadComponent],
  templateUrl: './motion-external.component.html'
})
export class MotionExternalComponent {

motion_ready = false
show_all = false

}
