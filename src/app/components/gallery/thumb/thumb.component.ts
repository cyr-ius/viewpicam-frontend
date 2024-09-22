import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsThumbsService } from '../../../core/signals/signals-thumbs.service';
import { Files as files, PreviewsService } from '../../../generator';

type Files = files & { selected?: boolean | null };

@Component({
  selector: 'app-thumb',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './thumb.component.html',
})
export class ThumbComponent {

  thumb = input.required<Files>();
  thumb_src = computed(
    () => this.signalRaspiconfig.media_path() + '/' + this.thumb().name
  );

  constructor(
    private signalRaspiconfig: SignalsRaspiconfigService,
    private signalThumbs: SignalsThumbsService,
    private previews: PreviewsService
  ) {}

  delete(thumb_id: string | null | undefined) {
    if (thumb_id) {
      this.previews
        .previewsDeleteThumb(thumb_id)
        .subscribe(() => this.signalThumbs.removeThumbs(this.thumb()));
    }
  }

  lock(thumb_id: string | null | undefined) {
    if (thumb_id) {
      if (this.thumb().locked) {
        this.previews
          .previewsPostUnlock(thumb_id)
          .subscribe(() => (this.thumb().locked = false));
      } else {
        this.previews
          .previewsPostLock(thumb_id)
          .subscribe(() => (this.thumb().locked = true));
      }
    }
  }

  selectedThumb() {
    this.thumb().selected = true;
  }
}
