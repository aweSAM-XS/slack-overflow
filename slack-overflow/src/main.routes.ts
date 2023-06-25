import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'home', loadComponent: () => {
    return import('./app/components/landing/landing.component').then(c=>c.LandingComponent)
  } },
  {
    path: 'auth',
    loadChildren: () => {
      return import('./app/components/auth/auth.routes').then(
        (r) => r.AUTH_ROUTES
      );
    },
  },
  {
    path: '',
    loadChildren: () => {
      return import('./app/components/home/home.routes').then(
        (r) => r.HOME_ROUTES
      );
    },
  },
  { path: 'signup', redirectTo: '/auth/signup', pathMatch: 'full' },
  { path: 'signin', redirectTo: '/auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
