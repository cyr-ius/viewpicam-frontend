/**
 * ViewPI Camera
 * Backend for RaspiMjpeg
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DaysMode } from './daysMode';
import { Week } from './week';


export interface SchedulerWithCalendars { 
    command_on: string;
    command_off: string;
    mode: string;
    enabled: boolean;
    period: string;
    daysmode_id: number;
    id: number;
    calendars: Week;
    daysmode: DaysMode;
}
