import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  authService.checkAuthState();
  const isLoggedIn = authService.authState;

  if(!isLoggedIn){
    toastr.error("Unauthenticated access attempt.");
    router.navigate(['/login']);
    return false;
  }

  return true;
};
