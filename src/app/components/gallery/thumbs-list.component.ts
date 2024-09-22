import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { repeat, tap } from 'rxjs';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';
import { SignalsThumbsService } from '../../core/signals/signals-thumbs.service';
import { AUTOREFRESH } from '../../core/tokens/app.token';
import { PreviewsService } from '../../generator';
import { FreediskComponent } from './freedisk/freedisk.component';
import { ThumbListOrderingComponent } from './thumb-list-ordering/thumb-list-ordering.component';
import { ThumbPreviewComponent } from './thumb-preview/thumb-preview.component';
import { ThumbComponent } from './thumb/thumb.component';

@Component({
  selector: 'app-thumbs-list',
  standalone: true,
  imports: [ThumbListOrderingComponent, ThumbComponent, ThumbPreviewComponent, FreediskComponent, AsyncPipe],
  templateUrl: './thumbs-list.component.html'
})
export class ThumbsListComponent implements OnInit{

  AUTOREFRESH = inject(AUTOREFRESH)

  thumbs = computed(() => this.signalThumbs.list_thumbs())
  sort_order = computed(() => this.signalThumbs.sort_order())
  show_types  = computed(() => this.signalThumbs.show_types())
  time_filter  = computed(() => this.signalThumbs.time_filter())
  spinner = computed(() => this.globalSpinner.spinner())
  autorefresh:boolean = true

  gallery = viewChild<ElementRef>('gallery')

  constructor(
    private globalSpinner: GlobalSpinnerService,
    private signalThumbs: SignalsThumbsService,
    private previews : PreviewsService
  ){

    effect((onCleanup)=>{
      let count = this.signalThumbs.autorefresh() ? undefined : 1;
      this.globalSpinner.on()
      let subscription = this.previews
        .previewsGet(this.sort_order(), this.show_types(), this.time_filter())
        .pipe(repeat({ count: count, delay: this.AUTOREFRESH }), tap((data) => this.signalThumbs.setThumbs(data)))
        .subscribe();

      if (this.signalThumbs.current_thumb()) {
        this.scrollTop();
      }

      onCleanup(()=> {
        subscription.unsubscribe();
      })

    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.signalThumbs.setDisplayPreview(false);
  }

  scrollTop(){
    this.gallery()?.nativeElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  get selectedThumbs(){
    return this.thumbs().filter(item => item.selected)
  }

}
