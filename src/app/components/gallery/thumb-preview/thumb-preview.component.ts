import { Component, computed, ElementRef, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Files, PreviewsService } from '../../../client';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsThumbsService } from '../../../core/signals/signals-thumbs.service';
import { ThumbsListComponent } from '../thumbs-list.component';

@Component({
  selector: 'app-thumb-preview',
  standalone: true,
  imports: [ThumbsListComponent],
  templateUrl: './thumb-preview.component.html',
})
export class ThumbPreviewComponent implements OnInit {
  display_preview = computed(() => this.signalThumbs.display_preview());
  prevItem = computed<number>(() =>
    this.searchIndex(
      this.signalThumbs.list_thumbs(),
      this.signalThumbs.current_thumb()?.id,
      -1
    )
  );
  nextItem = computed<number>(() =>
    this.searchIndex(
      this.signalThumbs.list_thumbs(),
      this.signalThumbs.current_thumb()?.id,
      1
    )
  );
  count = computed<number>(() => this.signalThumbs.list_thumbs().length);

  thumb = <Files>{};

  video_detected: boolean = false;
  img_src: string | undefined = undefined;
  cam_src: string | undefined = undefined;
  video = viewChild<ElementRef>('video');

  keys: string[] = [];

  constructor(
    private signalThumbs: SignalsThumbsService,
    private previews: PreviewsService,
    private activedRtoute: ActivatedRoute,
    private signalRaspiconfig: SignalsRaspiconfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRtoute.paramMap.subscribe((data: any) => {
      if (data.params.id) {
        this.previews
          .previewsGetThumb(data.params.id)
          .subscribe((rsp) => {
            this.thumb = rsp;
            this.display();
          });
      }
    });
  }

  ngDestroy() {
    this.signalThumbs.setDisplayPreview(false);
    this.signalThumbs.setCurrentThumb(undefined);
  }

  prev() {
    this.thumb = this.signalThumbs.list_thumbs()![this.prevItem()];
    this.router.navigate(['gallery', this.thumb.id]);
    this.display();
  }

  next() {
    this.thumb = this.signalThumbs.list_thumbs()![this.nextItem()];
    this.router.navigate(['gallery', this.thumb.id]);
    this.display();
  }

  display() {
    this.signalThumbs.setDisplayPreview(true);
    this.signalThumbs.setCurrentThumb(this.thumb);
    this.video_detected = this.thumb?.type == 'v'.toString() ? true : false;

    const media_path = this.signalRaspiconfig.media_path();

    if (this.video_detected && this.thumb) {
      if (this.video()) {
        this.video()!.nativeElement.src = `${media_path}/${this.thumb.realname}`;
      } else {
        this.cam_src = `${media_path}/${this.thumb.realname}`;
      }
    } else {
      this.img_src = `${media_path}/${this.thumb?.realname}`;
    }
  }

  searchIndex(thumbs: Files[], id: string | null | undefined, step: number): number {
    if (id == undefined) return 0;
    let keys: string[] = [];
    thumbs?.forEach((item) => {
      if (item.id) keys.push(item.id)
    });
    let idx = keys.findIndex((element) => element == id);
    return idx + 1 * step;
  }
}
