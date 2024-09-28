import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { CommonService } from '../services/common.service';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const common = inject(CommonService);

  let sendApi = req.url.match('/api')?.length && req.method != "GET" && !req.url.match('idp')?.length

  if (sendApi) {
    return next(req).pipe(
      catchError((error) => common.handleErrorDetail(error.error.detail, []))
    );
  }
  return next(req)
};
