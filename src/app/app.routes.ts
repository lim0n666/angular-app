import { Routes } from '@angular/router';
import { Productos } from './pages/productos/productos';
import { LoginPage } from './login/login';
import { Usuario } from './usuario/usuario';
import { Admin } from './admin/admin';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { Panel } from './pages/panel/panel';

export const routes: Routes = [
  // 1. Redirige la entrada principal al panel para probar directo
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  
  // 2. Ruta pública de login
  { path: 'login', component: LoginPage },

  // 3. Panel libre de guard para verificar que cargue
  { path: 'panel', component: Panel },

  // Los demás déjalos protegidos como están
  { path: 'productos', component: Productos, canActivate: [authGuard] },
  { path: 'usuario', component: Usuario, canActivate: [authGuard] },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },

  { path: '**', redirectTo: 'login' }
];  