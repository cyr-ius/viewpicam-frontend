import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalsThumbsService } from '../../../core/signals/signals-thumbs.service';
import { TIME_FILTER_MAX } from '../../../core/tokens/app.token';

@Component({
  selector: 'app-thumb-list-ordering',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './thumb-list-ordering.component.html',
})
export class ThumbListOrderingComponent {
  time_filter_max = +inject(TIME_FILTER_MAX);
  display_preview = computed(() => this.signalThumbs.display_preview());

  constructor(
    public signalThumbs: SignalsThumbsService,
    private router: Router
  ) {}

  hiddenPreview() {
    this.signalThumbs.setDisplayPreview(false);
    this.router.navigate(['gallery']);
  }
}
