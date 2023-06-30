import { UsersService } from 'src/app/services/users.service';
import { Injectable, inject } from '@angular/core';
import * as UserActions from '../actions/userActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  usersService = inject(UsersService);
  actions$ = inject(Actions);
  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(() => {
        return this.usersService.getUsers(15,1).pipe(
          map((users) => UserActions.getUsersSuccess({ users })),
          catchError((error) => of(UserActions.getUsersFailure({ error })))
        );
      })
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUser),
      mergeMap((action) => {
        return this.usersService.getUser(action.id).pipe(
          map((user) => UserActions.getUserSuccess({ currentUser: user })),
          catchError((error) => of(UserActions.getUserFailure({ error })))
        );
      })
    );
  });
}
