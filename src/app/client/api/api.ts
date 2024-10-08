export * from './buttons.service';
import { ButtonsService } from './buttons.service';
export * from './camera.service';
import { CameraService } from './camera.service';
export * from './idp.service';
import { IdpService } from './idp.service';
export * from './logs.service';
import { LogsService } from './logs.service';
export * from './motion.service';
import { MotionService } from './motion.service';
export * from './multiview.service';
import { MultiviewService } from './multiview.service';
export * from './otp.service';
import { OtpService } from './otp.service';
export * from './previews.service';
import { PreviewsService } from './previews.service';
export * from './raspiconfig.service';
import { RaspiconfigService } from './raspiconfig.service';
export * from './rsync.service';
import { RsyncService } from './rsync.service';
export * from './schedule.service';
import { ScheduleService } from './schedule.service';
export * from './settings.service';
import { SettingsService } from './settings.service';
export * from './system.service';
import { SystemService } from './system.service';
export * from './tasks.service';
import { TasksService } from './tasks.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [ButtonsService, CameraService, IdpService, LogsService, MotionService, MultiviewService, OtpService, PreviewsService, RaspiconfigService, RsyncService, ScheduleService, SettingsService, SystemService, TasksService, UsersService];
