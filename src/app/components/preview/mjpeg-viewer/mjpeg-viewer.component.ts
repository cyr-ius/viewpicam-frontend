import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, ElementRef, inject, Inject, Injector, OnInit, viewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, mergeMap, Subscription, timer } from 'rxjs';
import { RaspiconfigService } from '../../../client';
import { SignalsRaspiconfigService } from '../../../core/signals/signals-raspiconfig.service';
import { SignalsSettingsService } from '../../../core/signals/signals-settings.service';
import { BASE_URL } from '../../../core/tokens/app.token';

@Component({
  selector: 'app-mjpeg-viewer',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './mjpeg-viewer.component.html',
  styleUrl: './mjpeg-viewer.component.css',
})
export class MjpegViewerComponent implements OnInit {
  BASE_URL = inject(BASE_URL);

  constructor(
    private signalSettings: SignalsSettingsService,
    private signalRaspiconfig: SignalsRaspiconfigService,
    private raspiService: RaspiconfigService,
    private injector: Injector,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: any
  ) {}

  preview_delay = computed(() =>
    Math.floor(
      (this.signalRaspiconfig.config().divider /
        Math.max(this.signalRaspiconfig.config().video_fps, 1)) *
        1000
    )
  );
  pipan_mode = computed(() => this.signalSettings.settings().pipan_mode);

  mjpeg_src: string | SafeUrl = './img/loading.png';

  elem: any;
  fullscreen: boolean = false;
  cycle: boolean | undefined = undefined;
  previous_halted: boolean | undefined = undefined;
  last: string = '';

  mjpeg_img = viewChild.required<ElementRef>('mjpeg_img');
  subscription!: Subscription;

  ngOnInit(): void {
    this.hashHandler();
    this.mjpegModeChange();
    this.checkStatus();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  mjpegModeChange(): void {
    effect(
      () => {
        if (!this.signalSettings.mjpeg_mode()) {
          this.loadImg();
        } else {
          this.updatePreview(false);
        }
      },
      { injector: this.injector }
    );
  }

  checkStatus() {
    this.subscription = timer(250)
      .pipe(
        mergeMap(() =>
          this.raspiService.raspiconfigGetStatus(
            this.signalRaspiconfig.status_mjpeg(),
          )
        )
      )
      .subscribe({
        next: (data: any) => {
          this.signalRaspiconfig.setStatus(data.status);
          this.checkStatus();
        },
        error: () => {
          this.signalRaspiconfig.setStatus('Error');
          this.mjpeg_src = './img/unavailable.png';
          this.checkStatus();
        },
      });
  }

  updatePreview(cycle: boolean) {
    let time = new Date().getTime();
    if (cycle !== undefined && cycle == true) {
      this.mjpeg_src = "./img/updating.png') }}";
      let url = `${
        this.BASE_URL
      }/cam/cam_pic_new?time=${time}&delay=${this.preview_delay()}`;
      this.mjpeg_src = url;
    }
    if (this.previous_halted != this.signalRaspiconfig.halted()) {
      if (!this.signalRaspiconfig.halted()) {
        let url = `${
          this.BASE_URL
        }/cam/cam_pic_new?time=${time}&delay=${this.preview_delay()}`;
        this.mjpeg_src = url;
      } else {
        this.mjpeg_src = './img/unavailable.png';
      }
    }
    this.previous_halted = this.signalRaspiconfig.halted();
  }

  loadImg() {
    let time = new Date().getTime();
    if (!this.signalSettings.mjpeg_mode()) {
      if (!this.signalRaspiconfig.halted() && this.preview_delay()) {
        let url = `${
          this.BASE_URL
        }/cam/cam_pic?time=${time}&delay=${this.preview_delay()}`;
        this.mjpeg_src = url;
      } else {
        this.mjpeg_src = './img/unavailable.png';
      }
    }
  }

  getImage(url: string) {
    // Calling the image via a GET to add the Access Token in the request
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(
        map((val) =>
          this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(val)
          )
        )
      );
  }

  errorImg() {
    let time = new Date().getTime();
    timer(100).subscribe(
      () => (this.mjpeg_src = `${this.BASE_URL}/cam/cam_pic?time=${time}`)
    );
  }

  toggleFullscreen(div: any) {
    if (this.document.fullscreenElement) {
      div.className = 'img-fluid standard';
      this.document.exitFullscreen();
    } else {
      div.className = 'fullscreen';
      this.document.documentElement.requestFullscreen();
    }
  }

  hashHandler() {
    switch (window.location.hash) {
      case '#full':
      case '#fullscreen':
        if (this.mjpeg_img().nativeElement !== null && !this.fullscreen) {
          this.fullscreen = true;
          this.toggleFullscreen(this.mjpeg_img().nativeElement);
        }
        break;
      case '#normal':
      case '#normalscreen':
        if (this.mjpeg_img().nativeElement !== null && this.fullscreen) {
          this.fullscreen = false;
          this.toggleFullscreen(this.mjpeg_img().nativeElement);
        }
        break;
    }
  }

  pipan_start() {}
}
