import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
const auth = inject(Auth);
const router = inject(Router);

// 1) sin sesión: al login
if (!auth.isAuthenticated()) {
return router.createUrlTree(['/login']);

}

// 2) con sesión y admin: puede pasar
if (auth.isAdmin()) {
return true;

}

// 3) con sesión pero sin permiso: a su vista de usuario
return router.createUrlTree(['/usuario']);

};