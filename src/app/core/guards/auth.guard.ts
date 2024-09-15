import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.current_user()){
    console.log("[Auth Guard]Logged")
    const now = new Date().getTime()
    if (now > authService.expires_in()) {
        console.warn('[Auth Guard] JWT Token expired')
        authService.setMessage('JWToken expired')
        authService.setCurrentUser(null);
        router.navigate(['/login']);
        return false
    }
    return true
  }

  return new Observable<boolean>((obs) => {
    authService.getUserInfo().subscribe({
      next: (rsp) => {
        console.log("[Auth Guard] Check User infos and logged")
        authService.setCurrentUser(rsp.body);
        let expires_in = localStorage.getItem("expires_in")
        if (expires_in){
          authService.setExpiresIn(+expires_in)
        }
        obs.next(true);
      },
      error: (error) => {
        console.warn("[Auth Guard] User infos error")
        authService.setCurrentUser(null);
        router.navigate(['/login']);
        obs.next(false);
      }
    });
  })

}
