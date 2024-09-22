import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { CommonService } from '../services/common.service';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const common = inject(CommonService);

  return next(req).pipe(
    catchError((error) => common.handleErrorDetail(error.error.detail, []))
  );
};
