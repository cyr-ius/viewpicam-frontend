import { Injectable, signal } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SignalsRaspiconfigService {
  private raspiMjpegConfig = signal<any>({});
  config = this.raspiMjpegConfig.asReadonly();
  private motionMode = signal<string>('internal');
  motion_mode = this.motionMode.asReadonly();
  private statusMjpeg = signal<string>('', { equal: _.isEqual });
  status_mjpeg = this.statusMjpeg.asReadonly();
  private isHalted = signal<boolean>(false);
  halted = this.isHalted.asReadonly();
  private mediaPath = signal<string>('');
  media_path = this.mediaPath.asReadonly();

  constructor() {}

  setStatus(value: string) {
    this.statusMjpeg.set(value);
  }

  setHalted(value: boolean) {
    this.isHalted.set(value);
  }

  setMotionMode(value: string) {
    this.motionMode.set(value);
  }

  setConfig(data: any) {
    this.raspiMjpegConfig.set(data);
  }
}
