import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { CommonService } from '../../core/services/common.service';
import { RaspiconfigService } from '../../core/services/raspiconfig.service';
import { SchedulerService } from '../../core/services/scheduler.service';
import { SettingsService } from '../../core/services/settings.service';
import { ThumbsService } from '../../core/services/thumbs.service';
import { ModalUploadComponent } from '../modals/modal-upload/modal-upload.component';
import { BASE_URL } from '../../core/tokens/app.token';
import { GlobalSpinnerService } from '../../core/services/global-spinner.service';
import { Thumb } from '../../core/models/app-models';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, ModalUploadComponent, CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  BASE_URL = inject(BASE_URL)

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private raspiConfig: RaspiconfigService,
    private thumbsService: ThumbsService,
    private schedulerService: SchedulerService,
    private http: HttpClient,
    private common: CommonService,
    private globalSpinner: GlobalSpinnerService,
    private router: Router
  ){}

  spinner:boolean = false
  routeSubscription!: Subscription

  menu_id = computed( () => this.settingsService.menu_id())
  motion_mode = computed(() => this.raspiConfig.motion_mode())
  current_user = computed( () => this.authService.current_user())
  mjpeg_mode = computed( () => this.settingsService.mjpeg_mode())
  display_mode = computed( () => this.settingsService.display_mode())
  log_level = computed( () => this.settingsService.settings().loglevel)
  display_preview = computed( () => this.thumbsService.display_preview())
  current_thumb = computed(()=> this.thumbsService.current_thumb())
  scheduler_state = computed(()=> this.schedulerService.scheduler_state())
  global_spinner = computed(() => this.globalSpinner.spinner())

  mjpegMode(){
    if (this.mjpeg_mode()){
      this.settingsService.setMjpegMode(false)
    } else  {
      this.settingsService.setMjpegMode(true)
    }
  }

  displayMode(){
    this.settingsService.setDisplayMode(!this.display_mode())

  }

  onLogout() {
    this.authService.logout().subscribe();
  }

  resetSettings(){
    if(confirm("Are you sure to reset settings ?")) {
      this.settingsService.resetSettings().subscribe()
    }
  }
  haltedSys(){
    if(confirm("Are you sure to shutdown system ?")) {
      this.settingsService.haltedSys().subscribe()
    }

  }
  restartSys(){
    if(confirm("Are you sure to restart system ?")) {
      this.settingsService.restartSys().subscribe()
    }

  }
  restartApp(){
    if(confirm("Are you sure to restart application ?")) {
      this.settingsService.restartApp().subscribe()
    }
  }

  deleteThumb(){
    let currenThumb = this.current_thumb()
    if(currenThumb && confirm("Are you sure to delete ?")) {
      this.thumbsService.deleteThumbById(currenThumb.id).subscribe(
        () => {
          this.thumbsService.setDisplayPreview(false);
          this.thumbsService.removeThumbs(currenThumb);
          this.router.navigate(['gallery'])
        }
      )
    }
  }

  downloadThumb(){
    const media_path = this.raspiConfig.media_path();
    this.http.get(media_path+'/'+this.current_thumb()!.realname, {responseType: 'blob'}).subscribe(
      data => this.common.downLoadFile(data, this.current_thumb()!.realname)
    )
  }

  Lock(){
      this.selectedThumbs.forEach((item) => {
        this.thumbsService.lockThumbById(item.id).subscribe(
          ()=> {
            item.locked = true
            item.selected = false
          }
        )
      })
    }
  unLock() {
    this.selectedThumbs.forEach((item) => {
      this.thumbsService.unlockThumbById(item.id).subscribe(
        ()=> {
          item.locked = false
          item.selected = false
        }
      )
    })
  }

  selectAll(){
    this.thumbsService.list_thumbs().every(item => item.selected = true)
  }

  unselectAll(){
    this.selectedThumbs.forEach(item => item.selected = false)
  }

  downloadZip(){
    let ids:string[] = []
    this.selectedThumbs.forEach(item => ids.push(item.id))
    this.http.post(`${this.BASE_URL}/previews/zipfile`, ids, {responseType: 'blob'}).subscribe(
      data => this.common.downLoadFile(data, "DataZip.zip")
    )
  }

  deletedSelected(){
    let ids:string[] = []
    this.selectedThumbs.forEach(item => ids.push(item.id))
    if(confirm("Are you sure to delete selected files ?")) {
      this.thumbsService.deleteThumbs(ids).subscribe(
        () => {
          this.selectedThumbs.forEach((thumb: Thumb) =>this.thumbsService.removeThumbs(thumb))
        }
      )
    }
  }

  deletedAll(){
    let ids:string[] = []
    this.thumbsService.list_thumbs().forEach(item => ids.push(item.id))
    if(confirm("Are you sure to delete ALL files ?")) {
      this.thumbsService.deleteThumbs(ids).subscribe()
    }
  }

  clearLog(){
    this.settingsService.deleteLog().subscribe()
  }

  downloadLog(){
    this.settingsService.downloadLog().subscribe(
      data => this.common.downLoadFile(data, "ViewpiCam.log")
    )
  }

  saveSettings(){
      this.schedulerService.saveSettings(this.schedulerService.scheduler_settings())
      .pipe(
        tap(()=> this.spinner = true)
      )
      .subscribe({
       next: () => {
          let selected = this.schedulerService.scheduler_day().filter(item => item.daysmode.id == this.schedulerService.daymode())
          this.schedulerService.setSchedule(selected).subscribe(()=> this.spinner = false);
        },
        error: () => {
          this.spinner = false
        }
      })
  }

  toggleAction(){
    if (this.scheduler_state()) {
      this.schedulerService.Stop().subscribe(
        () => this.schedulerService.getState().subscribe()
      )
    } else {
      this.schedulerService.Start().subscribe(
        () => this.schedulerService.getState().subscribe()
      )
    }
  }

  onBackup(){
    this.settingsService.backupSettings().subscribe(
      data => {
        this.common.downLoadFile(data, "Settings.zip")
      }
    )
  }

  get selectedThumbs(){
    return this.thumbsService.list_thumbs().filter(item => item.selected)
  }

}
