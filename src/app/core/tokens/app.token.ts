import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('BASE_URL');
export const TIME_FILTER_MAX = new InjectionToken<string>('TIME_FILTER_MAX');
export const PREVIEW_DELAY = new InjectionToken<number>('PREVIEW_DELAY');
export const AUTOREFRESH = new InjectionToken<number>('AUTOREFRESH');
