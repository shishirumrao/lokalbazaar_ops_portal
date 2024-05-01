import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/public/auth/auth.service';

@Injectable({
    providedIn: 'root'
})

class AuthGuardService {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.checkUserValidSession()) {
            return true;
        } else {
            // Redirect to the login page if not authenticated
            this._router.navigate(['/sign-in']);
            return false;
        }
    }
}
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuardService).canActivate(next, state);
}

