import { effect, Injectable, signal } from '@angular/core';
import { Files as files } from '../../generator';

type Files = files & { selected?: boolean | null };

@Injectable({
  providedIn: 'root',
})
export class SignalsThumbsService {
  private currentThumb = signal<Files | undefined>(undefined);
  current_thumb = this.currentThumb.asReadonly();
  private listThumbs = signal<Files[]>([]);
  list_thumbs = this.listThumbs.asReadonly();
  private displayPreview = signal<boolean>(false);
  display_preview = this.displayPreview.asReadonly();

  sort_order = signal('desc');
  show_types = signal('both');
  time_filter = signal(1);
  autorefresh = signal(false);

  constructor() {
    let sortOrder = localStorage.getItem('sort_order');
    if (sortOrder) {
      this.sort_order.set(sortOrder);
    }
    let showTypes = localStorage.getItem('show_types');
    if (showTypes) {
      this.show_types.set(showTypes);
    }
    let timeFilter = localStorage.getItem('time_filter');
    if (timeFilter) {
      this.time_filter.set(+timeFilter);
    }
    let autoRefresh = localStorage.getItem('autorefresh');
    if (autoRefresh) {
      this.autorefresh.set(autoRefresh == 'true' ? true : false);
    }

    effect(() => {
      localStorage.setItem('sort_order', this.sort_order());
      localStorage.setItem('show_types', this.show_types());
      localStorage.setItem('time_filter', this.time_filter().toString());
      localStorage.setItem(
        'autorefresh',
        this.autorefresh() ? 'true' : 'false'
      );
    });
  }

  setCurrentThumb(thumb: Files | undefined) {
    this.currentThumb.set(thumb);
  }
  setDisplayPreview(state: boolean) {
    this.displayPreview.set(state);
  }

  setThumbs(thumbs: Files[]) {
    this.listThumbs.set(thumbs);
  }

  addThumbs(thumb: Files) {
    this.listThumbs.update((values: Files[]) => [...values, thumb]);
  }

  removeThumbs(thumb: Files) {
    this.listThumbs.set(this.listThumbs().filter((t) => t !== thumb));
  }
}
