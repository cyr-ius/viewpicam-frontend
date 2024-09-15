import { CommonModule } from '@angular/common';
import { Component, computed, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Thumb } from '../../../core/models/app-models';
import { RaspiconfigService } from '../../../core/services/raspiconfig.service';
import { ThumbsService } from '../../../core/services/thumbs.service';
import { ThumbsListComponent } from '../thumbs-list.component';

@Component({
  selector: 'app-thumb',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './thumb.component.html'
})
export class ThumbComponent {

  thumb = input.required<Thumb>();
  thumb_src = computed(() => this.raspiConfig.media_path()+'/'+this.thumb().name)

  constructor(
    private thumbService: ThumbsService,
    private raspiConfig: RaspiconfigService
  ){}

  delete(thumb_id:string){
    this.thumbService.deleteThumbById(thumb_id).subscribe(
      () => this.thumbService.removeThumbs(this.thumb())
    )
  }

  lock(thumb_id:string){
    if (this.thumb().locked) {
      this.thumbService.unlockThumbById(thumb_id).subscribe(
        () => this.thumb().locked = false
      )
    } else {
      this.thumbService.lockThumbById(thumb_id).subscribe(
        () => this.thumb().locked = true
      )
    }
  }

  selectedThumb(){
    this.thumb().selected = true
  }

}
