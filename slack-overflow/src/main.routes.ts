import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => {
      return import('./app/components/auth/auth.routes').then((r) => r.AUTH_ROUTES);
    },
  },
  { path: 'signup', redirectTo: '/auth/signup', pathMatch: 'full' },
  { path: 'signin', redirectTo: '/auth/signin', pathMatch: 'full' },
];
