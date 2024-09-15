import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { GlobalSpinnerService } from '../services/global-spinner.service';

export const globalSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  let globalSpinner = inject(GlobalSpinnerService);
  let sendApi = req.url.match('/api')?.length
  if (sendApi == 1 && req.method != "GET") {
    globalSpinner.on()
  }
  return next(req).pipe(
    finalize( () => globalSpinner.off() )
  );
};
