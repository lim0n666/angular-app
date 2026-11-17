import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
const auth = inject(Auth);
const router = inject(Router);

if (auth.isAuthenticated()) {
return true; // hay sesion: puede pasar

}

// no hay sesion: lo mandamos al login
return router.createUrlTree(['/login']);
};