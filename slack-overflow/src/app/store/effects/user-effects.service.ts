import { UsersService } from 'src/app/services/users.service';
import { Injectable } from '@angular/core';
import * as UserActions from '../actions/userActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(private usersService: UsersService, private actions$: Actions) {}
  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(() => {
        return this.usersService.getUsers().pipe(
          map((users) => UserActions.getUsersSuccess({ users })),
          catchError((error) => of(UserActions.getUsersFailure({ error })))
        );
      })
    );
  });
}
