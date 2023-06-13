import { AuthService } from '../../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/authActions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      exhaustMap((action) =>
        this.authService.signUp(action.payload).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('payload', JSON.stringify(response.payload));
            this.router.navigate(['']);
            return AuthActions.signUpSuccess({ message: response.message });
          }),
          catchError((error) => {
            return of(AuthActions.signUpFailure({ error: error.message }));
          })
        )
      )
    )
  );

  signin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap((action) =>
        this.authService.signIn(action.payload).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('payload', JSON.stringify(response.payload));
            this.router.navigate(['']);
            return AuthActions.signInSuccess({ message: response.message });
          }),
          catchError((error) => {
            return of(AuthActions.signInFailure({ error: error.message }));
          })
        )
      )
    );
  });

  signOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      tap(() => localStorage.clear)
    )
  );
}
