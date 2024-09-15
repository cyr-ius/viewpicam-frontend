import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { fromEvent, repeat } from 'rxjs';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';
import { ThumbsService } from '../../core/services/thumbs.service';
import { AUTOREFRESH } from '../../core/tokens/app.token';
import { FreediskComponent } from './freedisk/freedisk.component';
import { ThumbListOrderingComponent } from './thumb-list-ordering/thumb-list-ordering.component';
import { ThumbPreviewComponent } from './thumb-preview/thumb-preview.component';
import { ThumbComponent } from './thumb/thumb.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thumbs-list',
  standalone: true,
  imports: [ThumbListOrderingComponent, ThumbComponent, ThumbPreviewComponent, FreediskComponent, AsyncPipe],
  templateUrl: './thumbs-list.component.html'
})
export class ThumbsListComponent implements OnInit{

  AUTOREFRESH = inject(AUTOREFRESH)

  thumbs = computed(() => this.thumbsService.list_thumbs())
  sort_order = computed(() => this.thumbsService.sort_order())
  show_types  = computed(() => this.thumbsService.show_types())
  time_filter  = computed(() => this.thumbsService.time_filter())
  spinner = computed(() => this.globalSpinner.spinner())
  autorefresh:boolean = true

  gallery = viewChild<ElementRef>('gallery')

  constructor(
    private thumbsService: ThumbsService,
    private globalSpinner: GlobalSpinnerService,
    private route: ActivatedRoute
  ){

    effect((onCleanup)=>{
      let count = this.thumbsService.autorefresh() ? undefined : 1
      this.globalSpinner.on()
      let sub = this.thumbsService.getThumbsList(this.sort_order(),this.show_types(), this.time_filter()).pipe(
        repeat({count: count , delay: this.AUTOREFRESH})
      ).subscribe()

      if (this.thumbsService.current_thumb()) {
        this.scrollTop();
      }

      onCleanup(()=> {
        sub.unsubscribe();
      })

    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.thumbsService.setDisplayPreview(false)
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
