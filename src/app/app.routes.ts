import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./private/tabs/tabs.routes').then((m) => m.routes),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    loadComponent: () => import('./public/login/login.page').then( m => m.LoginPage),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'tab4',
    loadComponent: () => import('./private/tab4/tab4.page').then( m => m.Tab4Page)
  },
];
