import { importProvidersFrom, isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ROUTES } from './main.routes';
import {  provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {  provideEffects } from '@ngrx/effects';
import { authReducer } from './app/store/reducers/authReducer';
import { AuthEffects } from './app/store/effects/auth-effects.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(ROUTES),
    provideStore({auth: authReducer}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthEffects),
    provideHttpClient(withInterceptorsFromDi()),
    AuthService
],
}).catch((err) => console.error(err));
