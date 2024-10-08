import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { BASE_PATH } from './client';
import { globalSpinnerInterceptor } from './core/interceptors/global-spinner.interceptor';
import { handleErrorInterceptor } from './core/interceptors/handle-error.interceptor';
import { AUTOREFRESH, BASE_URL, PREVIEW_DELAY, TIME_FILTER_MAX } from './core/tokens/app.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([globalSpinnerInterceptor, handleErrorInterceptor])),
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    { provide: BASE_URL, useValue: '/api/v1' },
    { provide: TIME_FILTER_MAX, useValue: 8 },
    { provide: PREVIEW_DELAY, useValue: 400 },
    { provide: AUTOREFRESH, useValue: 60000 },
  ],
};
