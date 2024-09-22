import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import {
  Files,
  IdpService,
  LogsService,
  PreviewsService,
  ScheduleService,
  SettingsService,
  SystemService,
  TasksService
} from '../../client';
import { CommonService } from '../../core/services/common.service';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';
import { SignalsAuthService } from '../../core/signals/signals-auth.service';
import { SignalsRaspiconfigService } from '../../core/signals/signals-raspiconfig.service';
import { SignalsSchedulerService } from '../../core/signals/signals-scheduler.service';
import { SignalsSettingsService } from '../../core/signals/signals-settings.service';
import { SignalsThumbsService } from '../../core/signals/signals-thumbs.service';
import { BASE_URL } from '../../core/tokens/app.token';
import { ModalUploadComponent } from '../modals/modal-upload/modal-upload.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ModalUploadComponent,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  BASE_URL = inject(BASE_URL);

  constructor(
    private common: CommonService,
    private globalSpinner: GlobalSpinnerService,
    private http: HttpClient,
    private idp: IdpService,
    private logs: LogsService,
    private previews: PreviewsService,
    private router: Router,
    private schedule: ScheduleService,
    private settings: SettingsService,
    private signalAuth: SignalsAuthService,
    private signalRaspiconfig: SignalsRaspiconfigService,
    private signalSchedule: SignalsSchedulerService,
    private signalSettings: SignalsSettingsService,
    private signalThumbs: SignalsThumbsService,
    private system: SystemService,
    private tasks: TasksService
  ) {}

  spinner: boolean = false;
  routeSubscription!: Subscription;

  menu_id = computed(() => this.signalSettings.menu_id());
  motion_mode = computed(() => this.signalRaspiconfig.motion_mode());
  current_user = computed(() => this.signalAuth.current_user());
  mjpeg_mode = computed(() => this.signalSettings.mjpeg_mode());
  display_mode = computed(() => this.signalSettings.display_mode());
  log_level = computed(() => this.signalSettings.settings().loglevel);
  display_preview = computed(() => this.signalThumbs.display_preview());
  current_thumb = computed(() => this.signalThumbs.current_thumb());
  scheduler_state = computed(() => this.signalSchedule.scheduler_state());
  global_spinner = computed(() => this.globalSpinner.spinner());

  mjpegMode() {
    if (this.mjpeg_mode()) {
      this.signalSettings.setMjpegMode(false);
    } else {
      this.signalSettings.setMjpegMode(true);
    }
  }

  displayMode() {
    this.signalSettings.setDisplayMode(!this.display_mode());
  }

  onLogout() {
    if (this.signalAuth.remember()) {
      this.signalAuth.setCurrentUser(null);
      this.router.navigate(['login']);
    }
    this.idp
      .idpPostLogout()
      .pipe(
        tap(() => {
          this.signalAuth.setCurrentUser(null);
          this.router.navigate(['login']);
        })
      )
      .subscribe();

    this.router.navigate(['login']);
  }

  resetSettings() {
    if (confirm('Are you sure to reset settings ?')) {
      this.system.systemReset().subscribe();
    }
  }
  haltedSys() {
    if (confirm('Are you sure to shutdown system ?')) {
      this.system.systemPostHalted().subscribe();
    }
  }
  restartSys() {
    if (confirm('Are you sure to restart system ?')) {
      this.system.systemPostRestart().subscribe();
    }
  }
  restartApp() {
    if (confirm('Are you sure to restart application ?')) {
      this.system.systemPostRestartApp().subscribe();
    }
  }

  deleteThumb() {
    let currenThumb = this.current_thumb();
    if (currenThumb && currenThumb.id && confirm('Are you sure to delete ?')) {
      this.previews.previewsDeleteThumb(currenThumb.id).subscribe(() => {
        this.signalThumbs.setDisplayPreview(false);
        this.signalThumbs.removeThumbs(currenThumb);
        this.router.navigate(['gallery']);
      });
    }
  }

  downloadThumb() {
    const mediaPath = this.signalRaspiconfig.media_path();
    const filename = this.current_thumb()!.realname;
    const filePath = `${mediaPath}/${filename}`;
    this.http.get(filePath, { responseType: 'blob' }).subscribe(
      (data: any) => this.common.downLoadFile(data, filename)
    )
  }

  Lock() {
    this.selectedThumbs.forEach((item) => {
      if (item.id) {
        this.previews.previewsPostLock(item.id).subscribe(() => {
          item.locked = true;
          item.selected = false;
        });
      }
    });
  }
  unLock() {
    this.selectedThumbs.forEach((item) => {
      if (item.id) {
        this.previews.previewsPostUnlock(item.id).subscribe(() => {
          item.locked = false;
          item.selected = false;
        });
      }
    });
  }

  selectAll() {
    this.signalThumbs.list_thumbs().every((item) => (item.selected = true));
  }

  unselectAll() {
    this.selectedThumbs.forEach((item) => (item.selected = false));
  }

  downloadZip() {
    let ids: string[] = [];
    this.selectedThumbs.forEach((item) => {
      if (item.id) ids.push(item.id);
    });
    this.previews.previewsPostZipfile(ids).subscribe(
      (data) => this.common.downLoadFile(data, "raw_data.zip")
    )
  }

  deletedSelected() {
    let ids: string[] = [];
    this.selectedThumbs.forEach((item) => {
      if (item.id) ids.push(item.id);
    });
    if (confirm('Are you sure to delete selected files ?')) {
      this.previews.previewsDelete(ids).subscribe(() => {
        this.selectedThumbs.forEach((thumb: Files) =>
          this.signalThumbs.removeThumbs(thumb)
        );
      });
    }
  }

  deletedAll() {
    let ids: string[] = [];
    this.signalThumbs.list_thumbs().forEach((item) => {
      if (item.id) ids.push(item.id);
    });
    if (confirm('Are you sure to delete ALL files ?')) {
      this.previews.previewsDelete(ids).subscribe();
    }
  }

  clearLog() {
    this.logs.logsDelete().subscribe();
  }

  downloadLog() {
    this.logs
      .logsDownload()
      .subscribe((data) => this.common.downLoadFile(data,"viewpicam.log"))
  }

  saveSettings() {
    this.schedule
      .schedulePut(this.signalSchedule.scheduler_settings())
      .pipe(tap(() => (this.spinner = true)))
      .subscribe({
        next: () => {
          let selected = this.signalSchedule
            .scheduler_day()
            .filter(
              (item) => item.daysmode.id == this.signalSchedule.daymode()
            );
          this.schedule
            .schedulePutScheduler(selected)
            .subscribe(() => (this.spinner = false));
        },
        error: () => {
          this.spinner = false;
        },
      });
  }

  toggleAction() {
    if (this.scheduler_state()) {
      this.tasks
        .tasksStopTask()
        .subscribe(() =>
          this.tasks
            .tasksStatus()
            .subscribe((data) => this.signalSchedule.setState(data.state))
        );
    } else {
      this.tasks
        .tasksStartTask()
        .subscribe(() =>
          this.tasks
            .tasksStatus()
            .subscribe((data) => this.signalSchedule.setState(data.state))
        );
    }
  }

  onBackup() {
    this.settings.settingsGetBackup().subscribe({
      next: (data)=> this.common.downLoadFile(data, "settings.zip"),
      error: (error) => console.error(error)
  });


  }

  get selectedThumbs() {
    return this.signalThumbs.list_thumbs().filter((item) => item.selected);
  }

}
