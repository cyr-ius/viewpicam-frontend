import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdpService } from '../../client';
import { SignalsAuthService } from '../signals/signals-auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {

  const idp = inject(IdpService);
  const signalAuth = inject(SignalsAuthService)
  const router = inject(Router);

  if (signalAuth.current_user()) {
    const now = new Date().getTime();
    if (now > signalAuth.expires_in()) {
      console.warn('[Auth Guard] JWT Token expired');
      signalAuth.setMessage('JWToken expired');
      signalAuth.setCurrentUser(null);
      router.navigate(['/login']);
      return false;
    }
    return true;
  }

  return new Observable<boolean>((obs) => {
    idp.idpReadUsersMe().subscribe({
      next: (rsp) => {
        signalAuth.setCurrentUser(rsp);
        let expires_in = localStorage.getItem('expires_in');
        if (expires_in) {
          signalAuth.setExpiresIn(+expires_in);
        }
        obs.next(true);
      },
      error: (_error) => {
        console.warn('[Auth Guard] User infos error');
        signalAuth.setCurrentUser(null);
        router.navigate(['/login']);
        obs.next(false);
      },
    });
  })

}
